import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/About/Home';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import FAQ from '../pages/About/FAQ';
import About from '../pages/About/About';
import Catalog from '../pages/Catalog/Catalog';
import Orders from '../pages/Client/Orders';
import Logout from './Logout';
import ClientProfile from '../pages/Client/ClientProfile';
import AgentProfile from '../pages/Agent/AgentProfile';
import AgentContracts from '../pages/Agent/AgentContracts';
import Policy from '../pages/Agent/Policy';

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<About />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/clientProfile/:id" element={<ClientProfile />} />
            <Route path="/agentProfile/:id" element={<AgentProfile />} />
            <Route path="/contracts/:id" element={<AgentContracts />} />
            <Route path="/createPolicy/:contractId" element={<Policy />} />
        </Routes>
    );
};

export default AppRouter;