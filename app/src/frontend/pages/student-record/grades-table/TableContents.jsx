import { Disclosure, Transition } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/solid'
import { useEffect, useState } from 'react';

import List from 'frontend/components/table/List';
import 'tailwindcss/tailwind.css';


// This component handles the student's data for a specific semester

const TableContents = ({ Name, Total, Semester, key, handler, history, historyHandler, autoSet }) => {

    // handler prop will handle pushing changes to parent
    // semHandler will handle semData

    const [rows, setRows] = useState([]);
    const [semData, semHandler] = useState(Semester);
    const [currStudentID, setcurrStudentID] = useState(localStorage.getItem('currStudentID'));
    const [userName, setUserName] = useState(localStorage.getItem("Username"));

    useEffect(() => {
        const fetchData = async () => {
          // Retrieve data from database
          await setRows(Semester);
        }
  
        fetchData();
    }, []);

    const nameStyle = "transition-colors ease-in-out delay-150 flex inter font-bold justify-between z-10 w-full px-4 py-2 text-sm font-medium text-left text-sr-table-text bg-sr-dark-gray hover:transition-colors hover:ease-in hover:delay-150 hover:bg-yellow-100 hover:text-secondary-red";

    // set new values for addrow
    const addRowData = (values) => {
        const targetIndex = semData.length 
        let newSemData = [...semData]
        values.idRow = (parseFloat(newSemData[targetIndex-1].idRow) + 1).toString()
        newSemData[targetIndex] = values
        autoSet({sem:Name, data:newSemData})
        semHandler(newSemData)
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

        const historyCredentials = {
            User: userName,
            Student: currStudentID,
            // Date: currentDate,
            // Time: currentTime,
            Date: new Date().toLocaleDateString(),
            Time: new Date().toLocaleTimeString('en-US', { 
                hour12: false, 
                hour: "numeric", 
                minute: "numeric"
            }),
            Description: 'update',
            Details: "Sample Details"
        };

        fetch(`http://localhost:3001/grade/update` ,{
            method: "POST",
            headers: { "Content-Type":"application/json"},
            body: JSON.stringify(gradeCredentials)
        })
        .then(response => response.json())
        .then(body => {
            console.log(body)
        })

        
        fetch(`http://localhost:3001/history/add`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(historyCredentials),
        })
        .then((response) => response.json())
        .then((body) => {
            console.log(body);
        })

        autoSet({sem:Name, data:newSemData})
        semHandler(newSemData)
    }

    const setHistory = (detailsObj) => { // logs action of editing a row to history
        let currHistory = [...history] // make copy of current array of history logs

        const newHistObj = {
            date: new Date().toLocaleDateString(),
            info: [
                {
                    main: detailsObj.title,
                    user: userName,
                    time: new Date().toLocaleTimeString('en-US', { 
                        hour12: false, 
                        hour: "numeric", 
                        minute: "numeric"
                    }),
                    details: detailsObj.desc,         // place justification into details
                },
            ],
        }

        historyHandler(newHistObj)  //set changes
    } 

    const delData = (values) => { // deletes row from table
        // get array index of object that was changed
        const targetIndex = semData.findIndex(obj => obj.idRow == values.idRow)
        
        let newSemData = [...semData]
        newSemData.splice(targetIndex, 1)


        const deleteGradeCredentials = {
            _id: values._id
        }

        fetch(`http://localhost:3001/grade/delete`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(deleteGradeCredentials),
        })
        .then((response) => response.json())
        .then((body) => {
            console.log(body);
        })

        autoSet({sem:Name, data:newSemData})
        semHandler(newSemData)
    }

    return (
        <>
            {/* Accordion for the table */}
            <div className="row-span-1">
                <Disclosure key={key}>
                    {({ open }) => (
                        <>
                             {/* Accordion Header */}
                             <Disclosure.Button className={`${open ? 'bg-sr-dark-gray rounded-t-lg' : 'mb-3 rounded-lg shadow-lg'} ${nameStyle}`}>
                                <span className="text-lg xl:text-xl">{Name}</span>
                                {/* Icon */}
                                <ChevronUpIcon
                                    className={`${
                                        !open ? 'transform rotate-180' : ''
                                    } ml-1 w-5 xl:w-7 self-center`}
                                />
                            </Disclosure.Button>
                            
                            <Transition
                                show={open}
                                enter="transition duration-300 ease-out"
                                enterFrom="transform -translate-y-6 opacity-0"
                                enterTo="transform translate-y-0 opacity-100"
                                leave="transition duration-200 ease-in"
                                leaveFrom="transform translate-y-0 opacity-100"
                                leaveTo="transform -translate-y-6 opacity-0"
                            >
                                {/* Accordion Contents */}
                                <Disclosure.Panel className="inter z-0 pl-5 py-3 mb-2 text-sm text-gray-500 rounded-b-lg shadow-lg">
                                    <List table={2} total={Total} sem={Name} data={semData} dataHandler={setData} delHandler={delData} handleHistory={setHistory} addHandler={addRowData} histHandler={historyHandler}/>
                                    <section className="mt-3">
                                        <span className="font-montserrat font-bold text-primary-red">Load Status</span>
                                        {( Total <= 20 )
                                            ? ( Total >= 15 )
                                                ? <span className="ml-4 font-black text-login-green underline">Normal</span>
                                                : <span className="ml-4 font-black text-login-green underline">Underload</span>
                                            : <span className="ml-4 font-black text-login-green underline">Overload</span>
                                        }
                                    </section>

                                </Disclosure.Panel>    
                            </Transition>
                        </>
                    )}
                </Disclosure>
            </div>
            
        </>
    )
}

export default TableContents