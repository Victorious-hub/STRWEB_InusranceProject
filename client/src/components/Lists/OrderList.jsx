import React from 'react';
import Button from '../../components/UI/Button/Button'; // Ensure this path is correct

const OrderList = ({ contracts, status, handleSignContract, handleDeleteContract, handleApplyContract }) => {
    const getContractsByStatus = (status) => {
        return contracts.filter(contract => contract.status === status);
    };

    return (
        <div className="kanban-column">
            <h2>{status}</h2>
            {getContractsByStatus(status).map(contract => (
                <div key={contract._id} className="kanban-card">
                    <h3>{contract.insuranceObject?.name || 'Unnamed Contract'}</h3>
                    <p>{contract.insuranceObject?.insuranceType || 'No description available'}</p>
                    <p>Affiliate: {contract.affiliate?.name || 'N/A'}</p>
                    <p>Risks:</p>
                    <ul style={{ color: 'black' }}>
                        {contract.insuranceRisks?.length > 0 ? (
                            contract.insuranceRisks.map(risk => (
                                <li key={risk._id}>{risk.name}</li>
                            ))
                        ) : (
                            <li>No risks listed</li>
                        )}
                    </ul>
                    <div className="kanban-actions">
                        {contract.status === 'CREATED' && (
                            <>
                                <Button onClick={() => handleSignContract(contract._id)}>Sign Contract</Button>
                                <Button onClick={() => handleDeleteContract(contract._id)}>Delete Contract</Button>
                            </>
                        )}
                        {contract.status === 'CONFIRMED' && (
                            <>
                                <Button onClick={() => handleApplyContract(contract._id)}>Apply Contract</Button>
                            </>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default OrderList;
