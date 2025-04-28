import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../components_client/logo.png'; // Adjust path if needed
import './header.css';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn');
    const role = localStorage.getItem('userRole');
    if (loggedIn === 'true' && role === 'authority') {
      setIsLoggedIn(true);
    }
  }, []);

  const handleAuthClick = () => {
    if (isLoggedIn) {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('userRole');
      setIsLoggedIn(false);
      navigate('/');
    } else {
      navigate('/');
    }
  };

  return (
    <header className="header">
      <div className="top-row">
     
        <div className="logo-container">
          <img src={logo} alt="CivicRoutes Logo" className="logo" />
        </div>
        <h1 className="title">CivicRoutes - Authority Dashboard</h1>
        
      </div>

      <nav className="nav">
        <Link to="/authority" className="nav-btn">Local Issues</Link>
        <Link to="/authority/announcements" className="nav-btn">Announcements</Link>
        <button className="nav-btn" onClick={handleAuthClick}>
          {isLoggedIn ? 'Logout' : 'Login'}
        </button>
      </nav>
    </header>
  );
};

export default Header;