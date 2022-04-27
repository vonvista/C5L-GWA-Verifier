import { useState, useEffect, useRef } from 'react';
import ActionsBtn from '../../../components/buttons/Dropdown';
import SemSelect from '../../../components/inputs/DropdownSelect';
import Header from '../../../components/HeaderWithArrowbck';
import UserNav from '../../../components/UserNavigation';
import { Tab } from '@headlessui/react';
import 'tailwindcss/tailwind.css';
import './StudentViewRecord.css';
import Status from './Status';
import Notes from './Notes';
import History from './StudentRecordHistory';
import TableDivider from './TableDivider';



// styling for student detail header
const detailStyle = {
    title: "table-cell text-left text-sm 2xl:text-xl",
    text: "table-cell text-left text-xl 2xl:text-2xl font-bold",
}


const RecordPage = (props) => {

    // pass details and other data through props to this component
    // 

    const semesters = props.sem 
    const user = props.user
    const notes = props.notes
    const history = props.history
    
    const [selectedSem, setSelectedSem] = useState(semesters[0])    // state controller for selecting semesters -> should change table contents
    const [selectedUser, setSelectedUser] = useState(user)
     

    const tabContents = { 
        // status tab contents (dynamic) so easier to add or remove tabs
        // uses components as values
        Status: <Status />, // status component here
        Notes: <Notes notes={notes} />,  // notes component here
        History:<History historyData={history} />, // insert history component here
    }

    let [selectedTab] = useState(tabContents)                       // state controller for selecting tabs

    return(
        <main>
            <nav class="sticky z-10"><UserNav /></nav>
            <div className="relative inset-0 flex ml-8 xl:ml-12 justify-center">
                
                <header><Header pageTitle={"Student Record"}/></header>
                <div className='w-full pt-14 lg:pt-16 xl:pt-20 px-6 flex-column'>

                    {/* student details */}
                    <div className="w-[95%] flex px-7 py-5 rounded-lg mx-auto bg-sr-dark-gray shadow-lg box-border">

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
                                    <div className={detailStyle.text}>{selectedUser.stud_no}</div>
                                    <div className={detailStyle.text}>{selectedUser.name}</div>
                                    <div className={detailStyle.text}>{selectedUser.degree_program}</div>
                                    <div className={detailStyle.text}>{selectedUser.status}</div>
                                </div>

                            </div>
                        </div>

                        <div className="w-1/5 flex items-center">
                            <ActionsBtn />
                        </div>


                    </div>

                    {/* student grades */}
                    <div className="w-[95%] grid grid-flow-col mx-auto my-5 gap-3">

                        <div className="col-span-3">

                            {/* div container for the whole accordion component */}
                            <div className="shadow-lg w-[60vw] col-span-3 rounded-lg mt-3 h-80">
                                <TableDivider />
                            </div>

                        </div>
                                    
                        {/* tabbed information card */}

                        <div className="col-span-1 max-w-[30vw] shadow-lg rounded-lg">
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
                                <Tab.Panels className="w-[30vw] m-0 block">
                                        {Object.values(selectedTab).map((component) =>(
                                            <Tab.Panel className="col-span-1 block">                                
                                                {component}
                                            </Tab.Panel>
                                        ))}

                                </Tab.Panels>
                            </Tab.Group>

                        </div>
                    </div>
                </div>
            </div>
        </main>        
    );
}

export default RecordPage;