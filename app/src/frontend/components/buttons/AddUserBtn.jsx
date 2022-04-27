import 'tailwindcss/tailwind.css';
import user1 from '../../../../assets/icons/user1.svg';

// function contains the Add User button used in User System Page
// modal should appear once button is clicked
// handleClick handles and sets showModal variable to show the modal

const AddUserBtn = ({ handleClick }) => {
  // img button styling
  const btn = `.btn{
        height: 5vh;
    }`;

  const imgBtn = `.img-btn{
        width: 5vw;
        height: 3vh;
    }`;

  const textBtn = `.text-btn{
        font-size: 1vw;
        margin-right: 3vw;
    }`;

  return (
    <>
      {/* img button styling */}
      <style>{btn}</style>
      <style>{imgBtn}</style>
      <style>{textBtn}</style>
      <button
        className="bg-login-green m-2 rounded-xl text-white font-montserrat font-bold hover:shadow-lg hover:bg-login-green-hover btn"
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
