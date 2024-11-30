import React, { useState, useEffect } from "react";
import $api from "../../http/index";
import { useParams } from "react-router-dom";
import ContractList from '../../components/Lists/ContractList';
import SearchInput from '../../components/UI/Inputs/SearchInput';
import SortButton from '../../components/UI/Button/SortButton';

const AgentContracts = () => {
  const { id } = useParams();
  const [contracts, setContracts] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        const response = await $api.get(`/internal/agents/contracts/${id}`);
        setContracts(response.data);
      } catch (error) {
        console.error("Error fetching contracts:", error);
      }
    };

    fetchContracts();
  }, [id]);

  const sortedContracts = [...contracts].sort((a, b) => {
    if (sortOrder === "asc") {
      return a._id.localeCompare(b._id);
    } else {
      return b._id.localeCompare(a._id);
    }
  });

  const filteredContracts = sortedContracts.filter((contract) => {
    return contract.insuranceObject?.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div>
      {/* Search Input */}
      <SearchInput searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* Sorting Controls */}
      <SortButton sortOrder={sortOrder} setSortOrder={setSortOrder} />

      {/* Contract List */}
      <ContractList contracts={filteredContracts} />
    </div>
  );
};

export default AgentContracts;
