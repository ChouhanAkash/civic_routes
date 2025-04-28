import React from 'react';
import {Routes, Route } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import IssuesPage from '../pages/IssuesPage';
import AuthorityPage from '../pages/AuthorityPage';
import './AuthorityDashboard.css'

const AuthorityDashboard= () => {
  return (

      <div className="dashboard-container">
        <Header />
        <Routes>
          <Route path="/" element={<IssuesPage />} />
          <Route path="/announcements" element={<AuthorityPage />} />
        </Routes>
        <Footer />
      </div>

  );
};

export default AuthorityDashboard;