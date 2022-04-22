/* eslint-disable react/prop-types */
import 'tailwindcss/tailwind.css';

// Function contains the button in the dashboard
// icon prop: svg file
// text prop: text label
// handleClick prop: function to handle click event
const DashboardBtn = ({ icon, text, handleClick }) => {
  const textClass = `w-1/6 h-14 text-sm hover:bg-red-hover rounded-lg justify-items-center bg-red`;
  return (
    <>
      <button className={textClass} type="button" onClick={handleClick}>
        <img
          className="pb-1 grow-0 inline-flex"
          width="30px"
          height="30px"
          alt="icon"
          src={icon}
        />
        <p className="p-2 ml-3 grow-0 inline-flex text-white">{text}</p>
      </button>
    </>
  );
};

export default DashboardBtn;
