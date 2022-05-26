import 'tailwindcss/tailwind.css';
import { useEffect, useState } from 'react';

/* Components */
import EditStudentDetails from 'frontend/pages/student-record/StudentDetailEditModal';
import Justification from 'frontend/pages/student-record/grades-table/Justification';
import Swal from 'sweetalert2';


/* Parent component >> frontend\components\buttons\Dropdown.jsx */

/* Function contains the Edit button from Student Record View/Edit Page's Dropdown Menu */
/* 
   Props:
    -- handleClick prop: function to handle click event
*/

const EditBtn = ({ studentInfo, setHistory }) => {
  
  /*-------------------- Styling --------------------*/
  const editBtnStyle = `text-gray-700 block px-4 rounded-xl py-2 text-sm z-1 w-full hover:bg-button-green-hover`;
  
  /*-------------------- State handlers --------------------*/
  const [valueClicked, setValueClicked] = useState('Actions');
  const [isActive, setIsActive] = useState(false);
  const [studNum, setStudNum] = useState('');
  const [studFName, setStudFName] = useState('');
  const [studMName, setStudMName] = useState('');
  const [studLName, setStudLName] = useState('');
  const [degree, setDegree] = useState('');
  const [justModal, setJustModal] = useState(false);
  const [histTitle, setTitle] = useState(`Edited student detail information from Name: ${studentInfo.iname.lname}, ${studentInfo.iname.fname} ${studentInfo.iname.mname}., Student No.: ${studentInfo.stud_no}, and Degree: ${studentInfo.degree_program} to `);
  const [currStudentID, setcurrStudentID] = useState(localStorage.getItem('currStudentID'));
  const [ip, setIp] = useState(localStorage.getItem('ServerIP'));
  // const [userName, setUserName] = useState(localStorage.getItem("Username"));

  /*-------------------- Functions --------------------*/
  useEffect(() => {
    setStudNum(studentInfo.stud_no)
    setDegree(studentInfo.degree_program)
    setStudFName(studentInfo.iname.fname)
    setStudMName(studentInfo.iname.mname)
    setStudLName(studentInfo.iname.lname)
  }, [])

  useEffect(() => {
    console.log(histTitle);
  }, [histTitle])

  // Function to open the edit student modal window
  const openModal = () => {
    setIsActive(true);
  }

  // Function to close the edit student modal window
  const closeEditStud = () => {
    setIsActive(false);
  }

  //function which updates Student input fields
  const updateStudent = () => {
    const credentials = {
        StudentID: studNum,
        FirstName: studFName, //put first name variable
        LastName: studLName, //put last name variable
        MiddleName: studMName, //put middle name variable
        Degree: degree,
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
    
  }

  return (
    <>
      <Justification modalState={justModal} modalHandler={setJustModal} parentSubmitHandler={updateStudent} handleHistory={setHistory} histTitle={histTitle}/> 
      <EditStudentDetails
        onClick={() => {
          setIsActive(!isActive);
          setValueClicked('Edit');
        }}
        modalState={isActive}
        handleClose={closeEditStud}
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
        setJustModal={setJustModal}
        setTitle={setTitle}
        />

      {/* Edit Students button */}
      <button
        className={editBtnStyle}
        type="button"
        onClick={openModal}
      >
        <p className="text-white">Edit</p>
      </button>
    </>
  );
};

export default EditBtn;
