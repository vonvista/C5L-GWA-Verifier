import { motion, AnimatePresence, AnimateSharedLayout } from 'framer-motion';
import { useState, useEffect, useRef, Fragment } from 'react';
import { Tab, Transition, Disclosure } from '@headlessui/react';
import { useNavigate } from 'react-router-dom';
import { ChevronUpIcon } from '@heroicons/react/solid';
import { toNamespacedPath } from 'node:path/win32';
import 'tailwindcss/tailwind.css';

/* Components */
import ActionsBtn from 'frontend/components/buttons/Dropdown';
import Status from './tabbed-components/status/Status';
import Notes from './tabbed-components/notes/Notes';
import History from './tabbed-components/history/StudentRecordHistory';
import CheckList from './tabbed-components/checklist/ChecklistTab';
import Table from './grades-table/TableContents';
import Refresh from '../../components/buttons/Refresh'
import Swal from 'sweetalert2';
import e from 'express';


/* Parent component >> ./StudentRecord */

/* This component contains all the elements of the student record page
   such as the student details header, the grades table, and the status tab. */
/*
   Props:
    student     ---   contains details of the student (studnumber, name, degree program, status)
    notes       ---   data of per semester notes that can be edited or deleted
    history     ---   data of changes done on given record
    status      ---   whether verified or not
    grades      ---   object containing grades of students divided per semester
    checklist   ---   list of requirements the student needs to accomplish before being verified
    gpa         ---   contains gpa data
    refresh     ---   handler for refresh
*/
const RecordPage = ({student, notes, history, status, grades, checklist, gpa, refresh}) => {

    const [selectedStudent, setSelectedStudent] = useState(student)
    const [statusState, setStatus] = useState(status)
    const [gradeState, setGradeState] = useState(grades)
    const [notesState, setNotesState] = useState(notes)
    const [historyState, setHistoryState] = useState(history)
    const [validationsState, setValidationsState] = useState(checklist)
    const [oldState, setOldValidationsState] = useState(validationsState)
    const [tabId, setTabId] = useState(0)
    const [ip, setIP] = useState(localStorage.getItem('ServerIP'));
    const [gpaCalc, setGPA] = useState(gpa);
    const [currStudentID, setCurrStudentID] = useState(localStorage.getItem("currStudentID"))

    const navigate = useNavigate();

    useEffect(() => {
        setOldValidationsState(JSON.parse(JSON.stringify(validationsState))) //sets the old validation state
    }, [])

    // Refresh functions
    const forceReload = async () => {
        await refresh();
    };

    // Validation functions
    const handleValApply = async () => {

        //if student exists check, if hindi, ikickout
        var studentExist = await fetch(`http://${ip}:3001/student/find`, {
        method: "POST",
        headers: {"Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("Username")} ${localStorage.getItem("Password")}` },
        body: JSON.stringify({StudentID: localStorage.getItem("currStudentKey")})
        })
        .then(response => response.json())
        .then(body => {
            if(body.err){
                Swal.fire({icon: 'error', title: 'Error', text: body.err,})
                navigate('/in/user-dashboard')
                return false
            }
        })
        .catch(err => { //will activate if DB is not reachable or timed out or there are other errors
            Swal.fire({icon: 'error', title: 'Server Error', text: 'Check if the server is running or if database IP is correct',})
        })
        if(studentExist == false){
            return
        }


        //console.log(ip)
        setOldValidationsState(JSON.parse(JSON.stringify(validationsState)))    //sets the old validation state
        var newStatus = true
        var sendVal = []
        for (let i = 0; i < validationsState.length; i++) {
            sendVal.push(validationsState[i].status)
            newStatus = newStatus && validationsState[i].status
        }

        //update selected student status
        var updatedStudent = selectedStudent
        if (newStatus){
            updatedStudent.status = 'Checked'
            
        } else {
            updatedStudent.status = 'Pending'
        }
        setSelectedStudent({...updatedStudent})
        //console.log(sendVal)

        const validations = {
            Validations: sendVal,
            _id: selectedStudent.Student
        }
        
        fetch(`http://${ip}:3001/student/update-validations`,{
            method: "POST",
            headers: { "Content-Type":"application/json", "Authorization": `Bearer ${localStorage.getItem("Username")} ${localStorage.getItem("Password")}` },
            body: JSON.stringify(validations)
            })
        .then(response => response.json())
        .then(body => {
            //console.log(body)
            if(body.err){ //if error response returned from DB
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: body.err,
                })
            }
            else { //success state
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Successfully updated validations!',
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

        
    }

    const toggleValidation = (index) => {
        let newValidation = validationsState
        newValidation[index].status = !newValidation[index].status
        setValidationsState([...newValidation])
    }

    // Tabbed components on the right side of the page
    // Uses components as values
    const tabContents = { 
        Status: <Status state={statusState} gpaCalc={gpaCalc} />,    // status component
        Validations: <CheckList oldDataState={oldState} checklistData={validationsState} setValData={toggleValidation} handleApply={handleValApply}/>,       //checklist component
        Notes: <Notes notesData={notesState} semesters={gradeState} setNotesData={setNotesState} />,    // notes component
        History: <History historyData={historyState} />,            // history component
    }

    // Animation for the tabbed components
    const tabAnim = {
        hide: {
            opacity: 0,
            x: 75,
            transition: {
                duration: 0.4,
                ease: 'easeOut',
                when: 'beforeChildren',
            },
        },
        show : {
            opacity: 0,
            x: -75,
            transition: {
                duration: 0.2,
                ease: 'easeIn',
                when: 'beforeChildren',
            },
        },
        animate: {
            opacity: 1,
            x: 0,
        }
    }

    // Function that pushes changes to history
    const setHistory = (histObj) => {

        let history = [...historyState]
        // let newDateFlag = false

        // insert new values to grades
        for (let i = 0; i < history.length; i++){
            if(history[i].date == histObj.date){
                //console.log(values)
                // console.log(histObj)
                // console.log(history[i].info)
                // console.log(histObj)
                history[i].info.unshift(histObj.info[0])    // new history appear on top   
                // console.log(history[i].info)

                break
            }

            if(i == history.length - 1){
                history.unshift(histObj)    // new date appear on top
            }
        }

        // case where history is empty
        if (history.length === 0) {
            history = [...historyState, histObj]
        }
        
        //console.log(history)
        // set new value of history
        setHistoryState(history)
    }

    // Update grade table on addrow, editrow, deleterow changes
    const setGrades = (values) => {

        let grades = [...gradeState]
        let total = 0
        let cumulative = 0
        let weight = 0
        let finalTotal = 0

        // declarartions for GPA and non GPA computation
        let tunitTotal = 0;
        let punitTotal = 0;
        let tnunitTotal = 0;
        let pnunitTotal = 0;

        // insert new values to grades
        for (let i = 0; i < grades.length; i++){
            if(grades[i].sem == values.sem){
            //console.log(values)
            grades[i] = values
            break
            }
        }

        // loop every sem in grades
        for (let i = 0; i < grades.length; i++){
            // loop every grades in a sem
            for (let j = 0; j < grades[i].data.length; j++){

                // compute total unit per sem, weight, and cumulative
                weight = parseFloat(grades[i].data[j].units) * parseFloat(grades[i].data[j].grade)

                // compute total untis earned
                if(grades[i].data[j].units != "0" && grades[i].data[j].grade != "0" && grades[i].data[j].grade != 'S' && grades[i].data[j].grade != 'INC' && grades[i].data[j].grade != 'DRP' && grades[i].data[j].grade != 'P' && grades[i].data[j].grade != 'DFG' && grades[i].data[j].grade != 'U' && !isNaN(grades[i].data[j].grade)){
                    finalTotal += parseFloat(grades[i].data[j].units)
                    // total += parseFloat(grades[i].data[j].units)
                }

                if(grades[i].data[j].units != "0" && grades[i].data[j].grade != "0"){
                    total += parseFloat(grades[i].data[j].units)
                }

                // if weight is a text then weight considered 0
                if(isNaN(weight)){
                    weight = 0;
                }

                // computation of taken GPA units
                if(grades[i].data[j].units != "0" && grades[i].data[j].grade != 'S' && grades[i].data[j].grade != 'P' && grades[i].data[j].grade != 'INC' && grades[i].data[j].grade != 'DRP' && grades[i].data[j].grade != 'DFG' && grades[i].data[j].grade != 'U' && !isNaN(grades[i].data[j].grade)) {
                    tunitTotal += parseFloat(grades[i].data[j].units)
                  } 
                
                // computation of passed GPA units
                if(grades[i].data[j].units != "0") {
                    if(grades[i].data[j].grade != "0" && grades[i].data[j].grade != 'S' && grades[i].data[j].grade != 'P' && grades[i].data[j].grade != 'INC' && grades[i].data[j].grade != 'DRP' && grades[i].data[j].grade != 'DFG' && grades[i].data[j].grade != 'U' && !isNaN(grades[i].data[j].grade)) {
                    punitTotal += parseFloat(grades[i].data[j].units)
                    } 
                }

                // computation of taken non-GPA units
                if(grades[i].data[j].units == "0" || grades[i].data[j].grade == "P" || grades[i].data[j].grade == 'INC' || grades[i].data[j].grade == 'DRP' || grades[i].data[j].grade == 'U' || grades[i].data[j].grade == 'S' || grades[i].data[j].grade == 'DFG') {
                    if (grades[i].data[j].units == "0"){
                        tnunitTotal += 3; 
                    } else {
                        tnunitTotal += parseFloat(grades[i].data[j].units)
                    }
                }
                
                // computation of passed non-GPA units
                if(grades[i].data[j].units == "0" || grades[i].data[j].grade == "P" || grades[i].data[j].grade == 'INC' || grades[i].data[j].grade == "S" || grades[i].data[j].grade == "DFG") {
                    if(grades[i].data[j].grade != "0" && grades[i].data[j].grade != 'DRP' && grades[i].data[j].grade != 'U') {
                        if (grades[i].data[j].units == "0"){
                            pnunitTotal += 3; 
                        } else {
                            pnunitTotal += parseFloat(grades[i].data[j].units)
                        }
                    }
                }

                // increment cumulative
                cumulative += weight
                

                // store weight and cumulative
                grades[i].data[j].enrolled = weight.toString()
                grades[i].data[j].runningSum = cumulative.toString()
            }

            // store total per sem and reset
            grades[i].total = total
            total = 0
        }

        // for computation of status tab
        let unitsGPA = {GPAUnits: {taken: tunitTotal, passed: punitTotal}, NotGPAUnits: {taken: tnunitTotal, passed: pnunitTotal}}
        let gpaCalc = {totalGradePoints: cumulative, totalUnitsGPA: finalTotal, gwa: cumulative/finalTotal}
        
        // update props value
        setGPA(gpaCalc)
        setGradeState(grades)
        setStatus(unitsGPA)

        // data to be sent to DB for update
        let newGPA = {
            _id: currStudentID,
            TotalUnits: gpaCalc.totalUnitsGPA,
            TotalCumulative: gpaCalc.totalGradePoints,
            OverallGWA: gpaCalc.gwa
        }
        
        // update student gpa to DB
        fetch(`http://${ip}:3001/student/update-gpa`, {
                method: "POST",
                headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("Username")} ${localStorage.getItem("Password")}` },
                body: JSON.stringify(newGPA)// use studentID to find student info
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
                //console.log(err)
            })
    }
    

    // Styling for student detail header
    const detailStyle = { 
        title: "font-inter table-cell text-left text-xs xl:text-sm 1.75xl:text-[1vw] 2xl:leading-6 3xl:leading-8 5xl:leading-10",
        text: "font-inter font-bold table-cell text-left text-base xl:text-xl 1.75xl:text-[1.3vw] 3xl:leading-8 5xl:leading-10",
    }

    return(
        <main>
            <div className='w-100% pt-[9vh] flex-column box-border'>

                {/* Student Details */}
                <div className="w-full flex px-[1.5vw] py-[2vh] rounded-lg mx-auto bg-sr-dark-gray shadow-lg box-border">

                <div className="table w-0 table-fixed">
                        <div className={`table-header-group`}>
                            <div className="table-row">
                                <div className={`${detailStyle.title} w-[12vw]`}>Student Number</div>
                                <div className={`${detailStyle.title} w-[25vw] pl-[2.5vw]`}>Name</div>
                                <div className={`${detailStyle.title} w-[20vw] pl-[2.5vw]`}>Degree Program</div>
                                <div className={`${detailStyle.title} w-[12vw] pl-[2.5vw]`}>Status</div>
                            </div>
                        </div>

                        <div className={`table-row-group`}>
                            <div className="table-row">
                                <div className={`${detailStyle.text} w-[12vw] truncate`}>{selectedStudent.stud_no}</div>
                                <div className={`${detailStyle.text} w-[29vw] pl-[2.5vw] truncate`}>
                                    {`${selectedStudent.iname.lname.toUpperCase()}, ${selectedStudent.iname.fname.toUpperCase()} ${selectedStudent.iname.mname.toUpperCase()}.`}
                                </div>
                                <div className={`${detailStyle.text} w-[16vw] pl-[2.5vw] truncate`}>{selectedStudent.degree_program.toUpperCase()}</div>
                                <div className={`${detailStyle.text} w-[12vw] pl-[2.5vw]`}>{selectedStudent.status}</div>
                            </div>

                        </div>
                    </div>

                    <div className="w-1/5 flex items-center">
                        <ActionsBtn
                            studentInfo={selectedStudent}
                            grades={gradeState}
                            setHistory={setHistory}
                            setSelectedStudent={setSelectedStudent}
                            forceReload={forceReload}
                            gpa={gpaCalc}
                        />
                        <Refresh className="ml-2" handleClick={forceReload} />
                    </div>
                </div>                   


                {/* Student Grades */}
                <div className="w-full flex mx-auto my-[3vh] gap-[1.5vw]">

                    {/* Container for the whole accordion component */}
                    <div className="w-[60vw] flex-1 overflow-auto mx-auto bg-white">
                        {   // map the grades per semester
                            gradeState.map((semData, idx)=>(
                                <Table
                                    key={idx}
                                    Name={semData.sem}
                                    Semester={semData.data}
                                    Total={semData.total}
                                    historyHandler={setHistory}
                                    autoSet={setGrades}/>
                            ))
                        }
                    </div>
                                
                    {/* Tabbed information card */}

                    <div className="flex-none max-w-[100%] h-[68vh] sticky top-[2.5rem] shadow-lg rounded-lg">
                        <Tab.Group
                            selectedIndex={tabId}
                            onChange={(id) => {
                                setTabId(id)
                            }}
                            manual
                        >
                            <Tab.List className="flex rounded-t-md font-inter text-sm xl:text-base 1.75xl:text-lg 5xl:text-[1.05vw]">
                                {Object.keys(tabContents).map((tab, idx) => (
                                        <Tab key={idx} as={Fragment}>
                                            {({selected}) => (
                                                <button
                                                    className={
                                                        selected 
                                                            ? 'transition-all ease-in duration-100 text-button-green pb-2 pt-4 5xl:py-[0.75vw] w-1/3 border-b border-button-green focus:outline-none'  
                                                            : 'transition-all ease-in duration-100 text-sr-tab-inactive pb-2 pt-4 5xl:py-[0.75vw] w-1/3 border-b border-sr-divider-light focus:outline-none hover:text-button-green-hover hover:transition hover:ease-in hover:duration-300'
                                                    }
                                                >
                                                    {tab}
                                                </button>
                                            )}
                                        </Tab>
                                    )
                                )}
                            </Tab.List>
                            <Tab.Panels className="m-0 block">
                                <AnimatePresence exitBeforeEnter>
                                    {Object.values(tabContents).map((component) =>( // ref used https://github.com/tailwindlabs/headlessui/discussions/1237
                                        <Tab.Panel 
                                            className="h-[63.5vh] col-span-1 block"
                                            key={tabId}
                                            as={motion.div}
                                            initial="show"
                                            animate="animate"
                                            exit="hide"
                                            variants={tabAnim}
                                        >                                
                                            {component}
                                        </Tab.Panel>
                                    ))}
                                </AnimatePresence>
                            </Tab.Panels>
                        </Tab.Group>
                    </div>
                </div>
            </div>
        </main>        
    );
}


export default RecordPage;