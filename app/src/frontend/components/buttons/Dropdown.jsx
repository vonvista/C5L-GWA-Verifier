import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronUpIcon } from '@heroicons/react/solid';
import { Transition } from '@headlessui/react';
import { useForm, isRequired } from 'frontend/hooks/useForm';
import 'tailwindcss/tailwind.css';

/* Components */
import EditStudentDetails from 'frontend/pages/student-record/StudentDetailEditModal';
import Justification from 'frontend/pages/student-record/grades-table/Justification';
import studentDelete from 'backend/studentDelete';
import exportStudentData from 'backend/exportStudentData';
import Swal from 'sweetalert2';


/* Parent component >> frontend/pages/student-record/StudentViewRecord */

/* This function contains the "Actions" dropdown menu in the student information header
   Additional references: https://tailwindui.com/components/application-ui/elements/dropdowns */
/* 
   Props:
    studentInfo   ---   contains student information which will be used for exporting student record file
    grades        ---   contains student gradesheet which will be used for exporting student record file
    setHistory    ---   function to update history logs
    setSelectedStudent  ---  function that sets selectedStudent state in parent component
    forceReload   ---   reloads the page
    gpa           ---   contains gpa calculation values
*/
const Dropdown = ({ studentInfo, grades, setHistory, setSelectedStudent, forceReload, gpa }) => {

    // State handlers for Dropdown
    const [isActive, setIsActive] = useState(false);
    // State handler for Edit Student Details modal
    const [editModal, setEditModal] = useState(false);
    // State handler for Justification modal
    const [justModal, setJustModal] = useState(false);

    const [histTitle, setTitle] = useState(`Edited student detail information from Name: ${studentInfo.iname.lname}, ${studentInfo.iname.fname} ${studentInfo.iname.mname}., Student No.: ${studentInfo.stud_no}, and Degree: ${studentInfo.degree_program} to `);
    const [currStudentID, setcurrStudentID] = useState(localStorage.getItem('currStudentID'));
    const [ip, setIp] = useState(localStorage.getItem('ServerIP'));    
    const [currUser, setUser] = useState(`${localStorage.getItem("FirstName")} ${localStorage.getItem("LastName")} ${localStorage.getItem("MiddleName")}`);
    
    let navigate = useNavigate();

    //Function which updates Student input fields
    const updateStudent = async (values) => {

        const credentials = {
            StudentID: values.studNum,
            FirstName: values.studFName.toUpperCase(),     //put first name variable
            LastName: values.studLName.toUpperCase(),      //put last name variable
            MiddleName: values.studMName.toUpperCase(),    //put middle name variable
            Degree: values.degree.toUpperCase(),
            _id: currStudentID
        }

        fetch(`http://${ip}:3001/student/update` ,{
            method: "POST",
            headers: { "Content-Type":"application/json", "Authorization": `Bearer ${localStorage.getItem("Username")} ${localStorage.getItem("Password")}` },
            body: JSON.stringify(credentials)
        })
        .then(response => response.json())
        .then(body => {
            console.log(body)
        })
        .catch(err => { //will activate if DB is not reachable or timed out or there are other errors
            Swal.fire({
                icon: 'error',
                title: 'Server Error',
                text: 'Check if the server is running or if database IP is correct',
            })
            console.log(err)
        })

        // close modal windows
        setJustModal(false);
        setEditModal(false);

        setSelectedStudent( (prevState)=>({...prevState, stud_no: values.studNum, degree_program: values.degree.toUpperCase(), Student: currStudentID, iname: {fname: values.studFName.toUpperCase(), mname: values.studMName.toUpperCase(), lname: values.studLName.toUpperCase()}}))
        
        // success message
        Swal.fire({
            title: 'Success',
            html: 'Successfully edited student detail.<br>The page will now refresh.',
            icon: 'success',
        })

        // reload page
        forceReload();
    }

    // Initialize states
    const initialState = {
        studNum: studentInfo.stud_no,
        studFName: studentInfo.iname.fname,
        studMName: studentInfo.iname.mname,
        studLName: studentInfo.iname.lname,
        degree: studentInfo.degree_program
    }
    // Set state validations
    const validations = [
        ({studNum}) => isRequired(studNum) || {studNum: 'Student Number is required'},
        ({studFName}) => isRequired(studFName) || {studFName: 'First Name is required'},
        ({studMName}) => isRequired(studMName) || {studMName: 'Middle Initial is required'},
        ({studLName}) => isRequired(studLName) || {studLName: 'Last Name is required'},
        ({degree}) => isRequired(degree) || {degree: 'Degree is required'},
    ]

    // useForm hook
    const {values, isValid, errors, touched, changeHandler, submitHandler, resetValues} = useForm(initialState, validations, updateStudent);


    /*-------------------- Functions --------------------*/
    // Function to open the edit student modal window
    const openModal = () => {
        setEditModal(true);
    }

    // Function to close the edit student modal window
    const closeEditStud = () => {
        setEditModal(false);
        resetValues()           // drop changes in input fields
    }

    // Function to close justification modal
    const closeJustModal = () => {
        setJustModal(false);
        resetValues();
    }

    // Event handler for Export on dropdown
    const handleExport = () => {

        // get student info and grades from props
        const student = studentInfo
        const studentGrades = grades
        const gpaCalc = gpa
        exportStudentData(student, studentGrades, currUser, gpaCalc);

        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 5000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
            //close on click
        })
        
        Toast.fire({
            icon: 'info',
            title: 'Save or cancel file export'
        })
    }

    // Function for adding new history after adding new row
    function handleHistory(data){
        let updateHistory = {
            date: new Date().toLocaleDateString(),
            info: [
                {
                    main: histTitle,
                    user: data.user,
                    time: new Date().toLocaleTimeString('en-US', { 
                        hour12: false, 
                        hour: "numeric", 
                        minute: "numeric"
                    }),
                    details: data.desc,
                    id: data._id,
                    hasImage: data.hasImage,
                },
            ],
        }

        // history handler
        setHistory(updateHistory);
    }

    //Main function for student update and add history
    const editModalSave = () => {
        setEditModal(false);        // close edit student modal
        setJustModal(true);         // open justification
    }

    return (
        <>
            <Justification
                modalState={justModal}
                modalHandler={closeJustModal}
                parentSubmitHandler={submitHandler}
                handleHistory={handleHistory}
                histTitle={histTitle}
            />
            
            { editModal ? 
                <EditStudentDetails
                    modalState={editModal}
                    handleClose={closeEditStud}
                    editModalSave={editModalSave}

                    values ={values}
                    isValid ={isValid}
                    errors={errors}
                    touched={touched}
                    changeHandler={changeHandler}
                    submitHandler={submitHandler}
                    
                    setJustModal={setJustModal}
                    setTitle={setTitle}
                    studentInfo={studentInfo}
                /> : <></>
            }

            <div className="w-2/3 font-poppins relative ml-auto grow-0 text-[0.9vw]">
            
                {/* Active word and dropdown icon */}
                <div className="grid-cols-2 divide-x w-[9.5vw] py-[0.3vh] 1.75xl:py-[0.5vh] 5xl:py-[0.75vh] text-center text-sidebar-text bg-button-green hover:bg-button-green-hover flex items-center justify-items-center rounded-lg border
                                transition-all ease-in-out duration-300 hover:transition-all hover:ease-in-out hover:duration-300"
                    onClick={() => {
                        setIsActive(!isActive);
                    }}
                >
                    <button
                        type="button"
                        className="inline-block grow transition ease-out hover:transition hover:ease-in hover:bg-button-green-hover rounded-l-lg"
                    >
                        <p className="inline-block grow font-medium">
                            Actions
                        </p>
                    </button>
                    <button
                        type="button"
                        className="inline-block grow bg-transparent rounded-r-lg"
                    >
                        <section className="inline-block grow">
                            <ChevronUpIcon 
                                className={`${
                                    !isActive ? 'transform rotate-180 ' : ''
                                } w-5 xl:w-7 duration-200 inline-flex self-center`} />
                        </section>
                    </button>
                </div>
                
                {/* Dropdown Options */}
                <Transition
                    show={isActive}
                    enter="transition duration-200 ease-out"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition duration-200 ease-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0"
                >
                    <div
                        className="origin-top-right z-10 absolute w-[9.5vw] mt-[0.25vh] rounded-lg shadow-lg text-sidebar-text bg-button-green"
                        tabIndex="-1"
                    >
                        <div>
                            {/* Export button */}
                            <button
                                className="rounded-t-lg py-[0.75vh] 5xl:py-[0.75vh] w-full bg-button-green transition ease-out hover:transition hover:ease-in  hover:bg-button-green-hover hover:rounded-t-lg"
                                type="button"
                                onClick={() => {
                                    setIsActive(false);
                                    handleExport();
                                }}
                            >
                                <span>Export</span>
                            </button>
                            
                            {/* Edit button */}
                            <button
                                className="w-full py-[0.75vh] 5xl:py-[0.75vh] bg-button-green transition ease-out hover:transition hover:ease-in hover:bg-button-green-hover rounded-b-lg"
                                type="button"
                                onClick={openModal}
                            >
                                <span>Edit</span>
                            </button>
                        </div>
                    </div>
                </Transition>
            </div>
        </>
    );
};


export default Dropdown;