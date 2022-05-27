import 'tailwindcss/tailwind.css';


/* Parent component >> frontend/pages/login-page/LoginPage */

/* This button component is for the login button on the login page */
/* Props:
    handleClick  ---  function to handle click event
*/
export const LoginBtn = ({ handleClick, disabled }) => {
  const loginbtn = `w-6/12 h-11 1.75xl:text-lg bg-button-green rounded-lg text-white font-montserrat font-semibold hover:shadow-lg hover:bg-button-green-hover
                    disabled:bg-sr-disabled-green`;

  return (
    <>
      <button className={loginbtn} type="submit" onClick={handleClick} disabled={disabled}>
        Log In
      </button>
    </>
  );
};