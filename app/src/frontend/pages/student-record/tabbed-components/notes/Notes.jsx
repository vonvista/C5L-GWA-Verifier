import { useState } from 'react';
import AddNoteBtn from 'frontend/components/buttons/AddNoteBtn';
import Delete from '../../../../../../assets/icons/delete.svg';


// Functional component for notes tab in student record view page
// -- notesData prop : gets the current state of array of notes from parent component
// -- semesters      : gets the list of semesters that the student has enrolled in; to be used for dropdown select
// -- setNotesData:  : used to update the state for the notesData in parent component

export default function NotesTab({notesData, semesters, setNotesData}) { 

    // State that handles selection of sem notes; uses first object as default
    const [selectedSem, setSelectedSem] = useState(semesters[0])
    

    // Handler for adding/editing notes
    const handleAddNote = (text) => {
        let currNotesList = [...notesData]      // make copy of current array of notes

        const newNote = {                       // object for new note to be added
            sem: selectedSem.sem,
            Semyear: selectedSem.sem,
            content: text,
        }
        
        // check if note for the sem already exists
        const index = notesData.map(i => i.sem).indexOf(selectedSem.sem);

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
        
        let newNotes = [...notesData]
        newNotes.splice(targetIndex, 1)

        deleteNote = {
            Student: localStorage.getItem("currStudentID"),
            Semyear: values.Semyear,
        }

        // fetch post request to delete a note on button click
        fetch(`http://localhost:3001/note/delete`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(deleteNote)
        })
            .then(response => response.json())
            .then(body => console.log(body))
            .catch(err => { //will activate if DB is not reachable or timed out or there are other errors

                console.log(err)

            })

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
                ? <h2 className="inter font-light text-[1.05vw] italic">
                    No notes found.
                </h2>
                : notesData.map( (data, idx) => {
                    return (
                        <div className="grid border rounded-lg p-5 mb-2" key={idx}>
                            {/* Note details */}
                            <h1 className="text-xl inter font-bold">
                                {data.Semyear}
                            </h1>
                            <p className="inter text-sm mt-3">
                                {data.content}
                                {data.Details}
                            </p>

                            {/* Delete button */}
                            <button className='w-max rounded-lg mt-4 p-2 flex content-center hover:bg-gray-300' onClick={() => handleDeleteNote(data)}>
                                <img
                                    width="18"
                                    src={Delete}
                                />
                                <span className="text-sm ml-2">Delete</span>
                            </button>
                        </div>
                    )
            })}
        </div>
    );
}