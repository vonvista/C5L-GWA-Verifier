import SemSelect from '../../../components/inputs/DropdownSelect';
import AddNoteBtn from 'frontend/components/buttons/AddNoteBtn';
import NotesTab from './Notes';
import { useState } from 'react';

import 'tailwindcss/tailwind.css';
import './css/AddNote.css';


// This function is used for adding/editing the notes for each semester

const AddNote = ({ notesList, handleAddNote, selectedSem, setSelectedSem, semesters }) => {
    // State that handles the content in the text area
    const [noteText, setNoteText] = useState("");
    // State that handles popup window
    const [showWindow, setShowWindow] = useState(false)

    // Handler for add note button
    const handleClick = (event) => {
        setShowWindow(true)
    }

    // Handler for changes in text area
    const handleChange = (event) => {
        setNoteText(event.target.value)
    }
   
    // Handler for save button
    const handleSaveClick = () => {
        if (noteText.trim().length > 0){
            handleAddNote(noteText)
            setNoteText('')
        }
        setShowWindow(false)                 // Close window after saving
        setSelectedSem(semesters[0])        // Reset selected option in dropdown to first object
    }

    // Sets text area to existing object content if a note for the sem already exists
    const setTextArea = (givenSem) => {
        const index = notesList.map(i => i.sem).indexOf(givenSem.sem)

        if(index != -1){
            setNoteText(notesList[index].content)
        } else {
            setNoteText('Type to add a note...')
        }
    }

    return (
        <>
            <AddNoteBtn handleClick={handleClick}/>
            { showWindow ? (
                <div className='add-note-overlay'>
                    <div className='add-note-popup-window shadow-lg'>

                        <div className="add-note-title">
                            <div>
                                {/* Dropdown select  */}
                                <SemSelect
                                    style="w-full ml-auto mr-0"
                                    options={semesters}
                                    state={[selectedSem, setSelectedSem]} 
                                    placeholderChange={setTextArea}
                                />
                            </div>
                            
                            {/* Exit button */}
                            <button
                                className="close-note-btn"
                                type="button"
                                onClick={() => setShowWindow(false)}
                            >
                                &times;
                            </button>
                        </div>
                        
                        {/* Text field */}
                        <textarea
                            className='add-textarea'
                            placeholder='Type to add a note...'
                            value={noteText}
                            onChange={handleChange}
                        ></textarea>
                        
                        {/* Save button */}
                        <div>
                            <button className='save-note-btn mr-3 hover:bg-login-green-hover' onClick={handleSaveClick}>
                                Save
                            </button>
                            
                        </div>
                    </div>
                </div>
            ) : ( <></> )}
        </>
    )
}

export default AddNote