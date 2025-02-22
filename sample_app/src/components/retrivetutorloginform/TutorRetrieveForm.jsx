import React, { useState } from "react";
import { debounce } from "lodash";
import "./TutorRetrieveForm.css";
const apiUrl = process.env.REACT_APP_API_URL;

const TutorRetrieveForm = () => {
  const [field, setField] = useState("");
  const [value, setValue] = useState("");
  const [data, setData] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "ascending" });
  const [filterText, setFilterText] = useState("");
  const [error, setError] = useState("");

  const sortIcon = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "ascending" ? (
        <svg className="shrink-0 size-3.5 text-gray-800 inline-block" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m7 15 5 5 5-5" />
        </svg>
      ) : (
        <svg className="shrink-0 size-3.5 text-gray-800 inline-block" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m7 9 5-5 5 5" />
        </svg>
      );
    }
    return (
      <svg className="shrink-0 size-3.5 text-gray-800 inline-block" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m7 9 5-5 5 5" />
        <path d="m7 15 5 5 5-5" />
      </svg>
    );
  };

  const handleChangeField = (e) => {
    const selectedField = e.target.value;
    setField(selectedField);
    if (selectedField && value) {
      debouncedFetchData(selectedField, value);
    }
  };

  const handleChangeValue = (e) => {
    const newValue = e.target.value;
    setFilterText(newValue);
    setValue(newValue);
    if (field && newValue) {
      debouncedFetchData(field, newValue);
    }
  };
  const fetchData = async (field, value) => {
    setError(""); // Clear previous errors before fetching
    setData([]); // Clear existing data before fetching
    
    try {
      // Make a GET request with query parameters field and value
      const response = await fetch(
        `${apiUrl}/retrieve/tutor?field=${encodeURIComponent(field)}&value=${encodeURIComponent(value)}`
      );
  
      // Check if the response is successful
      if (!response.ok) {
        if (response.status === 404) {
          setError("No matching records found.");
        } else {
          setError("An error occurred while fetching data.");
        }
        return;
      }
  
      // Parse and set the response data if it exists
      const result = await response.json();
      setData(result); // Update state with retrieved data
    } catch (error) {
      console.error("Error retrieving data:", error);
      setError("Failed to fetch data. Please try again.");
    }
  };
  

  const debouncedFetchData = debounce((field, value) => {
    fetchData(field, value);
  }, 300);  // Debounce for 300ms

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
    
    const sortedData = [...data].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === "ascending" ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
    setData(sortedData);
  };

  return (
    <>
      <div className="relative overflow-hidden">
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-10">
          <div className="text-center">
            <h1 className="text-3xl sm:text-5xl lg:text-4xl font-bold text-gray-800">
              Tutor Details Records
            </h1>

            <div className="mt-7 sm:mt-12 mx-auto max-w-xl relative">
              <div className="relative z-10 flex gap-x-3 p-3 bg-white border rounded-lg shadow-lg shadow-gray-100">
                <div className="w-full flex gap-[20px]">
                  <select
                    className="border border-grey border-2 py-2.5 px-4 block w-1/2 border-transparent rounded-lg"
                    id="field"
                    value={field}
                    onChange={handleChangeField}
                    required
                  >
                    <option value="">--Select Field--</option>
                    <option value="batchId">Batch ID</option>
                    <option value="tutorDetails">Tutor Subject</option>
                    <option value="countryLocation">Country Location</option>
                    <option value="tutorId">Tutor ID/Name</option>
                    <option value="phone">Phone Number</option>
                    <option value="startDate">Batch Start Date</option>
                  </select>

                  <input
                    className="border border-grey border-2 py-2.5 px-4 block w-1/2 border-transparent rounded-lg"
                    type="text"
                    id="value"
                    value={value}
                    onChange={handleChangeValue}
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-white border border-gray-200 rounded-xl shadow-sm">
          <div className="flex justify-between items-center gap-x-5 sm:gap-x-10">
            <div className="grow">
              <h2 className="text-sm text-gray-600 text-center">
                {error}
              </h2>
            </div>
          </div>
        </div>
      )}

      {data.length > 0 && (
        <div className="data-container">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-start cursor-pointer" onClick={() => requestSort("batchid")}>S.No</th>
                <th className="px-6 py-3 text-start cursor-pointer" onClick={() => requestSort("batchid")}>
                  Batch ID {sortIcon("batchid")}
                </th>
                <th className="px-6 py-3 text-start cursor-pointer" onClick={() => requestSort("tutordetails")}>
                  Tutor Subject {sortIcon("tutordetails")}
                </th>
                <th className="px-6 py-3 text-start cursor-pointer" onClick={() => requestSort("countrylocation")}>
                  Country Location {sortIcon("countrylocation")}
                </th>
                <th className="px-6 py-3 text-start cursor-pointer" onClick={() => requestSort("tutorid")}>
                  Tutor ID {sortIcon("tutorid")}
                </th>
                <th className="px-6 py-3 text-start cursor-pointer" onClick={() => requestSort("phone")}>
                  Phone {sortIcon("phone")}
                </th>
                <th className="px-6 py-3 text-start cursor-pointer" onClick={() => requestSort("startdate")}>
                  Start Date {sortIcon("startdate")}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((row, index) => (
                <tr key={index}>
                  <td className="size-px whitespace-nowrap">{index + 1}</td>
                  <td className="size-px whitespace-nowrap">
                    <div className="px-6 py-2">
                      <span className="inline-flex items-center gap-1.5 py-1 px-2 rounded-lg text-md font-medium text-gray-800">
                        {row.batchid}
                      </span>
                    </div>
                  </td>
                  <td className="size-px whitespace-nowrap">
                    <div className="px-6 py-2">
                      <span className="inline-flex items-center gap-1.5 py-1 px-2 rounded-lg text-md font-medium text-gray-800">
                        {row.tutordetails}
                        </span>
                    </div>
                  </td>
                  <td className="size-px whitespace-nowrap">
                    <div className="px-6 py-2">
                      <span className="inline-flex items-center gap-1.5 py-1 px-2 rounded-lg text-md font-medium text-gray-800">
                        {row.countrylocation}
                      </span>
                    </div>
                  </td>
                  <td className="size-px whitespace-nowrap">
                    <div className="px-6 py-2">
                      <span className="inline-flex items-center gap-1.5 py-1 px-2 rounded-lg text-md font-medium text-gray-800">
                        {row.tutorid}
                      </span>
                    </div>
                  </td>
                  <td className="size-px whitespace-nowrap">
                    <div className="px-6 py-2">
                      <span className="inline-flex items-center gap-1.5 py-1 px-2 rounded-lg text-md font-medium text-gray-800">
                        {row.phone}
                      </span>
                    </div>
                  </td>
                  <td className="size-px whitespace-nowrap">
                    <div className="px-6 py-2">
                      <span className="inline-flex items-center gap-1.5 py-1 px-2 rounded-lg text-md font-medium text-gray-800">
                        {row.startdate}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default TutorRetrieveForm;
