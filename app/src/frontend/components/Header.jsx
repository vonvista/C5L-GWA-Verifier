import 'tailwindcss/tailwind.css';
import arrowbck from '../../../assets/icons/previous.svg';

const Header = ({ pageTitle }) => {
    return (
        <header className="flex w-full -mr-20 -z-10 items-center absolute top-0 right-0 bg-secondary-red text-sidebar-text py-4">
            <img
                className="ml-4"
                width="30px" 
                height="30px"
                src={arrowbck}
            />
            <span className="text-xl 2xl:text-2xl font-bold ml-1 2xl:ml-2">
                {pageTitle}
            </span>
        </header>
    );
};


export default Header;