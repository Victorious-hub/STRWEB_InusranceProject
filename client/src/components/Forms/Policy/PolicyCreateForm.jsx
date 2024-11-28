import React from 'react';

const PolicyCreateForm = ({ policyDetails, setPolicyDetails, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      {/* Insurance Sum */}
      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="insuranceSum">Insurance Sum</label>
        <input
          type="number"
          id="insuranceSum"
          value={policyDetails.insuranceSum}
          onChange={(e) => setPolicyDetails({ ...policyDetails, insuranceSum: e.target.value })}
          style={{ width: '100%', padding: '10px', borderRadius: '4px' }}
          required
        />
      </div>

      {/* Price */}
      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="price">Price</label>
        <input
          type="number"
          id="price"
          value={policyDetails.price}
          onChange={(e) => setPolicyDetails({ ...policyDetails, price: e.target.value })}
          style={{ width: '100%', padding: '10px', borderRadius: '4px' }}
          required
        />
      </div>

      {/* Start Date */}
      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="startDate">Start Date</label>
        <input
          type="date"
          id="startDate"
          value={policyDetails.startDate}
          onChange={(e) => setPolicyDetails({ ...policyDetails, startDate: e.target.value })}
          style={{ width: '100%', padding: '10px', borderRadius: '4px' }}
          required
        />
      </div>

      {/* End Date */}
      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="endDate">End Date</label>
        <input
          type="date"
          id="endDate"
          value={policyDetails.endDate}
          onChange={(e) => setPolicyDetails({ ...policyDetails, endDate: e.target.value })}
          style={{ width: '100%', padding: '10px', borderRadius: '4px' }}
          required
        />
      </div>

      {/* Submit Button */}
      <div style={{ textAlign: 'center' }}>
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            backgroundColor: '#007BFF',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Create Policy
        </button>
      </div>
    </form>
  );
};

export default PolicyCreateForm;
