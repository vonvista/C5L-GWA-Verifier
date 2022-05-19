import 'tailwindcss/tailwind.css';
import { useState } from 'react';
import add from '../../../../assets/icons/addRow.svg';
import AddRow from 'frontend/pages/student-record/grades-table/AddRow';
import Justification from 'frontend/pages/student-record/grades-table/Justification';
import Swal from 'sweetalert2'

// Parent component >> List.jsx

// Function contains the Add Row button from Student Record View/Edit Page
// -- handleAdd prop: function to handle add row click event

const AddRowBtn = ({ sem, grades, addHandler, histHandler }) => {

    // State handler for add row modal
    const [isOpen, setIsOpen] = useState(false)
    // State handler for justification modal
    const [open, setOpen] = useState(false)

    const addRowStyle = `w-3/5 h-8 bg-login-green mb-3 rounded-xl text-white font-montserrat font-bold hover:shadow-lg hover:bg-login-green-hover`;

    // Functions to close the justification modal window
    const closeJust = () => {
      setOpen(false)
    }

    // Functions to open the justification modal window
    const openModal = () => {
        setIsOpen(true);
    }

    const closeModal = () => {
      setIsOpen(false);
    }

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

    const closeAddRow = () => {
        resetInputFields();
        closeModal();
    }

  
    // reset input fields called upon closing modal
    const resetInputFields = () => {
        setCourseName('');
        setUnits('');
        setGrade('');
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
        
        closeAddRow();
    }

    /* Closes add row modal, opens justification modal */
    const handleSave = () => {
      setIsOpen(false)   // closes add row modal
      setOpen(true)      // opens justification modal
    }

    return (
        <>
            <Justification modalState={open} modalHandler={closeJust} parentSubmitHandler={handleAddGrade} histHandler={histHandler} />

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
