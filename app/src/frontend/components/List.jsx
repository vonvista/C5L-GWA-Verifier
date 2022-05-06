import { React, useState, useEffect, Fragment } from 'react';
import Actions from './buttons/Actions'
import EditUser from './EditUser';
import AddRow from './AddRow';
import ReadRow from './ReadRow';
import EditRow from './EditRow';
import { useForm, isRequired } from '../hooks/useForm';
import 'tailwindcss/tailwind.css';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';

/* Backend */
// import studentDelete from 'backend/studentDelete';
// import userDelete from 'backend/userDelete';


// This list component requires a (1) condition that indicates what table to display, (2) data to be displayed. See return part at the end.

const List = ({ table, total, sem, data, changeSort, sortState, dataHandler, delHandler, handleHistory, handleDeleteRecord, handleEditRecord, addHandler }) => {


    const [totalUnits, setTotal] = useState(total)
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

    const ip = localStorage.getItem("ServerIP");
    let navigate = useNavigate();

    // Table for displaying the student's summary of grades for a given semester 
    // To be used for Student Record View Page
    const SemRecord = ({ total, sem, data, dataHandler, delHandler, histHandler, addHandler }) => {

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
                            <div className="table-cell w-1/6 text-center"><AddRow sem={sem} addHandler={addHandler}/></div>
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
                                            histHandler={histHandler}
                                            />
                                         :
                                        <ReadRow data={course} clickHandler={toggleEdit} delHandler={delHandler}/>
                                    }
                                </Fragment>  
                            )

                            
                        })}

                        <div className="table-row"> {/* row for total values */}
                            <div className="table-cell font-black py-2">Total</div>
                            <div className="table-cell text-center">{total}</div>       {/* row for total units */}
                            <div className="table-cell"></div>                      {/* empty row to not ruin styling */}
                            <div className="table-cell"></div>                      {/* empty row to not ruin styling */}
                            <div className="table-cell"></div>                      {/* empty row to not ruin styling */}
                            <div className="table-cell"></div>                      {/* empty row to not ruin styling */}
                        </div>
                    </div>
                </div>
            </>
        );
    }

    // This table is about
    const User = ({data, handleDeleteRecord, handleEditRecord}) => {
        console.log(data);
        const [showModal, setShowModal] = useState(false)
        const [editUser, setEditUser] = useState();

        // function to delete a user based on their username
        const userDelete = (username) => {

            const user = {
                Username: username,
            };
            
            // uncomment to test if proper student ID is being passed
            // console.log("Delete " + user.Username);
            
            fetch(`http://${ip}:3001/user/delete`,{
                method: "DELETE",
                headers: { "Content-Type":"application/json" },
                body: JSON.stringify(user)
                })
                .then(response => response.json())
                .then(body => {
                    console.log(body);
                    handleDeleteRecord(user);
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text:'User successfully deleted'
                    })
            })
            .catch(err => { //will activate if DB is not reachable or timed out or there are other errors
                Swal.fire({
                  icon: 'error',
                  title: 'Server Error',
                  text: 'Check if the server is running or if database IP is correct',
                })
                console.log(err)
            })
        
        };

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
                      <Actions handleEdit={() => handleEditRecord(user)} handleDelete={() => userDelete(user.uname)} data={user}/>
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
    const StudentList = ({ data, setRows, changeSort, sortState, handleDeleteRecord }) => {
        useEffect(() => {
            console.log(sortState)
        })

        const studentEdit = async (StudentID, StudentKey) => {
            await localStorage.setItem("currStudentID", StudentID);
            await localStorage.setItem("currStudentKey", StudentKey);
            console.log(localStorage.getItem("currStudentKey"), localStorage.getItem("currStudentID"))
            navigate('/student-record');
        }

        // function to delete a student based on their student ID
        const studentDelete = (ID, Key) => {
            const student = {
              StudentID: ID,
              StudentKey: Key
            };
            console.log(student)
            fetch(`http://${ip}:3001/student/delete`,{
                method: "DELETE",
                headers: { "Content-Type":"application/json" },
                body: JSON.stringify(student)
              })
              .then(response => response.json())
              .then(body => {
                console.log(body);
                handleDeleteRecord(student);
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text:'Student successfully deleted'
                })
            })
            .catch(err => { //will activate if DB is not reachable or timed out or there are other errors
                Swal.fire({
                  icon: 'error',
                  title: 'Server Error',
                  text: 'Check if the server is running or if database IP is correct',
                })
                console.log(err)
            })
          };

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
                                <td className='student-action'><Actions handleEdit={() => studentEdit(student._id, student.studno)} handleDelete={() => studentDelete(student.studno, student._id)}/></td>
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
          <StudentList data={data} changeSort={changeSort} sortState={sortState} handleDeleteRecord={handleDeleteRecord}/>
        )
    } else if(table == 2) {
        return (
            <SemRecord total={totalUnits} sem={sem} data={data} dataHandler={dataHandler} delHandler={delHandler} histHandler={handleHistory} addHandler={addHandler}/>
        )
    } else if(table == 3) {
        return (
            <User data={data} handleDeleteRecord={handleDeleteRecord} handleEditRecord={handleEditRecord}/>
        )
    }
}

export default List
