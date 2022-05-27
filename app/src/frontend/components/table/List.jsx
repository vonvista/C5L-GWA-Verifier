import { React, useState, useEffect, Fragment } from 'react';
import { useForm, isRequired } from '../../hooks/useForm';
import { useNavigate } from 'react-router-dom';
import 'tailwindcss/tailwind.css';

/* Components */
import Actions from '../buttons/Actions';
import EditUser from 'frontend/pages/user-management/EditUser';
import AddRowBtn from 'frontend/components/buttons/AddRowBtn';
import ReadRow from 'frontend/pages/student-record/grades-table/ReadRow';
import EditRow from 'frontend/pages/student-record/grades-table/EditRow';
import Swal from 'sweetalert2';


/* Parent components:
    StudentList >> frontend/pages/dashboards/UserDashboard
    SemRecord   >> frontend/pages/student-record/grades-table/TableContents
    User        >> frontend/pages/user-management/UserManagementPage
    Pagination  >> ./Pagination
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
    historyHandler      ---     function that logs the action of adding a row to the student record history
*/

const List = ({ table, total, sem, data, changeSort, sortState, dataHandler, delHandler, handleDeleteRecord, handleEditRecord, addHandler, historyHandler }) => {

    const [ip, setIp] = useState(localStorage.getItem("ServerIP"));
    
    let navigate = useNavigate();


    /* Parent component: TableContents.jsx */
    /* Table for displaying the student's summary of grades for a given semester in the Student Record page */
    const SemRecord = ({ total, sem, data, dataHandler, delHandler, setHistoryEditRow, addHandler, handleHistory}) => {
        return (
            <>  
                {/* Accordion contents */}
                <div className="table font-inter w-full m-0">

                    {/* Table column names */}
                    <div className="table-header-group text-left">
                        <div className="table-row font-montserrat font-bold text-primary-red">
                            <div className="table-cell w-1/6">Course Name</div>
                            <div className="table-cell w-1/6 text-center">Grade</div>
                            <div className="table-cell w-1/6 text-center">Units</div>
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
                            ]
                            
                            // State and hook to handle inline editing of data
                            const {values, isValid, errors, touched, changeHandler, submitHandler, resetValues} = useForm(course, validations, dataHandler);
                            const [isEdit, setEdit] = useState(false)
                            
                            const toggleEdit = () => {
                                setEdit(!isEdit)            // Function to toggle to edit
                            }

                            const cancelEdit = () => {
                                setEdit(!isEdit)            // Function to cancel editing
                                resetValues()               // Resets form values to default
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
                                            sem={sem}
                                            setHistoryEditRow={handleHistory}
                                        />
                                         :
                                        <ReadRow
                                            data={course}
                                            clickHandler={toggleEdit}
                                            delHandler={delHandler}
                                            histHandler={handleHistory}
                                            sem={sem}
                                        />
                                    }
                                </Fragment>  
                            )
                        })}

                        <div className="table-row">
                            <div className="table-cell pt-5 font-montserrat font-bold text-primary-red py-2">Total Units:</div>
                            <div className="table-cell text-center">{total}</div>   {/* row for total units */}
                            <div className="table-cell"></div>                      {/* empty row to not ruin styling */}
                            <div className="table-cell"></div>                      {/* empty row to not ruin styling */}
                            <div className="table-cell"></div>                      {/* empty row to not ruin styling */}
                            <div className="table-cell text-sr-dark-text"></div>  {/* empty row to not ruin styling */}
                        </div>
                    </div>
                </div>
            </>
        );
    }


    /* Parent component >> UserManagementPage.jsx */
    /* Table for displaying list of user accounts */
    const User = ({data, changeSort, sortState, handleDeleteRecord, handleEditRecord}) => {

        // Styling
        const usersTable = `border-collapse overflow-hidden table-fixed max-w-[72vw] max-h-[71vh] rounded-t-[1vw] drop-shadow-lg`;
        const tHead = `bg-white border-solid rounded-t-[1vw] border-b-[0.2vh] table table-fixed whitespace-no-wrap w-full font-montserrat w-[66vw]`;
        const tBodytR = `table table-fixed whitespace-no-wrap w-full font-montserrat hover:bg-table-hover-color last:border-b-0`;
        
        const tRow = `text-left not-italic text-[1vw] text-sr-text-gray`;
        const tBody = `bg-white block overflow-auto text-black rounded-b-[1vw] h-[65.73130193905817vh] w-[65.73130193905817vw]`;
        const element = `py-[1.2vh] px-[1.3vw] border-solid overflow-hidden text-[1vw] border-page-background border-b-[0.14vh]`;

        const actionstH = `${element} cursor-default text-center`;
        const usernametData = `${element} truncate font-bold w-[13vw] cursor-pointer`;
        const nametData = `${element} truncate font-bold w-[23vw] cursor-pointer`;
        const positiontData = `${element} truncate w-[19vw] cursor-pointer`;

        const asc = `after:float-right after:content-['▲'] after:ml-[0.3vw] bg-sr-dark-gray`;
        const desc = `after:float-right after:content-['▼'] after:ml-[0.3vw] bg-sr-dark-gray`;

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
                                headers: { "Content-Type":"application/json", "Authorization": `Bearer ${localStorage.getItem("Username")} ${localStorage.getItem("Password")}` },
                                body: JSON.stringify(user)
                                })
                                .then(response => response.json())
                                .then(body => {
                                    //console.log(body);
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
                                //console.log(err)
                            })
                        }   
                    })
                    .catch(err => { //will activate if DB is not reachable or timed out or there are other errors
                        Swal.fire({
                        icon: 'error',
                        title: 'Server Error',
                        text: 'Check if the server is running or if database IP is correct',
                        })
                        //console.log(err)
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
            <table className={usersTable}>
                    <thead className={tHead}>
                        <tr className={tRow}>
                            {/* sort UI asc or desc depends on the state of the parent (user-dashboard) */}
                            {/* state 0: normal; 1: ascending icon; 2: descending icon */}
                            <th className={` ${usernametData} ${
                                sortState[0] === 0 ? "" : sortState[0] === 1 ? asc : desc 
                            }`} onClick={() => changeSort(0)}>Username</th>
                            <th className={` ${nametData} ${
                                sortState[1] === 0 ? "" : sortState[1] === 1 ? asc : desc
                            }`} onClick={() => changeSort(1)}>Name</th>
                            <th className={` ${positiontData} ${
                                sortState[2] === 0 ? "" : sortState[2] === 1 ? asc : desc 
                            }`} onClick={() => changeSort(2)}>Position</th>
                            <th className={actionstH}>Actions</th>
                        </tr>
                    </thead>
                    <tbody className={tBody}>
                            {data.map((user, index) => (
                                <tr className={tBodytR} key = { index }>
                                    <td className={` ${usernametData} cursor-default`}> {user.uname}</td>
                                    <td className={ `${nametData} cursor-default`}> {user.name}</td>
                                    <td className={` ${positiontData} cursor-default`}> {user.position}</td>
                                    <td className='text-center'>
                                        <Actions
                                            handleEdit={() =>  handleEditRecord(user)}
                                            handleDelete={() => userDelete(user.uname)} 
                                            data={user}
                                        />
                                    </td>
                                </tr>
                            )
                            )}
                    </tbody>
                </table>
          </>
        )
      }

    
    /* Parent component >> UserDashboard.jsx */
    /* Table for displaying the Student List on the Dashboard */
    const StudentList = ({ data, setRows, changeSort, sortState, handleDeleteRecord }) => {
        
        // Styling
        const studentsTable = `border-collapse overflow-hidden table-fixed max-w-[82vw] max-h-[70vh] rounded-t-[1vw] drop-shadow-lg`;
        const tHead = `bg-white border-solid rounded-t-[1vw] border-b-[0.2vh] table table-fixed whitespace-nowrap w-full font-montserrat`;
        const tBodytR = `table table-fixed whitespace-nowrap w-full font-montserrat hover:bg-table-hover-color last:border-b-0`
        const tRow = `text-left not-italic text-[1.3vw] text-sr-text-gray`;
        const tBody = `bg-white block overflow-auto text-black rounded-b-[1vw] h-[65vh]`

        const nametH = `py-[1.2vh] px-[1.3vw]`;
        const elements = `border-solid overflow-hidden text-[1.1vw] border-page-background border-b-[0.14vh]`
        const common = `${nametH} ${elements}`
        const statustHead = `${common} cursor-default w-[7vw] text-center`;
        const actionstH = `${common} cursor-default text-center`;
        const nametData = `${common} cursor-pointer w-[23vw] truncate font-bold `;
        const numbertData = `${common} cursor-pointer w-[11.23vw] `;
        const degreetData = `${common} cursor-pointer w-[19vw] truncate`;
        const gwatData = `${common} cursor-pointer w-[12.8125vw] truncate`;
        const statustData = `${elements} content-center justify-center text-center font-[1vw] h-[4.3vh] w-[7.14vw] p-0`;

        const asc = `after:float-right after:content-['▲'] after:ml-[0.33vw] bg-sr-dark-gray`;
        const desc = `after:float-right after:content-['▼'] after:ml-[0.33vw] bg-sr-dark-gray`;

        /* Status Elements */
        const cssStyles = 
            `
            .status[data-status="Checked"]:after{
                content : "Checked";
                background-color: #BBDABB;
                color: black;
                border-radius: 3vw;
                display: block;
                text-align: center;
            }

            .status[data-status="Unchecked"]:after{
                content : "Unchecked";
                background-color: #F29B9B;
                color: black;
                border-radius: 3vw;
                display: block;
                text-align: center;
            }

            .status[data-status="Pending"]:after{
                content : "Pending";
                background-color: #F2C293;
                color: #FF1111;
                border-radius: 3vw;
                display: block;
                text-align: center;
            }
            `;

        useEffect(() => {
            //console.log(data)
            //console.log(sortState)
        })

        const studentEdit = async (StudentID, StudentKey) => {
            await localStorage.setItem("currStudentID", StudentID);
            await localStorage.setItem("currStudentKey", StudentKey);
            //console.log(localStorage.getItem("currStudentKey"), localStorage.getItem("currStudentID"))
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
                                headers: { "Content-Type":"application/json", "Authorization": `Bearer ${localStorage.getItem("Username")} ${localStorage.getItem("Password")}` },
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
                                //console.log(err)
                            })
                        }   
                    })
                    .catch(err => { //will activate if DB is not reachable or timed out or there are other errors
                        Swal.fire({
                        icon: 'error',
                        title: 'Server Error',
                        text: 'Check if the server is running or if database IP is correct',
                        })
                        //console.log(err)
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
                <style>{cssStyles}</style>
                <table className={studentsTable}>
                    <thead className={tHead}>
                        <tr className={tRow}>
                            {/* sort UI asc or desc depends on the state of the parent (user-dashboard) */}
                            {/* state 0: normal; 1: ascending icon; 2: descending icon */}
                            <th className={` ${nametData} ${
                                sortState[0] === 0 ? "" : sortState[0] === 1 ? asc : desc 
                            }`} onClick={() => changeSort(0)}>Name</th>
                            <th className={` ${numbertData} ${
                                sortState[1] === 0 ? "" : sortState[1] === 1 ? asc : desc
                            }`} onClick={() => changeSort(1)}>Student No.</th>
                            <th className={` ${degreetData} ${
                                sortState[2] === 0 ? "" : sortState[2] === 1 ? asc : desc 
                            }`} onClick={() => changeSort(2)}>Degree Program</th>
                            <th className={` ${gwatData} ${
                                sortState[3] === 0 ? "" : sortState[3] === 1 ? asc : desc 
                            }`} onClick={() => changeSort(3)}>GWA</th>
                            <th className={statustHead}>Status</th>
                            <th className={actionstH}>Actions</th>
                        </tr>
                    </thead>
                    {/* Check if there are data available to display */}
                    {data.length > 0 ? (
                        <tbody className={tBody}>
                            {data.map((student, index) => (
                                <tr className={tBodytR} key = { index }>
                                    <td className={` ${nametData} cursor-default`}>{student.name}</td>
                                    <td className={ `${numbertData} cursor-default`}>{student.studno}</td>
                                    <td className={` ${degreetData} cursor-default`}>{student.degprog}</td>
                                    <td className={` ${gwatData} cursor-default`}>{student.gwa}</td>
                                    <td className={`${statustData} font-poppins cursor-default`}>
                                        <div data-status={student.status} className='status'></div>
                                    </td>
                                    <td className='text-center'>
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
                        <tbody className='flex items-center justify-center h-[65.73130193905817vh]'>
                            <tr className='text-lg xl:text-xl font-bold font-montserrat'>
                                <td>No available data to display.</td>
                            </tr>
                        </tbody>
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
                addHandler={addHandler}
                handleHistory={historyHandler}
            />
        )
    } else if(table == 3) {
        return (
            <User
                data={data}
                changeSort={changeSort}
                sortState={sortState}
                handleDeleteRecord={handleDeleteRecord}
                handleEditRecord={handleEditRecord}
            />
        )
    }
}


export default List;