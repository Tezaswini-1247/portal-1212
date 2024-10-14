import React, { useState, useEffect } from "react";
import axios from "axios";


function RetrieveBatchLoginForm() {
  const [batches, setBatches] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [filterText, setFilterText] = useState("");
  const [sortField, setSortField] = useState("student_name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedKey, setSelectedKey] = useState("");
  const [selectedData, setSelectedData] = useState([]);

  const fetchBatches = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get("http://localhost:5000/api/batches");
      if (Array.isArray(response.data)) {
        setBatches(response.data);
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (err) {
      console.error("Error fetching batch data:", err);
      setError(`Failed to load data: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBatches();
  }, []);

  const filteredBatches = (batches || [])
  .filter((batch) => {
    if (!filterText) return false;

    return (
      batch.student_name?.toLowerCase().includes(filterText.toLowerCase()) ||
      batch.select_subject?.toLowerCase().includes(filterText.toLowerCase()) ||
      batch.batch_id?.toLowerCase().includes(filterText.toLowerCase()) ||
      batch.student_email?.toLowerCase().includes(filterText.toLowerCase()) ||
      batch.next_class_date?.toLowerCase().includes(filterText.toLowerCase())
    );
  })
  .sort((a, b) => {
    if (!sortField) return 0;

    if (a[sortField] < b[sortField]) return sortOrder === "asc" ? -1 : 1;
    if (a[sortField] > b[sortField]) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });


  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const handleDropdownChange = (e) => {
    const key = e.target.value;
    setSelectedKey(key);

    // Filter the data based on selected key
    const filteredData = batches.map((batch) => ({
      [key]: batch[key],
    }));
    setSelectedData(filteredData);
  };

  const sortIcon = (field) =>
    sortField === field ? (
      sortOrder === "asc" ? (
        // Ascending icon
        <svg
          fill="#ffffff"
          width="16"
          height="16"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 562.392 562.391"
        >
          <g>
            <g>
              <path d="M123.89,262.141h314.604c19.027,0,17.467-31.347,15.496-47.039c-0.605-4.841-3.636-11.971-6.438-15.967L303.965,16.533c-12.577-22.044-32.968-22.044-45.551,0L114.845,199.111c-2.803,3.996-5.832,11.126-6.438,15.967C106.43,230.776,104.863,262.141,123.89,262.141z" />
              <path d="M114.845,363.274l143.569,182.584c12.577,22.044,32.968,22.044,45.551,0l143.587-182.609c2.804-3.996,5.826-11.119,6.438-15.967c1.971-15.691,3.531-47.038-15.496-47.038H123.89c-19.027,0-17.46,31.365-15.483,47.062C109.019,352.147,112.042,359.277,114.845,363.274z" />
            </g>
          </g>
        </svg>
      ) : (
        // Descending icon
        <svg
          fill="#ffffff"
          width="16"
          height="16"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 562.392 562.391"
        >
          <g>
            <g>
              <path d="M123.89,262.141h314.604c19.027,0,17.467-31.347,15.496-47.039c-0.605-4.841-3.636-11.971-6.438-15.967L303.965,16.533c-12.577-22.044-32.968-22.044-45.551,0L114.845,199.111c-2.803,3.996-5.832,11.126-6.438,15.967C106.43,230.776,104.863,262.141,123.89,262.141z" />
              <path d="M114.845,363.274l143.569,182.584c12.577,22.044,32.968,22.044,45.551,0l143.587-182.609c2.804-3.996,5.826-11.119,6.438-15.967c1.971-15.691,3.531-47.038-15.496-47.038H123.89c-19.027,0-17.46,31.365-15.483,47.062C109.019,352.147,112.042,359.277,114.845,363.274z" />
            </g>
          </g>
        </svg>
      )
    ) : null;

  const formatRetrievedDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };
  return (
    <>
      <div class="relative overflow-hidden">
        <div class="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-10">
          <div class="text-center">
            <h1 class="text-3xl sm:text-5xl lg:text-4xl font-bold text-gray-800">
              Retrieve Batch Details
            </h1>

            <div class="mt-7 sm:mt-12 mx-auto max-w-xl relative">
              <div class="relative z-10 flex gap-x-3 p-3 bg-white border rounded-lg shadow-lg shadow-gray-100">
                <div class="w-full flex gap-[20px]">
                  <label
                    for="hs-search-article-1"
                    class="block text-sm text-gray-700 font-medium"
                  ></label>
                  <select
                    class="border border-grey border-2 py-2.5 px-4 block w-1/2 border-transparent rounded-lg"
                    id="dataKey"
                    onChange={handleDropdownChange}
                  >
                    <option value="">--Select Field--</option>
                    {batches.length > 0 &&
                      Object.keys(batches[0]).map((key, index) => (
                        <option key={index} value={key}>
                          {key.toLowerCase()}
                        </option>
                      ))}
                  </select>
                  <input
                    type="email"
                    name="hs-search-article-1"
                    id="hs-search-article-1"
                    class="border border-grey border-2 py-2.5 px-4 block w-1/2 border-transparent rounded-lg"
                    placeholder="Search by any feild"
                    value={filterText}
                    onChange={(e) => setFilterText(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container_fluid">
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {!loading && !error && filteredBatches.length > 0 && (
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  class="px-6 py-3 text-center"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleSort("student_name")}
                >
                  Student Name {sortIcon("student_name")}
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-center"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleSort("subject_name")}
                >
                  Subject Name {sortIcon("student_name")}
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-center"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleSort("batch_id")}
                >
                  Batch ID {sortIcon("batch_id")}
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-center"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleSort("student_email")}
                >
                  Student Email {sortIcon("student_email")}
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-center"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleSort("next_class_date")}
                >
                  Next class date {sortIcon("next_class_date")}
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              {filteredBatches.map((batch, index) => (
                <tr class="bg-white hover:bg-gray-50" key={index}>
                  <td class="size-px whitespace-nowrap">
                    <a class="block relative z-10">
                      <div class="px-6 py-2">
                        <span class="inline-flex items-center gap-1.5 py-1 px-2 rounded-lg text-md font-medium text-gray-800">
                          {batch.student_name}
                        </span>
                      </div>
                    </a>
                  </td>
                  <td class="size-px whitespace-nowrap">
                    <a class="block relative z-10">
                      <div class="px-6 py-2">
                        <span class="inline-flex items-center gap-1.5 py-1 px-2 rounded-lg text-md font-medium text-gray-800">
                          {batch.batch_id}
                        </span>
                      </div>
                    </a>
                  </td>
                  <td class="size-px whitespace-nowrap">
                    <a class="block relative z-10">
                      <div class="px-6 py-2">
                        <span class="inline-flex items-center gap-1.5 py-1 px-2 rounded-lg text-md font-medium text-gray-800">
                          {batch.select_subject}
                        </span>
                      </div>
                    </a>
                  </td>
                  <td class="size-px whitespace-nowrap">
                    <a class="block relative z-10">
                      <div class="px-6 py-2">
                        <span class="inline-flex items-center gap-1.5 py-1 px-2 rounded-lg text-md font-medium text-gray-800">
                          {batch.student_email}
                        </span>
                      </div>
                    </a>
                  </td>
                  <td class="size-px whitespace-nowrap">
                    <a class="block relative z-10">
                      <div class="px-6 py-2">
                        <span class="inline-flex items-center gap-1.5 py-1 px-2 rounded-lg text-md font-medium text-gray-800">
                          {formatRetrievedDate(batch.next_class_date)}
                        </span>
                      </div>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      {filteredBatches.length === 0 && !loading && selectedKey && filterText &&(
       <div class="p-4 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-neutral-900 dark:border-neutral-800">
       <div class="flex justify-between items-center gap-x-5 sm:gap-x-10">
         <div class="grow">
           <h2 class="text-sm text-gray-600 dark:text-neutral-400 text-center">
             No matching records found
               </h2>
         </div>
       </div>
       </div>
      )}
      </div>
    </>
  );
}

export default RetrieveBatchLoginForm; // Fixed export
