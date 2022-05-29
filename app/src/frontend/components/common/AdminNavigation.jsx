import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import 'tailwindcss/tailwind.css';
import UserIcon from '../../../../assets/icons/default-user-icon.png';


/* Parent component >> src/renderer/App.jsx */

/* This component is used to aid admin navigation and is implemented as a sidebar that expands on hover. */
/* Props:
    hoverRef    --- a callbackRef used by useHover to update the listeners for the 'mouseover' and 'mouseout' events in the navigation bar
    isHovering  --- handles the hovering state of the navigation bar
    setIsHovering --- sets hover state, used for logging out user
*/
const AdminNav = ({ hoverRef, isHovering, setIsHovering }) => {
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
            className={` ${isHovering ? "w-[20vw]" : "w-14 xl:w-20"}
                        h-full overflow-hidden fixed top-0 duration-300 min-w-min z-20 bg-primary-red text-sidebar-text`}
        >
            {/* Baybayin Background Image */}
            <div className="bg-baybayin bg-repeat-y bg-contain h-screen mt-[1vw] ml-[-15.25vh]"></div>
            
            <div className="py-2 absolute inset-x-0 top-0 text-[1.15vw]">
                
                {/* App Name */}   
                <div className={`${ isHovering? "pl-[2.75vw] duration-500" : "duration-250 pl-[8vw]" } flex py-4 1.5xl:py-8 text-highlight`}>            
                    <div className="flex-shrink-0 font-medium italic tracking-wider">
                        Kalatas: CAS GWA Verifier
                    </div>
                </div>

                {/* User Account Details */}
                <div className="flex gap-x-[0.5vw] 1.75xl:gap-x-[0.75vw] items-center">
                    
                    {/* User Icon */}
                    <img
                        className={` ${isHovering ? "scale-25 sm:scale-50 xl:scale-60 1.5xl:scale-60 1.75xl:scale-75 ml-1.5 xl:ml-2 1.5xl:ml-3 1.75xl:ml-5" : "scale-50" } rounded-full duration-500`}
                        width="90px"
                        height="90px"
                        alt="user-icon"
                        src={UserIcon}
                    />

                    {/* User Information */}
                    <div className="w-[13vw] ">
                        <div className="font-poppins font-medium truncate" id="userName"></div>
                        <div className="font-poppins truncate" id="position"></div>
                    </div>
                </div>
                
                {/* Navigation Pages */}
                <div className={` ${isHovering? "xl:mt-3 1.5xl:mt-4 1.75xl:mt-6 3xl:mt-7 4xl:mt-8" : "mt-1" } 
                                cursor-pointer grid grid-cols-1 duration-250 gap-[0.25vw] font-poppins font-medium`}>
                    
                    {/* Admin Dashboard */}
                    <div className="inline-flex items-center py-2 gap-x-[1.5vw] hover:bg-secondary-red hover:text-highlight" onClick={() => {navigate('/in/user-dashboard')}}>
                        <div>
                            <svg className={` ${isHovering? "ml-7 1.5xl:ml-8 1.75xl:ml-8": "ml-3.5 mr-1 xl:ml-5.5 xl:mr-2"} w-7 xl:w-8 duration-250 fill-current`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" >
                                <path d="M33 19a1 1 0 0 1-.71-.29L18 4.41 3.71 18.71A1 1 0 0 1 2.3 17.3l15-15a1 1 0 0 1 1.41 0l15 15A1 1 0 0 1 33 19Z"/>
                                <path d="M18 7.79 6 19.83V32a2 2 0 0 0 2 2h7V24h6v10h7a2 2 0 0 0 2-2V19.76Z"/>
                                <path fill="none" d="M0 0h36v36H0z"/>
                            </svg>
                        </div>
                        <div className="flex-shrink-0 ">
                            <span>Admin Dashboard</span>
                        </div>
                    </div>

                    {/* User Management */}
                    <div className="inline-flex items-center mt-2 px-1 py-2 my-10 gap-x-[1.25vw] hover:bg-secondary-red hover:text-highlight" onClick={() => {navigate('/in/user-management')}}>
                        <div>
                            <svg className={` ${isHovering? "ml-6 1.5xl:ml-7":"ml-2.5 mr-1 xl:ml-4 xl:mr-2"} w-7 xl:w-9 duration-250 fill-current`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                                <path d="M319.9 320c57.41 0 103.1-46.56 103.1-104s-46.54-104-103.1-104c-57.41 0-103.1 46.56-103.1 104-.9 57.4 45.7 104 103.1 104zm50 32h-99.8C191.6 352 128 411.7
                                128 485.3c0 14.8 12.7 26.7 28.4 26.7h327.2c15.7 0 28.4-11.9 28.4-26.7 0-73.6-63.6-133.3-142.1-133.3zM512 160c44.18 0 80-35.82 80-80S556.2 0 512 0c-44.18 0-80 35.82-80
                                80s35.8 80 80 80zm-328.1 56c0-5.449.982-10.63 1.609-15.91C174.6 194.1 162.6 192 149.9 192H88.08C39.44 192 0 233.8 0 285.3 0 295.6 7.887 304 17.62 304h199.5c-20.42-23.8-33.22-54.3-33.22-88zM128
                                160c44.18 0 80-35.82 80-80S172.2 0 128 0C83.82 0 48 35.82 48 80s35.82 80 80 80zm423.9 32h-61.84c-12.8 0-24.88 3.037-35.86 8.24.6 5.26 1.6 10.36 1.6 15.76 0 33.71-12.78 64.21-33.16 88h199.7c9.76
                                0 17.66-8.4 17.66-18.7 0-51.5-39.4-93.3-88.1-93.3z"/>
                            </svg>
                        </div>
                        <div className="flex-shrink-0">
                            <span>User Management</span>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Logout button*/}
            <div className="cursor-pointer flex items-center p-2 absolute bottom-8 gap-x-[1.5vw] font-poppins font-medium text-[1.15vw] hover:text-highlight" onClick={() => handleLogOut()}>
                <div>
                    <svg className={` ${isHovering? "ml-5 1.5xl:ml-6 1.75xl:ml-7" : "ml-2 mr-1 xl:ml-4 xl:mr-2" } w-7 xl:w-8 duration-250 fill-current`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M4 18h2v2h12V4H6v2H4V3a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3zm2-7h7v2H6v3l-5-4 5-4v3z"/>
                    </svg>
                </div>
                <span>Logout</span>
            </div>
        </nav>
    );
}


export default AdminNav;