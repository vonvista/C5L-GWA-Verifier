import 'tailwindcss/tailwind.css';
import './css/AddNote.css';
import SemSelect from '../../../components/inputs/DropdownSelect';
import AddNoteBtn from 'frontend/components/buttons/AddNoteBtn';
import React from 'react';
import NotesTab from './Notes';
import { useState } from 'react';


const AddNote = ({ handleAddNote, selectedSem, setSelectedSem, semesters }) => {
    const [noteText, setNoteText] = useState('');
    const [showModal, setShowModal] = useState(false)
    

    // Handler for add note button
    const handleClick = React.useCallback((e) => {
        setShowModal(true);
    });

    // Handler for changes in text area
    const handleChange = (event) => {
        setNoteText(event.target.value);
    };

    // Lifts state up
    const handleSemChange = (newSelect) => {
        setSelectedSem(newSelect);
    }

    // Handler for save button
    const handleSaveClick = () => {
        handleSemChange(selectedSem)

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
                        <div>
                            {/* Dropdown select  */}
                            <SemSelect
                                style="w-full ml-auto mr-0"
                                options={semesters} // pass semester object
                                state={[selectedSem, setSelectedSem]} 
                            />
                        </div>
                        
                        {/* Exit button */}
                        <button
                            className="close-note-btn"
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
                    
                    {/* Save button */}
                    <div>
                        <button className='save-note-btn mr-3 hover:bg-login-green-hover' onClick={handleSaveClick}>
                            Save
                        </button>
                        
                    </div>
                </div>
            ) : ( <></> )}
        </div>
    )
}

export default AddNote