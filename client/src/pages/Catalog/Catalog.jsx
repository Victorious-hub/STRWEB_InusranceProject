import React, { useState, useEffect } from 'react';
import $api from '../../http/index';
import './Catalog.css';
import CatalogList from '../../components/Lists/CatalogList';

const Catalog = () => {
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [insuranceType, setInsuranceType] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');

    // Fetch items from API
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await $api.get('/internal/insurance-objects');
                setItems(response.data);
                setFilteredItems(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        let filtered = [...items];
        if (insuranceType) {
            filtered = filtered.filter(item => item.insuranceType === insuranceType);
        }
        if (searchQuery) {
            filtered = filtered.filter(item =>
                item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.description?.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        filtered.sort((a, b) => {
            if (sortOrder === 'asc') {
                return a.name.localeCompare(b.name);
            } else {
                return b.name.localeCompare(a.name);
            }
        });

        setFilteredItems(filtered);
    }, [insuranceType, searchQuery, sortOrder, items]);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSortChange = (e) => {
        setSortOrder(e.target.value);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="catalog-page">
            <h2>Catalog</h2>

            {/* Search Input */}
            <div className="search-container">
                <label htmlFor="searchQuery">Search:</label>
                <input
                    type="text"
                    id="searchQuery"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Search by name or description"
                />
            </div>

            {/* Filter by Insurance Type */}
            <div className="filter">
                <label htmlFor="insuranceType">Filter by Insurance Type:</label>
                <select
                    id="insuranceType"
                    value={insuranceType}
                    onChange={(e) => setInsuranceType(e.target.value)}
                >
                    <option value="">All</option>
                    <option value="MEDICAL">Medical</option>
                    <option value="AUTO">Auto</option>
                    <option value="TRAVEL">Travel</option>
                    <option value="BUSINESS">Business</option>
                </select>
            </div>

            {/* Sorting Controls */}
            <div className="sort-container">
                <label htmlFor="sortOrder">Sort by Name:</label>
                <select
                    id="sortOrder"
                    value={sortOrder}
                    onChange={handleSortChange}
                >
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
            </div>

            {/* Catalog List */}
            <CatalogList items={filteredItems} />
        </div>
    );
};

export default Catalog;
