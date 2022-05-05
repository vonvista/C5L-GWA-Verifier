import 'tailwindcss/tailwind.css';

// For verifying student record
//
//PROPS:
//handleVerify handle click event
//state is for additional props usage is state.propName
const Verify = ({ handleVerify, ...state }) => {
  const verifybtn = `w-full h-11 m-0 bg-login-green rounded-md text-white font-montserrat font-bold transition-all ease-out delay-150 hover:text-lg hover:transition-all hover:ease-in hover:delay-200 hover:shadow-lg hover:bg-login-green-hover disabled:bg-sr-disabled-green disabled:hover:shadow-none`;

  return (
    <>
      <button className={verifybtn} disabled={state.isDisabled} type="button" onClick={handleVerify}>
        Verify
      </button>
    </>
  );
};

export default Verify;
