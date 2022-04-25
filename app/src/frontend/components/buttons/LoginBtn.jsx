import 'tailwindcss/tailwind.css';

//Button for login 
//
//PROPS:
//handleClick: function to handle click event
//
export const LoginBtn = ({ handleClick }) => {
  const loginbtn = `w-6/12 h-11 1.75xl:text-lg bg-login-green rounded-lg text-white font-montserrat font-bold hover:shadow-lg hover:bg-login-green-hover`;

  return (
    <>
      <button className={loginbtn} type="submit" onClick={handleClick}>
        Log In
      </button>
    </>
  );
};