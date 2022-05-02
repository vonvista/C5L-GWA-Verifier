import { useEffect, useState } from 'react';
import { Disclosure, Transition } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/solid'
import List from '../../../components/List';
import 'tailwindcss/tailwind.css';


// This component handles the student's data for a specific semester
const TableContents = ({ Name, Semester, key, handler }) => {

    // handler prop will handle pushing changes to parent
    // semHandler will handle semData

    const [rows, setRows] = useState([]);
    const [semData, semHandler] = useState(Semester);
  
    useEffect(() => {
        const fetchData = async () => {
          // Retrieve data from database
          await setRows(Semester);
        }
  
        fetchData();
    }, []);

    const nameStyle = "flex inter font-bold justify-between z-25 w-full px-4 py-2 text-sm font-medium text-left text-sr-table-text bg-sr-dark-gray hover:bg-yellow-100 hover:text-secondary-red";

    // Handler for row changes
    const setData = (values) => { // modifies values of a row
        // get array index of object that was changed
        const targetIndex = semData.findIndex(obj => obj.idRow == values.idRow) 
        
        let newSemData = [...semData]
        newSemData[targetIndex] = values 

        semHandler(newSemData)
    }

    const delData = (values) => { // deletes row from table
        // get array index of object that was changed
        const targetIndex = semData.findIndex(obj => obj.idRow == values.idRow)
        
        let newSemData = [...semData]
        newSemData.splice(targetIndex, 1)

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
                             <Disclosure.Button className={`${open ? 'bg-table-hover-color text-secondary-red rounded-t-lg' : 'mb-2 rounded-lg shadow-lg'} ${nameStyle}`}>
                                <span className="text-lg xl:text-xl">{Name}</span>
                                {/* Icon */}
                                <ChevronUpIcon
                                    className={`${
                                        !open ? 'transform rotate-180' : ''
                                    } ml-1 w-5 xl:w-7 self-center`}
                                />
                            </Disclosure.Button>
                            
                            {/* Accordion Contents */}
                            <Disclosure.Panel className="inter z-0 pl-5 py-3 mb-2 text-sm text-gray-500 rounded-b-lg shadow-lg">
                                <List table={2} data={semData} dataHandler={setData} delHandler={delData}/>
                                <section className="mt-3">
                                    <span className="font-black">Load Status</span>
                                    <span className="ml-4 font-black text-login-green underline">Normal</span>
                                </section>
                            </Disclosure.Panel>       
                        </>
                    )}
                </Disclosure>
            </div>
            
        </>
    )
}

export default TableContents