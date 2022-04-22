import 'tailwindcss/tailwind.css';

const HeaderWithoutArrowbck = ({ pageTitle }) => {
    return (
        <header className="flex w-full -mr-20 -z-10 items-center absolute top-0 right-0 bg-secondary-red text-sidebar-text py-3">
            <span className="text-3xl font-bold pl-4 2xl:pl-6">
                USER DASHBOARD{pageTitle}
            </span>
        </header>
    );
};


export default HeaderWithoutArrowbck;