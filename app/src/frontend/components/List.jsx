import React from 'react';
import Actions from './buttons/Actions'
import AddRow from './AddRow';
import 'tailwindcss/tailwind.css';

// This list component requires a (1) condition that indicates what table to display, (2) data to be displayed. See return part at the end.

const List = ({ table, data }) => {
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
    const Eyds = ({data}) => {
        console.log(data);
        return (
          <>
            <table className="user-table">
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
                      <td data-label = "Username"  className='user-uname'>{user.uname}</td>
                      <td data-label = "Name" className='user-name'>{user.name}</td>
                      <td data-label = "Position" className='user-position'>
                        <td data-status={user.position} className='position'></td>
                      </td>
                      <td data-label = "Actions" className='user-action'>
                        <Actions/>
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
    const StudentList = ({ data }) => {
        return (
            <>
                <table className="students-table table">
                    <thead>
                        <tr>
                            <th className='student-name'>Name</th>
                            <th className='student-number'>Student Number</th>
                            <th className='student-degree'>Degree Program</th>
                            <th className='student-gwa'>GWA</th>
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
                                <td className='student-action'><Actions/></td>
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
          <StudentList data={data}/>
        )
    } else if(table == 2) {
        return (
            <SemRecord data={data}/>
        )
    } else if(table == 3) {
        return (
            <Eyds data={data}/>
        )
    }
}

export default List
