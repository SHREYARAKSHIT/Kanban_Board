// src/components/GroupingOptions.js
import React from 'react';
import '../styles/GroupingOptions.css';

const GroupingOptions = ({ groupBy, setGroupBy }) => {
  const handleChange = (e) => {
    setGroupBy(e.target.value);
  };

  return (
    <div className="grouping-options">
      <label class="grouping-label">Grouping</label>
      <select class="grouping-option" value={groupBy} onChange={handleChange}>
        <option value="status">Status</option>
        <option value="user">User</option>
        <option value="priority">Priority</option>
      </select>
    </div>
  );
};

export default GroupingOptions;
