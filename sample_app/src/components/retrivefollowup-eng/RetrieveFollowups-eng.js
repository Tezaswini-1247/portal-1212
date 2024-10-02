// src/components/RetrieveFollowups.js
import React, { useState } from 'react';
import axios from 'axios';
import './RetrieveFollowups.css';
const apiUrl = process.env.REACT_APP_API_URL;

const RetrieveFollowups = () => {
  const [followups, setFollowups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchField, setSearchField] = useState('');
  const [searchValue, setSearchValue] = useState('');

  const fetchFollowups = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`${apiUrl}/retrieve-followups/eng`, {
        params: { field: searchField, value: searchValue },
      });
      setFollowups(response.data);
    } catch (err) {
      console.error('Error fetching follow-ups:', err);
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchFollowups();
  };

  return (
    <div className="retrieve-container">
      <h2>Retrieve Calling Follow-up Records (ENG)</h2>
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
              <option value="college_name">College/School Name</option>
              <option value="phone_number">Phone Number</option>
              <option value="followup_number">Follow-up Number</option>
              <option value="description">Description</option>
              <option value="acceptance_percentage">Acceptance Percentage</option>
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
          <button type="submit" className="btn-search">Search</button>
        </form>
      </div>
      {loading && <p className="loading-message">Loading...</p>}
      {error && <p className="error-message">{error}</p>}
      {!loading && !error && followups.length > 0 && (
        <table className="result-table">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>College/School Name</th>
              <th>Phone Number</th>
              <th>Follow-up Number</th>
              <th>Description</th>
              <th>Acceptance Percentage</th>
            </tr>
          </thead>
          <tbody>
            {followups.map((followup) => (
              <tr key={followup.id}>
                <td>{followup.student_name}</td>
                <td>{followup.college_name}</td>
                <td>{followup.phone_number}</td>
                <td>{followup.followup_number}</td>
                <td>{followup.description}</td>
                <td>{followup.acceptance_percentage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default RetrieveFollowups;
