import { useEffect, useState } from 'react';
import { useHover } from '../hooks/useHover';
import UserIcon from '../../../assets/icons/default-user-icon.png';
import 'tailwindcss/tailwind.css';
import './Sidebar.css';
import { useNavigate } from 'react-router-dom';

/* Importing navigation bar and header to pages
<>
    <div><UserNav /></div>
    <div className="absolute inset-0 flex ml-8 xl:ml-12 justify-center">

        <div><Header pageTitle={""}/></div>
        <div className='pt-20 flex-column'>
            // Insert page contents here
            // Adjust margins/padding/containers as needed
        </div>

    </div>
</>
*/


// This component is used to aid user navigation and is implemented as a sidebar that expands on hover.
const UserNav = () => {
    let navigate = useNavigate();

    const [hoverRef, isHovering] = useHover();
    const [name, setName] = useState('');
    const [userName, setUserName] = useState('');

    useEffect(() => {
        // gets name and username from local storage
        const tempName = localStorage.getItem("FirstName") + " " + localStorage.getItem("MiddleName") + " " + localStorage.getItem("LastName");
        const tempUserName = localStorage.getItem("Username");
        // updates name and username 
        setName(tempName);
        setUserName(tempUserName);
        // displays the name and username to the sidebar
        document.getElementById("name").innerHTML = name; 
        document.getElementById("userName").innerHTML = tempUserName; 
    }, [name,userName]);
    
    // removes local storage data and redirects to log in page
    function handleLogOut (){
        localStorage.clear();
        navigate('/');
    }
    
    // remove some items from local storage and redirects to User Dashboard
    function handleUserDashboard (){

        // clear the following on the localStorage
        localStorage.removeItem('currStudent')
        localStorage.removeItem('currStudentGrades')

        navigate('/user-dashboard') // navigate to user dashboard
    }

    return (
        <nav 
            ref={hoverRef}
            className={` ${isHovering ? "w-1/4 3xl:w-1/5" : "w-14 xl:w-20"} navbar-style `}
        >
            {/* Baybayin Background Image */}
            <div className="bg-baybayin baybayin-style"></div>
            
            <div className="content-style ">
                
                {/* App Name */}   
                <div className={`${ isHovering? "pl-12 xl:pl-20 3xl:pl-14 duration-500" : "appname-style-non" } flex py-4 1.5xl:py-8 text-highlight`}>            
                    <div className="flex-shrink-0">
                        Kalatas: CAS GWA Verifier
                    </div>
                </div>

                {/* User Account Details */}
                <div className="flex xl:gap-x-2 1.75xl:gap-x-5 items-center">
                    
                    {/* User Icon */}
                    <img
                        className={` ${isHovering ? "scale-25 sm:scale-50 xl:scale-60 1.5xl:scale-60 1.75xl:scale-75 ml-1.5 xl:ml-2 1.5xl:ml-3 1.75xl:ml-5" : "scale-50" } rounded-full duration-500`}
                        width="90px"
                        height="90px"
                        alt="user-icon"
                        src={UserIcon}
                    />

                    {/* User Information */}
                    <div className="flex-shrink-0">
                        <div><strong id="name"></strong></div>
                        <div id="userName"></div>
                    </div>
                </div>
                
                {/* Navigation Pages */}
                <div className={` ${isHovering? "xl:mt-3 1.5xl:mt-4 1.75xl:mt-6 3xl:mt-7 4xl:mt-8" : "mt-1" } navpages-style`}>
                    
                    {/* User Dashboard */}
                    <div className="dashboard-style hover:bg-secondary-red hover:text-highlight" onClick={() => handleUserDashboard()}>
                        <div>
                            <svg className={` ${isHovering? "ml-7 1.5xl:ml-8 1.75xl:ml-8": "ml-3.5 xl:ml-5.5"} w-7 xl:w-8 duration-300 fill-current`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" >
                                <path d="M33 19a1 1 0 0 1-.71-.29L18 4.41 3.71 18.71A1 1 0 0 1 2.3 17.3l15-15a1 1 0 0 1 1.41 0l15 15A1 1 0 0 1 33 19Z"/>
                                <path d="M18 7.79 6 19.83V32a2 2 0 0 0 2 2h7V24h6v10h7a2 2 0 0 0 2-2V19.76Z"/>
                                <path fill="none" d="M0 0h36v36H0z"/>
                            </svg>
                        </div>
                        <div className="pl-3.5 flex-shrink-0 ">
                            <span>User Dashboard</span>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Logout button*/}
            <div className="logout-style hover:text-highlight" onClick={() => handleLogOut()}>
                <div>
                    <svg className={` ${isHovering? "ml-5 1.5xl:ml-6 1.75xl:ml-7" : "ml-2 xl:ml-4" } w-7 xl:w-8 duration-300 fill-current`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M4 18h2v2h12V4H6v2H4V3a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3zm2-7h7v2H6v3l-5-4 5-4v3z"/>
                    </svg>
                </div>
                <div className="pl-3">
                    <span>Logout</span>
                </div>
            </div>
        </nav>
    );
}

export default UserNav
