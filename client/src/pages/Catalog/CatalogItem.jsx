import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import $api from '../../http/index';
import ContractCreateForm from '../../components/Forms/Contract/ContractCreateForm';

const CatalogItem = ({ item }) => {
    const [risks, setRisks] = useState([]);
    const [showRisks, setShowRisks] = useState(false);
    const [loadingRisks, setLoadingRisks] = useState(false);
    const [error, setError] = useState(null);
    const [selectedRisks, setSelectedRisks] = useState([]);
    const [affiliates, setAffiliates] = useState([]);
    const [affiliate, setAffiliate] = useState('');
    const [clientId, setClientId] = useState('');
    const [status, setStatus] = useState('CREATED');

    useEffect(() => {
        const fetchAffiliates = async () => {
            try {
                const response = await $api.get('/internal/affiliates');
                setAffiliates(response.data);
            } catch (err) {
                setError('Failed to load affiliates');
            }
        };

        fetchAffiliates();

        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                setClientId(decodedToken.id);
            } catch (err) {
                setError('Invalid token');
            }
        } else {
            setError('No token found');
        }
    }, []);

    const fetchRisks = async () => {
        try {
            setLoadingRisks(true);
            const response = await $api.get(`/internal/insurance-risks/${item._id}`);
            setRisks(response.data);
            setShowRisks(true);
        } catch (err) {
            setError('Failed to load risks');
        } finally {
            setLoadingRisks(false);
        }
    };

    const handleRiskChange = (e) => {
        const riskId = e.target.value;
        if (e.target.checked) {
            setSelectedRisks([...selectedRisks, riskId]);
        } else {
            setSelectedRisks(selectedRisks.filter(id => id !== riskId));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const contractData = {
                status,
                client: clientId,
                affiliate,
                insuranceObject: item._id,
                insuranceRisks: selectedRisks
            };
            console.log(contractData);
            await $api.post('/public/contracts', contractData);
            alert('Contract created successfully!');
        } catch (err) {
            alert('Failed to create contract.');
        }
    };

    return (
        <li className="catalog-item">
            <h3>{item.name}</h3>
            <p>Type: {item.insuranceType}</p>
            <button onClick={fetchRisks}>
                {loadingRisks ? 'Loading Risks...' : 'Show Related Risks'}
            </button>
            {error && <p className="error-message">{error}</p>}
            {showRisks && (
                <ContractCreateForm
                    risks={risks}
                    selectedRisks={selectedRisks}
                    handleRiskChange={handleRiskChange}
                    affiliates={affiliates}
                    affiliate={affiliate}
                    setAffiliate={setAffiliate}
                    onSubmit={handleSubmit}
                    error={error}
                />
            )}
        </li>
    );
};

export default CatalogItem;
