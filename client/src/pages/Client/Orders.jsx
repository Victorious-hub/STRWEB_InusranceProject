import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import $api from '../../http/index';
import './Orders.css';
import OrderList from '../../components/Lists/OrderList';

const Orders = () => {
    const [contracts, setContracts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchContracts = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem('token'); // Adjust this line if you store the token differently
                if (token) {
                    const decodedToken = jwtDecode(token);
                    const userId = decodedToken.id;
                    const response = await $api.get(`/public/contracts/user/${userId}`);
                    setContracts(response.data);
                } else {
                    setError('No token found');
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchContracts();
    }, []);

    const handleSignContract = async (contractId) => {
        try {
            await $api.put(`/public/contracts/${contractId}`);
            setContracts(prevContracts =>
                prevContracts.map(contract =>
                    contract._id === contractId ? { ...contract, status: 'SIGNED' } : contract
                )
            );
            alert('Contract signed successfully');
        } catch (error) {
            console.error('Error signing contract:', error);
            alert('Failed to sign the contract');
        }
    };

    const handleDeleteContract = async (contractId) => {
        try {
            await $api.delete(`/public/contracts/${contractId}`);
            setContracts(prevContracts =>
                prevContracts.filter(contract => contract._id !== contractId)
            );
            alert('Contract deleted successfully');
        } catch (error) {
            console.error('Error deleting contract:', error);
            alert('Failed to delete the contract');
        }
    };

    const handleApplyContract = async (contractId) => {
        try {
            await $api.put(`/public/contracts/confirm/${contractId}`, { status: 'FINISHED' });
            setContracts(prevContracts =>
                prevContracts.map(contract =>
                    contract._id === contractId ? { ...contract, status: 'FINISHED' } : contract
                )
            );
            alert('Contract status changed to FINISHED');
        } catch (error) {
            console.error('Error applying contract:', error);
            alert('Failed to apply the contract');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="kanban-board">
            <OrderList 
                contracts={contracts}
                status="CREATED"
                handleSignContract={handleSignContract}
                handleDeleteContract={handleDeleteContract}
                handleApplyContract={handleApplyContract}
            />
            <OrderList 
                contracts={contracts}
                status="SIGNED"
                handleSignContract={handleSignContract}
                handleDeleteContract={handleDeleteContract}
                handleApplyContract={handleApplyContract}
            />
            <OrderList 
                contracts={contracts}
                status="CONFIRMED"
                handleSignContract={handleSignContract}
                handleDeleteContract={handleDeleteContract}
                handleApplyContract={handleApplyContract}
            />
            <OrderList 
                contracts={contracts}
                status="FINISHED"
                handleSignContract={handleSignContract}
                handleDeleteContract={handleDeleteContract}
                handleApplyContract={handleApplyContract}
            />
        </div>
    );
};

export default Orders;
