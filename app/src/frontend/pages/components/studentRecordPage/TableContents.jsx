import { useEffect, useState } from 'react';
import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/solid'
import 'tailwindcss/tailwind.css';

import List from '../../../components/List';

const TableContents = ({ Name, Semester }) => {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          // Retrieve data from database
          await setRows(Semester);
        }
  
        fetchData();
    }, []);

    const nameStyle = "flex justify-between w-full px-4 py-2 text-sm font-medium text-left rounded-lg text-sr-table-text bg-sr-dark-gray hover:bg-table-hover-color hover:text-secondary-red";

    return (
        <>
            {/* Accordion for the table */}
            <Disclosure>
                {({ open }) => (
                    <>
                    {/* Accordion Header */}
                    <Disclosure.Button className={`${open ? 'bg-table-hover-color text-secondary-red' : ''} ${nameStyle}`}>
                        <span>{Name}</span>

                        {/* Button */}
                        <ChevronUpIcon
                            className={`${
                                open ? 'transform rotate-180' : ''
                            } w-5 h-5`}
                        />
                    </Disclosure.Button>
                    
                    {/* Accordion Contents */}
                    <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                        <List table={2} data={Semester}/>
                    </Disclosure.Panel>
                    </>
                )}
            </Disclosure>
        </>
    )
}

export default TableContents