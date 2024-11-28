import React from 'react';
import Button from '../../UI/Button/Button';

const ContractCreateForm = ({
    risks,
    selectedRisks,
    handleRiskChange,
    affiliates,
    affiliate,
    setAffiliate,
    onSubmit,
    error
}) => {
    return (
        <form onSubmit={onSubmit} className="contract-form">
            {error && <p className="error-message">{error}</p>}
            <ul className="risk-list">
                {risks.map(risk => (
                    <li key={risk._id} className="risk-item">
                        <h4>{risk.name}</h4>
                        <input
                            type="checkbox"
                            id={risk._id}
                            value={risk._id}
                            onChange={handleRiskChange}
                            checked={selectedRisks.includes(risk._id)}
                        />
                        <label htmlFor={risk._id}>Select Risk</label>
                    </li>
                ))}
            </ul>
            <label htmlFor="affiliate">Affiliate:</label>
            <select
                id="affiliate"
                value={affiliate}
                onChange={(e) => setAffiliate(e.target.value)}
                required
            >
                <option value="">Select an affiliate</option>
                {affiliates.map(affiliate => (
                    <option key={affiliate._id} value={affiliate._id}>
                        {affiliate.name}
                    </option>
                ))}
            </select>
            <Button onClick={onSubmit}>Apply for Contract</Button>
        </form>
    );
};

export default ContractCreateForm;
