// src/components/RetrieveBusinessOpportunity.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RetrieveBusinessOpportunity.css';
const apiUrl = process.env.REACT_APP_API_URL;


const RetrieveBusinessOpportunity = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchField, setSearchField] = useState('');
  const [searchValue, setSearchValue] = useState('');

  // Function to fetch business opportunities based on search parameters
  const fetchOpportunities = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get('http://localhost:5000/api/business-opportunities', {
        params: { searchField, searchValue }
      });
      setOpportunities(response.data);
    } catch (err) {
      console.error('Error fetching business opportunities:', err);
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchOpportunities();
  };

  return (
    <div className="retrieve-container">
      <h2 className="title">Business Opportunity Records</h2>

      {/* Search form aligned horizontally */}
      <div className="search-form">
        <form onSubmit={handleSearch} className="search-form-container">
          <div className="form-field">
            <label htmlFor="searchField">Search Field:</label>
            <select
              id="searchField"
              value={searchField}
              onChange={(e) => setSearchField(e.target.value)}
              required
            >
              <option value="">Select a field</option>
              <option value="person_name">Name</option>
              <option value="email">Email</option>
              <option value="phone_number">Phone Number</option>
              <option value="address">Address</option>
              <option value="agreed_incentive">Agreed Incentive</option>
              <option value="leads_generated">Leads Generated</option>
              <option value="total_incentive_on_date">Total Incentive on Date</option>
              <option value="total_incentive_so_far">Total Incentive So Far</option>
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

          {/* Button */}
          <button type="submit" className="search-button">Search</button>
        </form>
      </div>

      {/* Loading and error messages */}
      {loading && <p className="loading-text">Loading...</p>}
      {error && <p className="error-text">{error}</p>}

      {/* Table to display opportunities */}
      {!loading && !error && opportunities.length > 0 && (
        <table className="opportunities-table">
          <thead>
            <tr>
              <th>Name of the Person</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Address</th>
              <th>Agreed Incentive</th>
              <th>Leads Generated as on Date</th>
              <th>Total Incentive on Date</th>
              <th>Total Incentive So Far</th>
            </tr>
          </thead>
          <tbody>
            {opportunities.map((opportunity) => (
              <tr key={opportunity.id}>
                <td>{opportunity.person_name}</td>
                <td>{opportunity.email}</td>
                <td>{opportunity.phone_number}</td>
                <td>{opportunity.address}</td>
                <td>{opportunity.agreed_incentive}</td>
                <td>{opportunity.leads_generated}</td>
                <td>{opportunity.total_incentive_on_date}</td>
                <td>{opportunity.total_incentive_so_far}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default RetrieveBusinessOpportunity;
