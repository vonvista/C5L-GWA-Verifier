import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { useHover } from 'frontend/hooks/useHover';

import LoginPage from 'frontend/pages/login-page/LoginPage'
import UserDashboard from 'frontend/pages/dashboards/UserDashboard';
// import AdminDashboard from 'frontend/pages/dashboards/AdminDashboard'; // depracated -vov
import UserManagement from 'frontend/pages/user-management/UserManagementPage';
import StudentRecord from 'frontend/pages/student-record/StudentRecord';
import 'frontend/fonts.css';


export default function App() {

    // State handler for navigation bar
    const [hoverRef, isHovering, setIsHovering] = useHover();

    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<LoginPage />} />
                <Route exact path="/user-dashboard" element={<UserDashboard hoverRef={hoverRef} isHovering={isHovering} setIsHovering={setIsHovering}/>} />
                {/* <Route exact path="/admin-dashboard" element={<AdminDashboard />} /> */}
                <Route exact path="/user-management" element={<UserManagement hoverRef={hoverRef} isHovering={isHovering} setIsHovering={setIsHovering}/>} />
                <Route exact path="/student-record" element={<StudentRecord hoverRef={hoverRef} isHovering={isHovering} setIsHovering={setIsHovering}/>} />
            </Routes>
        </Router>
    );
}
