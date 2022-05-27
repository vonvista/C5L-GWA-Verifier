import { useState } from 'react';
import { TrashIcon } from '@heroicons/react/solid';
import AddNoteBtn from 'frontend/components/buttons/AddNoteBtn';
import Delete from '../../../../../../assets/icons/delete.svg';
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
    const handleDeleteNote = (values) => {

        // get array index of object that will be deleted
        const targetIndex = notesData.findIndex(obj => obj.sem == values.sem)
        
        // removes Note from list/prop
        let newNotes = [...notesData]
        newNotes.splice(targetIndex, 1)

        // note to be deleted
        // deletes note using: Student key and Semyear
        deleteNote = {
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
            .then(body => console.log(body))
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

        <div className="min-w-[25vw] max-w-[25vw] h-[41rem] max-h-[41rem] mx-auto p-5 block overflow-auto">
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
                ? <h2 className="font-inter font-light text-md italic mt-3">
                    No notes found.
                </h2>
                : notesData.map( (data, idx) => {
                    return (
                        <div className="grid border rounded-lg p-5 mb-2" key={idx}>
                            {/* Note details */}
                            <h1 className="text-xl font-inter font-semibold">
                                {data.Semyear}
                            </h1>
                            <p className="font-inter text-md mt-3 max-w-sm break-words">
                                {data.Details}
                            </p>

                            {/* Delete button */}
                            <button className='w-max rounded-lg mt-4 p-2 items-center flex content-center hover:bg-gray-300' onClick={() => handleDeleteNote(data)}>
                                <TrashIcon className="w-5"/>
                                {/* <img
                                    width="18"
                                    src={Delete}
                                /> */}
                                <span className="text-sm font-inter ml-2">Delete</span>
                            </button>
                        </div>
                    )
            })}
        </div>
    );
};