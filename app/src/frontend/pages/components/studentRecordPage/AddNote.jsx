import 'tailwindcss/tailwind.css';
import './css/AddNote.css';
import SemSelect from '../../../components/inputs/DropdownSelect';
import AddNoteBtn from 'frontend/components/buttons/AddNoteBtn';
import React from 'react';
import NotesTab from './Notes';
import { useState } from 'react';


const AddNote = ({ handleAddNote, handleDeleteNote, semesters }) => {
    const [noteText, setNoteText] = useState('');
    const [showModal, setShowModal] = useState(false)
    const [selectedSem, setSelectedSem] = useState('')    // state controller for selecting sem notes

    const handleClick = React.useCallback((e) => {
        setShowModal(true);
        // check if nakukuha ba yung sem na field sa array of objects
        console.log(semesters);
        console.log(semesters.map(( semData ) => (semData.sem)));
        console.log('Add Note button click');
    });

    //
    const handleChange = (event) => {
        setNoteText(event.target.value);
    };

    const handleSaveClick = () => {
        if (noteText.trim().length > 0){
            handleAddNote(noteText);
            setNoteText('');
        }
    };

    return (
        <div>
            <AddNoteBtn handleClick={handleClick}/>
            { showModal ? (
                <div className='add-note-modal shadow-lg'>

                    <div className="add-note-title">
                        {/* Dropdown select  */}
                        {/* <SemSelect
                            style="w-full ml-auto mr-0"
                            options={semesters.map(( semData ) => (semData.sem))}
                            state={[selectedSem, setSelectedSem]}
                        /> */}
                        
                        {/* Exit button */}
                        <button
                            className="close-btn"
                            type="button"
                            onClick={() => setShowModal(false)}
                        >
                            &times;
                        </button>
                    </div>
                    
                    {/* Text field */}
                    <textarea
                        className='add-textarea'
                        placeholder='Type to add a note...'
                        value={noteText}
                        onChange={handleChange}
                    ></textarea>
                    
                    {/* Save and Delete buttons */}
                    <div>
                        <button className='delete-btn bg-gray-600 hover:bg-gray-400' onClick={handleDeleteNote}>
                            Delete
                        </button>
                        <button className='save-btn mr-3 hover:bg-login-green-hover' onClick={handleSaveClick}>
                            Save
                        </button>
                        
                    </div>
                </div>
            ) : ( <></> )}
        </div>
    )
}

export default AddNote