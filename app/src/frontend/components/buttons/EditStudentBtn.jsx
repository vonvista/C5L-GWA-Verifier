import 'tailwindcss/tailwind.css';
import { useState } from 'react';

/* Components */
import EditStudentDetails from 'frontend/pages/student-record/StudentDetailEditModal';



/* Parent component >> frontend\components\buttons\Dropdown.jsx */

/* Function contains the Edit button from Student Record View/Edit Page's Dropdown Menu */
/* 
   Props:
    -- handleClick prop: function to handle click event
*/

const EditBtn = () => {
  
  /*-------------------- Styling --------------------*/
  const editBtnStyle = `text-gray-700 block px-4 rounded-xl py-2 text-sm z-1 w-full hover:bg-button-green-hover`;
  
  /*-------------------- State handlers --------------------*/
  const [valueClicked, setValueClicked] = useState('Actions');
  const [isActive, setIsActive] = useState(false);
  

  /*-------------------- Functions --------------------*/

  // Function to open the add row modal window
  const openModal = () => {
    setIsActive(true);
  }

  // Function to close the add row modal window
  const closeEditRow = () => {
    setIsActive(false);
  }


  return (
    <>
      <EditStudentDetails
        onClick={() => {
          setIsActive(!isActive);
          setValueClicked('Edit');
        }}
        modalState={isActive}
        handleClose={closeEditRow}
        />

      {/* Edit Students button */}
      <button
        className={editBtnStyle}
        type="button"
        onClick={openModal}
      >
        <p className="text-white">Edit</p>
      </button>
    </>
  );
};

export default EditBtn;
