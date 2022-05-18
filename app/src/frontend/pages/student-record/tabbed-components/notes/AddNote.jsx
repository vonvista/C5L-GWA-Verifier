import { Fragment, useState } from 'react';
import { Dialog, Transition} from '@headlessui/react';
import SemSelect from 'frontend/components/inputs/DropdownSelect';
import 'tailwindcss/tailwind.css';
import Swal from 'sweetalert2'

// Parent component >> AddNoteBtn.jsx

// This functional component is used for adding/editing of notes for each semester
// -- modalState prop   : holds a boolean value
// -- modalHandler      : handler for setting modalState to false
// -- notesList         : gets the current state of array of notes from parent component
// -- handleAddNote     : gets the handler for adding notes from parent component
// -- selectedSem       : gets the state of selectedSem from parent component
// -- setSelectedSem    : used to update the state for selectedSem in parent component
// -- setTextArea       : used to update the state of the textarea
// -- noteText          : gets the state to be displayed for the textarea
// -- semesters         : gets the list of semesters that the student has enrolled in; to be used for dropdown select

const AddNote = ({ modalState, modalHandler, notesList, handleAddNote, selectedSem, setSelectedSem, setTextArea, noteText, setNoteText, semesters }) => {

    // Handler for changes in text area
    const handleChange = (event) => {
        setNoteText(event.target.value)
    }

    // Handle for closing add note window
    const handleClose = () => {
        setSelectedSem(semesters[0])        // reset selected option in dropdown select to first object
        modalHandler()                      // close window
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
                        Swal.fire({
                            icon: 'error',
                            title: 'Server Error',
                            text: 'Check if the server is running or if database IP is correct',
                        })
                        console.log(err)
                    })
            }
        }

        modalHandler()                  // close window after saving
        setSelectedSem(semesters[0])    // reset selected option in dropdown to first object
    }


    return (
        <>
            {/* Wrapping everything with transition component to use transition effects from @headlessui/react */}
            <Transition appear show={modalState} as={Fragment}>
                
                {/* Wrapping everything with dialog component */}
                <Dialog as="div" classname="relative z-10" onClose={handleClose}>
                    
                    {/* Transition effect for the element inside this Transition.Child tag*/}
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        {/* Container for the layer behind the modal window */}
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    {/* Container for the layer containing the modal window */}
                    <div className="fixed inset-0 overflow-y-auto flex min-h-full items-center justify-center p-4 text-center">
                        
                        {/* Transition effect for the element inside this Transition.Child tag*/}
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            {/* Add/Edit note modal window */}
                            <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white px-6 text-left align-middle shadow-xl transition-all">
                                
                                {/* Window Title */}
                                <Dialog.Title
                                    as="div"
                                    className="flex items-center mb-2 text-[2.5vh]"
                                >
                                    <div>
                                        {/* Dropdown select  */}
                                        <SemSelect
                                            style="font-inter w-full ml-auto mr-0 "
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
                                </Dialog.Title>

                                {/* Window body */}

                                {/* Textarea */}
                                <textarea
                                    className='font-inter text-sm lg:text-lg border-none p-3 w-full h-[25vh]'
                                    placeholder='Type to add a note...'
                                    value={noteText}
                                    onChange={handleChange}
                                ></textarea>
                                
                                {/* Save button */}
                                <div>
                                    <button className='rounded-lg float-left w-1/5 mt-3 mb-3 p-1 text-white bg-login-green hover:bg-login-green-hover' onClick={handleSaveClick}>
                                        Save
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

export default AddNote