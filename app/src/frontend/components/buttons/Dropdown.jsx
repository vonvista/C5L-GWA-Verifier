import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import expand from '../../../../assets/icons/collapse(1).svg';
import EditStudentDetails from 'frontend/pages/student-record/StudentDetailEditModal';
import studentDelete from 'backend/studentDelete';
import exportStudentData from 'backend/exportStudentData';
import 'tailwindcss/tailwind.css';


// Function contains the buttons in Actions Dropdown seen in Student Record View/Edit Page
// Additional references: https://tailwindui.com/components/application-ui/elements/dropdowns
const Dropdown = ({ studentInfo, grades }) => {

  const [valueClicked, setValueClicked] = useState('Actions');
  const [isActive, setIsActive] = useState(false);
  const [currUser, setUser] = useState(`${localStorage.getItem("FirstName")} ${localStorage.getItem("LastName")} ${localStorage.getItem("MiddleName")}`);

  let navigate = useNavigate()

  
  // // event handle for Delete button on dropdown
  // const handleDelete = () => {

  //   // remove student from DB
  //   // studentDelete(localStorage.getItem('currStudentID'))  // uncomment to delete student (also remove this comment)

  //   // remove student infos on localStorage
  //   localStorage.removeItem("currStudent")
  //   localStorage.removeItem("currStudentID")
  //   localStorage.removeItem("currStudentKey")
  //   localStorage.removeItem("currStudentGrades")

  //   // navigate to user dashboard
  //   navigate('/user-dashboard')

  // }


  // event handle for Export on dropdown
  const handleExport = () => {

    // get student info and grades from props
    console.log(studentInfo)
    console.log(grades)
    const student = studentInfo
    const studentGrades = grades

    // // get current user's full name from localStorage
    // const fName = localStorage.getItem("FirstName")
    // const lName = localStorage.getItem("LastName")
    // const mName = localStorage.getItem("MiddleName")

    // const fullName = `${fName} ${mName} ${lName}`

    exportStudentData(student, studentGrades, currUser);

  }


  return (
    <div className="w-40 relative ml-auto grow-0">
      {/* Actions and arrow down */}
      <div className="grid-cols-2 divide-x w-40 p-2 bg-login-green flex mr-0 items-center justify-items-center rounded-lg border border-slate-300">
        <button
          type="button"
          className="pl-1.75 m-0 inline-block grow hover:bg-login-green-hover rounded-l-lg"
          // add onclick
          
          onClick={() =>{
              if (valueClicked === 'Export') handleExport();
            }
            // (!(valueClicked == "Export")) ? null : handleExport()
          }

        >
          <p className="pl-1.5 m-0 inline-block grow text-center text-white">
            {valueClicked}
          </p>
        </button>
        <button
          type="button"
          className="pl-1.5 m-0 inline-block bg-login-green grow hover:bg-login-green-hover rounded-r-lg"
          onClick={() => {
            setIsActive(!isActive);
          }}
        >
          <section className="pl-1.5 m-0 inline-block grow">
            <img
              className="p-0.25 inline-flex"
              width="20px"
              height="20px"
              alt="icon"
              src={expand}
            />
          </section>
        </button>
      </div>
      {isActive ? (
        // buttons after expanding
        <div
          className="origin-top-right z-50 absolute right-0 mt-0.5 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none"
          tabIndex="-1"
        >
          <div className="pt-1 bg-login-green rounded-lg">
            <button
              className="text-gray-700 block px-4 py-2 text-sm z-1 w-full hover:bg-login-green-hover hover:rounded-t-lg"
              type="button"
              onClick={() => {
                setIsActive(!isActive);
                setValueClicked('Export');
              }}
            >
              <p className="text-white">Export</p>
            </button>
            <EditStudentDetails
              onClick={() => {
                setIsActive(!isActive);
                setValueClicked('Edit');
              }}
            />
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Dropdown;
