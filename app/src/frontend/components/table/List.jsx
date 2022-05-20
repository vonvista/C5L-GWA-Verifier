import { React, useState, useEffect, Fragment } from 'react';
import { useForm, isRequired } from '../../hooks/useForm';
import { useNavigate } from 'react-router-dom';
import 'tailwindcss/tailwind.css';

/* Components */
import Actions from '../buttons/Actions'
import EditUser from 'frontend/pages/user-management/EditUser';
import AddRowBtn from 'frontend/components/buttons/AddRowBtn.jsx';
import ReadRow from 'frontend/pages/student-record/grades-table/ReadRow';
import EditRow from 'frontend/pages/student-record/grades-table/EditRow';
import Swal from 'sweetalert2';


/* Backend */
// import studentDelete from 'backend/studentDelete';
// import userDelete from 'backend/userDelete';


/* Parent components:
    SemRecord   >> frontend/pages/student-record/grades-table/TableContents.jsx
    User        >> frontend/pages/dashboards/UserDashboard.jsx
    StudentList >> frontend/pages/user-management/UserManagementPage.jsx
*/

/* This list component requires a (1) condition that indicates what table to display, (2) data to be displayed. See return part at the end. */
/*
   Props:
    table       ---     indicator which table to display
    data        ---     receives the data to be displayed on the table
    total       ---     receives the total number of units taken in a semester
    sem         ---     receives the semester and academic year
    
    changeSort          ---     function for changing sort state and row data
    sortState           ---     handles the current sort state of the rows in the table

    addHandler          ---     function that handles the addition of a row in a particular semester
    dataHandler         ---     function that handles row changes after editing a student's grade for a particular semester
    delHandler          ---     function that handles the deletion of a row in a particular semester
    
    handleDeleteRecord  ---     function that handles page refresh after deletion of student/user record from the table
    handleEditRecord    ---     function that handles click event for edit button on user management page
    
    setHistoryEditRow   ---     function that logs the action of editing a row to the student record history
    historyHandler      ---     function that logs the action of adding a row to the student record history
*/

const List = ({ table, total, sem, data, changeSort, sortState, dataHandler, delHandler, setHistoryEditRow, handleDeleteRecord, handleEditRecord, addHandler, historyHandler }) => {

    const [ip, setIp] = useState(localStorage.getItem("ServerIP"));
    
    let navigate = useNavigate();

    /* Parent component: TableContents.jsx */
    /* Table for displaying the student's summary of grades for a given semester in the Student Record page */

    const SemRecord = ({ total, sem, data, dataHandler, delHandler, setHistoryEditRow, addHandler, handleHistory}) => {
        return (
            <>  
                {/* Accordion contents */}
                <div className="table w-full m-0">

                    {/* Table column names */}
                    <div className="table-header-group text-left">
                        <div className="table-row font-montserrat font-bold text-primary-red">
                            <div className="table-cell w-1/6">Course Name</div>
                            <div className="table-cell w-1/6 text-center">Units</div>
                            <div className="table-cell w-1/6 text-center">Grade</div>
                            <div className="table-cell w-1/6 text-center">Cumulative</div>
                            <div className="table-cell w-1/6 text-center">Weight</div>
                            <div className="table-cell w-1/6 text-center">
                                <AddRowBtn sem={sem} grades={data} addHandler={addHandler} handleHistory={handleHistory}/>
                            </div>
                        </div>
                    </div>

                    {/* Table contents */}
                    <div className="table-row-group">
                        {data.map((course, index) => {

                            const validations = [
                                ({courseName}) => isRequired(courseName) || {courseName: 'Please fill out'},
                                ({units}) => isRequired(units) || {units: 'Please fill out'},
                                ({units}) => !isNaN(units) || {units: 'Invalid value'},
                                ({grade}) => isRequired(grade) || {grade: 'This is required'},
                                //({grade}) => !isNaN(grade) || {grade: 'Invalid value'},
                            ]
                            
                            // State and hook to handle inline editing of data
                            const {values, isValid, errors, touched, changeHandler, submitHandler, resetValues} = useForm(course, validations, dataHandler);
                            const [isEdit, setEdit] = useState(false)
                            
                            const toggleEdit = () => {
                                // Function to toggle to edit
                                setEdit(!isEdit)
                            }

                            const cancelEdit = () => {
                                // Function to cancel editing
                                // Resets form values to default
                                setEdit(!isEdit)
                                resetValues()
                            }

                            return(
                                <Fragment key={index}>
                                    {/* Check which kind of row should be displayed */}
                                    {isEdit ?
                                        <EditRow 
                                            dataDynamic={values}
                                            dataStatic={course} 
                                            changeHandler={changeHandler} 
                                            onSubmit={submitHandler} 
                                            toggleHandler={cancelEdit} 
                                            touched={touched} 
                                            errors={errors}
                                            valid={isValid}
                                            setHistoryEditRow={setHistoryEditRow}
                                            />
                                         :
                                        <ReadRow data={course} clickHandler={toggleEdit} delHandler={delHandler} histHandler={histHandler} />
                                    }
                                </Fragment>  
                            )
                        })}

                        <div className="table-row ">
                            <div className="table-cell font-montserrat font-bold text-primary-red py-2">Total</div>
                            <div className="table-cell text-center">{total}</div>   {/* row for total units */}
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


    // Parent component: UserManagementPage.jsx
    // This table is about
    const User = ({data, handleDeleteRecord, handleEditRecord}) => {
        console.log(data);
        const [showModal, setShowModal] = useState(false)
        const [editUser, setEditUser] = useState();

        // Function to delete a user based on their username
        const userDelete = (username) => {
            Swal.fire({   // prompts for user to input password
                title: "Confirm User Delete",
                text: "Enter your password to proceed",
                input: 'password',
                inputPlaceholder: '*****',
                icon: 'warning',
                showCancelButton: true        
            }).then((result) => {
                if (result.isConfirmed && result.value !== '') {
                    const credentials = {
                        Username: localStorage.getItem("Username"),
                        Password: result.value
                    }
                    fetch(`http://${ip}:3001/user/login`,{
                        method: "POST",
                        headers: { "Content-Type":"application/json" },
                        body: JSON.stringify(credentials)
                        })
                    .then(response => response.json())
                    .then(body => {
                        if(body.err){ //if error response returned from DB
                            Swal.fire({
                                icon: 'error',
                                title: 'Error',
                                text: body.err,
                            })
                        }
                        else { //success state
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
                        }   
                    })
                    .catch(err => { //will activate if DB is not reachable or timed out or there are other errors
                        Swal.fire({
                        icon: 'error',
                        title: 'Server Error',
                        text: 'Check if the server is running or if database IP is correct',
                        })
                        console.log(err)
                    })
                } else if (result.value === '') { // if no password input
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'The password you entered is empty',
                    })
                }
            });
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
                      <td className='user-name uppercase'>{user.name}</td>
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

    
    // Parent component: UserDashboard.jsx
    // Function for Displaying the Student List on the Dashboard
    const StudentList = ({ data, setRows, changeSort, sortState, handleDeleteRecord }) => {
        useEffect(() => {
            console.log(data)
            console.log(sortState)
        })

        const studentEdit = async (StudentID, StudentKey) => {
            await localStorage.setItem("currStudentID", StudentID);
            await localStorage.setItem("currStudentKey", StudentKey);
            console.log(localStorage.getItem("currStudentKey"), localStorage.getItem("currStudentID"))
            navigate('/student-record');
        }

        // Function to delete a student based on their student ID
        const studentDelete = (ID, Key) => {
            Swal.fire({   // prompts for user to input password
                title: 'Confirm Student Delete',
                text: 'Enter your password to proceed',
                input: 'password',
                inputPlaceholder: '*****',
                icon: 'warning',
                showCancelButton: true        
            }).then((result) => {
                if (result.isConfirmed && result.value !== '') {
                    const credentials = {
                        Username: localStorage.getItem("Username"),
                        Password: result.value
                    }
                    fetch(`http://${ip}:3001/user/login`,{
                        method: "POST",
                        headers: { "Content-Type":"application/json" },
                        body: JSON.stringify(credentials)
                        })
                    .then(response => response.json())
                    .then(body => {
                        if(body.err){ //if error response returned from DB
                            Swal.fire({
                                icon: 'error',
                                title: 'Error',
                                text: body.err,
                            })
                        }
                        else { //success state
                            const student = {
                                StudentID: ID,
                                StudentKey: Key
                            };
                            fetch(`http://${ip}:3001/student/delete`,{
                                method: "DELETE",
                                headers: { "Content-Type":"application/json" },
                                body: JSON.stringify(student)
                            })
                            .then(response => response.json())
                            .then(body => {
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
                        }   
                    })
                    .catch(err => { //will activate if DB is not reachable or timed out or there are other errors
                        Swal.fire({
                        icon: 'error',
                        title: 'Server Error',
                        text: 'Check if the server is running or if database IP is correct',
                        })
                        console.log(err)
                    })
                } else if (result.value === '') { // if no password input
                    Swal.fire({
                        icon: 'error',
                        title: 'Invalid Password',
                        text: 'The password you entered is empty',
                    })
                }
            });
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
                            }`} onClick={() => changeSort(1)}>Student No.</th>
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
                    {/* Check if there are data available to display */}
                    {data.length > 0 ? (
                        <tbody>
                            {data.map((student, index) => (
                                <tr key = { index }>
                                    <td className='student-name'>{student.name}</td>
                                    <td className='student-number'>{student.studno}</td>
                                    <td className='student-degree'>{student.degprog}</td>
                                    <td className='student-gwa'>{student.gwa}</td>
                                    <td className='students-status'>
                                        <div data-status={student.status} className='status'></div>
                                    </td>
                                    <td className='student-action'>
                                        <Actions
                                            handleEdit={() => studentEdit(student._id, student.studno)}
                                            handleDelete={() => studentDelete(student.studno, student._id)}
                                        />
                                    </td>
                                </tr>
                            )
                            )}
                        </tbody>
                    ) : (
                        <div className='flex items-center justify-center h-[65.73130193905817vh]'>
                            <div className='text-lg xl:text-xl font-bold font-montserrat'>
                                No available data to display.
                            </div>
                        </div>
                    )}
                </table>
            </>
        )
    }


    // Select what specific table to display based on the table conditions (1,2,3)
    if (table == 1) {
        return(
            <StudentList
                data={data}
                changeSort={changeSort}
                sortState={sortState}
                handleDeleteRecord={handleDeleteRecord}
            />
        )
    } else if(table == 2) {
        return (
            <SemRecord
                total={total}
                sem={sem}
                data={data}
                dataHandler={dataHandler}
                delHandler={delHandler}
                setHistoryEditRow={setHistoryEditRow}
                addHandler={addHandler}
                handleHistory={historyHandler}
            />
        )
    } else if(table == 3) {
        return (
            <User
                data={data}
                handleDeleteRecord={handleDeleteRecord}
                handleEditRecord={handleEditRecord}
            />
        )
    }
}

export default List
