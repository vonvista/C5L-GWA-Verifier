import 'tailwindcss/tailwind.css';
import user1 from '../../../../assets/icons/user1.svg';


/* Parent component >> frontend/pages/user-management/UserManagementPage.jsx */

/* This function contains the Add User button used in User System Page.
   The modal window should appear once button is clicked. */
/* Props:
    handleclick --- handles and sets showModal variable to show the modal
*/
const AddUserBtn = ({ handleClick }) => {

//Styling
const adduserbtn = `w-[12vw] h-[5vw] bg-button-green m-2 rounded-xl text-white text-base font-montserrat font-bold hover:shadow-lg hover:bg-button-green-hover`;

return (
    <>
      <button
        className={adduserbtn}
        type="button"
        onClick={handleClick}
      >
        <img
          className="p-0.25 ml-0.25 mr-1.5 inline-flex w-[2vw] h-[2vw]"
          alt="icon"
          src={user1}
        />
        <p className="text-[1.2vw] inline-block">Add User</p>
      </button>
    </>
    );
};

export default AddUserBtn;
