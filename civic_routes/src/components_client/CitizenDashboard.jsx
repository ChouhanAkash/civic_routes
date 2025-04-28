import { Routes, Route } from 'react-router-dom';
import Announcements from './Announcements.jsx';
import UserDashboard from './UserDashboard.jsx';
import IssueForm from './IssueForm.jsx';
import Navbar from './Navbar.jsx';
import Footer from '../components_authority/Footer.jsx';
function CitizenDashboard() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<UserDashboard />} />
        <Route path="issue-form" element={<IssueForm />} />
        <Route path="authority-updates" element={<Announcements />} />
      </Routes>
      <Footer/>
    </>
  );
}

export default CitizenDashboard;