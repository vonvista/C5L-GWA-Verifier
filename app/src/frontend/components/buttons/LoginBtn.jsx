import 'tailwindcss/tailwind.css';


// This button component is for the login button on the login page
// -- handleClick prop: function to handle click event

export const LoginBtn = ({ handleClick }) => {
  const loginbtn = `w-6/12 h-11 1.75xl:text-lg bg-button-green rounded-lg text-white font-montserrat font-semibold hover:shadow-lg hover:bg-button-green-hover`;

  return (
    <>
      <button className={loginbtn} type="submit" onClick={handleClick}>
        Log In
      </button>
    </>
  );
};