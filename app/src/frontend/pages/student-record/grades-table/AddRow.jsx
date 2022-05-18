import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2'

/* Components */
import Add from 'frontend/components/buttons/AddRowBtn.jsx';
import Justification from './Justification';

/* CSS */
import 'tailwindcss/tailwind.css';
import './AddRow.css';

/* Function for the "Add Row" feature in the Student View Record page */
/* Initially shows an "Add" button and prompts the modal window after clicking it */
const AddRow = ({ sem, grades, addHandler, histHandler }) => {
    const [openModal, setOpenModal] = useState(false);          // add row modal
    const [gradesData, setGradesData] = useState(grades);
    const [courseName, setCourseName] = useState('');
    const [units, setUnits] = useState('');
    const [grade, setGrade] = useState('');
    const [userName, setUserName] = useState(localStorage.getItem("Username"));
    const [studentID, setStudentID] = useState(localStorage.getItem("currStudentID"));
    const [histTitle, setHistTitle] = useState('');             // value of history title
    const [ip, setIP] = useState(localStorage.getItem('ServerIP'));

    // checks if the course is already in the grade list
    function isGradeDuplicate(course){
        for(let i = 0; i < gradesData.length; i++){
            if(course == gradesData[i].courseName){
                return true
            }
        }
        return false
    }

    const resetInputFields = () => {
        setOpenModal(false);
        setCourseName('');
        setUnits('');
        setGrade('');
    }

    // function for adding new history after adding new row
    function handleHistory(data){

        // new history
        let newHistory = {
            User: userName,
            Student: studentID,
            Date: new Date().toLocaleDateString(),
            Time: new Date().toLocaleTimeString('en-US', { 
                hour12: false, 
                hour: "numeric", 
                minute: "numeric"
            }),
            Description: "create",
            Details: `create student grade with Course: ${data.Course} on Sem: ${data.Semyear}`,
        }

        let updateHistory = {
            date: newHistory.Date,
            info: [
                {
                main: 'create',
                user: userName,
                time: newHistory.Time,
                details: newHistory.Details,
                },
            ],
        }

        histHandler(updateHistory);
        // adds new row to the list
        addHandler({
            _id : data._id,
            courseName: courseName,
            units: units,
            grade: grade,
            //enrolled: (parseFloat(units) * parseFloat(grade)).toString(),
            //runningSum: runningGWA,
        })


        // fetch post request to add new history
        fetch(`http://${ip}:3001/history/add`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(newHistory)
        })
            .then(response => response.json())
            .then(body => console.log(body))
            .catch(err => { //will activate if DB is not reachable or timed out or there are other errors
                Swal.fire({
                    icon: 'error',
                    title: 'Server Error',
                    text: 'Check if the server is running or if database IP is correct',
                })
                console.log(err)
            })
    }


    // handles adding grade to DB
    const handleAddGrade = () => {
        // Check if user has filled out all fields
        if(
            courseName === "" || 
            units === "" || 
            grade === ""
          ) {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Fill out all fields',
            })
            return
          }
        
        if(isGradeDuplicate(courseName)){
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Course is already in the list. Change course name or edit the available course',
            })
            return
        }

        // new grade from the AddRow modal
        newGrade = {
            Student: localStorage.getItem('currStudentID'),
            Course: courseName,
            Unit: parseFloat(units),
            Grade: grade,
            Weight: 0,
            Cumulative: 0,
            Semyear: sem
        }

        console.log(newGrade)

        // add new grade to DB
        fetch(`http://${ip}:3001/grade/add`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(newGrade)
        })
            .then(response => response.json())
            .then(body => handleHistory(body))
            .catch(err => { //will activate if DB is not reachable or timed out or there are other errors
                Swal.fire({
                    icon: 'error',
                    title: 'Server Error',
                    text: 'Check if the server is running or if database IP is correct',
                })
                console.log(err)
            })

        setOpenModal(false)
    }


    return (
        <>
            <Add handleClick={setOpenModal}/>
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
                        className='add-row-modal-backdrop'>
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

                            className='add-row-modal'>
                                <motion.div className="add-row-modal-content">
                                {/* Baybayin Background Image */}
                                <motion.div className="bg-baybayin add-row-baybayin-style"></motion.div>

                                {/* content */}
                                <motion.div className='add-row-modal-body'>
                                    {/* title */}
                                    <motion.div className='add-row-modal-close text-white float-right'>
                                        <button onClick={resetInputFields}>
                                            <span>&times;</span>
                                        </button>
                                    </motion.div>
                                    <motion.div className='add-row-modal-title text-white text-center'>Please fill in the fields below to insert a new row</motion.div>

                                    {/* input form */}
                                    <form className='add-row-modal-inputs flex items-center justify-center'>
                                        {/* course name */}
                                        <motion.div className='add-row-input-container'>
                                            <section className='inline-block add-row-section-coursename'>
                                                <input 
                                                    className='add-row-input-style'
                                                    type="text"
                                                    name="courseName"
                                                    placeholder='Enter course name'
                                                    onChange={(e) => setCourseName(e.target.value)}
                                                />
                                                <motion.div className='w-full text-white text-center'>Course Name</motion.div>
                                            </section>
                                        </motion.div>

                                        {/* units */}
                                        <motion.div className='add-row-input-container'>
                                            <section className='inline-block add-row-section-units'>
                                                <input 
                                                    className='add-row-input-style'
                                                    type="number"
                                                    name="units"
                                                    placeholder='0'
                                                    onChange={(e) => setUnits(e.target.value)}
                                                />
                                                <motion.div className='w-full text-white text-center'>Units</motion.div>
                                            </section>
                                        </motion.div>

                                        {/* grade */}
                                        <motion.div className='add-row-input-container'>
                                            <section className='inline-block add-row-section-grade'>
                                                <input 
                                                    className='add-row-input-style'
                                                    type="number"
                                                    name="grade"
                                                    placeholder='0'
                                                    onChange={(e) => setGrade(e.target.value)}
                                                />
                                                <motion.div className='w-full text-white text-center'>Grade</motion.div>
                                            </section>
                                        </motion.div>

                                        
                                        {/* <motion.div className='add-row-input-container'>
                                            <section className='inline-block add-row-section-enrolled'>
                                                <input 
                                                    className='add-row-input-style'
                                                    type="number"
                                                    name="enrolled"
                                                    placeholder='0'
                                                    onChange={(e) => setEnrolled(e.target.value)}
                                                />
                                                <motion.div className='w-full text-white text-center'>Enrolled</motion.div>
                                            </section>
                                        </motion.div>

                                        
                                        <motion.div className='add-row-input-container'>
                                            <section className='inline-block add-row-section-runningGWA'>
                                                <input 
                                                    className='add-row-input-style'
                                                    type="text"
                                                    name="runningGWA"
                                                    placeholder='0'
                                                    onChange={(e) => setRunningGWA(e.target.value)}
                                                />
                                                <motion.div className='w-full text-white text-center'>Running GWA</motion.div>
                                            </section>
                                        </motion.div> */}

                                    </form>
                                    {/* save and discard buttons */}
                                    <motion.div className='add-row-modal-footer flex items-end justify-end'>                                        
                                        <button className='add-row-modal-btn add-row-btn-discard text-center' onClick={resetInputFields}>Discard</button>
                                        <button className='add-row-modal-btn add-row-btn-save text-center text-white' onClick={handleAddGrade}>Save</button>
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