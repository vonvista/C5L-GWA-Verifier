import { useState } from 'react';
import SemSelect from 'frontend/components/inputs/DropdownSelect';
import AddNoteBtn from 'frontend/components/buttons/AddNoteBtn';
import Input from 'frontend/components/inputs/Input';
import NotesTab from './Notes';
import 'tailwindcss/tailwind.css';


// This functional component is used for adding/editing the notes for each semester
// -- notesList prop    : gets the current state of array of notes from parent component
// -- handleAddNote     : gets the handler for adding notes from parent component
// -- selectedSem       : gets the state of selectedSem from parent component
// -- setSelectedSem    : used to update the state for selectedSem in parent component
// -- semesters         : gets the list of semesters that the student has enrolled in; to be used for dropdown select

const AddNote = ({ notesList, handleAddNote, selectedSem, setSelectedSem, semesters }) => {
    
    // State that handles the content in the text area
    const [noteText, setNoteText] = useState("");
    // State that handles popup window
    const [showWindow, setShowWindow] = useState(false)
    

    // Sets text area to existing object content if a note for the sem already exists
    const setTextArea = (givenSem) => {
        const index = notesList.map(i => i.Semyear).indexOf(givenSem.sem)
        
        if(index != -1){
            setNoteText(notesList[index].Details)
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

    // Handle for closing add note window
    const handleClose = () => {
        setShowWindow(false)
        setSelectedSem(semesters[0])         // reset selected option in dropdown select to first object
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
                // Container for everything behind the window           
                <div className='block h-full overflow-y-auto overflow-x-hidden fixed top-0 left-0 w-full z-10'>

                    {/* Add Note Window */}
                    <div className='flex flex-col px-5 relative shadow-lg ml-[32vw] mt-[25vh] w-[35vw] rounded-2xl border-solid  bg-white '>

                        <div className="flex items-center mb-2 text-[2.5vh]">
                            <div>
                                {/* Dropdown select  */}
                                <SemSelect
                                    style="w-full ml-auto mr-0 "
                                    options={semesters}
                                    state={[selectedSem, setSelectedSem]} 
                                    placeholderChange={setTextArea}
                                />
                            </div>
                            
                            {/* Exit button */}
                            <button
                                className="text-[2vw] ml-auto mr-0 hover:text-gray-500"
                                type="button"
                                onClick={handleClose}
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
                            className='border-none p-3 w-full h-[25vh]'
                            placeholder='Type to add a note...'
                            value={noteText}
                            onChange={handleChange}
                        ></textarea>
                        
                        {/* Save button */}
                        <div>
                            <button className='rounded-lg float-left w-1/5 mb-4 mt-5 p-1 text-white bg-login-green hover:bg-login-green-hover' onClick={handleSaveClick}>
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