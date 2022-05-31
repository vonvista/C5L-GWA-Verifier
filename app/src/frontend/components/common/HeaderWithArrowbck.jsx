import { ChevronLeftIcon } from '@heroicons/react/solid';
import { useNavigate } from 'react-router-dom';
import 'tailwindcss/tailwind.css';


/* Parent component >> frontend/pages/student-record/StudentRecord */

/* This header shows the page title of the current page being displayed.
   Only used for the secondary pages (pages that are at least one level deeper than the primary navigation pages). */
/* Props:
    pageTitle   --- page title of the current page 
    arrow       --- boolean; receives whether arrow back should be displayed for the page header
*/
const HeaderWithArrowbck = ({ pageTitle, arrow }) => {

    const navigate = useNavigate();

    const goBack = () => {
        navigate('/in/user-dashboard');
    }

    return (
        <header className="flex w-full items-center absolute top-0 right-0 z-10 pl-[4vw] py-[1vh] bg-secondary-red hover:text-highlight text-sidebar-text">
            {
                arrow ?
                    <div
                        className="pl-[2vw] cursor-pointer  hover:bg-primary-red rounded-r-xl transition ease-out hover:transition hover:ease-in"
                        onClick={goBack}
                    >
                        <ChevronLeftIcon className="w-[2vw]"/>
                    </div>
                : <></>
            }
            <span className={`${ arrow ? "ml-[1vw]" : "ml-[3vw]" } text-[1.6vw] font-montserrat font-bold
                transition ease-out hover:transition hover:ease-in hover:duration-300`}>
                {pageTitle}
            </span>
        </header>
    );
};


export default HeaderWithArrowbck;