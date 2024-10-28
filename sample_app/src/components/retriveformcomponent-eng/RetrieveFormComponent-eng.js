import React, { useState } from 'react';
import axios from 'axios';
import './retrieveformcomeng.css'; // Ensure this file exists for styling
const apiUrl = process.env.REACT_APP_API_URL;

const RetrieveFormComponent = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchField, setSearchField] = useState('');
  const [searchValue, setSearchValue] = useState('');

  // Fetch student data based on search parameters
  const fetchStudents = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get('http://localhost:5000/retrieve/feedback/eng', {
        params: { field: searchField, value: searchValue }
      });
      setStudents(response.data);
    } catch (err) {
      console.error('Error fetching students:', err);
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchStudents();
  };

  return (
    <div className="retrieve-container">
      <h2>Retrieve Feedback Records</h2>
      <div className="search-form">
        <form onSubmit={handleSearch}>
          <div className="form-field">
            <label htmlFor="searchField">Search Field:</label>
            <select
              id="searchField"
              value={searchField}
              onChange={(e) => setSearchField(e.target.value)}
              required
            >
              <option value="">Select a field</option>
              <option value="student_name">Student Name</option>
              <option value="father_details">Father Name & Profession</option>
              <option value="mother_details">Mother Name & Profession</option>
              <option value="contact_number">Contact Number</option>
              <option value="student_mobile">Student Mobile</option> {/* New field */}
              <option value="address">Address</option>
              <option value="school_name">College Name</option>
              <option value="course_name">Course Name</option> {/* New field */}
              <option value="course_year">Course Year</option> {/* New field */}
              <option value="interested_for">Interested in Courses</option> {/* New field */}
              <option value="payment_mode">Payment Mode</option> {/* New field */}
              <option value="interested_online">Interested in Online Course</option>
              <option value="demo_date">Demo Date</option>
              <option value="sales_ref_name">Sales Reference Name</option>
            </select>
          </div>
          <div className="form-field">
            <label htmlFor="searchValue">Search Value:</label>
            <input
              type="text"
              id="searchValue"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              required
            />
          </div>
          <div className="button-group">
            <button type="submit" className="action-button">Search</button>
          </div>
        </form>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="error-message">{error}</p>}

      {!loading && !error && students.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Name of the Student</th>
              <th>Father Name & Profession</th>
              <th>Mother Name & Profession</th>
              <th>Contact Number</th>
              <th>Student Mobile</th> {/* New column */}
              <th>Residing Address</th>
              <th>School/College Name</th>
              <th>Course Name</th> {/* New column */}
              <th>Course Year</th> {/* New column */}
              <th>Interested in Online Course</th>
              <th>Interested in Courses</th> {/* New column */}
              <th>Payment Mode</th> {/* New column */}
              <th>Demo Date</th>
              <th>Sales Reference Name</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>{student.student_name}</td>
                <td>{student.father_details}</td>
                <td>{student.mother_details}</td>
                <td>{student.contact_number}</td>
                <td>{student.student_mobile}</td> {/* New data */}
                <td>{student.address}</td>
                <td>{student.school_name}</td>
                <td>{student.course_name}</td> {/* New data */}
                <td>{student.course_year}</td> {/* New data */}
                <td>{student.interested_online ? 'Yes' : 'No'}</td>
                <td>{student.interested_for}</td> {/* New data */}
                <td>{student.payment_mode}</td> {/* New data */}
                <td>{student.demo_date}</td>
                <td>{student.sales_ref_name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default RetrieveFormComponent;
