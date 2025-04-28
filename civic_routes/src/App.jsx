import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import CitizenDashboard from './components_client/CitizenDashboard.jsx';
import AuthorityDashboard from './components_authority/AuthorityDashboard.jsx';
import Login from './components_client/Login.jsx';
//import NotFound from './pages/NotFound';

function App() {
  // Example: get user role from localStorage or Firebase
  const userRole = localStorage.getItem('userRole'); // 'citizen' or 'authority'

  return (

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/" element={<Navigate to={userRole === 'authority' ? '/authority' : '/citizen'} />} />
        
        <Route path="/citizen/*" element={<CitizenDashboard />} />
        <Route path="/authority/*" element={<AuthorityDashboard />} />
       
       
       
      </Routes>

  );
}

export default App;
