import React, { useState } from 'react';
import axios from 'axios';
import './RetrievePayments.css'; // Import the CSS file here
const apiUrl = process.env.REACT_APP_API_URL;


const RetrievePayments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchField, setSearchField] = useState('');
  const [searchValue, setSearchValue] = useState('');

  const fetchPayments = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get('http://localhost:5000/retrieve-payments/school', {
        params: { field: searchField, value: searchValue },
      });
      setPayments(response.data);
    } catch (err) {
      console.error('Error fetching payments:', err);
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchPayments();
  };

  const handleBack = () => {
    // Go back to the previous page
    window.history.back();
  };

  return (
    <div className="retrieve-container">
      <h2>Retrieve Payment Records</h2>
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
              <option value="phone_number">Phone Number</option>
              <option value="payment_type">Payment Type</option>
              <option value="installments_required">Installments Required</option>
              <option value="installments_done">Installments Done</option>
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
          <button type="submit">Search</button>
          
        </form>
      </div>
      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && payments.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Student Name</th>
              <th>Phone Number</th>
              <th>Payment Type</th>
              <th>Installments Required</th>
              <th>Installments Done</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <tr key={payment.id}>
                <td>{index+1}</td>
                <td>{payment.student_name}</td>
                <td>{payment.phone_number}</td>
                <td>{payment.payment_type}</td>
                <td>{payment.installments_required}</td>
                <td>{payment.installments_done}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default RetrievePayments;
