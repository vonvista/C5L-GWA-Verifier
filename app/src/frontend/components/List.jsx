import { React, useState, useEffect, Fragment } from 'react';
import Actions from './buttons/Actions'
import EditUser from './EditUser';
import AddRow from './AddRow';
import ReadRow from './ReadRow';
import EditRow from './EditRow';
import { useForm, isRequired } from '../hooks/useForm';
import 'tailwindcss/tailwind.css';

/* Backend */
import studentDelete from 'backend/studentDelete';
import userDelete from 'backend/userDelete';

// This list component requires a (1) condition that indicates what table to display, (2) data to be displayed. See return part at the end.

const List = ({ table, data, changeSort, sortState, dataHandler, delHandler }) => {
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
    const SemRecord = ({ data, dataHandler, delHandler }) => {

        return (
            <>  
                {/* Accordion contents */}
                <div className="table w-full m-0">
                    <div className="table-header-group text-left">
                        <div className="table-row font-montserrat font-bold text-primary-red">
                            <div className="table-cell w-1/6">Course Name</div>
                            <div className="table-cell w-1/6 text-center">Units</div>
                            <div className="table-cell w-1/6 text-center">Grade</div>
                            <div className="table-cell w-1/6 text-center">Enrolled</div>
                            <div className="table-cell w-1/6 text-center"></div>
                            <div className="table-cell w-1/6 text-center"><AddRow /></div>
                        </div>
                    </div>
                    <div className="table-row-group">
                        {data.map((course, index) => {

                            const validations = [
                                ({courseName}) => isRequired(courseName) || {courseName: 'Please fill out'},
                                ({units}) => isRequired(units) || {units: 'Please fill out'},
                                ({units}) => !isNaN(units) || {units: 'Invalid value'},
                                ({grade}) => isRequired(grade) || {grade: 'This is required'},
                                ({grade}) => !isNaN(grade) || {grade: 'Invalid value'},
                                ({enrolled}) => isRequired(enrolled) || {enrolled: 'This is required'},
                                ({enrolled}) => !isNaN(enrolled) || {enrolled: 'Invalid value'},
                                ({runningSum}) => isRequired(runningSum) || {runningSum: 'This is required'},
                                ({runningSum}) => !isNaN(runningSum) || {runningSum: 'Invalid value'},   
                            ]
                            
                            // State and hook to handle inline editing of data
                            const {values, isValid, errors, touched, changeHandler, submitHandler, resetValues} = useForm(course, validations, dataHandler);
                            const [isEdit, setEdit] = useState(false)
                            
                            const toggleEdit = () => {
                                // function to toggle to edit
                                setEdit(!isEdit)
                            }

                            const cancelEdit = () => {
                                // function to cancel editing
                                // resets form values to default
                                setEdit(!isEdit)
                                resetValues()
                            }


                            return(
                                <Fragment key={index}>
                                    {isEdit ?
                                        <EditRow 
                                            data={values} 
                                            changeHandler={changeHandler} 
                                            onSubmit={submitHandler} 
                                            toggleHandler={cancelEdit} 
                                            touched={touched} 
                                            errors={errors}
                                            valid={isValid} 
                                            />
                                         :
                                        <ReadRow data={course} clickHandler={toggleEdit} delHandler={delHandler}/>
                                    }
                                </Fragment>  
                            )
                        })}
                    </div>
                </div>
            </>
        );
    }

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
                          {user.position}
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
            <SemRecord data={data} dataHandler={dataHandler} delHandler={delHandler} />
        )
    } else if(table == 3) {
        return (
            <User data={data}/>
        )
    }
}

export default List
