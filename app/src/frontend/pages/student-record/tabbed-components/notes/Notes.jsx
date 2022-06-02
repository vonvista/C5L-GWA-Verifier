import { useState } from 'react';
import { TrashIcon } from '@heroicons/react/solid';
import { useNavigate } from 'react-router-dom';
import AddNoteBtn from 'frontend/components/buttons/AddNoteBtn';
import Swal from 'sweetalert2';


/* Parent component >> Tab component found in StudentViewRecord.jsx */

/* This is a functional component for the notes tab in student record view page */
/* Props:
    notesData prop  ---  gets the current state of array of notes from parent component
    semesters       ---  gets the list of semesters that the student has enrolled in; to be used for dropdown select
    setNotesData:   ---  used to update the state for the notesData in parent component
*/
export default function NotesTab({notesData, semesters, setNotesData}) { 

    // State that handles selection of sem notes; uses first object as default
    const [selectedSem, setSelectedSem] = useState(semesters[0]);
    const [currStudentID, setStudentID] = useState(localStorage.getItem("currStudentID"));
    const [ip, setIP] = useState(localStorage.getItem('ServerIP'));

    const navigate = useNavigate();

    // Handler for adding/editing notes
    const handleAddNote = (text) => {
        let currNotesList = [...notesData]      // make copy of current array of notes

        const newNote = {                       // object for new note to be added
            sem: selectedSem.sem,
            Semyear: selectedSem.sem,
            Details: text,
        }
        
        // check if note for the sem already exists
        const index = currNotesList.map(i => i.Semyear).indexOf(selectedSem.sem);

        if (index != -1){
            currNotesList[index] = newNote              // replace note from currNotesList if it already exists
        } else {
            currNotesList = [...notesData, newNote]     // add new note at the end of currNotesList
        }
        
        setNotesData(currNotesList)
	}

    // Handler for deleting notes
    const handleDeleteNote = async (values) => {

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

        //add confirm dialog
        var confirm = await Swal.fire({
            title: 'Confirm note delete',
            text: "Are you sure you want to delete this note?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes'
        })
        
        if(confirm.isConfirmed === false){
            return
        }

        // get array index of object that will be deleted
        const targetIndex = notesData.findIndex(obj => obj.sem == values.sem)
        
        // removes Note from list/prop
        let newNotes = [...notesData]
        newNotes.splice(targetIndex, 1)

        // note to be deleted
        // deletes note using: Student key and Semyear
        var deleteNote = {
            Student: currStudentID,
            Semyear: values.Semyear,
        }

        // fetch post request to delete note
        fetch(`http://${ip}:3001/note/delete`, {
            method: "POST",
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("Username")} ${localStorage.getItem("Password")}` },
            body: JSON.stringify(deleteNote)
        })
            .then(response => response.json())
            .then(body => {
                Swal.fire({
                    title: 'Note Deleted',
                    text: 'Note has been deleted',
                    icon: 'success',
                })
            
            })
            .catch(err => { //will activate if DB is not reachable or timed out or there are other errors
                Swal.fire({
                    icon: 'error',
                    title: 'Server Error',
                    text: 'Check if the server is running or if database IP is correct',
                })
                //console.log(err)
            })
        
        // changeHandler to update Notes
        setNotesData(newNotes)
    }

    return(

        <div className="min-w-[25vw] max-w-[25vw] h-full max-h-[61vh] mx-auto p-5 block overflow-auto">
            {/* Add note button */}
            <AddNoteBtn
                notesList={notesData}
                semesters={semesters}
                handleAddNote={handleAddNote}
                selectedSem={selectedSem}
                setSelectedSem={setSelectedSem}
            />

            {/* Notes tab */}
            {/* Checks first if the array of notes is currently empty. */}
            { notesData.length === 0
                ? <h2 className="font-inter font-light text-[1.05vw] italic mt-3">
                    No notes found.
                </h2>
                : notesData.map( (data, idx) => {
                    return (
                        <div className="grid border rounded-lg px-[1.75vw] py-[2vh] mb-2" key={idx}>
                            {/* Note details */}
                            <h1 className="text-sm xl:text-base 1.75xl:text-lg 3xl:text-xl 4xl:text-[1.05vw] font-inter font-semibold">
                                {data.Semyear}
                            </h1>
                            <p className="font-inter text-xs xl:text-sm 1.75xl:text-base 3xl:text-lg 4xl:text-[1vw] mt-3 max-w-sm 5xl:pt-3 break-words">
                                {data.Details}
                            </p>

                            {/* Delete button */}
                            <button
                                className='w-max rounded-xl mt-[1vw] py-[0.25vw] px-[0.5vw] -ml-[0.7vw] items-center flex content-center hover:bg-gray-300
                                           transition ease-out hover:transition hover:ease-in'
                                onClick={() => handleDeleteNote(data)}
                            >
                                <TrashIcon className="w-[1vw]"/>
                                <span className="text-[0.85vw] font-inter ml-2">Delete</span>
                            </button>
                        </div>
                    )
            })}
        </div>
    );
};