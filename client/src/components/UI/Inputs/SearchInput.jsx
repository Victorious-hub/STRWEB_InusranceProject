import React from 'react';

const SearchInput  = ({ searchQuery, setSearchQuery }) => {
  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <input
        type="text"
        placeholder="Search by Insurance Object Name"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{
          padding: "10px",
          fontSize: "16px",
          width: "300px",
          marginBottom: "20px",
          border: "1px solid #ddd",
          borderRadius: "4px"
        }}
      />
    </div>
  );
};

export default SearchInput ;
