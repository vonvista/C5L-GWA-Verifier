import 'tailwindcss/tailwind.css';


/* Parent component >> frontend/pages/login-page/LoginPage */

/* This button component is used for text that acts like a button. */
/* Props:
    text         ---  text label of button
    handleClick  ---  function to handle click event
*/
const TextBtn = ({ text, handleClick }) => {
  const textClass = `w-30 h-10 transition ease-out hover:transition hover:ease-in hover:text-stone-100 font-poppins rounded-lg`;
  return (
    <>
      <button className={textClass} type="button" onClick={handleClick}>
        <p className="p-2">{text}</p>
      </button>
    </>
  );
};


export default TextBtn;