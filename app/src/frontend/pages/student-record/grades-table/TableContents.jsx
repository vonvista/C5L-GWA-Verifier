import { Disclosure, Transition } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/solid';
import { useEffect, useState } from 'react';
import List from 'frontend/components/table/List';
import Swal from 'sweetalert2';
import 'tailwindcss/tailwind.css';


/* Parent component >> frontend/pages/student-record/StudentViewRecord */

/* This component handles the student's data for a specific semester */
/* Props:
    Name            ---  contains name of semester
    Total           ---  contains total
    Semester        ---  contains semester data 
    historyHandler  ---  add changes to history
    autoSet         ---  backend handler for setting data into grades table
*/
const TableContents = ({ Name, Total, Semester, historyHandler, autoSet }) => {

    const [rows, setRows] = useState([]);
    const [semData, semHandler] = useState(Semester);
    const [currStudentID, setcurrStudentID] = useState(localStorage.getItem('currStudentID'));
    const [userName, setUserName] = useState(localStorage.getItem("Username"));
    const [ip, setIP] = useState(localStorage.getItem('ServerIP'));

    useEffect(() => {
        const fetchData = async () => {
          // Retrieve data from database
          await setRows(Semester);
        }
  
        fetchData();
    }, []);

    const nameStyle = `transition-colors ease-in-out duration-300 flex font-montserrat font-semibold justify-between z-10 w-full px-4 py-2
        text-sr-table-text bg-sr-dark-gray hover:transition-colors hover:ease-in hover:duration-300 hover:bg-yellow-100 hover:text-secondary-red`;

    // set new values for addrow
    const addRowData = (values) => {
        const targetIndex = semData.length 
        let newSemData = [...semData]
        values.idRow = (parseFloat(newSemData[targetIndex-1].idRow) + 1).toString()
        newSemData[targetIndex] = values
        autoSet({sem:Name, data:newSemData})
        semHandler(newSemData)

        // success message
        Swal.fire({
            title: 'Success',
            text: 'Successfully added row',
            icon: 'success',
        })
    }


    // Handler for row changes
    const setData = (values) => { // modifies values of a row
        // get array index of object that was changed
        const targetIndex = semData.findIndex(obj => obj.idRow == values.idRow) 

        let newSemData = [...semData]
        newSemData[targetIndex] = values
        
        const gradeCredentials = {
            Student: currStudentID,
            Course: values.courseName,
            Grade: values.grade,
            Unit: values.units,
            Weight: values.enrolled,
            Cumulative: values.runningSum,
            Semyear: Name,
            _id: values._id
        }

        fetch(`http://${ip}:3001/grade/update` ,{
            method: "POST",
            headers: { "Content-Type":"application/json", "Authorization": `Bearer ${localStorage.getItem("Username")} ${localStorage.getItem("Password")}`},
            body: JSON.stringify(gradeCredentials)
        })
        .then(response => response.json())
        .then(body => {
            //console.log(body)
        })
        .catch(err => { //will activate if DB is not reachable or timed out or there are other errors
            Swal.fire({
                icon: 'error',
                title: 'Server Error',
                text: 'Check if the server is running or if database IP is correct',
            })
            console.log(err)
        })

        
        autoSet({sem:Name, data:newSemData})
        semHandler(newSemData)

        // success message
        Swal.fire({
            title: 'Success',
            text: 'Successfully modified row',
            icon: 'success',
        })
    }

    // // logs action of editing a row to history
    // const setHistoryEditRow = (detailsObj) => {

    //     const newHistObj = {
    //         date: new Date().toLocaleDateString(),
    //         info: [
    //             {
    //                 main: detailsObj.title,
    //                 user: userName,
    //                 time: new Date().toLocaleTimeString('en-US', { 
    //                     hour12: false, 
    //                     hour: "numeric", 
    //                     minute: "numeric"
    //                 }),
    //                 details: detailsObj.desc,         // place justification into details
    //             },
    //         ],
    //     }

    //     historyHandler(newHistObj)  //set changes
    // } 

    
    // deletes row from table
    const delData = (values) => {
        // get array index of object that was changed
        const targetIndex = semData.findIndex(obj => obj.idRow == values.idRow)
        
        let newSemData = [...semData]
        newSemData.splice(targetIndex, 1)


        const deleteGradeCredentials = {
            _id: values._id
        }

        fetch(`http://${ip}:3001/grade/delete`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Username")} ${localStorage.getItem("Password")}` },
            body: JSON.stringify(deleteGradeCredentials),
        })
        .then((response) => response.json())
        .then((body) => {
            //console.log(body);
        })
        .catch(err => { //will activate if DB is not reachable or timed out or there are other errors
            Swal.fire({
                icon: 'error',
                title: 'Server Error',
                text: 'Check if the server is running or if database IP is correct',
            })
            console.log(err)
        })

        autoSet({sem:Name, data:newSemData})
        semHandler(newSemData)

        // success message
        Swal.fire({
            title: 'Success',
            text: 'Successfully deleted row',
            icon: 'success',
        })
    }


    return (
        <>
            {/* Accordion for the table */}
            <div className="row-span-1">
                <Disclosure defaultOpen>
                    {({ open }) => (
                        <>
                             {/* Accordion Header */}
                             <Disclosure.Button className={`${open ? 'bg-sr-dark-gray rounded-t-lg' : 'mb-3 rounded-lg shadow-lg'} ${nameStyle}`}>
                                <span className="5xl:p-2 text-base 1.75xl:text-[20px] 5xl:text-[1.2vw] 5xl:py-3">{Name}</span>
                                
                                {/* Icon */}
                                <ChevronUpIcon
                                    className={`${
                                        !open ? 'transform rotate-180' : ''
                                    } w-5 xl:w-7 5xl:w-[1.5vw] self-center duration-200`}
                                />
                            </Disclosure.Button>
                            
                            <Transition
                                show={open}
                                enter="transition duration-300 ease-in"
                                enterFrom="transform -translate-y-6 opacity-0"
                                enterTo="transform translate-y-0 opacity-100"
                                leave="transition duration-300 ease-out"
                                leaveFrom="transform translate-y-0 opacity-100"
                                leaveTo="transform -translate-y-6 opacity-0"
                            >
                                {/* Accordion Contents */}
                                <Disclosure.Panel className="inter z-0 pl-5 5xl:pl-[1vw] py-3 5xl:py-[1vh] mb-2 5xl:mb-[1vh] text-sm 1.75xl:text-base 3xl:text-lg 5xl:text-[1vw] text-gray-500 rounded-b-lg shadow-lg">
                                    <List
                                        table={2}
                                        total={Total}
                                        sem={Name}
                                        data={semData}
                                        dataHandler={setData}
                                        delHandler={delData}
                                        addHandler={addRowData}
                                        historyHandler={historyHandler}
                                    />
                                </Disclosure.Panel>    
                            </Transition>
                        </>
                    )}
                </Disclosure>
            </div>
        </>
    )
}


export default TableContents;