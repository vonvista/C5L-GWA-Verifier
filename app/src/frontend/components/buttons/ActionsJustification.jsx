import { useState } from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/solid';
import Justification from 'frontend/pages/student-record/grades-table/Justification';
import 'tailwindcss/tailwind.css';


/* Parent component >> frontend/ */

/* This function contains the Actions buttons (edit and delete) */
/* Props:
    handleEdit      --- handles click event for edit button
    handleDelete    --- handles click event for delete button
    handleHist      --- handles modification of history
    data            --- contains data displayed in the row
    sem             --- receives the semester and academic year where the row is located
*/
const Actions = ({ handleEdit, handleDelete, handleHist, data, sem }) => {
  
  // State handler for justification modal
  const [isOpen, setIsOpen] = useState(false); 
  // State handler for history title for delete row
  const [histTitle, setHistTitle] = useState(`Deleted student grade row with Course: ${data.courseName} on Semester: ${sem}`);

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
    handleHist(updateHistory);
  }

  // Styling
  const buttons = `w-[2vw] h-[2vw] transition ease-out delay-150 hover:transition hover:ease-in hover:delay-200 hover:bg-gray-300 rounded-3xl bg-zinc-200 relative mx-1 grow`; // styling of button
  const iconStyle = `text-[#666666] h-[1.5vw] transition ease-out delay-150 hover:transition hover:ease-in hover:delay-200 m-auto hover:fill-black`;

  return (
    <>
        <Justification modalState={isOpen} modalHandler={closeModal} parentSubmitHandler={handleDelete} handleHistory={setHistory} histTitle={histTitle} />

        <div className="mx-auto w-auto items-center justify-items-center inline-block">
            {/* Edit button */}
            <button className={buttons} type="button" onClick={handleEdit}>
                <PencilIcon className={iconStyle} />
            </button>

            {/* Delete button */}
            <button className={buttons} type="button" onClick={openModal}>
                <TrashIcon className={iconStyle} />
            </button>
        </div>
    </>
  );
};


export default Actions;