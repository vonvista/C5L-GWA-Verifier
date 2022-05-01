import { useState } from 'react';
import SemSelect from '../../../components/inputs/DropdownSelect';
import AddNote from './AddNote';
import Delete from '../../../../../assets/icons/delete.svg';

// notes tab

// props will be for placing values into the status page

// eventHandler in placed here for deletion or editing of notes

export default function NotesTab({notes, semesters}) { 
    const [notesList, setNotesList] = useState(notes)
    const [selectedSem, setSelectedSem] = useState(semesters[0])    // state controller for selecting sem notes 
                                                                    // uses first object as default

    // Handler for adding/editing notes
    const handleAddNote = (text) => {
		const newNote = {
            sem: selectedSem.sem,
            content: text,
		};
        
		const newNotesList = [...notesList, newNote];
        console.log(selectedSem.sem);

		setNotesList(newNotesList);
	};

    // Handler for deleting notes
    const handleDeleteNote = (values) => {
        // Get array index of object that will be deleted
        const targetIndex = notesList.findIndex(obj => obj.sem == values.sem)
        
        let newNotes = [...notesList]
        newNotes.splice(targetIndex, 1)

        setNotesList(newNotes)
    }

    return(
        <div className="max-w-[25vw] max-h-[41rem] mx-auto p-5 block overflow-auto">
            {/* Add note button */}
            <AddNote
                handleAddNote={handleAddNote}
                selectedSem={selectedSem}
                setSelectedSem={setSelectedSem}
                semesters={semesters}
            />

            {/* Notes */}
            { notesList.map( (data, idx) => {
                return(
                    <div className="grid border rounded-lg p-5 mb-2" key={idx}>
                        <h1 className="text-xl inter font-bold">
                            {data.sem}
                            {data.SemesterYear}
                        </h1>
                        <p className="inter text-sm mt-3">
                            {data.content}
                            {data.Details}
                        </p>
                        <button className='delete-note-btn align-center hover:bg-gray-300' onClick={() => handleDeleteNote(data)}>
                            <img
                                width="25"
                                src={Delete}
                            />
                            <span className="ml-2">Delete</span>
                        </button>
                    </div>
                )
            })}
        </div>
    );
}