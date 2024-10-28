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
  const [editingIndex, setEditingIndex] = useState(null);
  const [visibleDescriptions, setVisibleDescriptions] = useState(1);

  const fetchFollowups = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get('http://localhost:5000/retrieve-followups', {
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

  const handleEdit = (index) => {
    setEditingIndex(index);
    const followup = followups[index];
    let descriptionCount = 1;
    for (let i = 2; i <= 10; i++) {
      if (followup[`description_${i}`]) descriptionCount++;
    }
    setVisibleDescriptions(descriptionCount);
  };

  const handleAddDescription = () => {
    if (visibleDescriptions < 10) {
      setVisibleDescriptions(visibleDescriptions + 1);
    }
  };

  const handleSave = async (index, followup) => {
    const updatedFollowup = {
      ...followup,
      ...Array.from({ length: visibleDescriptions }).reduce((acc, _, i) => {
        acc[`description_${i + 1}`] = followup[`description_${i + 1}`] || '';
        return acc;
      }, {}),
    };
  
    try {
      // Use backticks for template literals to interpolate followup.id correctly
      const response = await axios.put(`http://localhost:5000/update/followups/${followup.id}`, updatedFollowup);
      setFollowups((prevFollowups) =>
        prevFollowups.map((f, i) => (i === index ? response.data : f))
      );
      setEditingIndex(null);
    } catch (err) {
      console.error('Error saving follow-up:', err.response ? err.response.data : err.message);
      setError('Failed to save data: ' + (err.response ? err.response.data.error : err.message));
    }
  };
  

  const handleInputChange = (index, field, value) => {
    setFollowups((prevFollowups) =>
      prevFollowups.map((f, i) => (i === index ? { ...f, [field]: value } : f))
    );
  };

  return (
    <div className="retrieve-container">
      <h2>Retrieve Calling Follow-up Records</h2>
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
              <option value="followup_by">Followup By</option>
              <option value="start_date">Date of Starting Followup</option>
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
              type={searchField === 'start_date' ? 'date' : 'text'}  // Use date input for start_date
              id="searchValue"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="action-button">Search</button>
        </form>
      </div>

      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && followups.length > 0 && (
        <table className="followup-table">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Followup By</th>
              <th>Date of Starting Followup</th>
              <th>College/School Name</th>
              <th>Phone Number</th>
              <th>Follow-up Number</th>
              {Array.from({ length: visibleDescriptions }, (_, i) => (
                <th key={i}>Description {i + 1}</th>
              ))}
              <th>Acceptance Percentage</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {followups.map((followup, index) => (
              <tr key={followup.id}>
                <td>{followup.student_name}</td>
                <td>{followup.followup_by}</td>
                <td>
                  {editingIndex === index ? (
                    <input
                      type="date"
                      value={followup.start_date}  // Assuming start_date is in 'YYYY-MM-DD' format
                      onChange={(e) => handleInputChange(index, 'start_date', e.target.value)}
                    />
                  ) : (
                    followup.start_date
                  )}
                </td>
                <td>{followup.college_name}</td>
                <td>{followup.phone_number}</td>

                {/* Editable Follow-up Number */}
                <td>
                  {editingIndex === index ? (
                    <input
                      type="number"
                      value={followup.followup_number}
                      onChange={(e) => handleInputChange(index, 'followup_number', e.target.value)}
                    />
                  ) : (
                    followup.followup_number
                  )}
                </td>

                {Array.from({ length: visibleDescriptions }, (_, i) => (
                  <td key={i}>
                    {editingIndex === index ? (
                      <input
                        type="text"
                        value={followup[`description_${i + 1}`] || ''}
                        onChange={(e) => handleInputChange(index, `description_${i + 1}`, e.target.value)}
                      />
                    ) : (
                      followup[`description_${i + 1}`] || ''
                    )}
                  </td>
                ))}

                {/* Editable Acceptance Percentage */}
                <td>
                  {editingIndex === index ? (
                    <input
                      type="number"
                      value={followup.acceptance_percentage}
                      onChange={(e) => handleInputChange(index, 'acceptance_percentage', e.target.value)}
                    />
                  ) : (
                    followup.acceptance_percentage
                  )}
                </td>

                <td>
                  {editingIndex === index ? (
                    <>
                      <button onClick={() => handleSave(index, followup)} className="action-button">Save</button>
                      {visibleDescriptions < 10 && (
                        <button onClick={handleAddDescription} className="action-button">Add Description</button>
                      )}
                    </>
                  ) : (
                    <button onClick={() => handleEdit(index)} className="action-button">Edit</button>
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

export default RetrieveFollowups;
