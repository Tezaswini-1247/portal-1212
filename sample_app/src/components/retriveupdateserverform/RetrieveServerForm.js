import React, { useState } from 'react';
import axios from 'axios';
import './RetrieveServerForm.css';
const apiUrl = process.env.REACT_APP_API_URL;


const RetrieveServerForm = () => {
  const [serverId, setServerId] = useState('');
  const [serverData, setServerData] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setServerData(null);

    try {
      const response = await axios.get(`http://localhost:5000/api/servers/${serverId}`);
      setServerData(response.data);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setMessage('Server not found');
      } else {
        setMessage('Error retrieving server data');
      }
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="retrieve-server-container">
      <h2>Retrieve Server Details</h2>
      <form onSubmit={handleSearch} className="server-form">
        <label htmlFor="serverId">Server ID:</label>
        <input
          type="text"
          id="serverId"
          value={serverId}
          onChange={(e) => setServerId(e.target.value)}
          required
        />
        <button type="submit" className="search-button">Search</button>
      </form>
      {loading && <p className="loading">Loading...</p>}
      {message && <p className="error-message">{message}</p>}
      {serverData && (
        <div className="server-details">
          <h3>Server Details</h3>
          <p><strong>Server ID:</strong> {serverData.server_id}</p>
          <p><strong>Server Name:</strong> {serverData.server_name}</p>
          <p><strong>Active:</strong> {serverData.active ? 'Yes' : 'No'}</p>
          <p><strong>Student Name:</strong> {serverData.student_name}</p>
          <p><strong>Student Email:</strong> {serverData.student_email}</p>
        </div>
      )}
    </div>
  );
};

export default RetrieveServerForm;
