import 'tailwindcss/tailwind.css';


// This button component is used for text that acts like buttons
// -- text prop     : text label of button
// -- handleClick   : function to handle click event

const TextBtn = ({ text, handleClick }) => {
  const textClass = `w-30 h-10 hover:text-stone-100 font-poppins rounded-lg`;
  return (
    <>
      <button className={textClass} type="button" onClick={handleClick}>
        <p className="p-2">{text}</p>
      </button>
    </>
  );
};

export default TextBtn;
