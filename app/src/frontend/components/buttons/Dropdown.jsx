import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronUpIcon } from '@heroicons/react/solid';
import { Transition } from '@headlessui/react';
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
*/
const Dropdown = ({ studentInfo, grades, setHistory, setSelectedStudent }) => {

  // State handlers for dropdown
  const [isActive, setIsActive] = useState(false);
  // State handler for edit student modal
  const [editModal, setEditModal] = useState(false);
  // State handler for justification modal
  const [justModal, setJustModal] = useState(false);

  // State handler for input fields
  const [studNum, setStudNum] = useState('');
  const [studFName, setStudFName] = useState('');
  const [studMName, setStudMName] = useState('');
  const [studLName, setStudLName] = useState('');
  const [degree, setDegree] = useState('');

  // State handler for initial value of input fields
  const [studNumUnedited, setStudNumUnedited] = useState('');
  const [studFNameUnedited, setStudFNameUnedited] = useState('');
  const [studMNameUnedited, setStudMNameUnedited] = useState('');
  const [studLNameUnedited, setStudLNameUnedited] = useState('');
  const [degreeUnedited, setDegreeUnedited] = useState('');

  const [histTitle, setTitle] = useState(`Edited student detail information from Name: ${studentInfo.iname.lname}, ${studentInfo.iname.fname} ${studentInfo.iname.mname}., Student No.: ${studentInfo.stud_no}, and Degree: ${studentInfo.degree_program} to `);
  const [currStudentID, setcurrStudentID] = useState(localStorage.getItem('currStudentID'));
  const [ip, setIp] = useState(localStorage.getItem('ServerIP'));

  
  const [currUser, setUser] = useState(`${localStorage.getItem("FirstName")} ${localStorage.getItem("LastName")} ${localStorage.getItem("MiddleName")}`);
  
  let navigate = useNavigate();

  /*-------------------- Functions --------------------*/
  
  // sets fields upon rendering
  useEffect(() => {
    setStudNum(studentInfo.stud_no)
    setDegree(studentInfo.degree_program.toUpperCase())
    setStudFName(studentInfo.iname.fname.toUpperCase())
    setStudMName(studentInfo.iname.mname.toUpperCase())
    setStudLName(studentInfo.iname.lname.toUpperCase())
    setStudNumUnedited(studentInfo.stud_no)
    setDegreeUnedited(studentInfo.degree_program.toUpperCase())
    setStudFNameUnedited(studentInfo.iname.fname.toUpperCase())
    setStudMNameUnedited(studentInfo.iname.mname.toUpperCase())
    setStudLNameUnedited(studentInfo.iname.lname.toUpperCase())
  }, [])

  // Function to open the edit student modal window
  const openModal = () => {
    setEditModal(true);

  }

  // Function to close the edit student modal window
  const closeEditStud = () => {
    setEditModal(false);

    // drop changes in input fields
    setStudNum(studentInfo.stud_no);
    setDegree(studentInfo.degree_program.toUpperCase());
    setStudFName(studentInfo.iname.fname.toUpperCase());
    setStudMName(studentInfo.iname.mname.toUpperCase());
    setStudLName(studentInfo.iname.lname.toUpperCase());
  }

  // Function to close justification modal
  const closeJustModal = () => {
    setJustModal(false);

    // drop changes in input fields
    setStudNum(studentInfo.stud_no);
    setDegree(studentInfo.degree_program.toUpperCase());
    setStudFName(studentInfo.iname.fname.toUpperCase());
    setStudMName(studentInfo.iname.mname.toUpperCase());
    setStudLName(studentInfo.iname.lname.toUpperCase());
}

  // Event handler for Export on dropdown
  const handleExport = () => {

    // get student info and grades from props
    const student = studentInfo
    const studentGrades = grades

    exportStudentData(student, studentGrades, currUser);

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

  //function which updates Student input fields
  const updateStudent = () => {
    const credentials = {
        StudentID: studNum,
        FirstName: studFName.toUpperCase(),     //put first name variable
        LastName: studLName.toUpperCase(),      //put last name variable
        MiddleName: studMName.toUpperCase(),    //put middle name variable
        Degree: degree.toUpperCase(),
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

    // update new values for student details
    setStudNumUnedited(studNum);
    setStudFNameUnedited(studFName.toUpperCase());
    setStudMNameUnedited(studMName.toUpperCase());
    setStudLNameUnedited(studLName.toUpperCase());
    setDegreeUnedited(degree.toUpperCase());

    // close modal windows
    setJustModal(false);
    setEditModal(false);

    setSelectedStudent( (prevState)=>({...prevState, stud_no: studNum, degree_program: degree.toUpperCase(), Student: currStudentID, iname: {fname: studFName.toUpperCase(), mname: studMName.toUpperCase(), lname: studLName.toUpperCase()}}))
    
    // success message
    Swal.fire({
        title: 'Success',
        text: 'Successfully edited student detail.',
        icon: 'success',
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

  //main function for student update and add history
  const editModalSave = () => {
        setEditModal(false);       // close edit student modal
        setJustModal(true);     // open justification
      //setSelectedStudent( (prevState)=>({...prevState, stud_no: studNum, degree_program: degree, Student: currStudentID, iname: {fname: studFName, mname: studMName, lname: studLName}}))
  }

  return (
        <>
            <Justification
                modalState={justModal}
                modalHandler={closeJustModal}
                parentSubmitHandler={updateStudent}
                handleHistory={handleHistory}
                histTitle={histTitle}
            />
            
            { editModal ? 
                <EditStudentDetails
                    modalState={editModal}
                    handleClose={closeEditStud}
                    editModalSave={editModalSave}

                    studNum={studNum}
                    studFName={studFName}
                    studMName={studMName}
                    studLName={studLName}
                    degree={degree}
                    setStudNum={setStudNum}
                    setStudFName={setStudFName}
                    setStudMName={setStudMName}
                    setStudLName={setStudLName}
                    setDegree={setDegree}
                    setcurrStudentID={currStudentID}

                    studNumUnedited={studNumUnedited}
                    studFNameUnedited={studFNameUnedited}
                    studMNameUnedited={studMNameUnedited}
                    studLNameUnedited={studLNameUnedited}
                    degreeUnedited={degreeUnedited}
                    setStudNumUnedited={setStudNumUnedited}
                    setStudFNameUnedited={setStudFNameUnedited}
                    setStudMNameUnedited={setStudMNameUnedited}
                    setStudLNameUnedited={setStudLNameUnedited}
                    setDegreeUnedited={setDegreeUnedited}

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