import { Tab, Transition, Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/solid';
import { useState, useEffect, useRef } from 'react';

/* Components */
import ActionsBtn from 'frontend/components/buttons/Dropdown';
import SemSelect from 'frontend/components/inputs/DropdownSelect';
import Status from './tabbed-components/status/Status';
import Notes from '../components/studentRecordPage/Notes';
import History from '../components/studentRecordPage/StudentRecordHistory';
import CheckList from './tabbed-components/checklist/ChecklistTab';
import Table from './grades-table/TableContents';

/* CSS */
import 'tailwindcss/tailwind.css';
import './StudentViewRecord.css';


// styling for student detail header
const detailStyle = {
    title: "table-cell text-left text-sm 2xl:text-xl",
    text: "table-cell text-left text-xl 2xl:text-2xl font-bold",
}

const RecordPage = ({sem, user, student, notes, history, status, grades, checklist, autoSet}) => {

    // pass details and other data through props to this component
    
    const [selectedStudent, setSelectedStudent] = useState(student)
    const [statusState, setStatus] = useState(status)
    const [gradeState, setGradeState] = useState(grades)
    const [historyState, setHistoryState] = useState(history)

    const tabContents = { 
        // status tab contents (dynamic) so easier to add or remove tabs
        // uses components as values
        Status: <Status state={statusState} />,                   // status component
        Validations: <CheckList checklistData={checklist} />,   //checklist component
        Notes: <Notes notes={notes} semesters={gradeState} />,    // notes component
        History: <History historyData={historyState} />,          // history component
    }

    const histAdd = (histObj) => {
        // function for adding to history
        // function to be passed to other child components that will update the state
        // this function has to be in the parent component so that history tab will update
        let newHist = [...historyState, histObj]
        setHistoryState(newHist)
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
                        <ActionsBtn />
                    </div>


                </div>

                {/* student grades */}
                <div className="w-full flex mx-auto my-5 gap-3">

                    {/* div container for the whole accordion component */}
                    <div className="w-[60vw] flex-1 overflow-auto mx-auto bg-white">
                        {   // map grades per semester
                            gradeState.map((semData, idx)=>(
                                <Table key={idx} Name={semData.sem} Semester={semData.data} Total={semData.total} handler={setGradeState} history={historyState} historyHandler={histAdd} autoSet={autoSet}/>
                            ))
                        }
                    </div>

                                
                    {/* tabbed information card */}

                    <div className="flex-none max-w-[100%] h-[45rem] sticky top-[11.5rem] shadow-lg rounded-lg">
                        <Tab.Group>
                            <Tab.List className="flex rounded-t-md">
                                {Object.keys(tabContents).map((tab) => (
                                        <Tab key={tab}
                                            className={({selected}) => (
                                                selected ? 
                                                    'transition-all ease-in delay-200 text-login-green pb-2 pt-4 w-1/3 border-b border-login-green' : 
                                                    'transition-all ease-in delay-200 text-sr-tab-inactive pb-2 pt-4 w-1/3 border-b border-sr-divider-light hover:text-login-green-hover hover:transition-all hover:ease-in hover:delay-300'
                                                )
                                            }
                                        >
                                            {tab}
                                        </Tab>
                                    )
                                )}
                            </Tab.List>
                            <Tab.Panels className="m-0 block">
                                    {Object.values(tabContents).map((component) =>(
                                        <Tab.Panel className="h-[42rem] col-span-1 block">                                
                                            {component}
                                        </Tab.Panel>
                                    ))}

                            </Tab.Panels>
                        </Tab.Group>

                    </div>
                </div>
            </div>
        </main>        
    );
}

export default RecordPage;