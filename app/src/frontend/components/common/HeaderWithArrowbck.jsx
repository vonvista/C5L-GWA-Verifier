import 'tailwindcss/tailwind.css';
import arrowbck from '../../../../assets/icons/previous.svg';
import { useNavigate } from 'react-router-dom';


/* Parent component >> frontend/pages/student-record/StudentRecord.jsx */

/* This header shows the page title of the current page being displayed.
   Only used for the secondary pages (pages that are at least one level deeper than the primary navigation pages). */
/* Props:
    pageTitle   --- page title of the current page 
*/
const HeaderWithArrowbck = ({ pageTitle }) => {

    const navigate = useNavigate();

    goBack = () => {
        navigate('/user-dashboard');
    }

    return (
        <header className="flex w-full items-center absolute top-0 right-0  bg-secondary-red  text-sidebar-text py-2.5 xl:py-3.5 2xl:py-4 duration-300">
            <div className="pl-7 xl:pl-10  hover:bg-primary-red cursor-pointer duration-300">
                <img 
                    className="w-6 lg:w-7 1.75xl:w-9"    
                    src={arrowbck}
                    onClick = {goBack}
                />
            </div>
            <span className="text-md lg:text-xl 1.75xl:text-3xl font-montserrat font-bold pl-1.5 xl:pl-2 duration-300">
                {pageTitle}
            </span>
        </header>
    );
};


export default HeaderWithArrowbck;