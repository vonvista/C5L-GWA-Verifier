import { useState } from 'react';
import SemSelect from '../../../components/inputs/DropdownSelect';
import AddNote from './AddNote';

// notes tab

// props will be for placing values into the status page

// eventHandler in placed here for deletion or editing of notes

export default function NotesTab({notes, semesters}) { 
    const [notesList, setNotesList] = useState(notes)

    // Handler for adding/editing notes
    const handleAddNote = (sem, text) => {
		const newNote = {
			sem: "1st Semester AY 2018-2019",
            // sem: sem,
            content: text,
		};
        
		const newNotesList = [...notesList, newNote];
        console.log(newNote)
		setNotesList(newNotesList);
	};

    // Handler for deleting notes
    const handleDeleteNote = (id) => {
        const newNotes = notesList.filter((notesList) => notesList.sem !== id);
		setNotesList(newNotes);
    }

    return(
        <div className="max-w-[25vw] max-h-[41rem] mx-auto p-5 block overflow-auto">
            {/* Add note button */}
            <AddNote handleAddNote={handleAddNote} handleDeleteNote={handleDeleteNote} semesters={semesters}/>

            {/* Notes */}
            { notesList.map( (data, idx) => {
                return(
                    <div className="grid border rounded-lg p-5 mb-2" key={idx}>
                        <h1 className="text-xl inter font-bold">
                        {data.sem}
                            {data.SemesterYear}

                        </h1>
                        {/* <h2 className="inter font-light italic">
                            {data.author} {data.date}
                            {data.User} {data.createdAt}
                        </h2> */}
                        <p className="inter text-sm mt-3">
                            {data.content}
                            {data.Details}
                        </p>
                    </div>
                )
            })}
        </div>
    );
}