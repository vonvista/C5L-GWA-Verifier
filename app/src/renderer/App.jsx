import { Outlet, useLocation, MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useHover } from 'frontend/hooks/useHover';
import 'frontend/fonts.css';

/* Components */
import AdminNav from 'frontend/components/common/AdminNavigation';
import UserNav from 'frontend/components/common/UserNavigation';
import Header from 'frontend/components/common/HeaderWithArrowbck';

/* Pages */
import LoginPage from 'frontend/pages/login-page/LoginPage'
import UserDashboard from 'frontend/pages/dashboards/UserDashboard';
import UserManagement from 'frontend/pages/user-management/UserManagementPage';
import StudentRecord from 'frontend/pages/student-record/StudentRecord';



/* This function is used for nested routes */
const NavigationBar = () => {
    const [userRole, setUserRole] = useState(localStorage.getItem('Role'));
    const [hoverRef, isHovering, setIsHovering] = useHover();
    
    // State handlers for header
    const [pageTitle, setPageTitle] = useState();
    const [arrow, setArrow] = useState(false);

    // Object containing the exact path of current page
    const location = useLocation();

    // Used for setting page title of current page dislayed
    useEffect(() => {
        setArrow(false);
        if (location.pathname == "/in/user-dashboard") {
            if (userRole == "user") {
                setPageTitle("USER DASHBOARD");
            } else {
                setPageTitle("ADMIN DASHBOARD");
            }
        } else if (location.pathname == "/in/user-management") {
            setPageTitle("USER MANAGEMENT");
        } else if (location.pathname == "/in/student-record") {
            setPageTitle("Student Record");
            setArrow(true);
        } else {
            setPageTitle("");
        }
    }, [location.pathname]);

    return(
        <>
            <nav className="sticky z-20">
                {userRole == "user" ?
                    <UserNav hoverRef={hoverRef} isHovering={isHovering} setIsHovering={setIsHovering} />
                    : <AdminNav hoverRef={hoverRef} isHovering={isHovering} setIsHovering={setIsHovering} />
                }
            </nav>
            <Header pageTitle={pageTitle} arrow={arrow}/>
            <Outlet />
        </>
    )
}


export default function App() {
    
    return (
        <Router>
            <Routes>
                <Route path="/in" element={<NavigationBar />} >
                    <Route exact path="/in/user-dashboard" element={<UserDashboard />} />
                    <Route exact path="/in/user-management" element={<UserManagement />} />
                    <Route exact path="/in/student-record" element={<StudentRecord />} />
                </Route>

                <Route exact path="/" element={<LoginPage />} />
            </Routes>
        </Router>
    );
}