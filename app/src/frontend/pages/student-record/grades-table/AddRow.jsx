import { AnimatePresence, motion } from 'framer-motion';
import { Dialog, Transition} from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import Swal from 'sweetalert2'

/* Components */
// import Add from 'frontend/components/buttons/AddRowBtn.jsx';
import Justification from './Justification';

/* CSS */
import 'tailwindcss/tailwind.css';
import './AddRow.css';

/* Function for the "Add Row" feature in the Student View Record page */
/* Initially shows an "Add" button and prompts the modal window after clicking it */
const AddRow = ({ sem, grades, addHandler, histHandler, modalState, handleClose }) => {


    const [gradesData, setGradesData] = useState(grades);
    const [courseName, setCourseName] = useState('');
    const [units, setUnits] = useState('');
    const [grade, setGrade] = useState('');
    const [userName, setUserName] = useState(localStorage.getItem("Username"));
    const [studentID, setStudentID] = useState(localStorage.getItem("currStudentID"));
    const [ip, setIP] = useState(localStorage.getItem('ServerIP'));
    // const [histTitle, setHistTitle] = useState(''); // value of history title (might use later)

  
    // checks if the course is already in the grade list
    function isGradeDuplicate(course){

        // access each grades
        for(let i = 0; i < gradesData.length; i++){

            // compare course name to courses in grades
            if(course == gradesData[i].courseName){
                return true
            }

        }

        return false
    }

  
    // reset input fields called upon closing modal
    const resetInputFields = () => {
        setCourseName('');
        setUnits('');
        setGrade('');

        // Close add row modal
        handleClose();
    }

    
    // function for adding new history after adding new row
    // ..
    // .. for revisions after adding Justification for AddRow
    // ..
    function handleHistory(data){

        // new history to save to db
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

        // new history for history tab change handler
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

        // history handler
        histHandler(updateHistory);

        // adds new grade to list and updates row
        addHandler({
            _id : data._id,
            courseName: courseName,
            units: units,
            grade: grade,
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
        
        // if course is already a duplicate 
        // show alerts &
        // returns to add row modal
        if(isGradeDuplicate(courseName)){
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Course is already in the list. Change course name or edit the available course',
            })
            return
        }

        // new grade from the AddRow fields to be added to DB
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
        
        //reset input fields
        resetInputFields();
        // close AddRow modal after 
        handleClose();
    }


    return (
        <>
            {/* Wrapping everything with transition component to use transition effects from @headlessui/react */}
            <Transition appear show={modalState} as={Fragment}>

                {/* Wrapping everything with dialog component */}
                <Dialog as="div" className="relative z-50" onClose={resetInputFields}>
                    {/* Transition effect for the element inside this Transition.Child tag*/}
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        {/* Container for the layer behind the modal window */}
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>
                    
                    {/* Container for the layer containing the modal window */}
                    <div className="add-row-modal">
                        {/* Transition effect for the element inside this Transition.Child tag*/}
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            {/* Add Row modal window */}
                            <Dialog.Panel className="add-row-modal-content">
                                <div className="bg-baybayin add-row-baybayin-style"></div>
                                <div className='add-row-modal-body'>
                                    {/* title */}
                                    <div className='add-row-modal-close text-white float-right'>
                                        <button onClick={resetInputFields}>
                                            <span>&times;</span>
                                        </button>
                                    </div>
                                    <div className='add-row-modal-title text-white text-center'>Please fill in the fields below to insert a new row</div>
                                    {/* input form */}
                                    <form className='add-row-modal-inputs flex items-center justify-center'>
                                        {/* course name */}
                                        <div className='add-row-input-container'>
                                            <section className='inline-block add-row-section-coursename'>
                                                <input 
                                                    className='add-row-input-style'
                                                    type="text"
                                                    name="courseName"
                                                    placeholder='Enter course name'
                                                    onChange={(e) => setCourseName(e.target.value)}
                                                />
                                                <div className='w-full text-white text-center'>Course Name</div>
                                            </section>
                                        </div>

                                        {/* units */}
                                        <div className='add-row-input-container'>
                                            <section className='inline-block add-row-section-units'>
                                                <input 
                                                    className='add-row-input-style'
                                                    type="number"
                                                    name="units"
                                                    placeholder='0'
                                                    onChange={(e) => setUnits(e.target.value)}
                                                />
                                                <div className='w-full text-white text-center'>Units</div>
                                            </section>
                                        </div>

                                        {/* grade */}
                                        <div className='add-row-input-container'>
                                            <section className='inline-block add-row-section-grade'>
                                                <input 
                                                    className='add-row-input-style'
                                                    type="number"
                                                    name="grade"
                                                    placeholder='0'
                                                    onChange={(e) => setGrade(e.target.value)}
                                                />
                                                <div className='w-full text-white text-center'>Grade</div>
                                            </section>
                                        </div>
                                    </form>
                                    {/* save and discard buttons */}
                                    <div className='add-row-modal-footer flex items-end justify-end'>                                        
                                        <button className='add-row-modal-btn add-row-btn-discard text-center' onClick={resetInputFields}>Discard</button>
                                        <button className='add-row-modal-btn add-row-btn-save text-center text-white' onClick={handleAddGrade}>Save</button>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}


export default AddRow;