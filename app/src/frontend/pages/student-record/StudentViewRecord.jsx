import { Tab, Transition, Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/solid';
import { useState, useEffect, useRef, Fragment } from 'react';
import { motion, AnimatePresence, AnimateSharedLayout } from 'framer-motion';

/* Components */
import ActionsBtn from 'frontend/components/buttons/Dropdown';
import Status from './tabbed-components/status/Status';
import Notes from './tabbed-components/notes/Notes';
import History from './tabbed-components/history/StudentRecordHistory';
import CheckList from './tabbed-components/checklist/ChecklistTab';
import Table from './grades-table/TableContents';

/* CSS */
import 'tailwindcss/tailwind.css';
import './StudentViewRecord.css';


// This component contains all the elements of the student record page
// such as the student details header, the grades table, and the status tab
// -- user : details about who is editing the document
// -- student : contains details of the student (studnumber, name, degree program, status)
// -- notes : data of per semester notes that can be edited or deleted
// -- history : data of changes done on given record
// -- status : whether verified or not
// -- grades : object containing grades of students divided per semester
// -- checklist : list of requirements the student needs to accomplish before being verified
// -- autoSet:

const RecordPage = ({sem, user, student, notes, history, status, grades, checklist}) => {

    // pass details and other data through props to this component
    
    const [selectedStudent, setSelectedStudent] = useState(student)
    const [statusState, setStatus] = useState(status)
    const [gradeState, setGradeState] = useState(grades)
    const [notesState, setNotesState] = useState(notes)
    const [historyState, setHistoryState] = useState(history)
    const [tabId, setTabId] = useState(0)

    const tabContents = { 
        // status tab contents (dynamic) so easier to add or remove tabs
        // uses components as values
        Status: <Status state={statusState} />,                     // status component
        Validations: <CheckList checklistData={checklist} />,       //checklist component
        Notes: <Notes notesData={notesState} semesters={gradeState} setNotesData={setNotesState} />,    // notes component
        History: <History historyData={historyState} />,            // history component
    }

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

    // update HistoryState by adding new history to its date
    const setHistory = (histObj) => {

        let history = [...historyState]
        let newDateFlag = false

        // insert new values to grades
        for (let i = 0; i < history.length; i++){
            if(history[i].date == histObj.date){
                //console.log(values)
                history[i].info.unshift(histObj.info[0])
                break
            }

            if(i == history.length - 1){
                history.push(histObj)
            }
        }
        
        console.log(history)
        // set new value of history
        setHistoryState(history)
    }

    // update grade table on addrow, editrow, deleterow changes
    const setGrades = (values) => {

        let grades = [...gradeState]
        let total = 0
        let cumulative = 0
        let weight = 0

        // insert new values to grades
        for (let i = 0; i < grades.length; i++){
            if(grades[i].sem == values.sem){
            //console.log(values)
            grades[i] = values
            break
            }
        }


        for (let i = 0; i < grades.length; i++){

            for (let j = 0; j < grades[i].data.length; j++){

            // compute total unit per sem, weight, and cumulative
            weight = parseFloat(grades[i].data[j].units) * parseFloat(grades[i].data[j].grade)
            if(isNaN(weight)){
                weight = 0;
            }
            cumulative += weight
            total += parseFloat(grades[i].data[j].units)

            grades[i].data[j].enrolled = weight.toString()
            grades[i].data[j].runningSum = cumulative.toString()
            }

            grades[i].total = total
            total = 0
        }
        //console.log(grades)
        // set new value of props
        setGradeState(grades)
    }
    
    // const histAdd = (histObj) => {
    //     // function for adding to history
    //     // function to be passed to other child components that will update the state
    //     // this function has to be in the parent component so that history tab will update
    //     let newHist = [...historyState, histObj]
    //     setHistoryState(newHist)
    // }

    const detailStyle = { // styling for student detail header
        title: "table-cell text-left text-sm 2xl:text-xl",
        text: "table-cell text-left text-xl 2xl:text-2xl font-bold",
    }

    return(
        <main>
            <div className='w-100% pt-14 lg:pt-16 xl:pt-20 px-6 flex-column box-border'>

                {/* student details */}
                <div className="w-full top-16 flex px-7 py-5 rounded-lg mx-auto bg-sr-dark-gray shadow-lg box-border">

                    <div className="table w-4/5">
                        <div className="title-styles">
                            <div className="table-row">
                                <div className={detailStyle.title}>Student Number</div>
                                <div className={detailStyle.title}>Name</div>
                                <div className={detailStyle.title}>Degree Program</div>
                                <div className={detailStyle.title}>Status</div>
                            </div>
                        </div>

                        <div className="value-styles">
                            <div className="table-row">
                                <div className={detailStyle.text}>{selectedStudent.stud_no}</div>
                                <div className={detailStyle.text}>{selectedStudent.name}</div>
                                <div className={detailStyle.text}>{selectedStudent.degree_program}</div>
                                <div className={detailStyle.text}>{selectedStudent.status}</div>
                            </div>

                        </div>
                    </div>

                    <div className="w-1/5 flex items-center">
                        <ActionsBtn studentInfo={selectedStudent} grades={gradeState}/>
                    </div>


                </div>

                {/* student grades */}
                <div className="w-full flex mx-auto my-5 gap-3">

                    {/* div container for the whole accordion component */}
                    <div className="w-[60vw] flex-1 overflow-auto mx-auto bg-white">
                        {   // map grades per semester
                            gradeState.map((semData, idx)=>(
                                <Table
                                    key={idx}
                                    Name={semData.sem}
                                    Semester={semData.data}
                                    Total={semData.total}
                                    handler={setGradeState}
                                    history={historyState}
                                    historyHandler={setHistory}
                                    autoSet={setGrades}/>
                            ))
                        }
                    </div>

                                
                    {/* tabbed information card */}

                    <div className="flex-none max-w-[100%] h-[45rem] sticky top-[11.5rem] shadow-lg rounded-lg">
                        <Tab.Group
                            selectedIndex={tabId}
                            onChange={(id) => {
                                console.log(id)
                                setTabId(id)
                            }}
                            manual
                        >
                            <Tab.List className="flex rounded-t-md">
                                {Object.keys(tabContents).map((tab) => (
                                        <Tab key={tab} as={Fragment}>
                                            {({selected}) => (
                                                <button
                                                    className={
                                                        selected 
                                                            ? 'transition-all ease-in delay-100 text-login-green pb-2 pt-4 w-1/3 border-b border-login-green focus:outline-none'  
                                                            : 'transition-all ease-in delay-100 text-sr-tab-inactive pb-2 pt-4 w-1/3 border-b border-sr-divider-light focus:outline-none hover:text-login-green-hover hover:transition hover:ease-in hover:delay-300'
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
                                            className="h-[42rem] col-span-1 block"
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