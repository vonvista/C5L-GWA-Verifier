import 'tailwindcss/tailwind.css';
import user1 from '../../../../assets/icons/user1.svg';

// This function contains the Add User button used in User System Page.
// The modal window should appear once button is clicked.
// -- handleClick prop: handles and sets showModal variable to show the modal

const AddUserBtn = ({ handleClick }) => {

  // styling
  const imgBtn = `.img-btn{
        width: 15vw;
        height: 5vh;
        padding-top: 1vh
    }`;

  const textBtn = `.text-btn{
        font-size: 1vw;
        text-align:center;
    }`;

  return (
    <>
      <style>{imgBtn}</style>
      <style>{textBtn}</style>
      <button
        className=" bg-login-green m-2 rounded-xl text-white font-montserrat font-bold hover:shadow-lg hover:bg-login-green-hover"
        type="button"
        onClick={handleClick}
      >
        <img
          className="p-0.25 ml-0.25 inline-block grow img-btn"
          alt="icon"
          src={user1}
        />
        <p className="text-sm inline-block text-btn">Add User</p>
      </button>
    </>
  );
};

export default AddUserBtn;
