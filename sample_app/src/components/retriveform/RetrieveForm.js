import React, { useState } from 'react';
import axios from 'axios';
import './RetrieveForm.css';
const apiUrl = process.env.REACT_APP_API_URL;


const RetrieveForm = () => {
  const [searchField, setSearchField] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [data, setData] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setData([]);

    try {
      const response = await axios.get(`${apiUrl}/api/institutions/retrieve`, {
        params: { searchField, searchValue }
      });

      if (response.data.length === 0) {
        setMessage('No matching records found');
      } else {
        setData(response.data);
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setMessage('No matching records found');
      } else {
        setMessage('Error retrieving data');
      }
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="retrieve-container">
      <h2>Retrieve Sales Feedback Data</h2>
      <form onSubmit={handleSearch} className="retrieve-form">
        <label htmlFor="searchField">Search Field:</label>
        <select
          id="searchField"
          value={searchField}
          onChange={(e) => setSearchField(e.target.value)}
          required
        >
          <option value="">Select a field</option>
          <option value="institution_name">Institution Name</option>
          <option value="contact_person">Contact Person</option>
          <option value="phone_number">Phone Number</option>
          <option value="email">Email</option>
          <option value="city">City</option>
          <option value="state">State</option>
          <option value="number_of_students">Number of Students</option>
          <option value="response">Response</option>
        </select>

        <label htmlFor="searchValue">Search Value:</label>
        <input
          type="text"
          id="searchValue"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          required
        />

        <button type="submit" className="submit-button">Search</button>
      </form>

      {loading && <p className="loading-message">Loading...</p>}
      {message && <p className="error-message">{message}</p>}
      {data.length > 0 && (
        <table className="result-table">
          <thead>
            <tr>
              <th>Institution Name</th>
              <th>Contact Person</th>
              <th>Phone Number</th>
              <th>Email</th>
              <th>City</th>
              <th>State</th>
              <th>Number of Students</th>
              <th>Response</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.institution_name}</td>
                <td>{item.contact_person}</td>
                <td>{item.phone_number}</td>
                <td>{item.email}</td>
                <td>{item.city}</td>
                <td>{item.state}</td>
                <td>{item.number_of_students}</td>
                <td>{item.response}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
};

export default RetrieveForm;
