import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import './Navbar.css';
import AuthContext from '../../../context/AuthContext';

function Navbar() {
    const { token } = useContext(AuthContext);
    const [userRole, setUserRole] = useState(null);
    const [userId, setUserId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const dateOptions = { year: 'numeric', month: 'numeric', day: 'numeric' };
    const date = new Date().toLocaleString(undefined, dateOptions);

    useEffect(() => {
        if (token) {
            try {
                const decodedToken = jwtDecode(localStorage.getItem('token'));
                setUserId(decodedToken.id);
                setUserRole(decodedToken.role);
            } catch (error) {
                console.error('Invalid token:', error);
            } finally {
                setIsLoading(false);
            }
        } else {
            setIsLoading(false);
        }
    }, [token]);
    

    if (isLoading) {
        return <div>Loading...</div>;
    }
    console.log(userId);
    return (
        <nav>
            <ul>
                <div>
                    <li>
                        <Link to="/">Main</Link>
                    </li>
                    <li>
                        <Link to="/about">About Us</Link>
                    </li>
                    <li>
                        <Link to="/faq">FAQ</Link>
                    </li>
                    <li>
                        <Link to="/catalog">Catalog</Link>
                    </li>
                    {token && userRole == 'client' && (
                        <>
                            <li>
                                <Link to="/orders">Orders</Link>
                            </li>
                            <li>
                                <Link to={`/clientProfile/${userId}`}>Client Profile</Link>
                            </li>
                        </>
                    )}
                    {token && userRole === 'agent' && (
                        <>
                            <li>
                                <Link to={`/contracts/${userId}`}>Affiliate contracts</Link>
                            </li>
                            
                            <li>
                                <Link to={`/agentProfile/${userId}`}>Agent Profile</Link>
                            </li>
                        </>
                    )}
                </div>

                <div style={{ color: "white" }}>
                    <li>{userTimezone}</li>
                    <li>{date}</li>
                </div>

                <div>
                    {!token && (
                        <>
                            <li>
                                <Link to="/login">Login</Link>
                            </li>
                            <li>
                                <Link to="/register">Register</Link>
                            </li>
                        </>
                    )}

                    {token && (
                        <li>
                            <Link to="/logout">Logout</Link>
                        </li>
                    )}
                </div>
            </ul>
        </nav>
    );
}

export default Navbar;
