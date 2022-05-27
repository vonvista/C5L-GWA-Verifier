import { useEffect, useState } from 'react';
import 'tailwindcss/tailwind.css';

/* Components */
import EditStudentDetails from 'frontend/pages/student-record/StudentDetailEditModal';
import Justification from 'frontend/pages/student-record/grades-table/Justification';
import Swal from 'sweetalert2';


/* Parent component >> frontend/components/buttons/Dropdown.jsx */

/* This function contains the Edit button from student record page's dropdown menu */
/* 
   Props:
    editModal           ---  boolean; state of student detail edit modal window
    closeEditStud       ---  function that sets editModal to false
    studentInfo         ---  contains student information which will be used for exporting student record file
    setHistory          ---  function to update history logs
    setSelectedStudent  ---  function that sets selected student
*/
const EditBtn = ({ editModal, closeEditStud, studentInfo, setHistory, setSelectedStudent }) => {

  // State handler for justification modal
  const [justModal, setJustModal] = useState(false);

  // State handler for input fields
  const [studNum, setStudNum] = useState('');
  const [studFName, setStudFName] = useState('');
  const [studMName, setStudMName] = useState('');
  const [studLName, setStudLName] = useState('');
  const [degree, setDegree] = useState('');

  // input fields
  const [studNumUnedited, setStudNumUnedited] = useState('');
  const [studFNameUnedited, setStudFNameUnedited] = useState('');
  const [studMNameUnedited, setStudMNameUnedited] = useState('');
  const [studLNameUnedited, setStudLNameUnedited] = useState('');
  const [degreeUnedited, setDegreeUnedited] = useState('');

  const [histTitle, setTitle] = useState(`Edited student detail information from Name: ${studentInfo.iname.lname}, ${studentInfo.iname.fname} ${studentInfo.iname.mname}., Student No.: ${studentInfo.stud_no}, and Degree: ${studentInfo.degree_program} to `);
  const [currStudentID, setcurrStudentID] = useState(localStorage.getItem('currStudentID'));
  const [ip, setIp] = useState(localStorage.getItem('ServerIP'));

  /*-------------------- Functions --------------------*/
  
  // sets fields upon rendering
  useEffect(() => {
    setStudNum(studentInfo.stud_no)
    setDegree(studentInfo.degree_program)
    setStudFName(studentInfo.iname.fname)
    setStudMName(studentInfo.iname.mname)
    setStudLName(studentInfo.iname.lname)
    setStudNumUnedited(studentInfo.stud_no)
    setDegreeUnedited(studentInfo.degree_program)
    setStudFNameUnedited(studentInfo.iname.fname)
    setStudMNameUnedited(studentInfo.iname.mname)
    setStudLNameUnedited(studentInfo.iname.lname)
  }, [])

  // Function to close justification modal
  const closeJustModal = () => {
      setJustModal(false);
  }

  //function which updates Student input fields
  const updateStudent = () => {
    const credentials = {
        StudentID: studNum,
        FirstName: studFName,     //put first name variable
        LastName: studLName,      //put last name variable
        MiddleName: studMName,    //put middle name variable
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
    // closeJustModal();
    setSelectedStudent( (prevState)=>({...prevState, stud_no: studNum, degree_program: degree, Student: currStudentID, iname: {fname: studFName, mname: studMName, lname: studLName}}))
    
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
          },
      ],
      }

      // history handler
      setHistory(updateHistory);
  }

  //main function for student update and add history
  const editModalClose = () => {
      closeEditStud();        // close edit student modal
      setJustModal(true);     // open justification
      //setSelectedStudent( (prevState)=>({...prevState, stud_no: studNum, degree_program: degree, Student: currStudentID, iname: {fname: studFName, mname: studMName, lname: studLName}}))
  }

  return (
    <>
      <Justification modalState={justModal} modalHandler={closeJustModal} parentSubmitHandler={updateStudent} handleHistory={handleHistory} histTitle={histTitle}/> 
      
      <EditStudentDetails
            modalState={editModal}
            handleClose={closeEditStud}
            handleSave={editModalClose}

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
        />
    </>
  );
};


export default EditBtn;