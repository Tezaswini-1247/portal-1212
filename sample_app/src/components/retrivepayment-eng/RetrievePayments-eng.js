import React, { useState } from 'react';
import axios from 'axios';
import './RetrievePayments-eng.css'; // Import the CSS file here
const apiUrl = process.env.REACT_APP_API_URL;

const RetrievePaymentseng = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchField, setSearchField] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [editingIndex, setEditingIndex] = useState(null); // Track which row is being edited
  const [editedPayment, setEditedPayment] = useState({}); // Store edited values

  const fetchPayments = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`${apiUrl}/retrieve-payments/eng`, {
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

  const handleEdit = (index) => {
    console.log("Editing row:", index); // Debugging message
    setEditingIndex(index);
    setEditedPayment(payments[index]); // Set the selected row data for editing
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setEditedPayment({});
  };

  const handleInputChange = (field, value) => {
    setEditedPayment((prev) => ({ ...prev, [field]: value })); // Update edited field value
  };

  const handleSave = async (index) => {
    try {
      const updatedPayment = editedPayment;
      // Save to the backend (assumes an API endpoint for saving)
      await axios.put(`${apiUrl}/update-payment/eng/${updatedPayment.id}`, updatedPayment);
      // Update the payment data in state
      setPayments((prevPayments) =>
        prevPayments.map((payment, i) => (i === index ? updatedPayment : payment))
      );
      setEditingIndex(null);
      setEditedPayment({});
    } catch (err) {
      console.error('Error saving payment:', err);
      setError('Failed to save data');
    }
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
              <option value="paid_till_now">Paid Till Now</option>
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
              <th>Paid Till Now</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <tr key={payment.id}>
                <td>{index + 1}</td>
                <td>
                  {editingIndex === index ? (
                    <input
                      type="text"
                      value={editedPayment.student_name}
                      onChange={(e) => handleInputChange('student_name', e.target.value)}
                    />
                  ) : (
                    payment.student_name
                  )}
                </td>
                <td>
                  {editingIndex === index ? (
                    <input
                      type="text"
                      value={editedPayment.phone_number}
                      onChange={(e) => handleInputChange('phone_number', e.target.value)}
                    />
                  ) : (
                    payment.phone_number
                  )}
                </td>
                <td>
                  {editingIndex === index ? (
                    <input
                      type="text"
                      value={editedPayment.payment_type}
                      onChange={(e) => handleInputChange('payment_type', e.target.value)}
                    />
                  ) : (
                    payment.payment_type
                  )}
                </td>
                <td>
                  {editingIndex === index ? (
                    <input
                      type="number"
                      value={editedPayment.installments_required}
                      onChange={(e) => handleInputChange('installments_required', e.target.value)}
                    />
                  ) : (
                    payment.installments_required
                  )}
                </td>
                <td>
                  {editingIndex === index ? (
                    <input
                      type="number"
                      value={editedPayment.installments_done}
                      onChange={(e) => handleInputChange('installments_done', e.target.value)}
                    />
                  ) : (
                    payment.installments_done
                  )}
                </td>
                <td>
                  {editingIndex === index ? (
                    <input
                      type="number"
                      value={editedPayment.paid_till_now}
                      onChange={(e) => handleInputChange('paid_till_now', e.target.value)}
                    />
                  ) : (
                    payment.paid_till_now
                  )}
                </td>
                <td>
                  {editingIndex === index ? (
                    <>
                      <button onClick={() => handleSave(index)}>Save</button>
                      <button onClick={handleCancel}>Cancel</button>
                    </>
                  ) : (
                    <button onClick={() => handleEdit(index)}>Edit</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default RetrievePaymentseng;
