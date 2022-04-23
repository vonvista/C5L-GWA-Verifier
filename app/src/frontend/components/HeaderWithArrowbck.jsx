import 'tailwindcss/tailwind.css';
import arrowbck from '../../../assets/icons/previous.svg';

const HeaderWithArrowbck = ({ pageTitle }) => {
    return (
        <header className="flex w-full -mr-20 -z-10 items-center absolute top-0 right-0 bg-secondary-red text-sidebar-text py-3">
            <a href="#" className="pl-4 hover:bg-primary-red cursor-pointer">
                <img src={arrowbck}/>
            </a>
            <span className="text-3xl font-bold pl-1 2xl:pl-2">
                {pageTitle}
            </span>
        </header>
    );
};


export default HeaderWithArrowbck;