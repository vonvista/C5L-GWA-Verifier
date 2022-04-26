import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';

import UserDashboard from '../frontend/pages/UserDashboard';
import LoginPage from '../frontend/LoginPage'
import AdminDashboard from '../frontend/components/AdminNavigation';
import UserManagement from '../frontend/components/UserSystemPage';
import StudentRecord from '../frontend/pages/StudentRecord';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LoginPage />} />
        <Route exact path="/user-dashboard" element={<UserDashboard />} />
        <Route exact path="/admin-dashboard" element={<AdminDashboard />} />
        <Route exact path="/user-management" element={<UserManagement />} />
        <Route exact path="/student-record" element={<StudentRecord />} />
      </Routes>
    </Router>
  );
}
