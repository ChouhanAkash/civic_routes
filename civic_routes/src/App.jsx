import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import CitizenDashboard from './components_client/CitizenDashboard.jsx';
import AuthorityDashboard from './components_authority/AuthorityDashboard.jsx';
import Login from './components_client/Login.jsx';
// import NotFound from './pages/NotFound'; // Optional

function App() {
  const userRole = localStorage.getItem('userRole'); // 'citizen' or 'authority'

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          userRole === 'authority' ? <Navigate to="/authority" /> : <Navigate to="/citizen" />
        }
      />
      <Route path="/citizen/*" element={<CitizenDashboard />} />
      <Route path="/authority/*" element={<AuthorityDashboard />} />
      {/* Optional: 404 Not Found page */}
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
}

export default App;

