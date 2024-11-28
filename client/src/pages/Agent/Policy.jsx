import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import $api from '../../http/index';
import PolicyCreateForm from '../../components/Forms/Policy/PolicyCreateForm';
import { jwtDecode } from 'jwt-decode';

const Policy = () => {
  const { contractId } = useParams();
  const navigate = useNavigate();
  const [agentId, setAgentId] = useState('');
  const [contractDetails, setContractDetails] = useState(null);
  const [policyDetails, setPolicyDetails] = useState({
    insuranceSum: 0,
    price: 0,
    startDate: '',
    endDate: '',
    contract: contractId,
    agent: '',
  });

  useEffect(() => {
    const fetchContractDetails = async () => {
      try {
        const response = await $api.get(`/public/contracts/${contractId}`);
            setContractDetails(response.data);

            const token = localStorage.getItem('token');
            const decodedToken = jwtDecode(token);
            setAgentId(decodedToken.id);
            setPolicyDetails((prevState) => ({
            ...prevState,
            agent: decodedToken.id,
        }));
        console.log('Contract details:', response.data);
      } catch (error) {
        console.error('Error fetching contract details:', error);
      }
    };

    fetchContractDetails();
  }, [contractId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await $api.post(`/public/policies`, policyDetails);
      console.log('Policy created:', response.data);
      navigate(`/agent-contracts/${contractId}`);
    } catch (error) {
      console.error('Error creating policy:', error);
    }
  };

  if (!contractDetails) {
    return <div>Loading contract details...</div>;
  }

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Create Policy for Contract ID: {contractId}</h2>
      <PolicyCreateForm
        contractDetails={contractDetails}
        policyDetails={policyDetails}
        setPolicyDetails={setPolicyDetails}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default Policy;

