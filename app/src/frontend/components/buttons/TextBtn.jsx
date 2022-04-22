/* eslint-disable react/prop-types */
import 'tailwindcss/tailwind.css';

// text prop: text label of button
// handleClick prop: function to handle click event
// used for buttons like Terms of Service in the login page
const TextBtn = ({ text, handleClick }) => {
  const textClass = `w-30 h-10 hover:text-stone-100 rounded-lg`;
  return (
    <>
      <button className={textClass} type="button" onClick={handleClick}>
        <p className="p-2">{text}</p>
      </button>
    </>
  );
};

export default TextBtn;
