import { useState } from 'react';
import { PlusSmIcon } from '@heroicons/react/solid';
import AddNote from 'frontend/pages/student-record/tabbed-components/notes/AddNote';
import 'tailwindcss/tailwind.css';


/* Parent component >> frontend/pages/student-record/tabbed-components/notes/Notes */

/* This component contains the Add Note button from the Student Record Page.
   All props will be passed to the child component AddNote */
/* Props:
    notesList       --- holds the current state of array of notes from parent component
    semesters       --- holds the list of semesters that the student has enrolled in; to be used for dropdown select
    handleAddNote   --- receives the handler for adding notes from parent component
    selectedSem     --- holds the state of selectedSem from parent component
    setSelectedSem  --- function to update the state for selectedSem in parent component
*/
const AddNoteBtn = ({ notesList, semesters, handleAddNote, selectedSem, setSelectedSem }) => {

    // State handler for modal button
    const [isOpen, setIsOpen] = useState(false)
    // State that handles the content in the text area
    const [noteText, setNoteText] = useState("");
    // State that handles initial content of text area
    const [unedited, setUnedited] = useState("");

    
    // Sets text area to existing object content if a note for the sem already exists
    const setTextArea = (givenSem) => {
        const index = notesList.map(i => i.Semyear).indexOf(givenSem.sem)
        
        if(index != -1){
            setNoteText(notesList[index].Details);
            setUnedited(notesList[index].Details);

        } else {
            setNoteText('');
            setUnedited('');
        }
    }

    // Functions to open/close the modal window
    const openModal = () => {
        setIsOpen(true);
        setTextArea(selectedSem);   // set contents for textarea
    }

    const closeModal = () => {
        setIsOpen(false);
    }

    // Styling for the button
    const addNoteStyle = `h-8 px-3.5 flex items-center mb-2 rounded-xl bg-button-green text-sidebar-text font-poppins font-medium
        transition ease-out hover:transition hover:ease-in hover:shadow-lg hover:bg-button-green-hover`;

    return (
        <>
            {/* Modal Window */}
            <AddNote
                modalState={isOpen}
                modalHandler={closeModal}
                unedited={unedited}
                
                notesList={notesList}
                semesters={semesters}
                handleAddNote={handleAddNote}
                setSelectedSem={setSelectedSem}
                setTextArea={setTextArea}
                noteText={noteText}
                setNoteText={setNoteText}
                selectedSem={selectedSem}
            />

            {/* Add/Edit Note Button */}
            <button className={addNoteStyle} type="button" onClick={openModal}>
                <PlusSmIcon className="p-0.25 w-6 my-1.5 ml-0.25 mr-1.5 inline-flex"/>
                <p className="text-sm odd:inline-block">Add / Edit Note</p>
            </button>
        </>
    );
};


export default AddNoteBtn;