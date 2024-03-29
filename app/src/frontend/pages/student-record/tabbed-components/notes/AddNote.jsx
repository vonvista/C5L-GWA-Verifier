import { Fragment, useState } from 'react';
import { Dialog, Transition} from '@headlessui/react';
import { useNavigate } from 'react-router-dom';
import { XIcon } from '@heroicons/react/solid';
import SemSelect from 'frontend/components/inputs/DropdownSelect';
import Swal from 'sweetalert2';
import 'tailwindcss/tailwind.css';


/* Parent component >> AddNoteBtn.jsx */

/* This functional component is used for adding/editing of notes for each semester */
/* Props:
    modalState prop   ---  holds a boolean value
    modalHandler      ---  handler for setting modalState to false
    unedited          ---  holds the value of the unedited text area
    notesList         ---  gets the current state of array of notes from parent component
    handleAddNote     ---  gets the handler for adding notes from parent component
    selectedSem       ---  gets the state of selectedSem from parent component
    setSelectedSem    ---  used to update the state for selectedSem in parent component
    setTextArea       ---  used to update the state of the textarea
    noteText          ---  gets the state to be displayed for the textarea
    semesters         ---  gets the list of semesters that the student has enrolled in; to be used for dropdown select
*/
const AddNote = ({ modalState, modalHandler, unedited, notesList, handleAddNote, selectedSem, setSelectedSem, setTextArea, noteText, setNoteText, semesters }) => {
  
    // local storage access using use state
    const [userName, setUserName] = useState(localStorage.getItem("Username"));
    const [currStudentID, setStudentID] = useState(localStorage.getItem("currStudentID"));
    const [ip, setIP] = useState(localStorage.getItem('ServerIP'));

    const navigate = useNavigate();
  
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
    const handleSaveClick = async () => {

        //if student exists check, if hindi, ikickout
        var studentExist = await fetch(`http://${ip}:3001/student/find`, {
        method: "POST",
        headers: {"Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("Username")} ${localStorage.getItem("Password")}` },
        body: JSON.stringify({StudentID: localStorage.getItem("currStudentKey")})
        })
        .then(response => response.json())
        .then(body => {
            if(body.err){
                Swal.fire({icon: 'error', title: 'Error', text: body.err,})
                navigate('/in/user-dashboard')
                return false
            }
        })
        .catch(err => { //will activate if DB is not reachable or timed out or there are other errors
            Swal.fire({icon: 'error', title: 'Server Error', text: 'Check if the server is running or if database IP is correct',})
        })
        if(studentExist == false){
            return
        }

        if (noteText.trim().length > 0){

            if (noteText != 'Type to add a note...'){

                handleAddNote(noteText)
                setNoteText('')

                // new note to be stored in DB
                var newNote = {
                    User: userName,
                    Student: currStudentID,
                    Details: noteText,
                    Semyear: selectedSem.sem,
                }

                // fetch post request to update note
                // also includes adding new notes
                fetch(`http://${ip}:3001/note/update`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("Username")} ${localStorage.getItem("Password")}` },
                    body: JSON.stringify(newNote)
                })
                    .then(response => response.json())
                    .then(body => console.log(body))
                    .catch(err => { //will activate if DB is not reachable or timed out or there are other errors
                        Swal.fire({
                            icon: 'error',
                            title: 'Server Error',
                            text: 'Check if the server is running or if database IP is correct',
                        })
                        //console.log(err)
                    })
            }
        }

        // close window after saving
        modalHandler()

        // reset selected option in dropdown to first object
        setSelectedSem(semesters[0])
    }

    return (
        <>
            {/* Wrapping everything with transition component to use transition effects from @headlessui/react */}
            <Transition appear show={modalState} as={Fragment}>
                
                {/* Wrapping everything with dialog component */}
                <Dialog as="div" className="relative z-30" openModal={modalState} onClose={handleClose}>
                    
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
                            <Dialog.Panel className="w-full max-w-md 3xl:max-w-lg 5xl:max-w-xl transform overflow-hidden rounded-2xl bg-white px-5 text-left align-middle shadow-xl transition-all">
                                
                                {/* Window Title */}
                                <Dialog.Title
                                    as="div"
                                    className="flex items-center mt-2 mb-2 text-sm xl:text-base 1.75xl:text-lg 5xl:text-[0.9vw]"
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
                        
                                    {/* Close button */}
                                    <XIcon
                                        className="cursor-pointer w-6 5xl:w-[1vw] mt-3 ml-auto mr-0 hover:text-gray-500 hover:transition-all hover:ease-in"
                                        onClick={handleClose}
                                    />
                                </Dialog.Title>

                                {/* Window body */}

                                {/* Textarea */}
                                <textarea
                                    className='w-full h-[25vh] p-3 font-inter text-sm xl:text-base 1.75xl:text-lg 5xl:text-[0.9vw] border-none resize-none focus:outline-none'
                                    placeholder='Type to add a note...'
                                    value={noteText}
                                    onChange={handleChange}
                                ></textarea>
                                
                                {/* Save button */}
                                <div>
                                    <button
                                        className='font-poppins font-medium rounded-lg float-left w-1/5 mt-3 mb-4 p-1 px-3 py-1.5 5xl:text-[0.8vw] text-white bg-button-green hover:bg-button-green-hover
                                                transition ease-out hover:transition hover:ease-in hover:shadow-lg disabled:bg-sr-disabled-green disabled:hover:transition-none disabled:hover:shadow-transparent'
                                        onClick={handleSaveClick}
                                        disabled={(unedited == noteText)}
                                    >
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


export default AddNote;