import 'tailwindcss/tailwind.css';
import { FolderRemoveIcon } from '@heroicons/react/outline';


/* Parent component >> frontend/pages/dashboards/UserDashboard */

/* This function contains a functioning Reset button. */
/* Props:
    handleClick  ---  function to handle click event
*/
const Reset = ({ handleClick }) => {
  const resetbtn = `w-[11vw] h-[4.85vh] font-montserrat font-medium px-[1vw] bg-[#823838] rounded-xl mr-2 text-white text-base font-montserrat font-bold transition ease-out hover:transition hover:ease-in hover:shadow-lg hover:bg-[#874646]`;

  return (
    <>
      <button className={resetbtn} type="button" onClick={handleClick}>
        <FolderRemoveIcon className="p-0.25 mx-[0.25vw] inline-flex w-[2vw] h-[2vw]"/>
        <p className="text-[0.9vw] ml-[0.3vw] inline-block">Clear all data</p>
      </button>
    </>
  );
};


export default Reset;