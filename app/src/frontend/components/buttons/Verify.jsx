import 'tailwindcss/tailwind.css';


/* Parent component >> Status.jsx */

/* This button is used for verifying the student record in the student record page. */
/* Props:
    state         ---  used for additional props; usage is state.propName
    handleVerify  ---  function to handle click event
*/
const Verify = ({ handleVerify, ...state }) => {
  const verifybtn = `w-full h-11 m-0 bg-button-green rounded-md text-white font-montserrat font-bold transition-all ease-out delay-150 hover:text-lg hover:duration-300 hover:shadow-lg hover:bg-button-green-hover disabled:bg-sr-disabled-green disabled:hover:shadow-none`;

  return (
    <>
      <button className={verifybtn} disabled={state.isDisabled} type="button" onClick={handleVerify}>
        Verify
      </button>
    </>
  );
};


export default Verify;