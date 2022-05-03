import 'tailwindcss/tailwind.css';
import { useState } from 'react';
import expand from '../../../../assets/icons/collapse(1).svg';
import EditStudent from '../../components/EditStudent';
import studentDelete from 'backend/studentDelete';
import { useNavigate } from 'react-router-dom';
import exportStudentData from 'backend/exportPDF';

// Function contains the buttons in Actions Dropdown seen in Student Record View/Edit Page
// Additional references: https://tailwindui.com/components/application-ui/elements/dropdowns
const Dropdown = () => {

  const [valueClicked, setValueClicked] = useState('Actions');
  const [isActive, setIsActive] = useState(false);

  let navigate = useNavigate()

  
  // event handle for Delete button on dropdown
  const handleDelete = () => {

    // remove student from DB
    // studentDelete(localStorage.getItem('currStudentID'))  // uncomment to delete student (also remove this comment)

    // remove student infos on localStorage
    localStorage.removeItem("currStudent")
    localStorage.removeItem("currStudentID")
    localStorage.removeItem("currStudentKey")
    localStorage.removeItem("currStudentGrades")

    // navigate to user dashboard
    navigate('/user-dashboard')

  }


  // event handle for Export on dropdown
  const handleExport = () => {

    // get student info and grades from localStorage then parse them
    const studentInfo = JSON.parse(localStorage.getItem('currStudent'))
    const studentGrades = JSON.parse(localStorage.getItem('currStudentGrades'))

    // get current user's full name from localStorage
    const fName = localStorage.getItem("FirstName")
    const lName = localStorage.getItem("LastName")
    const mName = localStorage.getItem("MiddleName")

    const fullName = `${fName} ${mName} ${lName}`

    exportStudentData(studentInfo, studentGrades, fullName);

  }


  return (
    <div className="w-40 relative ml-auto grow-0">
      {/* Actions and arrow down */}
      <div className="grid-cols-2 divide-x w-40 p-2 bg-login-green mr-0 rounded-lg flex inline-flex items-center justify-items-center rounded-lg border border-slate-300">
        <button
          type="button"
          className="pl-1.75 m-0 inline-block grow hover:bg-login-green-hover rounded-l-lg"
          // add onclick
          
          onClick={() =>
            (!(valueClicked == "Delete")) 
              ? (!(valueClicked == "Export")) 
                ? null
                : handleExport()
              : studentDelete(localStorage.getItem('currStudentID'))
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
            <EditStudent
              onClick={() => {
                setIsActive(!isActive);
                setValueClicked('Edit');
              }}
            />
            <button
              className="text-gray-700 block px-4 py-2 text-sm z-1 w-full hover:bg-login-green-hover hover:rounded-b-lg"
              type="button"
              onClick={() => {
                setIsActive(!isActive);
                setValueClicked('Delete');
              }}
            >
              <p className="text-white">Delete</p>
            </button>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Dropdown;
