import { useState } from 'react';
import { CheckCircleIcon , XCircleIcon } from '@heroicons/react/solid';
import Justification from 'frontend/pages/student-record/grades-table/Justification';
import 'tailwindcss/tailwind.css';


/* Parent Component >> frontend/pages/student-record/grades-table/EditRow */

/* This function contains the Save and Cancel action buttons for the student record page */
/* Props:
    handleSave      --- handles click event for save button
    handleCancel    --- handles click event for cancel button
    isValid         --- checks if given data is valid or not
    isTouched       --- holds a boolean value; indicates if input field values were touched
    handleHistory   --- handles pushing edit row changes to history
    values          --- values that are being edited in real time
    sem             --- receives the semester and academic year where the row is located
*/
const ActionsSaveCancel = ({ handleSave, handleCancel, isValid, isTouched, handleHistory, values, sem }) => {

  const buttons = `transition-all ease-in-out text-[rgb(107 114 128)] hover:transition-all hover:ease-out w-[2vw] h-[2vw] hover:text-[#141414] hover:bg-slate-300 rounded-3xl bg-slate-200 relative mx-1 grow`; // styling of button
  const disabled = `disabled:ease-in disabled:transition disabled:text-slate-300 disabled:bg-slate-100`

  // State handler for modal button
  const [isOpen, setIsOpen] = useState(false);
  // State handler for history title for edit row
  const [histTitle, setTitle] = useState(`Edited student grade row from Course: ${values.courseName.toUpperCase()}, Grade: ${values.grade}, and Units: ${values.units} to `);


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
            id: data._id,
            hasImage: data.hasImage
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

                            // add new values to end of history title
                            setTitle(`${histTitle} Course: ${values.courseName.toUpperCase()}, Units: ${values.units}, and Grade: ${values.grade} on Semester: ${sem}`); 
                        }} 
                    disabled={!(isValid && isTouched)}
                >
                    <CheckCircleIcon className="w-[2vw] h-[2vw] mx-auto grow"/>
                </button>

                {/* Cancel button */}
                <button className={buttons} type="button" onClick={handleCancel}>
                    <XCircleIcon className="w-[2vw] h-[2vw] mx-auto grow"/>
                </button>
            </div>
        </>
    );
};


export default ActionsSaveCancel;