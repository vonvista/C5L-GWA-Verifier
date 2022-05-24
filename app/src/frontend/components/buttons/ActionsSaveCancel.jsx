import { useState } from 'react';

import Justification from 'frontend/pages/student-record/grades-table/Justification';
import { CheckCircleIcon , XCircleIcon } from '@heroicons/react/solid'
import 'tailwindcss/tailwind.css';

// Parent Component : frontend\pages\student-record\grades-table\EditRow.jsx
// This function contains the Save and Cancel action buttons for the student record page
// -- handleSave prop   : handles click event for save button
// -- handleCancel      : handles click event for cancel button

const ActionsSaveCancel = ({ handleSave, handleCancel, isValid, isTouched, handleHistory, values, sem }) => {

  const buttons = `transition-all ease-in-out delay-150 text-[rgb(107 114 128)] hover:transition-all hover:ease-out hover:delay-150 w-8 h-8 hover:text-[#141414] hover:bg-slate-300 rounded-3xl bg-slate-200 relative mx-1 grow`; // styling of button
  const disabled = `disabled:ease-in disabled:transition disabled:delay-150 disabled:text-slate-300 disabled:bg-slate-100`

  // state handler for modal button
  const [isOpen, setIsOpen] = useState(false);
  const [histTitle, setTitle] = useState(`Edited student grade row from Course: ${values.courseName}, Units: ${values.units}, and Grade: ${values.grade} to `);

  // const [histTitle, setTitle] = useState('Edit This portion now ActionsSaveCancel.jsx:25');

  if (isTouched==null) // if null, assume that inputs haven't been touched
    isTouched = false;

  function openModal() {
    setIsOpen(true)
  }

  function closeModal() {
    setIsOpen(false)
  }

  // update history list dynamically
  function setHistory(data){

    // new history for history tab change handler
    let updateHistory = {
        date: new Date().toLocaleDateString(),
        info: [
            {
            main: histTitle,
            user: data.user,
            time: new Date().toLocaleTimeString('en-US', { 
                hour12: false, 
                hour: "numeric", 
                minute: "numeric"
            }),
            details: data.desc,
            },
        ],
    }

    // history handler
    handleHistory(updateHistory);

  }

  return (
    <>
      <Justification modalState={isOpen} modalHandler={closeModal} parentSubmitHandler={handleSave} handleHistory={setHistory} histTitle={histTitle}/>

      <div className="mx-auto w-auto items-center justify-items-center inline-block">
        {/* Save button */}
        <button className={`${buttons}${disabled}`} type="button" 
          onClick={() => {
              openModal();
              setTitle(`${histTitle} Course: ${values.courseName}, Units: ${values.units}, and Grade: ${values.grade} on Semester: ${sem}`); // add new values to end of history title
            }} 
          disabled={!(isValid && isTouched)}>
          <CheckCircleIcon/>
        </button>

        {/* Cancel button */}
        <button className={buttons} type="button" onClick={handleCancel}>
          <XCircleIcon/>
        </button>
      </div>
    </>
    
  );
};

export default ActionsSaveCancel;
