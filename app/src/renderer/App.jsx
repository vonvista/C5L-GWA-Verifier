import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';

import LoginPage from 'frontend/pages/login-page/LoginPage'
import UserDashboard from 'frontend/pages/dashboards/UserDashboard';
// import AdminDashboard from 'frontend/pages/dashboards/AdminDashboard'; // depracated -vov
import UserManagement from 'frontend/pages/user-management/UserManagementPage';
import StudentRecord from 'frontend/pages/student-record/StudentRecord';


export default function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LoginPage />} />
        <Route exact path="/user-dashboard" element={<UserDashboard />} />
        {/* <Route exact path="/admin-dashboard" element={<AdminDashboard />} /> */}
        <Route exact path="/user-management" element={<UserManagement />} />
        <Route exact path="/student-record" element={<StudentRecord />} />
      </Routes>
    </Router>
  );
}
