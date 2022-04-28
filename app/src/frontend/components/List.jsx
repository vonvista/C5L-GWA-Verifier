import { React, useState, useEffect } from 'react';
import Actions from './buttons/Actions'
import EditUser from './EditUser';
import AddRow from './AddRow';
import 'tailwindcss/tailwind.css';

/* Backend */
import studentDelete from 'backend/studentDelete';
import userDelete from 'backend/userDelete';

// This list component requires a (1) condition that indicates what table to display, (2) data to be displayed. See return part at the end.

const List = ({ table, data, changeSort, sortState }) => {
    // George Gragas
    // This table is about degreeprogram
    // const DegreeProgram = ({ data }) => {
    //     return (
    //         <>
    //             <table class="table-auto">
    //                 <thead>
    //                     <tr>
    //                         <th>Program</th>
    //                         <th>Department</th>
    //                         <th>Actions</th>
    //                     </tr>
    //                 </thead>
    //                 <tbody>
    //                     {data.map((program, index) => (
    //                         <tr key = { index }>
    //                             <td>{program.programName}</td>
    //                             <td>{program.department}</td>
    //                             <td><Actions/></td>
    //                         </tr>)
    //                     )}
    //                 </tbody>
    //             </table>
    //         </>
    //     );
    // }

    // // This table is about course subjects
    // const Course = ({ data }) => {
    //     return (
    //         <>
    //             <table class="table-auto">
    //                 <thead>
    //                     <tr>
    //                         <th>Course Title</th>
    //                         <th>Course Code</th>
    //                         <th>Course Units</th>
    //                         <th>Actions</th>
    //                     </tr>
    //                 </thead>
    //                 <tbody>
    //                     {data.map((course, index) => (
    //                         <tr key = { index }>
    //                             <td>{course.title}</td>
    //                             <td>{course.courseCode}</td>
    //                             <td>{course.units }</td>
    //                             <td><Actions/></td>
    //                         </tr>)
    //                     )}
    //                 </tbody>
    //             </table>
    //         </>
    //     );
    // }

    // Table for displaying the student's summary of grades for a given semester 
    // To be used for Student Record View Page
    const SemRecord = ({ data }) => {
        return (
            <>
                <table className="table-auto w-full m-0">
                    <thead className="text-left">
                        <tr>
                            <th className="w-1/6">Course Name</th>
                            <th className="w-1/6 text-center">Units</th>
                            <th className="w-1/6 text-center">Grade</th>
                            <th className="w-1/6 text-center">Enrolled</th>
                            <th className="w-1/6 text-center"></th>
                            <th className="w-1/6 text-center"><AddRow /></th>            {/* Add row button dapat dito */}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((course, index) => (
                            <tr key = { index }>
                                <td>{course.courseName}</td>
                                <td className="text-center">{course.units}</td>
                                <td className="text-center">{course.grade}</td>
                                <td className="text-center">{course.enrolled}</td>
                                <td className="text-center">{course.runningSum}</td>
                                <td className="text-center"><Actions/></td>
                            </tr>)
                        )}
                    </tbody>
                </table>
            </>
        );
    }

    // Eyds Angeles
    // This table is about
    const User = ({data}) => {
        console.log(data);
        const [showModal, setShowModal] = useState(false)

        return (
          <>
            <table className="user-table table">
              <thead>
                  <tr>
                  <th className='user-uname'>Username</th>
                  <th className='user-name'>Name</th>
                  <th className='user-position'>Position</th>
                  <th className='user-action'>Actions</th>
                  </tr>
              </thead>
              <tbody>
                {data.map((user, index) => (
                    <tr key = {index}>
                      <td className='user-uname'>{user.uname}</td>
                      <td className='user-name'>{user.name}</td>
                      <td className='user-position'>
                          <div data-status={user.position} className='position'></div>
                      </td>
                      <td className='user-action'>
                      <Actions handleEdit={() => setShowModal(true)} handleDelete={() => userDelete(user.uname)}/>
                      {showModal ?
                        (<EditUser handleClose={() => setShowModal(false)}/>)
                        :(<></>)
                      }
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </>
        )
      }

    // Maurice Paguagan
    // Function for the Color-coded statuses
    /* const Status = ({ status }) => {
        const Checked = ( { status }) => {
            return (
                <>
                    <div className='students-status status-checked'>Checked</div>
                </>
            )
        }
        const Unchecked = ( { status }) => {
            return (
                <>
                    <div className='students-status status-unchecked'>Unchecked</div>
                </>
            )
        }
        const Pending = ( { status }) => {
            return (
                <>
                    <div className='students-status status-pending'>Pending</div>
                </>
            )
        }

        if (status == "Checked") {
            return (
                <Checked status={status} />
            )
        } else if (status == "Unchecked") {
            return (
                <Unchecked status={status} />
            )
        } else if (status == "Pending") {
            return (
                <Pending status={status} />
            )
        }
    } */

    // Function for Displaying the Student List on the Dashboard
    const StudentList = ({ data, setRows, changeSort, sortState }) => {
        useEffect(() => {
            console.log(sortState)
        })

        return (
            <>
                <table className="students-table table">
                    <thead>
                        <tr>
                            {/* sort UI asc or desc depends on the state of the parent (user-dashboard) */}
                            {/* state 0: normal; 1: ascending icon; 2: descending icon */}
                            <th className={`student-name ${
                                sortState[0] === 0 ? "" : sortState[0] === 1 ? "th-sort-asc" : "th-sort-desc" 
                            }`} onClick={() => changeSort(0)}>Name</th>
                            <th className={`student-number ${
                                sortState[1] === 0 ? "" : sortState[1] === 1 ? "th-sort-asc" : "th-sort-desc" 
                            }`} onClick={() => changeSort(1)}>Student Num</th>
                            <th className={`student-degree ${
                                sortState[2] === 0 ? "" : sortState[2] === 1 ? "th-sort-asc" : "th-sort-desc" 
                            }`} onClick={() => changeSort(2)}>Degree Program</th>
                            <th className={`student-gwa ${
                                sortState[3] === 0 ? "" : sortState[3] === 1 ? "th-sort-asc" : "th-sort-desc" 
                            }`} onClick={() => changeSort(3)}>GWA</th>
                            <th className='student-status'>Status</th>
                            <th className='student-action'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((student, index) => (
                            <tr key = { index }>
                                <td className='student-name'>{student.name}</td>
                                <td className='student-number'>{student.studno}</td>
                                <td className='student-degree'>{student.degprog}</td>
                                <td className='student-gwa'>{student.gwa}</td>
                                {/* <td className='student-status'><Status status={student.status}/></td> */}
                                <td className='students-status'>
                                    <div data-status={student.status} className='status'></div>
                                </td>
                                <td className='student-action'><Actions handleDelete={() => studentDelete(student.studno)}/></td>
                            </tr>
                        )
                        )}
                    </tbody>
                </table>
            </>
        )
    }


    // Select what specific table to based on the table conditions (1,2,3)
    if (table == 1) {
        return(
          <StudentList data={data} changeSort={changeSort} sortState={sortState}/>
        )
    } else if(table == 2) {
        return (
            <SemRecord data={data}/>
        )
    } else if(table == 3) {
        return (
            <User data={data}/>
        )
    }
}

export default List
