import { useState, useEffect, useRef } from 'react';
import ActionsBtn from '../../../components/buttons/Dropdown';
import SemSelect from '../../../components/inputs/DropdownSelect';
import { Tab } from '@headlessui/react';
import 'tailwindcss/tailwind.css';

// styling for student detail header
const detailStyle = {
    title: "table-cell text-left text-sm",
    text: "table-cell text-left text-xl font-bold",
}


const RecordPage = (props) => {

    // pass details and other data through props to this component
    // 

    const semesters = props.sem 
    const user = props.user
    
    const [selectedSem, setSelectedSem] = useState(semesters[0])    // state controller for selecting semesters -> should change table contents
    const [selectedUser, setSelectedUser] = useState(user)
     

    const tabContents = { 
        // status tab contents (dynamic) so easier to add or remove tabs
        // uses components as values
        Status: <div>{/* Status Component Here */}</div>, // status component here
        Notes: <div>{/* Notes Component Here */}</div>,  // notes component here
        History:[], // insert history component here
    }

    let [selectedTab] = useState(tabContents)                       // state controller for selecting tabs

    return(
        <div className="w-full p-6">
            {/* student details */}
            <div className="w-[95%] flex px-7 py-5 rounded-md mx-auto bg-sr-dark-gray shadow-lg box-border">

                <div className="table w-4/5">
                    <div className="table-header-group">
                        <div className="table-row">
                            <div className={detailStyle.title}>Student Number</div>
                            <div className={detailStyle.title}>Name</div>
                            <div className={detailStyle.title}>Degree Program</div>
                            <div className={detailStyle.title}>Status</div>
                        </div>
                    </div>

                    <div className="table-row-group">
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

                <div className="col-span-6">
                    {/*{/* dropdown select }
                    <div className="col-span-1 col-start-6">
                        <SemSelect
                            style="w-72 ml-auto mr-0"
                            options={semesters}
                            state={[selectedSem, setSelectedSem]}     // so state can be accessed by parent component
                            />
                    </div>*/}
                    {/* grades table */}
                    <div className="shadow-lg col-span-6 rounded-md mt-3 h-80">
                        {/* insert grades table component here */}
                    </div>
                </div>
                                
                {/* tabbed information card */}
                
                <div className="col-span-2 shadow-lg rounded-md">
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
                        <Tab.Panels>
                                {Object.values(selectedTab).map((component) =>(
                                    <Tab.Panel
                                        className="w-inherit"
                                    >                                
                                        {component}
                                    </Tab.Panel>
                                ))}

                        </Tab.Panels>
                    </Tab.Group>

                </div>
                
            </div>
            
        </div>
    );
}

export default RecordPage;