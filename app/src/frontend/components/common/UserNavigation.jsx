import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import 'tailwindcss/tailwind.css';
import UserIcon from '../../../../assets/icons/default-user-icon.png';


/* Importing navigation bar and header to pages
<>
    <div><UserNav /></div>
    <div className="absolute inset-0 flex ml-[4vw] justify-center">

        <div><Header pageTitle={""}/></div>
        <div className='pt-[9vh] flex-column'>
            // Insert page contents here
            // Adjust margins/padding/containers as needed
        </div>

    </div>
</>
*/


/* Parent components:
    frontend/pages/dashboards/UserDashboard.jsx
    frontend/pages/student-record/StudentRecord.jsx
*/
/* This component is used to aid user navigation and is implemented as a sidebar that expands on hover. */
/* Props:
    hoverRef    --- a callbackRef used by useHover to update the listeners for the 'mouseover' and 'mouseout' events in the navigation bar
    isHovering  --- handles the hovering state of the navigation bar
    setIsHovering --- sets hover state, used for logging out user
*/
const UserNav = ({ hoverRef, isHovering, setIsHovering }) => {
    let navigate = useNavigate();

    const [userName, setUserName] = useState('');
    const [position, setPosition] = useState('');

    // removes local storage data and redirects to log in page
    function handleLogOut (){
        // localStorage.removeItem("FirstName")
        // localStorage.removeItem("LastName")
        // localStorage.removeItem("MiddleName")
        // localStorage.removeItem("Password")
        // localStorage.removeItem("Position")
        // localStorage.removeItem("Role")
        // localStorage.removeItem("Username")
        // localStorage.removeItem("ServerIP")
        localStorage.clear();
        setIsHovering(false);
        navigate('/');
    }

    // for user information
    useEffect(() => {
        // gets username and position from local storage
        const tempUserName = localStorage.getItem("Username");
        const tempPosition = localStorage.getItem("Position");

        // updates username and position 
        setUserName(tempUserName);
        setPosition(tempPosition);

        // displays the username and position to the sidebar
        document.getElementById("userName").innerHTML = tempUserName; 
        document.getElementById("position").innerHTML = tempPosition;

    }, [userName, position]);
    

    return (
        <nav 
            ref={hoverRef}
            className={` ${isHovering ? "w-1/4 3xl:w-1/5" : "w-14 xl:w-20"}
                        h-full overflow-hidden fixed top-0 duration-300 min-w-min z-1 bg-primary-red text-sidebar-text`}
        >
            {/* Baybayin Background Image */}
            <div className="bg-baybayin bg-repeat-y bg-contain h-screen mt-[1vw] ml-[-15.25vh]"></div>
            
            <div className="py-2 absolute inset-x-0 top-0 text-[1.15vw]">
                
                {/* App Name */}   
                <div className={`${ isHovering? "pl-12 xl:pl-14 1.5xl:pl-16 3xl:pl-12 duration-500" : "duration-300 pl-[8vw]" }
                                flex py-4 1.5xl:py-8 text-highlight`}>            
                    <div className="flex-shrink-0 font-medium italic tracking-wider">
                        Kalatas: CAS GWA Verifier
                    </div>
                </div>

                {/* User Account Details */}
                <div className="flex xl:gap-x-2 1.75xl:gap-x-1 items-center">
                    
                    {/* User Icon */}
                    <img
                        className={` ${isHovering ? "scale-25 sm:scale-50 xl:scale-60 1.5xl:scale-60 1.75xl:scale-75 ml-1.5 xl:ml-2 1.5xl:ml-3 1.75xl:ml-5" : "scale-50" }
                                    rounded-full duration-500`}
                        width="90px"
                        height="90px"
                        alt="user-icon"
                        src={UserIcon}
                    />

                    {/* User Information */}
                    <div className="flex-shrink-0">
                        <div className="font-poppins font-medium" id="userName"></div>
                        <div id="position" className="font-poppins"></div>
                    </div>
                </div>
                
                {/* Navigation Pages */}
                <div className={` ${isHovering? "xl:mt-3 1.5xl:mt-4 1.75xl:mt-6 3xl:mt-7 4xl:mt-8" : "mt-1" } 
                                cursor-pointer grid grid-cols-1 duration-300 gap-[0.25vw] font-poppins font-medium`}>
                    
                    {/* User Dashboard */}
                    <div className="inline-flex items-center py-2 gap-x-4 hover:bg-secondary-red hover:text-highlight" onClick={() => {navigate('/user-dashboard')}}>
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
            <div className="cursor-pointer flex items-center p-2 absolute bottom-8 gap-x-4 font-poppins font-medium text-[1.15vw] hover:text-highlight" onClick={() => handleLogOut()}>
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


export default UserNav;