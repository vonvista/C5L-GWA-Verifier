import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import UserIcon from '../../../../assets/icons/default-user-icon.png';
import 'tailwindcss/tailwind.css';


/* Parent component >> src/renderer/App.jsx */

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
            className={` ${isHovering ? "w-[20vw]" : "w-[4vw]"}
                        h-full overflow-hidden fixed top-0 duration-300 min-w-min z-20 bg-primary-red text-sidebar-text`}
        >
            {/* Baybayin Background Image */}
            <div className="bg-baybayin bg-repeat-y bg-contain h-screen mt-[1vw] ml-[-15.25vh]"></div>
            
            <div className="absolute inset-x-0 top-0 text-[1.15vw] pt-[3vh]">
                
                {/* App Name */}   
                <div className={`${ isHovering? "pl-[2.75vw] duration-500" : "pl-[8vw] duration-250" } py-[2vh] flex text-highlight`}>            
                    <div className="flex-shrink-0 font-medium italic tracking-wider">
                        Kalatas: CAS GWA Verifier
                    </div>
                </div>

                {/* User Account Details */}
                <div className="flex 1.5xl:gap-x-[0.5vw] 1.75xl:gap-x-[0.75vw] 5xl:gap-x-[1.5vw] 1.75xl:mt-[2vh] items-center">
                    
                    {/* User Icon */}
                    <img
                        className={` ${isHovering ? "scale-25 sm:scale-50 1.5xl:scale-60 3xl:scale-75 5xl:scale-100 xl:ml-[0.5vw] 1.5xl:ml-[1.3vw] 5xl:ml-[2vw]" : "scale-50 5xl:ml-[0.2vw]" } rounded-full duration-500`}
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
                <div className={` ${isHovering? "2xl:mt-[1.5vh] 5xl:mt-[2.5vh]" : "mt-1" } 
                                cursor-pointer grid grid-cols-1 duration-250 gap-[0.25vw] font-poppins font-medium`}>
                    
                    {/* User Dashboard */}
                    <div className="inline-flex items-center py-[1vh] gap-x-[1.5vw] hover:bg-secondary-red hover:text-highlight" onClick={() => {navigate('/in/user-dashboard')}}>
                        <div>
                            <svg className={` ${isHovering? "ml-[2.25vw]": "ml-[1.05vw]"} w-[1.75vw] duration-250 fill-current`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" >
                                <path d="M33 19a1 1 0 0 1-.71-.29L18 4.41 3.71 18.71A1 1 0 0 1 2.3 17.3l15-15a1 1 0 0 1 1.41 0l15 15A1 1 0 0 1 33 19Z"/>
                                <path d="M18 7.79 6 19.83V32a2 2 0 0 0 2 2h7V24h6v10h7a2 2 0 0 0 2-2V19.76Z"/>
                                <path fill="none" d="M0 0h36v36H0z"/>
                            </svg>
                        </div>
                        <div className="flex-shrink-0 ">
                            <span>User Dashboard</span>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Logout button*/}
            <div className="cursor-pointer flex items-center py-2 absolute bottom-8 5xl:bottom-[4vh] gap-x-[1.5vw] font-poppins font-medium text-[1.15vw] hover:text-highlight" onClick={() => handleLogOut()}>
                <div>
                    <svg className={` ${isHovering? "ml-[2.25vw]" : "ml-[1.15vw]" } w-[1.75vw] duration-250 fill-current`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M4 18h2v2h12V4H6v2H4V3a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3zm2-7h7v2H6v3l-5-4 5-4v3z"/>
                    </svg>
                </div>
                <span>Logout</span>
            </div>
        </nav>
    );
}


export default UserNav;