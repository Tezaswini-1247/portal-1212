import React, { useState, useEffect } from "react";
import axios from "axios";
// import "./retrivestudentloginform.css";
const apiUrl = process.env.REACT_APP_API_URL;


function RetrieveStudentForm() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [filterText, setFilterText] = useState("");
  const [sortField, setSortField] = useState("student_name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedKey, setSelectedKey] = useState("");
  const [selectedData, setSelectedData] = useState([]);

  const fetchStudents = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(`${apiUrl}/api/students`);
      setStudents(response.data.data);
    } catch (err) {
      console.error("Error fetching student data:", err);
      setError("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const filteredStudents = students
  .filter((student) => {

    if (!filterText) return false;

    const presentAbsentText = student.present_absent ? "Present" : "Absent";
    

    return (
      student.student_name.toLowerCase().includes(filterText.toLowerCase()) ||
      student.batch_id.toLowerCase().includes(filterText.toLowerCase()) ||
      student.location.toLowerCase().includes(filterText.toLowerCase()) ||
      student.country.toLowerCase().includes(filterText.toLowerCase()) ||
      student.tutor_name.toLowerCase().includes(filterText.toLowerCase()) ||
      student.date.toLowerCase().includes(filterText.toLowerCase()) ||
      student.class_date.toLowerCase().includes(filterText.toLowerCase()) ||
      presentAbsentText.toLowerCase().includes(filterText.toLowerCase())
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
    const filteredData = students.filter(student => student[key].toLowerCase().includes(filterText.toLowerCase()));

    setSelectedData(filteredData);
  };

  const sortIcon = (field) =>
    sortField === field ? (
      sortOrder === "asc" ? (
        <svg
          fill="#ffffff"
          width="16"
          height="16"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 562.392 562.391"
        >
          <g>
            <g>
              <path
                d="M123.89,262.141h314.604c19.027,0,17.467-31.347,15.496-47.039c-0.605-4.841-3.636-11.971-6.438-15.967L303.965,16.533
                  c-12.577-22.044-32.968-22.044-45.551,0L114.845,199.111c-2.803,3.996-5.832,11.126-6.438,15.967
                  C106.43,230.776,104.863,262.141,123.89,262.141z"
              />
              <path
                d="M114.845,363.274l143.569,182.584c12.577,22.044,32.968,22.044,45.551,0l143.587-182.609
                  c2.804-3.996,5.826-11.119,6.438-15.967c1.971-15.691,3.531-47.038-15.496-47.038H123.89c-19.027,0-17.46,31.365-15.483,47.062
                  C109.019,352.147,112.042,359.277,114.845,363.274z"
              />
            </g>
          </g>
        </svg>
      ) : (
        <svg
          fill="#ffffff"
          width="16"
          height="16"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 562.392 562.391"
        >
          <g>
            <g>
              <path
                d="M123.89,262.141h314.604c19.027,0,17.467-31.347,15.496-47.039c-0.605-4.841-3.636-11.971-6.438-15.967L303.965,16.533
                  c-12.577-22.044-32.968-22.044-45.551,0L114.845,199.111c-2.803,3.996-5.832,11.126-6.438,15.967
                  C106.43,230.776,104.863,262.141,123.89,262.141z"
              />
              <path
                d="M114.845,363.274l143.569,182.584c12.577,22.044,32.968,22.044,45.551,0l143.587-182.609
                  c2.804-3.996,5.826-11.119,6.438-15.967c1.971-15.691,3.531-47.038-15.496-47.038H123.89c-19.027,0-17.46,31.365-15.483,47.062
                  C109.019,352.147,112.042,359.277,114.845,363.274z"
              />
            </g>
          </g>
        </svg>
      )
    ) : null;

    const formatRetrievedDate = (dateString) => {
      const date = new Date(dateString);
      return date.toISOString().split('T')[0]; 
    }; 
  return (
    <div className="">

      <div class="relative overflow-hidden">
        <div class="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-10">
          <div class="text-center">
            <h1 class="text-3xl sm:text-5xl lg:text-4xl font-bold text-gray-800">
              Student Attendance Records
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
                    {students.length > 0 &&
                      Object.keys(students[0]).map((key, index) => (
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

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && filteredStudents.length > 0 && (
        // Conditionally apply d-block or d-none
        <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th scope="col"
              class="px-6 py-3 text-center"
              style={{ cursor: "pointer" ,textWrap:'nowrap'}}>S.No</th>
            <th
              scope="col"
              class="px-6 py-3 text-center"
              style={{ cursor: "pointer" ,textWrap:'nowrap'}}
              onClick={() => handleSort("student_name")}
            >
              Student Name {sortIcon("student_name")}
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-center"
              style={{ cursor: "pointer" ,textWrap:'nowrap'}}
              onClick={() => handleSort("batch_id")}
            >
              Batch ID {sortIcon("batch_id")}
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-center"
              style={{ cursor: "pointer" ,textWrap:'nowrap'}}
              onClick={() => handleSort("location")}
            >
              Location {sortIcon("location")}
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-center"
              style={{ cursor: "pointer" ,textWrap:'nowrap'}}
              onClick={() => handleSort("country")}
            >
              Country {sortIcon("country")}
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-center"
              style={{ cursor: "pointer" ,textWrap:'nowrap'}}
              onClick={() => handleSort("present_absent")}
            >
              Present/Absent {sortIcon("present_absent")}
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-center"
              style={{ cursor: "pointer" ,textWrap:'nowrap'}}
              onClick={() => handleSort("tutor_name")}
            >
              Tutor Name {sortIcon("tutor_name")}
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-center"
              style={{ cursor: "pointer" ,textWrap:'nowrap'}}
              onClick={() => handleSort("date")}
            >
              Date {sortIcon("date")}
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-center"
              style={{ cursor: "pointer" ,textWrap:'nowrap'}}
              onClick={() => handleSort("class_date")}
            >
              Class Date {sortIcon("class_date")}
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          {filteredStudents.map((student, index) => (
            <tr class="bg-white hover:bg-gray-50" key={index}>
              <td class="size-px whitespace-nowrap">{index+1}</td>
              <td class="size-px whitespace-nowrap">
                <a class="block relative z-10">
                  <div class="px-6 py-2">
                    <span class="inline-flex items-center gap-1.5 py-1 px-2 rounded-lg text-md font-medium text-gray-800">
                      {student.student_name}
                    </span>
                  </div>
                </a>
              </td>
              <td class="size-px whitespace-nowrap">
                <a class="block relative z-10">
                  <div class="px-6 py-2">
                    <span class="inline-flex items-center gap-1.5 py-1 px-2 rounded-lg text-md font-medium text-gray-800">
                      {student.batch_id}
                    </span>
                  </div>
                </a>
              </td>
              <td class="size-px whitespace-nowrap">
                <a class="block relative z-10">
                  <div class="px-6 py-2">
                    <span class="inline-flex items-center gap-1.5 py-1 px-2 rounded-lg text-md font-medium text-gray-800">
                      {student.location}
                    </span>
                  </div>
                </a>
              </td>
              <td class="size-px whitespace-nowrap">
                <a class="block relative z-10">
                  <div class="px-6 py-2">
                    <span class="inline-flex items-center gap-1.5 py-1 px-2 rounded-lg text-md font-medium text-gray-800">
                      {student.country}
                    </span>
                  </div>
                </a>
              </td>
              <td class="size-px whitespace-nowrap">
                <a class="block relative z-10">
                  <div class="px-6 py-2">
                    <span class="inline-flex items-center gap-1.5 py-1 px-2 rounded-lg text-md font-medium text-gray-800">
                      {student.present_absent
                        ? "Present"
                        : "Absent"}
                    </span>
                  </div>
                </a>
              </td>
              <td class="size-px whitespace-nowrap">
                <a class="block relative z-10">
                  <div class="px-6 py-2">
                    <span class="inline-flex items-center gap-1.5 py-1 px-2 rounded-lg text-md font-medium text-gray-800">
                      {student.tutor_name}
                    </span>
                  </div>
                </a>
              </td>
              <td class="size-px whitespace-nowrap">
                <a class="block relative z-10">
                  <div class="px-6 py-2">
                    <span class="inline-flex items-center gap-1.5 py-1 px-2 rounded-lg text-md font-medium text-gray-800">
                      {formatRetrievedDate(student.date)}
                    </span>
                  </div>
                </a>
              </td>
              <td class="size-px whitespace-nowrap">
                <a class="block relative z-10">
                  <div class="px-6 py-2">
                    <span class="inline-flex items-center gap-1.5 py-1 px-2 rounded-lg text-md font-medium text-gray-800">
                      {formatRetrievedDate(student.class_date)}
                    </span>
                  </div>
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      )}
      {filteredStudents.length === 0 && !loading && selectedKey && filterText &&(
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
  );
}

export default RetrieveStudentForm;
