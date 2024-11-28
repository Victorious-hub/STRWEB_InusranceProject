// ContractList.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ContractList = ({ contracts }) => {
  const navigate = useNavigate();

  const handleCreatePolicy = (contractId) => {
    navigate(`/createPolicy/${contractId}`);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "1000px", margin: "0 auto" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px", color: "black" }}>Contracts</h2>
      {contracts.length > 0 ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>
          {contracts.map((contract) => (
            <div
              key={contract._id}
              style={{
                backgroundColor: "#fff",
                borderRadius: "8px",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                padding: "20px",
                transition: "transform 0.2s, box-shadow 0.2s",
                overflow: "hidden",
                color: "black",
              }}
            >
              <h3 style={{ marginTop: 0 }}>Contract ID: {contract._id}</h3>
              <p><strong>Status:</strong> {contract.status}</p>

              {contract.client && (
                <div style={{ marginTop: "10px" }}>
                  <h4>Client</h4>
                  <p><strong>Client Name:</strong> {contract.client.user.firstName}</p>
                </div>
              )}

              {contract.insuranceObject && (
                <div style={{ marginTop: "10px" }}>
                  <h4>Insurance Object</h4>
                  <p><strong>Name:</strong> {contract.insuranceObject.name}</p>
                </div>
              )}

              {contract.insuranceRisks && contract.insuranceRisks.length > 0 && (
                <div style={{ marginTop: "10px" }}>
                  <h4>Insurance Risks</h4>
                  <ul style={{ paddingLeft: "20px" }}>
                    {contract.insuranceRisks.map((risk) => (
                      <li key={risk._id} style={{ marginBottom: "8px" }}>
                        <p><strong>Description:</strong> {risk.name}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div style={{ marginTop: "20px" }}>
                <button
                  onClick={() => handleCreatePolicy(contract._id)}
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#28a745",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer"
                  }}
                >
                  Create Policy
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p style={{ textAlign: "center", color: "#888" }}>No contracts available.</p>
      )}
    </div>
  );
};

export default ContractList;
