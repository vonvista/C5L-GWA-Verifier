import 'tailwindcss/tailwind.css';
import { useState } from 'react';
import addIcon from '../../../../assets/icons/addRow.svg';
import AddNote from 'frontend/pages/student-record/tabbed-components/notes/AddNote';

    
// This component contains the Add Note button from the Student Record Page
// -- notesList prop    : gets the current state of array of notes from parent component
// -- semesters         : gets the list of semesters that the student has enrolled in; to be used for dropdown select
// -- handleAddNote     : gets the handler for adding notes from parent component
// -- selectedSem       : gets the state of selectedSem from parent component
// -- setSelectedSem    : used to update the state for selectedSem in parent component

const AddNoteBtn = ({ notesList, semesters, handleAddNote, selectedSem, setSelectedSem }) => {

    // state handler for modal button
    const [isOpen, setIsOpen] = useState(false)
  
    // styling for the button
    const addNoteStyle = `h-8 px-3.5 flex items-center mb-2 rounded-xl bg-login-green text-white font-montserrat font-bold hover:shadow-lg hover:bg-login-green-hover`;
    
    // functions to open/close the modal window
    const openModal = () => {
        setIsOpen(true)
    }

    const closeModal = () => {
        setIsOpen(false)
    }

    return (
      <>
        {/* Modal Window */}
        <AddNote
            modalState={isOpen}
            modalHandler={closeModal}
            notesList={notesList}
            semesters={semesters}
            handleAddNote={handleAddNote}
            setSelectedSem={setSelectedSem}
            selectedSem={selectedSem}
        />

        {/* Add/Edit Note Button */}
        <button className={addNoteStyle} type="button" onClick={openModal}>
          <img
            className="p-0.25 my-1.5 ml-0.25 mr-1.5 inline-flex"
            width="18px"
            height="18px"
            alt="icon"
            src={addIcon}
          />
          <p className="text-xs inline-block">Add / Edit Note</p>
        </button>
      </>
    );
};

export default AddNoteBtn;
