import 'tailwindcss/tailwind.css';
import { useState, useCallback, useRef } from 'react';
import user from '../../../assets/icons/default-user-icon.jpg';


/* Importing to Pages
<div>
    <div><Sidebar /></div>
    <div className="absolute inset-0 flex ml-24 items-center">
        <span>Page Contents</span>    
    </div>
</div>
*/


// Referenced from https://www.30secondsofcode.org/react/s/use-hover
const useHover = () => {
    const [isHovering, setIsHovering] = useState(false);
  
    const handleMouseOver = useCallback(() => setIsHovering(true), []);
    const handleMouseOut = useCallback(() => setIsHovering(false), []);
  
    const nodeRef = useRef();
  
    const callbackRef = useCallback(
      node => {
        if (nodeRef.current) {
          nodeRef.current.removeEventListener('mouseover', handleMouseOver);
          nodeRef.current.removeEventListener('mouseout', handleMouseOut);
        }
  
        nodeRef.current = node;
  
        if (nodeRef.current) {
          nodeRef.current.addEventListener('mouseover', handleMouseOver);
          nodeRef.current.addEventListener('mouseout', handleMouseOut);
        }
      },
      [handleMouseOver, handleMouseOut]
    );
  
    return [callbackRef, isHovering];
};
  

const UserNav = () => {
    const [hoverRef, isHovering] = useHover();
      
    return (
        <div 
            ref={hoverRef}
            className={` ${
            isHovering ? "w-1/4 xl:w-1/5" : "w-20 "
            } duration-300 bg-primary-red h-screen text-sidebar-text overflow-hidden sticky top-0`}
        >
            {/* <div className="flex place-content-center p-8">
                <div className={` ${ isHovering? "visible duration-300" : "hidden duration-10000" } flex-shrink-0  `}> */}
            <div className="flex px-24 py-8">
                <div className={` ${ isHovering? "place-content-center" : "" } flex-shrink-0  `}>
                    Kalatas: CAS GWA Verifier
                </div>
            </div>

            {/* User Account Details */}
            <div className="flex gap-x-4 items-center text-lg">
                <img
                    className={` ${isHovering ? "ml-5 duration-500" : "ml-0 scale-50 duration-500" } rounded-full `}
                    width="85px"
                    height="85px"
                    alt="usericon"
                    src={user}
                />
                <div className="pl-3 flex-shrink-0">
                    <div><strong>Juan Dela Cruz</strong></div>
                    <div>jvdelacruz</div>
                    <div>SHAC Committee Member</div>
                </div>
            </div>
            
            {/* Navigation Pages */}
            <div className="grid grid-cols-1 cursor-pointer text-xl">

                {/* User Dashboard */}
                <div className={` ${isHovering? "mt-10" : "mt-2" } duration-300 flex gap-x-4 items-center p-2 hover:bg-secondary-red hover:text-highlight`}>
                    <div>
                        <svg className={` ${!isHovering && "ml-4"} ml-5 fill-current`} xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 36 36" >
                            <path d="M33 19a1 1 0 0 1-.71-.29L18 4.41 3.71 18.71A1 1 0 0 1 2.3 17.3l15-15a1 1 0 0 1 1.41 0l15 15A1 1 0 0 1 33 19Z" class="clr-i-solid clr-i-solid-path-1"/>
                            <path d="M18 7.79 6 19.83V32a2 2 0 0 0 2 2h7V24h6v10h7a2 2 0 0 0 2-2V19.76Z" class="clr-i-solid clr-i-solid-path-2"/>
                            <path fill="none" d="M0 0h36v36H0z"/>
                        </svg>
                    </div>
                    <div className="pl-3 flex-shrink-0">
                        <span>User Dashboard</span>
                    </div>
                </div>

                {/* Logout */}
                <div className="absolute bottom-8 flex gap-x-4 items-center p-2 hover:text-highlight">
                    <div>
                        <svg className="ml-5 fill-current" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
                            <path d="M4 18h2v2h12V4H6v2H4V3a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3zm2-7h7v2H6v3l-5-4 5-4v3z"/>
                        </svg>
                    </div>
                    <div className="pl-7">
                        <span>Logout</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserNav