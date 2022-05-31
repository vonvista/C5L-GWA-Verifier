import 'tailwindcss/tailwind.css';


/* Parent component >> frontend/pages/login-page/LoginPage */

/* This button component is for the login button on the login page */
/* Props:
    handleClick  ---  function to handle click event
    disabled     ---  boolean; receives whether button should be disabled or not
*/
export const LoginBtn = ({ handleClick, disabled }) => {
  const loginbtn = `w-6/12 h-[4vh] text-[1vw] bg-button-green rounded-lg text-white font-montserrat font-semibold transition ease-out
        duration-300 hover:transition hover:ease-in hover:duration-300 hover:shadow-lg hover:bg-button-green-hover disabled:bg-sr-disabled-green`;

  return (
    <>
      <button className={loginbtn} type="submit" onClick={handleClick} disabled={disabled}>
        Log In
      </button>
    </>
  );
};