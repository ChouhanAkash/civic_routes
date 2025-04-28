import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "./logo.png"; 
import "./nav.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    const role = localStorage.getItem("userRole");
    setIsLoggedIn(loggedIn === "true" && role === "citizen");
  }, []);

  const toggleMenu = () => setIsOpen(prev => !prev);

  const handleAuthClick = () => {
    if (isLoggedIn) {
      localStorage.clear();
      setIsLoggedIn(false);
      navigate("/");
    } else {
      navigate("/");
    }
  };

  return (
    <nav className="navbar">
      <div className="brand-section">
        <img src={logo} alt="Logo" className="logo-img" />
        <NavLink to="/citizen" className="brand-title">CivicRoutes</NavLink>
        <button className="menu-toggle" onClick={toggleMenu}>☰</button>
      </div>
      <ul className={`nav-links ${isOpen ? "open" : ""}`}>
        <li><NavLink to="/citizen" className="nav-item" onClick={() => setIsOpen(false)}>Dashboard</NavLink></li>
        <li><NavLink to="/citizen/issue-form" className="nav-item" onClick={() => setIsOpen(false)}>Report Issue</NavLink></li>
        <li><NavLink to="/citizen/authority-updates" className="nav-item" onClick={() => setIsOpen(false)}>Authority Updates</NavLink></li>
        <li><button onClick={handleAuthClick} className="nav-btn">{isLoggedIn ? "Logout" : "Login"}</button></li>
      </ul>
    </nav>
  );
};

export default Navbar;