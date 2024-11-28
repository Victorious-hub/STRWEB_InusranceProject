// SortButton.js
import React from 'react';

const SortButton = ({ sortOrder, setSortOrder }) => {
  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <button
        onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          backgroundColor: "#007BFF",
          color: "#fff",
          border: "none",
          borderRadius: "4px"
        }}
      >
        Sort by Contract ID ({sortOrder === "asc" ? "Ascending" : "Descending"})
      </button>
    </div>
  );
};

export default SortButton;
