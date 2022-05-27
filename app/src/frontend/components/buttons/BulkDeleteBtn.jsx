import 'tailwindcss/tailwind.css';
import { TrashIcon } from '@heroicons/react/outline';


/* Parent Component >> frontend/pages/dashboards/UserDashboard */

/* This function that contains a functioning Reset button */
/* Props:
    handleClick  --- function to handle click event
*/
const BulkDeleteBtn = ({ handleClick }) => {
  const resetbtn = `w-[11vw] h-[4.85vh] font-montserrat font-medium px-[1vw] bg-[#823838] rounded-xl mr-2 text-white text-base font-montserrat font-bold hover:shadow-lg hover:bg-[#874646]`;

  return (
    <>
      <button className={resetbtn} type="button" onClick={handleClick}>
        <TrashIcon className=" p-0.25 ml-0.25 mr-2.5 inline-flex w-[1.7vw] h-[1.7vw]" />
        <p className="text-[0.9vw] inline-block">Bulk Delete</p>
      </button>
    </>
  );
};


export default BulkDeleteBtn;