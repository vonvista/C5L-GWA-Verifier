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
        <header className="flex w-full items-center absolute top-0 right-0 z-10 pl-[4vw] bg-secondary-red hover:text-highlight text-sidebar-text py-2.5 xl:py-3.5 2xl:py-4">
            {
                arrow ?
                    <div className="pl-7 xl:pl-10 cursor-pointer  hover:bg-primary-red transition ease-out hover:transition hover:ease-in">
                        <ChevronLeftIcon className="w-6 lg:w-7 1.75xl:w-9" onClick={goBack}/>
                    </div>
                : <></>
            }
            <span className={`${ arrow ? "ml-5" : "pl-8 lg:pl-10 xl:pl-12" } text-md lg:text-xl 1.75xl:text-3xl font-montserrat font-bold
                transition ease-out hover:transition hover:ease-in hover:duration-300`}>
                {pageTitle}
            </span>
        </header>
    );
};


export default HeaderWithArrowbck;