import 'tailwindcss/tailwind.css';


// Parent component >> Status.jsx

// This button is used for verifying student record in Student Record Page
// -- state prop    : used for additional props; usage is state.propName
// -- handleVerify  : function to handle click event

const Verify = ({ handleVerify, ...state }) => {
  const verifybtn = `w-full h-11 m-0 bg-button-green rounded-md text-white font-montserrat font-bold transition-all ease-out delay-150 hover:text-lg hover:transition-all hover:ease-in hover:delay-200 hover:shadow-lg hover:bg-button-green-hover disabled:bg-sr-disabled-green disabled:hover:shadow-none`;

  return (
    <>
      <button className={verifybtn} disabled={state.isDisabled} type="button" onClick={handleVerify}>
        Verify
      </button>
    </>
  );
};

export default Verify;
