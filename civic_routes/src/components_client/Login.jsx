import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './logo.png';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState('citizen');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn');
    const userRole = localStorage.getItem('userRole');
    if (loggedIn === 'true') {
      if (userRole === 'citizen') navigate('/citizen');
      else if (userRole === 'authority') navigate('/authority');
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username && password) {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userRole', role);
      navigate(role === 'citizen' ? '/citizen' : '/authority');
    } else {
      alert('Please enter both username and password');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <img src={logo} alt="CivicRoutes Logo" className="login-logo" />
        <h2>Login to CivicRoutes</h2>
        <form onSubmit={handleLogin} className="login-form">
          <label>
            Role:
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="citizen">Citizen</option>
              <option value="authority">Authority</option>
            </select>
          </label>

          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>

          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          <button type="submit" className="login-btn">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;