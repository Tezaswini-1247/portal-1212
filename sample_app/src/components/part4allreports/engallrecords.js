import React, { useState } from 'react';
import axios from 'axios';
import './engallcss.css'; // Make sure to include the CSS file
const apiUrl = process.env.REACT_APP_API_URL;

const FollowupsAllFormeng = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState(null);

  const fetchData = async (url) => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(url);
      setData(response.data);
    } catch (err) {
      setError('Error retrieving data');
    } finally {
      setLoading(false);
    }
  };

  const retrieveAllFollowupsData = () => {
    fetchData(`${apiUrl}/api/all/followups/school/eng`);
  };

  const retrieveallPaymentsData = () => {
    fetchData(`${apiUrl}/api/all/payments/school/eng`);
  };
  
  

  const renderTableData = () => {
    if (Array.isArray(data)) {
      return (
        <table className="result-table">
          <thead>
            <tr>
              {Object.keys(data[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                {Object.values(item).map((value, idx) => (
                  <td key={idx}>
                    {typeof value === 'object' ? JSON.stringify(value) : value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      );
    } else if (typeof data === 'object') {
      return (
        <table className="result-table">
          <thead>
            <tr>
              {Object.keys(data).map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {Object.values(data).map((value, idx) => (
                <td key={idx}>
                  {typeof value === 'object' ? JSON.stringify(value) : value}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      );
    }
  };

  return (
    <div>
      <div className="retrieve-container">
        <h2 className="header">Retrieve Data</h2>

        <div className="retrieve-buttons">
          <button className="custom-button" onClick={retrieveAllFollowupsData}>
            Followups Records
          </button>
          <button className="custom-button" onClick={retrieveallPaymentsData}>
            Payments Records
          </button>
        </div>

        {loading && <div className="loading-message">Loading...</div>}
        {error && <div className="error-message">{error}</div>}
      </div>

      {/* Render the table data outside the card */}
      <div className="data-table-container">
        {data && renderTableData()}
      </div>
    </div>
  );
};

export default FollowupsAllFormeng;
