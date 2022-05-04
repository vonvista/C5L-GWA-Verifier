import { useEffect, useState } from 'react';
import {AnimatePresence, motion} from 'framer-motion';

/* Components */
import Edit from './buttons/Edit.jsx';

/* CSS */
import 'tailwindcss/tailwind.css';
import './EditStudent.css';

/* Function for the "Edit Student" feature in the Student View Record page's Dropdown Menu */
/* Initially shows an "Add" button and prompts the modal window after clicking it */
const AddRow = () => {
    const [openModal, setOpenModal] = useState(false);
    const [studNum, setStudNum] = useState('');
    const [studName, setStudName] = useState('');
    const [degree, setDegree] = useState('');
    const [currStudentID, setcurrStudentID] = useState(localStorage.getItem('currStudentID'));

    //function which updates Student input fields
    const updateStudent = () => {
        const credentials = {
            StudentID: studNum,
            FirstName: studName, //put first name variable
            LastName: "LName", //put last name variable
            MiddleName: "MName", //put middle name variable
            Degree: degree,
            TotalUnits: 0,
            TotalUnits2: 0,
            TotalCumulative: 0,
            OverallGWA: 0,
            _id: currStudentID
        }

        fetch(`http://localhost:3001/student/update` ,{
            method: "POST",
            headers: { "Content-Type":"application/json"},
            body: JSON.stringify(credentials)
        })
        .then(response => response.json())
        .then(body => {
            console.log(body)
        })
        
    }
   
 
    //function which records changes in student record 
    const addHistory = () => {
        const current = new Date(); //variable which will get current date and time
        const currentTime = `${current.getHours()}:${current.getMinutes()}`; //variable containing current time
        const currentDate = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`; //variable containing current date
        
        const credentials = {
            User: "User",
            Student: "Student",
            Date: currentDate,
            Time: currentTime,
            Description: 'update',
            Details: "Sample Details"
        };
        
        //fetch to add history to database
        fetch(`http://localhost:3001/history/add`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(credentials),
        })
        .then((response) => response.json())
        .then((body) => {
            console.log(body);
        })
        
    }

    //main function for student update and add history
    const submitStudentEdit = () =>{
        updateStudent();
        addHistory();
        setOpenModal(false);
    }


    return (
        <>
            <Edit handleClick={setOpenModal}/>
            { openModal && (
                <AnimatePresence>
                    {/* Modal animations */}
                    <motion.div
                        initial={{
                            opacity: 0
                        }}
                        animate={{
                            opacity: 1,
                            transition: {
                                duration: 0.2
                            }
                        }}
                        exit={{
                            opacity: 0,
                            transition: {
                                duration: 0.2
                            }
                        }}
                        className='edit-students-modal-backdrop'>
                        <motion.div
                            initial={{
                                scale: 0
                            }}
                            animate={{
                                scale: 1,
                                transition: {
                                    duration: 0.2
                                }
                            }}
                            exit={{
                                scale: 0,
                                transition: {
                                    duration: 0.2
                                }
                            }}

                            className='edit-students-modal'>
                            <motion.div className="edit-students-modal-content">
                            {/* Baybayin Background Image */}
                            <motion.div className="bg-baybayin edit-students-modal-baybayin-style"></motion.div>

                            {/* content */}
                                <motion.div className='edit-students-modal-body'>
                                    {/* title */}
                                    <motion.div className='edit-students-modal-close text-white float-right'>
                                        <button onClick={() => {setOpenModal(false)}}>
                                            <span>&times;</span>
                                        </button>
                                    </motion.div>
                                    <motion.div className='edit-students-modal-title text-white text-center'>Fill in the fields below to edit student's details successfully</motion.div>

                                    {/* input form */}
                                    <form className='edit-students-modal-inputs flex'>
                                        {/* Student Number */}
                                        <motion.div className='edit-students-modal-input-container'>
                                            <section className='inline-block edit-students-modal-section-studnum'>
                                                <input
                                                    className='edit-students-modal-input-style'
                                                    type="text"
                                                    name="studNum"
                                                    placeholder='20XX-XXXX'
                                                    onChange={(e) => setStudNum(e.target.value)}
                                                />
                                                <motion.div className='w-full text-white text-center'>Student Number</motion.div>
                                            </section>
                                        </motion.div>

                                        {/* Student Name */}
                                        <motion.div className='edit-students-modal-input-container'>
                                            <section className='inline-block edit-students-modal-section-studname'>
                                                <input
                                                    className='edit-students-modal-input-style'
                                                    type="text"
                                                    name="studName"
                                                    placeholder='Enter student name'
                                                    onChange={(e) => setStudName(e.target.value)}
                                                />
                                                <motion.div className='w-full text-white text-center'>Student Name</motion.div>
                                            </section>
                                        </motion.div>

                                        {/* Degree Program */}
                                        <motion.div className='edit-students-modal-input-container'>
                                            <section className='inline-block edit-students-modal-section-degree'>
                                                <input
                                                    className='edit-students-modal-input-style'
                                                    type="text"
                                                    name="degree"
                                                    placeholder='Degree Program'
                                                    onChange={(e) => setDegree(e.target.value)}
                                                />
                                                <motion.div className='w-full text-white text-center'>Degree Program</motion.div>
                                            </section>
                                        </motion.div>
                                    </form>
                                    {/* save and discard buttons */}
                                    <motion.div className='edit-students-modal-footer'>
                                        <button className='edit-students-modal-btn edit-students-modal-btn-discard text-center' onClick={() => {setOpenModal(false)}}>Discard</button>
                                        <button className='edit-students-modal-btn edit-students-modal-btn-save text-white' onClick={submitStudentEdit}>Save changes</button>
                                    </motion.div>
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </AnimatePresence>
            )}
        </>
    )
}


export default AddRow;
