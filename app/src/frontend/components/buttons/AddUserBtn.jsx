import 'tailwindcss/tailwind.css';
import user1 from '../../../../assets/icons/user1.svg';


/* Parent component >> frontend/pages/user-management/UserManagementPage.jsx */

/* This function contains the Add User button used in User System Page.
   The modal window should appear once button is clicked. */
/* Props:
    handleclick --- handles and sets showModal variable to show the modal
*/
const AddUserBtn = ({ handleClick }) => {

    // styling
    const imgBtn = `.img-btn{
            width: 15vw;
            height: 5vh;
        }`;

    return (
        <>
            <style>{imgBtn}</style>
            <button
                className=" bg-button-green m-2 rounded-xl text-white font-montserrat font-bold hover:shadow-lg hover:bg-button-green-hover"
                type="button"
                onClick={handleClick}
            >
                <img
                    className="img-btn pt-[1vh]"
                    alt="icon"
                    src={user1}
                />
                <p className="text-[1vw] text-center py-1">Add User</p>
            </button>
        </>
    );
};

export default AddUserBtn;
