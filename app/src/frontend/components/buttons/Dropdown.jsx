import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronUpIcon } from '@heroicons/react/solid';
import { Transition } from '@headlessui/react';
import 'tailwindcss/tailwind.css';

/* Components */
import EditBtn from 'frontend/components/buttons/EditStudentBtn';
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
  
  const [currUser, setUser] = useState(`${localStorage.getItem("FirstName")} ${localStorage.getItem("LastName")} ${localStorage.getItem("MiddleName")}`);
  
  let navigate = useNavigate();

  // Function to open the edit student modal window
  const openModal = () => {
    setEditModal(true);
  }

  // Function to close the edit student modal window
  const closeEditStud = () => {
    setEditModal(false);
  }

  // Event handler for Export on dropdown
  const handleExport = () => {

    // get student info and grades from props
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
    <div className="w-2/3 font-poppins relative ml-auto grow-0">
        
      {/* Active word and dropdown icon */}
      <div className="grid-cols-2 divide-x w-full py-1.5 bg-button-green hover:bg-button-green-hover  flex items-center justify-items-center rounded-lg border border-slate-300">
        
        <button
          type="button"
          className="inline-block grow hover:bg-button-green-hover rounded-l-lg"
        >
          <p className="inline-block grow font-medium text-center text-white">
            Actions
          </p>
        </button>
          
        <button
          type="button"
          className="inline-block bg-button-green grow hover:bg-button-green-hover rounded-r-lg"
          onClick={() => {
            setIsActive(!isActive);
          }}
        >
          <section className="inline-block grow">
            <ChevronUpIcon 
                className={`${
                    !isActive ? 'transform rotate-180 ' : ''
                } w-5 xl:w-7 duration-200 text-sidebar-text inline-flex self-center`} />
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
          className="origin-top-right z-10 absolute w-full mt-0.5 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none"
          tabIndex="-1"
        >
          <div>
            {/* Export button */}
            <button
              className="rounded-t-lg block py-2 text-sm text-center w-full bg-button-green hover:bg-button-green-hover hover:rounded-t-lg"
              type="button"
              onClick={() => {
                setIsActive(false);
                handleExport();
              }}
            >
              <p className="text-white">Export</p>
            </button>
            
            {/* Edit button */}
            <button
                className="bg-button-green hover:bg-button-green-hover block px-4 rounded-b-lg py-2 text-sm z-1 w-full"
                type="button"
                onClick={openModal}
            >
                <p className=" text-white">Edit</p>
            </button>
            
            {editModal ? 
                <EditBtn editModal={editModal} closeEditStud={closeEditStud} studentInfo={studentInfo} setHistory={setHistory} setSelectedStudent={setSelectedStudent}/>
            :   <></>
            }
          </div>
        </div>
      </Transition>
    </div>
  );
};


export default Dropdown;