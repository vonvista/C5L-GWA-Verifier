import 'tailwindcss/tailwind.css';

// pageTitle prop: current page title

// This header shows the page title of the current page being displayed
// Only used for the primary navigation pages
const HeaderWithoutArrowbck = ({ pageTitle }) => {
    return (
        <header className="flex w-full items-center absolute top-0 right-0 bg-secondary-red text-sidebar-text py-2.5 xl:py-3.5 2xl:py-4 duration-300">
            <span className="text-md lg:text-xl 1.75xl:text-3xl font-montserrat font-bold pl-10 lg:pl-12 1.5xl:pl-16 duration-300">
                {pageTitle}
            </span>
        </header>
    );
};


export default HeaderWithoutArrowbck;