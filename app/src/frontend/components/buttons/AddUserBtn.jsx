import 'tailwindcss/tailwind.css';
import user1 from '../../../../assets/icons/user1.svg';

/* Parent component >> frontend/pages/user-management/UserManagementPage */

/* This function contains the Add User button used in User System Page.
   The modal window should appear once button is clicked. */
/* Props:
    handleclick --- handles and sets showModal variable to show the modal
*/
const AddUserBtn = ({ handleClick }) => {

    // Styling
    const adduserbtn = `w-[12vw] h-[4.25vw] m-2 text-white rounded-xl bg-button-green transition ease-out hover:transition hover:ease-in hover:shadow-lg hover:bg-button-green-hover`;

    return (
        <>
            <button
                className={adduserbtn}
                type="button"
                onClick={handleClick}
            >
                <img
                    className="inline-flex w-[2vw] -mt-1.5 h-[2vw]"
                    alt="icon"
                    src={user1}
                />
                <p className="text-[1.2vw] font-poppins ml-4 inline-block">Add User</p>
            </button>
        </>
    );
};


export default AddUserBtn;