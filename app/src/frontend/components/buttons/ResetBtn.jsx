import 'tailwindcss/tailwind.css';
import { FolderRemoveIcon } from '@heroicons/react/outline';


/* Parent component >> frontend/pages/dashboards/UserDashboard */

/* This function contains a functioning Reset button. */
/* Props:
    handleClick  ---  function to handle click event
*/
const Reset = ({ handleClick }) => {
  const resetbtn = `w-[11vw] h-[4.85vh] font-montserrat font-medium px-[1vw] bg-[#823838] rounded-xl mr-2 text-white text-base font-montserrat font-bold transition ease-out duration-300 hover:transition hover:ease-in hover:duration-300 hover:shadow-lg hover:bg-[#874646]`;

  return (
    <>
      <button className={resetbtn} type="button" onClick={handleClick}>
        <FolderRemoveIcon className="p-0.25 ml-0.25 mr-2.5 inline-flex w-[2vw] h-[2vw]"/>
        <p className="text-[0.9vw] inline-block">Clear all data</p>
      </button>
    </>
  );
};


export default Reset;