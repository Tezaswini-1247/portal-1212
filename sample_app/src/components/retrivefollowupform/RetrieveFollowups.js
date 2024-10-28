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
    for (let i = 1; i <= 10; i++) {
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
    try {
      const updatedFollowup = {
        id: followup.id,
        student_name: followup.student_name,
        parent_name: followup.parent_name,
        email: followup.email,
        phone_number: followup.phone_number,
        college_name: followup.college_name,
        sales_reference_name: followup.sales_reference_name,
        start_date: followup.start_date,
      };

      for (let i = 1; i <= visibleDescriptions; i++) {
        updatedFollowup[`description_${i}`] = followup[`description_${i}`] || '';
      }

      const response = await axios.put(`http://localhost:5000/update/followups/${followup.id}`, updatedFollowup);
      setFollowups((prev) => prev.map((f, i) => (i === index ? response.data : f)));
      setEditingIndex(null);
    } catch (err) {
      setError(`Error saving follow-up: ${err.response ? err.response.data.error : err.message}`);
    }
  };

  const handleInputChange = (index, field, value) => {
    setFollowups((prevFollowups) =>
      prevFollowups.map((f, i) => (i === index ? { ...f, [field]: value } : f))
    );
  };

  return (
    <>
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
                <option value="parent_name">Parent Name</option>
                <option value="email">Email</option>
                <option value="phone_number">Phone Number</option>
                <option value="college_name">College/School Name</option>
                <option value="sales_reference_name">Sales Reference Name</option>
                <option value="start_date">Date of Starting Followup</option>
              </select>
            </div>
            <div className="form-field">
              <label htmlFor="searchValue">Search Value:</label>
              <input
                type={searchField === 'start_date' ? 'date' : 'text'}
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
      </div>

      {/* Moved the table outside of the retrieve-container */}
      {!loading && !error && followups.length > 0 && (
        <div className="followup-table-container">
          <table className="followup-table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Student Name</th>
                <th>Parent Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>College/School Name</th>
                <th>Sales Reference Name</th>
                <th>Date of demo</th>
                {Array.from({ length: visibleDescriptions }, (_, i) => (
                  <th key={i}>Followup {i + 1}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {followups.map((followup, index) => (
                <tr key={followup.id}>
                  <td>{index + 1}</td>
                  <td>
                  {editingIndex === index ? (
                    <input
                      type="text"
                      value={followup.student_name}  // Assuming start_date is in 'YYYY-MM-DD' format
                      onChange={(e) => handleInputChange(index, 'student_name', e.target.value)}
                    />
                  ) : (
                    followup.student_name
                  )}
                  </td>
                  <td>
                  {editingIndex === index ? (
                    <input
                      type="text"
                      value={followup.parent_name}  // Assuming start_date is in 'YYYY-MM-DD' format
                      onChange={(e) => handleInputChange(index, 'parent_name', e.target.value)}
                    />
                  ) : (
                    followup.parent_name
                  )}
                  </td>
                  <td>
                  {editingIndex === index ? (
                    <input
                      type="email"
                      value={followup.student_name}  // Assuming start_date is in 'YYYY-MM-DD' format
                      onChange={(e) => handleInputChange(index, 'email', e.target.value)}
                    />
                  ) : (
                    followup.email
                  )}
                  </td>
                  <td>
                  {editingIndex === index ? (
                    <input
                      type="number"
                      value={followup.phone_number}  // Assuming start_date is in 'YYYY-MM-DD' format
                      onChange={(e) => handleInputChange(index, 'phone_number', e.target.value)}
                    />
                  ) : (
                    followup.phone_number
                  )}
                  </td>
                  <td>
                  {editingIndex === index ? (
                    <input
                      type="text"
                      value={followup.college_name_name}  // Assuming start_date is in 'YYYY-MM-DD' format
                      onChange={(e) => handleInputChange(index, 'college_name', e.target.value)}
                    />
                  ) : (
                    followup.college_name
                  )}
                  </td>
                  <td>
                  {editingIndex === index ? (
                    <input
                      type="text"
                      value={followup.sales_reference_name}  // Assuming start_date is in 'YYYY-MM-DD' format
                      onChange={(e) => handleInputChange(index, 'sales_reference_name', e.target.value)}
                    />
                  ) : (
                    followup.sales_reference_name
                  )}
                  </td>
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

                  <td>
                    {editingIndex === index ? (
                      <>
                        <button onClick={() => handleSave(index, followup)} className="action-button">Save</button>
                        {visibleDescriptions < 10 && (
                          <button onClick={handleAddDescription} className="action-button">Add Followup</button>
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
        </div>
      )}
    </>
  );
};

export default RetrieveFollowups;
