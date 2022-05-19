import { AnimatePresence, motion } from 'framer-motion';
import { Dialog, Transition} from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import Swal from 'sweetalert2'

/* Components */
// import Add from 'frontend/components/buttons/AddRowBtn.jsx';
import Justification from './Justification';

/* CSS */
import 'tailwindcss/tailwind.css';


// Parent component >> AddRowBtn.jsx

// For disabling up-down arrows in input number textfield
const inputs = 
    `input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    input[type=number] {
        -moz-appearance: textfield;
    }`;


/* Function for the "Add Row" feature in the Student View Record page */
/* Initially shows an "Add" button and prompts the modal window after clicking it */
const AddRow = ({ sem, grades, addHandler, histHandler, modalState, modalHandler }) => {

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
        // modalHandler();
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
        modalHandler();
    }


    // Styling
    const addRowModal = `relative bg-secondary-red h-[36.70360110803324vh] w-[49.479166666666664vw] rounded-[3.2552083333333335vw] px-[3.2552083333333335vw] font-normal font-montserrat m-auto overflow-hidden py-0 fixed inset-0 z-50`;
    const baybayinStyle = `bg-baybayin bg-repeat-y bg-contain mt-0 relative top-0 ml-[-11.25vh] h-[36.70360110803324vh]`;
    const modalBody = `absolute inset-x-0 bg-secondary-red top-[10%] bottom-[10%]`;
    const modalClose = `text-[4.847645429362881vh] text-white float-right`;
    const modalTitle = `text-white text-center font-bold italic text-[1.3020833333333333vw] mt-[4.1551246537396125vh] mb-[4.847645429362881vh]`;
    const modalInputs = `text-[1.1067708333333333vw] flex items-center justify-center`;
    const inputContainer = `ml-5 mr-[0.9765625vw]`;
    const inputStyle = `text-center w-full h-[4.847645429362881vh] rounded-[0.6510416666666666vw]`
    const sectionCoursename = `inline-block w-[11.71875vw]`;
    const sectionUnits = `inline-block w-[3.90625vw]`;
    const sectionGrade = `inline-block w-[4.8828125vw]`;
    const modalFooter = `absolute right-0 bottom-0 mt-[4.847645429362881vh] text-[1.1067708333333333vw] flex items-end justify-end`;
    const modalBtnSave = `h-[5.54016620498615vh] w-[9.765625vw] py-[0.6510416666666666vw] px-[1.770083102493075vh] rounded-[0.6510416666666666vw] mr-[0.6510416666666666vw] bg-save hover:bg-save-hover text-center text-white`;
    const modalBtnDiscard = `h-[5.54016620498615vh] w-[9.765625vw] py-[0.6510416666666666vw] px-[1.770083102493075vh] rounded-[0.6510416666666666vw] mr-[0.6510416666666666vw] bg-discard hover:bg-white text-center`;


    return (
        <>
            {/* <Justification modalState={open} modalHandler={closeJust} parentSubmitHandler={handleAddGrade} histHandler={histHandler} /> */}

            {/* Wrapping everything with transition component to use transition effects from @headlessui/react */}
            <Transition appear show={modalState} as={Fragment}>

                {/* Wrapping everything with dialog component */}
                <Dialog as="div" className="relative z-50" onClose={resetInputFields}>

                    <style>{inputs}</style>

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
                    <div className="fixed inset-0 overflow-y-auto flex min-h-full items-center justify-center p-4 text-center">

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
                            <Dialog.Panel className={addRowModal}>
                                <div className={baybayinStyle}></div>
                                <div className={modalBody}>

                                    {/* title */}
                                    <div className={modalClose}>
                                        <button onClick={resetInputFields}>
                                            <span>&times;</span>
                                        </button>
                                    </div>

                                    <div className={modalTitle}>Please fill in the fields below to insert a new row</div>

                                    {/* input form */}
                                    <form className={modalInputs}>

                                        {/* course name */}
                                        <div className={inputContainer}>
                                            <section className={sectionCoursename}>
                                                <input 
                                                    className={inputStyle}
                                                    type="text"
                                                    name="courseName"
                                                    placeholder='Enter course name'
                                                    onChange={(e) => setCourseName(e.target.value)}
                                                />
                                                <div className='w-full text-white text-center'>Course Name</div>
                                            </section>
                                        </div>

                                        {/* units */}
                                        <div className={inputContainer}>
                                            <section className={sectionUnits}>
                                                <input 
                                                    className={inputStyle}
                                                    type="number"
                                                    name="units"
                                                    placeholder='0'
                                                    onChange={(e) => setUnits(e.target.value)}
                                                />
                                                <div className='w-full text-white text-center'>Units</div>
                                            </section>
                                        </div>

                                        {/* grade */}
                                        <div className={inputContainer}>
                                            <section className={sectionGrade}>
                                                <input 
                                                    className={inputStyle}
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
                                    <div className={modalFooter}>                                        
                                        <button className={modalBtnDiscard} onClick={resetInputFields}>Discard</button>
                                        <button className={modalBtnSave} onClick={handleAddGrade}>Save</button>
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