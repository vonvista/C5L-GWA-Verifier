import { useState } from 'react';

import Justification from 'frontend/pages/student-record/grades-table/Justification';
import deleteSVG from '../../../../assets/icons/delete.svg';
import edit from '../../../../assets/icons/edit.svg';
import 'tailwindcss/tailwind.css';


// This function contains the Save and Cancel action buttons for the student record page
// -- handleSave prop   : handles click event for save button
// -- handleCancel      : handles click event for cancel button

const ActionsSaveCancel = ({ handleSave, handleCancel, isValid, isTouched, handleHistory }) => {
  const btn = `
    .btn{
      width: 2vw;
      height: 2vw;
  }`; // styling of image inside the button

  const buttons = `transition-all ease-in-out delay-150 text-[#121212] hover:transition-all hover:ease-out hover:delay-150 w-8 h-8 hover:bg-slate-300 rounded-3xl bg-slate-200 relative mx-1 grow btn`; // styling of button
  const disabled = `disabled:ease-in disabled:transition disabled:delay-150 disabled:text-slate-300 disabled:bg-slate-100`

  // state handler for modal button
  const [isOpen, setIsOpen] = useState(false)

  if (isTouched==null) // if null, assume that inputs haven't been touched
    isTouched = false;

  function openModal() {
    setIsOpen(true)
  }

  function closeModal() {
    setIsOpen(false)
  }

  return (
    <>
      <Justification modalState={isOpen} modalHandler={closeModal} parentSubmitHandler={handleSave} handleHistory={handleHistory} />

      <div className="mx-auto w-auto items-center justify-items-center inline-block">
        <style>{btn}</style>
        {/* Save button */}
        <button className={`${buttons}${disabled}`} type="button" onClick={openModal} disabled={!(isValid && isTouched)}>
          <svg xmlns="http://www.w3.org/2000/svg" className="btn" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </button>

        {/* Cancel button */}
        <button className={buttons} type="button" onClick={handleCancel}>
          <svg xmlns="http://www.w3.org/2000/svg" className="btn" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </>
    
  );
};

export default ActionsSaveCancel;
