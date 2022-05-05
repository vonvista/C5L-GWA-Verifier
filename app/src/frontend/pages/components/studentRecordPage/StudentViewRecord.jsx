import { useState, useEffect, useRef } from 'react';
import ActionsBtn from '../../../components/buttons/Dropdown';
import SemSelect from '../../../components/inputs/DropdownSelect';
import { Tab, Transition } from '@headlessui/react';
import 'tailwindcss/tailwind.css';
import './StudentViewRecord.css';
import Status from './Status';
import Notes from './Notes';
import History from './StudentRecordHistory';
import TableDivider from './TableDivider';
import CheckListTab from './ChecklistTab';


// styling for student detail header
const detailStyle = {
    title: "table-cell text-left text-sm 2xl:text-xl",
    text: "table-cell text-left text-xl 2xl:text-2xl font-bold",
}

const RecordPage = ({sem, user, student, notes, history, status, grades, checklist}) => {

    // pass details and other data through props to this component
    
    const [selectedStudent, setSelectedStudent] = useState(student)
    const [statusState, setStatus] = useState(status)
    const [gradeState, setGradeState] = useState(grades)

    
    const tabContents = { 
        // status tab contents (dynamic) so easier to add or remove tabs
        // uses components as values
        Status: <Status state={statusState} />,                 // status component
        Notes: <Notes notes={notes} semesters={gradeState} />,  // notes component
        History:<History historyData={history} />,              // history component
        Validations: <CheckListTab checklistData={checklist} />   //checklist component
    }

    let [selectedTab] = useState(tabContents)               // state controller for selecting tabs

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
                    <div className="w-[60vw] flex-1 overflow-auto">
                        <TableDivider grades={grades} />
                    </div>

                                
                    {/* tabbed information card */}

                    <div className="flex-none max-w-[100%] h-[45rem] sticky top-[11.5rem] shadow-lg rounded-lg">
                        <Tab.Group>
                            <Tab.List className="flex rounded-t-md">
                                {Object.keys(selectedTab).map((tab) => (
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
                                    {Object.values(selectedTab).map((component) =>(
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