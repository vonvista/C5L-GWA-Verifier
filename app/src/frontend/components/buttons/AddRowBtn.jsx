import 'tailwindcss/tailwind.css';
import { useState } from 'react';
import add from '../../../../assets/icons/addRow.svg';
import AddRow from 'frontend/pages/student-record/grades-table/AddRow';
import Justification from 'frontend/pages/student-record/grades-table/Justification';


// Parent component >> List.jsx

// Function contains the Add Row button from Student Record View/Edit Page
// -- handleAdd prop: function to handle add row click event

const AddRowBtn = ({ sem, grades, addHandler, histHandler }) => {

    // State handler for add row modal
    const [isOpen, setIsOpen] = useState(false)
    // State handler for justification modal
    const [open, setOpen] = useState(false)

    const addRowStyle = `w-3/5 h-8 bg-login-green mb-3 rounded-xl text-white font-montserrat font-bold hover:shadow-lg hover:bg-login-green-hover`;

    // Functions to open/close the justification window
    const openJust = () => {
        setOpen(true)
        console.log("HEREEEEEE")
        // handleAddGrade()
    }

    const closeJust = () => {
        setOpen(false)
    }

    // Functions to open/close the add row modal window
    const openModal = () => {
        setOpen(true)
    }

    const closeModal = () => {
        setIsOpen(false)
        openJust()      // open justification window after closing add row modal window
    }


    return (
        <>
            <Justification modalState={open} modalHandler={closeJust}  histHandler={histHandler} />

            <AddRow
                sem={sem}
                grades={grades}
                addHandler={addHandler}
                histHandler={histHandler}
                modalState={isOpen}
                modalHandler={closeModal}
            />

            <button className={addRowStyle} type="button" onClick={openModal}>
                <img
                className="p-0.25 my-1.5 inline-flex"
                width="18px"
                height="18px"
                alt="icon"
                src={add}
                />
                <p className="text-xs inline-block">Add Row</p>
            </button>
        </>
    );
};

export default AddRowBtn;
