// src/components/RetrieveFormComponent.js
import React, { useState } from 'react';
import axios from 'axios';
import './retrieveformcomeng.css';
const apiUrl = process.env.REACT_APP_API_URL;


const RetrieveFormComponent = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchField, setSearchField] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [sortField, setSortField] = useState('student_name');
  const [sortOrder, setSortOrder] = useState('asc');

  const fetchStudents = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`${apiUrl}/retrieve-parents/eng`, {
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

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const sortIcon = (field) =>
    sortField === field ? (sortOrder === 'asc' ? '▲' : '▼') : '';

  const formatRetrievedDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  const sortedStudents = students.sort((a, b) => {
    if (a[sortField] < b[sortField]) return sortOrder === 'asc' ? -1 : 1;
    if (a[sortField] > b[sortField]) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <div className="retrieve-container">
      <h2>Retrieve Feedback Records ENG</h2>

      {/* Search Form */}
      <div className="retrieve-form">
        <form onSubmit={handleSearch}>
          <div className="form-group">
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
              <option value="address">Address</option>
              <option value="school_name">School/College Name</option>
              <option value="interested_online">Interested in Online Course</option>
              <option value="demo_date">Demo Date</option>
              <option value="sales_ref_name">Sales Reference Name</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="searchValue">Search Value:</label>
            <input
              type="text"
              id="searchValue"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              required
            />
          </div>

          <button className="submit-button" type="submit">Search</button>
        </form>
      </div>

      {/* Feedback */}
      {loading && <p className="loading-message">Loading...</p>}
      {error && <p className="error-message">{error}</p>}

      {/* Table */}
      {!loading && !error && students.length > 0 && (
        <table className="result-table">
          <thead>
            <tr>
              <th onClick={() => handleSort('student_name')}>Student Name {sortIcon('student_name')}</th>
              <th onClick={() => handleSort('father_details')}>Father Name & Profession {sortIcon('father_details')}</th>
              <th onClick={() => handleSort('mother_details')}>Mother Name & Profession {sortIcon('mother_details')}</th>
              <th onClick={() => handleSort('contact_number')}>Contact Number {sortIcon('contact_number')}</th>
              <th onClick={() => handleSort('address')}>Residing Address {sortIcon('address')}</th>
              <th onClick={() => handleSort('school_name')}>School/College Name {sortIcon('school_name')}</th>
              <th onClick={() => handleSort('interested_online')}>Interested in Online Course {sortIcon('interested_online')}</th>
              <th onClick={() => handleSort('demo_date')}>Demo Date {sortIcon('demo_date')}</th>
              <th onClick={() => handleSort('sales_ref_name')}>Sales Reference Name {sortIcon('sales_ref_name')}</th>
            </tr>
          </thead>
          <tbody>
            {sortedStudents.map((student) => (
              <tr key={student.id}>
                <td>{student.student_name}</td>
                <td>{student.father_details}</td>
                <td>{student.mother_details}</td>
                <td>{student.contact_number}</td>
                <td>{student.address}</td>
                <td>{student.school_name}</td>
                <td>{student.interested_online ? 'Yes' : 'No'}</td>
                <td>{formatRetrievedDate(student.demo_date)}</td>
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
