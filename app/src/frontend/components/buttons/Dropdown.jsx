import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Swal from 'sweetalert2';

import expand from '../../../../assets/icons/collapse(1).svg';
import EditStudentDetails from 'frontend/pages/student-record/StudentDetailEditModal';
import studentDelete from 'backend/studentDelete';
import exportStudentData from 'backend/exportStudentData';
import 'tailwindcss/tailwind.css';


// This function contains the buttons in the dropdown seen in the student record page
// Additional references: https://tailwindui.com/components/application-ui/elements/dropdowns
// -- studentInfo prop  : contains student information which will be used for exporting student record file
// -- grades            : contains student gradesheet which will be used for exporting student record file

const Dropdown = ({ studentInfo, grades }) => {

  const [valueClicked, setValueClicked] = useState('Actions');
  const [isActive, setIsActive] = useState(false);
  const [currUser, setUser] = useState(`${localStorage.getItem("FirstName")} ${localStorage.getItem("LastName")} ${localStorage.getItem("MiddleName")}`);

  let navigate = useNavigate()

  // event handle for Export on dropdown
  const handleExport = () => {

    // get student info and grades from props
    //console.log(studentInfo)
    //console.log(grades)
    const student = studentInfo
    const studentGrades = grades

    exportStudentData(student, studentGrades, currUser);

    // swal success message
    Swal.fire(
      'Successful production of student record',
      'If you pressed save, wait for your download to finish',
      'success'
    )
  }


  return (
    <div className="w-40 relative ml-auto grow-0">

      {/* Actions and arrow down */}
      <div className="grid-cols-2 divide-x w-40 p-2 bg-button-green flex mr-0 items-center justify-items-center rounded-lg border border-slate-300">
        
        <button
          type="button"
          className="pl-1.75 m-0 inline-block grow hover:bg-button-green-hover rounded-l-lg"
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
          className="pl-1.5 m-0 inline-block bg-button-green grow hover:bg-button-green-hover rounded-r-lg"
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
          <div className="pt-1 bg-button-green rounded-lg">
            <button
              className="text-gray-700 block px-4 py-2 text-sm z-1 w-full hover:bg-button-green-hover hover:rounded-t-lg"
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
