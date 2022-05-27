import { useState } from 'react';
import { PlusSmIcon } from '@heroicons/react/solid';
import AddRow from 'frontend/pages/student-record/grades-table/AddRow';
import Justification from 'frontend/pages/student-record/grades-table/Justification';
import Swal from 'sweetalert2';
import 'tailwindcss/tailwind.css';


/* Parent component >> frontend/components/table/List */

/* This component is for the "Add Row" button found in the Student Record page */
/* 
   Props:
    sem         ---     receives the sem and year that indicates which table is the Add Row button placed in
    grades      ---     receives the list of courses taken and grades received by the selected student in a perticular sem and year
    addHandler  ---     function that updates the state of the list of courses taken by the student in a semester
    histHandler ---     function that updates the state of the student record history
*/
const AddRowBtn = ({ sem, grades, addHandler, handleHistory }) => {

    /*-------------------- State handlers --------------------*/

    // State handler for add row modal
    const [isOpen, setIsOpen] = useState(false)
    // State handler for justification modal
    const [open, setOpen] = useState(false)
    // State handler for the list of courses taken in a semester
    const [gradesData, setGradesData] = useState(grades);

    // State handlers for the input fields in the add row modal
    const [courseName, setCourseName] = useState('');
    const [units, setUnits] = useState('');
    const [grade, setGrade] = useState('');
    const [title, setTitle] = useState('');

    const [userName, setUserName] = useState(localStorage.getItem("Username"));
    const [studentID, setStudentID] = useState(localStorage.getItem("currStudentID"));
    const [ip, setIP] = useState(localStorage.getItem('ServerIP'));
    // const [histTitle, setHistTitle] = useState(''); // value of history title (might use later)

    
    /*-------------------- Functions --------------------*/

    // Function to reset the input fields in the add row modal window
    const resetInputFields = () => {
        setCourseName('');
        setUnits('');
        setGrade('');
    }

    // Function to open the add row modal window
    const openModal = () => {
        setIsOpen(true);
    }

    // Function to close the add row modal window
    const closeAddRow = () => {
        resetInputFields();
        setIsOpen(false);
    }

    // Function to close the justification modal window
    const closeJust = () => {
        resetInputFields();
        setOpen(false)
    }
    
    // Function that checks if the course is already in the grade list
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
    
    // Function for adding new history after adding new row
    // ..
    // .. for revisions after adding Justification for AddRow
    // ..
    function setHistory(data){

        // // new history to save to db
        // let newHistory = {
        //     User: userName,
        //     Student: studentID,
        //     Date: new Date().toLocaleDateString(),
        //     Time: new Date().toLocaleTimeString('en-US', { 
        //         hour12: false, 
        //         hour: "numeric", 
        //         minute: "numeric"
        //     }),
        //     Description: "create",
        //     Details: `create student grade with Course: ${data.Course} on Sem: ${data.Semyear}`,
        // }

        // new history for history tab change handler
        let updateHistory = {
            date: new Date().toLocaleDateString(),
            info: [
                {
                main: title,
                user: data.user,
                time: new Date().toLocaleTimeString('en-US', { 
                    hour12: false, 
                    hour: "numeric", 
                    minute: "numeric"
                }),
                details: data.desc,
                },
            ],
        }

        // history handler
        handleHistory(updateHistory);


        // // fetch post request to add new history
        // fetch(`http://${ip}:3001/history/add`, {
        //     method: "POST",
        //     headers: {
        //     "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify(newHistory)
        // })
        //     .then(response => response.json())
        //     .then(body => console.log(body))
        //     .catch(err => { //will activate if DB is not reachable or timed out or there are other errors
        //         Swal.fire({
        //             icon: 'error',
        //             title: 'Server Error',
        //             text: 'Check if the server is running or if database IP is correct',
        //         })
        //         console.log(err)
        //     })
    }


    // Function that handles adding grade to DB
    const handleAddGrade = () => {

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

        //console.log(newGrade)

        // add new grade to DB
        fetch(`http://${ip}:3001/grade/add`, {
            method: "POST",
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("Username")} ${localStorage.getItem("Password")}` },
            body: JSON.stringify(newGrade)
        })
            .then(response => response.json())
            .then(body => {
                // adds new grade to list and updates row
                addHandler({
                    _id : body._id,
                    courseName: courseName,
                    units: units,
                    grade: grade,
                })

            })
            .catch(err => { //will activate if DB is not reachable or timed out or there are other errors
                Swal.fire({
                    icon: 'error',
                    title: 'Server Error',
                    text: 'Check if the server is running or if database IP is correct',
                })
                //console.log(err)
            })
        
        closeAddRow();
    }

    // Function that closes add row modal, opens justification modal
    const handleSave = () => {
        

        // if course is already a duplicate 
        // show alerts &
        // returns to add row modal
        if(isGradeDuplicate(courseName)){
            // resetInputFields();
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Course is already in the list. Change course name or edit the available course.',
            })
            return;
        }

        setIsOpen(false)   // closes add row modal
        setOpen(true)      // opens justification modal
    }

    // Styling
    const addRowStyle = `w-3/5 h-8 bg-button-green mb-3 rounded-xl text-white font-montserrat font-bold hover:shadow-lg hover:bg-button-green-hover`;

    
    return (
        <>
            {/* Justification modal */}
            <Justification modalState={open} modalHandler={closeJust} parentSubmitHandler={handleAddGrade} handleHistory={setHistory} histTitle={title} />
            
            {/* Add Row modal */}
            <AddRow
                modalState={isOpen}      
                handleSave={handleSave}
                handleClose={closeAddRow} 

                /* Input Fields */
                courseNameState={courseName}
                courseNameHandler={setCourseName}
                unitsState={units}
                unitsHandler={setUnits}
                gradeState={grade}
                gradeHandler={setGrade}
                histTitleHandler={setTitle}
                semState={sem}
                grades={grades}
            />

            {/* Add Row button */}
            <button className={addRowStyle} type="button" onClick={openModal}>
                <PlusSmIcon className="w-6 ml-0.25 mr-1.5 inline-flex"/>
                <p className="text-xs inline-block">Add Row</p>
            </button>
        </>
    );
};


export default AddRowBtn;