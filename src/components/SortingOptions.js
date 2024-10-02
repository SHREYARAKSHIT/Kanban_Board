// src/components/SortingOptions.js
import React from 'react';
import '../styles/SortingOptions.css';

const SortingOptions = ({ sortBy, setSortBy }) => {
  const handleChange = (e) => {
    setSortBy(e.target.value);
  };

  return (
    <div className="sorting-options">
      <label class="sorting-label">Ordering</label>
      <select class="sorting-option" value={sortBy} onChange={handleChange}>
        <option value="priority">Priority</option>
        <option value="title">Title</option>
      </select>
    </div>
  );
};

export default SortingOptions;
