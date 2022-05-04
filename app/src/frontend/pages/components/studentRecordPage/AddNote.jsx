import SemSelect from '../../../components/inputs/DropdownSelect';
import AddNoteBtn from 'frontend/components/buttons/AddNoteBtn';
import NotesTab from './Notes';
import { useState } from 'react';
import Input from '../../../components/inputs/Input';

import 'tailwindcss/tailwind.css';
import './css/AddNote.css';


// This function is used for adding/editing the notes for each semester

const AddNote = ({ notesList, handleAddNote, selectedSem, setSelectedSem, semesters }) => {
    
    // State that handles the content in the text area
    const [noteText, setNoteText] = useState("");
    // State that handles popup window
    const [showWindow, setShowWindow] = useState(false)


    // Sets text area to existing object content if a note for the sem already exists
    const setTextArea = (givenSem) => {
        const index = notesList.map(i => i.sem).indexOf(givenSem.sem)
        if(index != -1){
            setNoteText(notesList[index].content)
        } else {
            setNoteText('Type to add a note...')
        }
    }

    // Handler for add note button
    const handleClick = () => {
        setTextArea(givenSem=selectedSem)
        setShowWindow(true)
    }

    // Handler for changes in text area
    const handleChange = (event) => {
        setNoteText(event.target.value)
    }
   
    // Handler for save button
    const handleSaveClick = () => {
        if (noteText.trim().length > 0){
            if (noteText != 'Type to add a note...'){
                handleAddNote(noteText)
                setNoteText('')

                reNote = {
                    User: localStorage.getItem("Username"),
                    Student: localStorage.getItem("currStudentID"),
                    Details: noteText,
                    Semyear: selectedSem.sem,
                }

                // fetch post request to add/update note
                fetch(`http://localhost:3001/note/update`, {
                    method: "POST",
                    headers: {
                    "Content-Type": "application/json",
                    },
                    body: JSON.stringify(reNote)
                })
                    .then(response => response.json())
                    .then(body => console.log(body))
                    .catch(err => { //will activate if DB is not reachable or timed out or there are other errors

                        console.log(err)

                    })
            }
        }

        setShowWindow(false)                 // Close window after saving
        setSelectedSem(semesters[0])         // Reset selected option in dropdown to first object
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
                        {/* <Input
                            inputStyle="add-note-textarea"
                            name="note"
                            inputType="text"
                            inputPlaceholder={setTextArea}
                            value={noteText}
                            changeHandler={handleChange}
                        /> */}

                        <textarea
                            className='add-textarea'
                            placeholder='Type to add a note...'
                            value={noteText}
                            onChange={handleChange}
                        ></textarea>
                        
                        {/* Save button */}
                        <div>
                            <button className='save-note-btn hover:bg-login-green-hover' onClick={handleSaveClick}>
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