import { useState } from 'react';
import AddNote from './AddNote';
import Delete from '../../../../../../assets/icons/delete.svg';


// functional component for notes tab in student record view page
// -- props will be for placing values into the page

export default function NotesTab({notes, semesters}) { 
    const [notesList, setNotesList] = useState(notes)
    const [selectedSem, setSelectedSem] = useState(semesters[0])    // state controller for selecting sem notes 
                                                                    // uses first object as default
       
    // Handler for adding/editing notes
    const handleAddNote = (text) => {
        const newNote = {
            sem: selectedSem.sem,
            Semyear: selectedSem.sem,
            content: text,
        }
        
        // check if note for the sem already exists
        const index = notesList.map(i => i.sem).indexOf(selectedSem.sem);
        let newNotesList = [...notesList]

        if (index != -1){
            newNotesList[index] = newNote               // replace note from notesList if it already exists
        } else {
            newNotesList = [...notesList, newNote]      // add new note at the end of notesList
        }
        
        setNotesList(newNotesList)
	}

    // Handler for deleting notes
    const handleDeleteNote = (values) => {
        // Get array index of object that will be deleted
        const targetIndex = notesList.findIndex(obj => obj.sem == values.sem)
        
        let newNotes = [...notesList]
        newNotes.splice(targetIndex, 1)

        deleteNote = {
            Student: localStorage.getItem("currStudentID"),
            Semyear: values.Semyear,
        }

        // console.log(deleteNote)

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

        setNotesList(newNotes)
    }

    return(
        <div className="min-w-[25vw] max-w-[25vw] h-[41rem] max-h-[41rem] mx-auto p-5 block overflow-auto">
            {/* Add note button */}
            <AddNote
                notesList={notesList}
                semesters={semesters}
                handleAddNote={handleAddNote}
                selectedSem={selectedSem}
                setSelectedSem={setSelectedSem}
            />

            {/* Notes */}
            { notesList.length === 0
            ? <h2 className="inter font-light text-[1.05vw] italic">
                No notes found.
              </h2>
            : notesList.map( (data, idx) => {
                return(
                    <div className="grid border rounded-lg p-5 mb-2" key={idx}>
                        <h1 className="text-xl inter font-bold">
                            {data.Semyear}
                        </h1>
                        <p className="inter text-sm mt-3">
                            {data.content}
                            {data.Details}
                        </p>
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