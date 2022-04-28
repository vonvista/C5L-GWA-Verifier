import { React, useState, useEffect, Fragment } from 'react';
import Actions from './buttons/Actions'
import EditUser from './EditUser';
import AddRow from './AddRow';
import ReadRow from './ReadRow';
import EditRow from './EditRow';
import { useForm, isRequired } from '../hooks/useForm';
import 'tailwindcss/tailwind.css';


// This list component requires a (1) condition that indicates what table to display, (2) data to be displayed. See return part at the end.

const List = ({ table, data, handler }) => {

    // Table for displaying the student's summary of grades for a given semester 
    // To be used for Student Record View Page
    const SemRecord = ({ data, handler }) => {

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
                            const {values, isValid, errors, touched, changeHandler, submitHandler} = useForm(course, validations, handler);
                            const [isEdit, setEdit] = useState(false)
                            
                            const toggle = () => {
                                setEdit(!isEdit)
                            }

                            return(
                                <Fragment key={index}>
                                    {isEdit ?
                                        <EditRow 
                                            data={values} 
                                            changeHandler={changeHandler} 
                                            onSubmit={submitHandler} 
                                            toggleHandler={toggle} 
                                            touched={touched} 
                                            errors={errors}
                                            valid={isValid} />
                                         :
                                        <ReadRow data={course} clickHandler={toggle} />
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
                          <div data-status={user.position} className='position'></div>
                      </td>
                      <td className='user-action'>
                      <Actions handleEdit={() => setShowModal(true)}/>
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
    const StudentList = ({ data, setRows }) => {
        useEffect(() => {
            /* Reference: https://www.youtube.com/watch?v=8SL_hM1a0yo */
            function sortTableByColumn(table, column, asc = true) {
                // Remember how the column is currently sorted
                table.querySelectorAll("th").forEach(th => th.classList.remove("th-sort-asc", "th-sort-desc"));
                table.querySelector(`th:nth-child(${ column + 1})`).classList.toggle("th-sort-asc", asc);
                table.querySelector(`th:nth-child(${ column + 1})`).classList.toggle("th-sort-desc", !asc);
            }
            
            /* Check all the sortable columns */
            document.querySelectorAll(".students-table th").forEach(headerCell => {
                if (!headerCell.classList.contains("student-number") && !headerCell.classList.contains("student-status") && !headerCell.classList.contains("student-action")){
                    headerCell.addEventListener("click", () => {
                        const tableElement = headerCell.parentElement.parentElement.parentElement;
                        const headerIndex = Array.prototype.indexOf.call(headerCell.parentElement.children, headerCell);
                        const currentIsAscending = headerCell.classList.contains("th-sort-asc");
                
                        sortTableByColumn(tableElement, headerIndex, !currentIsAscending);
                    });
                }
            });
        })


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
            <SemRecord data={data} handler={handler} />
        )
    } else if(table == 3) {
        return (
            <User data={data}/>
        )
    }
}

export default List
