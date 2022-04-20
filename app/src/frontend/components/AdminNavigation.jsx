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
    const [isHovering, setIsHovering] = useState(true);
  
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
  

const AdminNav = () => {
    const [hoverRef, isHovering] = useHover();
      
    return (
        <div 
            ref={hoverRef}
            className={` ${
            isHovering ? "w-1/4 3xl:w-1/5" : "w-20"
            } duration-300 bg-primary-red h-screen text-sidebar-text overflow-hidden sticky top-0 min-w-min
            `}
        >
            <div className="bg-baybayin bg-repeat-y object-cover h-screen bg-contain lg:-ml-20 3xl:-ml-32"></div>
            <div className="absolute py-2.5 top-0 inset-x text-sm xl:text-lg 1.5xl:text-xl">

                {/* App Name */}   
                <div className={`${ isHovering? "place-content-center" : "px-28 duration-300 flex-shrink-0" } flex px-24 py-4 1.5xl:py-8 text-highlight`}>            
                    <div className="flex-shrink-0">
                        Kalatas: CAS GWA Verifier
                    </div>
                </div>

                {/* User Account Details */}
                <div className="flex gap-x-0 1.5xl:gap-x-4 items-center">
                    <img
                        className={` ${isHovering ? "ml-3 scale-50 1.5xl:ml-5 1.5xl:scale-75 duration-500" : "ml-0 scale-50 duration-500" } rounded-full `}
                        width="85px"
                        height="85px"
                        alt="usericon"
                        src={user}
                    />

                    <div className="flex-shrink-0">
                        <div><strong>Juan Dela Cruz</strong></div>
                        <div>jvdelacruz</div>
                    </div>
                </div>
                
                {/* Navigation Pages */}
                <div className=" grid grid-cols-1 cursor-pointer">

                    {/* Admin Dashboard */}
                    <div className={` ${isHovering? "mt-0 xl:mt-5" : "mt-2" } duration-300 flex gap-x-4  items-center p-1 1.5xl:p-2 hover:bg-secondary-red hover:text-highlight`}>
                        <div>
                            <svg className={` ${isHovering? "ml-6 1.5xl:ml-6": "ml-5 1.5xl:ml-4"} scale-90 1.5xl:scale-100 duration-300  fill-current`} xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 36 36" >
                                <path d="M33 19a1 1 0 0 1-.71-.29L18 4.41 3.71 18.71A1 1 0 0 1 2.3 17.3l15-15a1 1 0 0 1 1.41 0l15 15A1 1 0 0 1 33 19Z" class="clr-i-solid clr-i-solid-path-1"/>
                                <path d="M18 7.79 6 19.83V32a2 2 0 0 0 2 2h7V24h6v10h7a2 2 0 0 0 2-2V19.76Z" class="clr-i-solid clr-i-solid-path-2"/>
                                <path fill="none" d="M0 0h36v36H0z"/>
                            </svg>
                        </div>
                        <div className="pl-3 flex-shrink-0 ">
                            <span>Admin Dashboard</span>
                        </div>
                    </div>

                    {/* User System */}
                    <div className="inline-flex mt-2 items-center p-1 1.5xl:p-2 hover:bg-secondary-red hover:text-highlight">
                        <div>
                            <svg className={` ${isHovering? "ml-5":"ml-4 1.5xl:ml-3"} scale-90 1.5xl:scale-100 fill-current duration-300`} xmlns="http://www.w3.org/2000/svg" width="35" height="30" viewBox="0 0 640 512">
                                <path d="M319.9 320c57.41 0 103.1-46.56 103.1-104s-46.54-104-103.1-104c-57.41 0-103.1 46.56-103.1 104-.9 57.4 45.7 104 103.1 104zm50 32h-99.8C191.6 352 128 411.7
                                128 485.3c0 14.8 12.7 26.7 28.4 26.7h327.2c15.7 0 28.4-11.9 28.4-26.7 0-73.6-63.6-133.3-142.1-133.3zM512 160c44.18 0 80-35.82 80-80S556.2 0 512 0c-44.18 0-80 35.82-80
                                80s35.8 80 80 80zm-328.1 56c0-5.449.982-10.63 1.609-15.91C174.6 194.1 162.6 192 149.9 192H88.08C39.44 192 0 233.8 0 285.3 0 295.6 7.887 304 17.62 304h199.5c-20.42-23.8-33.22-54.3-33.22-88zM128
                                160c44.18 0 80-35.82 80-80S172.2 0 128 0C83.82 0 48 35.82 48 80s35.82 80 80 80zm423.9 32h-61.84c-12.8 0-24.88 3.037-35.86 8.24.6 5.26 1.6 10.36 1.6 15.76 0 33.71-12.78 64.21-33.16 88h199.7c9.76
                                0 17.66-8.4 17.66-18.7 0-51.5-39.4-93.3-88.1-93.3z"/>
                            </svg>
                        </div>
                        <div className="pl-7 flex-shrink-0">
                            <span>User System</span>
                        </div>
                    </div>

                    {/* Curriculum Management */}
                    <div className="inline-flex mt-2 items-center p-1 1.5xl:p-2 hover:bg-secondary-red hover:text-highlight">
                        <div>
                            <svg className={` ${isHovering? "ml-6":"ml-5 1.5xl:ml-4"} scale-90 1.5xl:scale-100 fill-current duration-300`} xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
                                <path d="M8 5h13v2H8V5Zm-5-.5h3v3H3v-3Zm0 6h3v3H3v-3Zm0 6h3v3H3v-3ZM8 11h13v2H8v-2Zm0 6h13v2H8v-2Z"/>
                            </svg>
                        </div>
                        <div className="pl-7 flex-shrink-0">
                            <span>Curriculum Management</span>
                        </div>

                    </div>
                </div>
            </div>

            {/* Logout */}
            <div className="absolute bottom-8 flex gap-x-4 items-center p-2 text-sm xl:text-lg 2xl:text-xl hover:text-highlight">
                <div>
                    <svg className="ml-5 fill-current scale-90 1.5xl:scale-100" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
                        <path d="M4 18h2v2h12V4H6v2H4V3a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3zm2-7h7v2H6v3l-5-4 5-4v3z"/>
                    </svg>
                </div>
                <div className="pl-3">
                    <span>Logout</span>
                </div>
            </div>
        </div>
    );
}

export default AdminNav