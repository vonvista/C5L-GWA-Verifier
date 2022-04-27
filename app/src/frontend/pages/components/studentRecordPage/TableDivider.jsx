import { useEffect, useState } from 'react';
import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/solid'
import 'tailwindcss/tailwind.css';

import List from '../../../components/List';
// import TableContents from './TableContents';

const TableDivider = ({  }) => {
    const [rows, setRows] = useState([]);

    const FirstSem = [
        {
            "courseName": "CMSC 12",
            "units": "3.0",
            "grade": "1.00",
            "enrolled": "3.00",
            "runningSum": "3.00"
        },
        {
            "courseName": "CMSC 56",
            "units": "3.0",
            "grade": "1.50",
            "enrolled": "4.50",
            "runningSum": "7.50"
        },
        {
            "courseName": "MATH 27",
            "units": "3.0",
            "grade": "1.75",
            "enrolled": "5.25",
            "runningSum": "12.75"
        },
        {
            "courseName": "ETHICS 1",
            "units": "3.0",
            "grade": "1.50",
            "enrolled": "4.50",
            "runningSum": "17.25"
        },
        {
            "courseName": "STS 1",
            "units": "3.0",
            "grade": "1.75",
            "enrolled": "5.25",
            "runningSum": "22.50"
        },
        {
            "courseName": "HK 11",
            "units": "2.0",
            "grade": "1.00",
            "enrolled": "2.00",
            "runningSum": "22.50"
        },
    ];

    const SecondSem = [
        {
            "courseName": "CMSC 21",
            "units": "3.0",
            "grade": "1.00",
            "enrolled": "3.00",
            "runningSum": "25.50"
        },
        {
            "courseName": "CMSC 57",
            "units": "3.0",
            "grade": "1.50",
            "enrolled": "4.50",
            "runningSum": "30.00"
        },
        {
            "courseName": "MATH 28",
            "units": "3.0",
            "grade": "1.50",
            "enrolled": "4.50",
            "runningSum": "34.50"
        },
        {
            "courseName": "KAS 1",
            "units": "3.0",
            "grade": "1.75",
            "enrolled": "5.25",
            "runningSum": "39.75"
        },
        {
            "courseName": "ARTS 1",
            "units": "3.0",
            "grade": "1.00",
            "enrolled": "3.00",
            "runningSum": "42.75"
        },
    ];

    const ThirdSem = [
        {
            "courseName": "CMSC 22",
            "units": "3.0",
            "grade": "1.00",
            "enrolled": "3.00",
            "runningSum": "45.75"
        },
        {
            "courseName": "CMSC 123",
            "units": "3.0",
            "grade": "2.25",
            "enrolled": "6.75",
            "runningSum": "52.50"
        },
        {
            "courseName": "CMSC 130",
            "units": "3.0",
            "grade": "1.00",
            "enrolled": "3.00",
            "runningSum": "55.50"
        },
        {
            "courseName": "CMSC 150",
            "units": "3.0",
            "grade": "1.50",
            "enrolled": "4.50",
            "runningSum": "60.00"
        },
        {
            "courseName": "SCIENCE 11",
            "units": "3.0",
            "grade": "1.50",
            "enrolled": "4.50",
            "runningSum": "64.50"
        },
        {
            "courseName": "NSTP 1",
            "units": "2.0",
            "grade": "1.25",
            "enrolled": "2.50",
            "runningSum": "64.50"
        },
    ];

    useEffect(() => {
        const fetchData = async () => {
          // Retrieve data from database
          await setRows(FirstSem);
          await setRows(SecondSem);
          await setRows(ThirdSem);
        }
  
        fetchData();
    }, []);

    const nameStyle = "flex justify-between w-full px-4 py-2 text-sm font-medium text-left rounded-lg text-sr-table-text bg-sr-dark-gray hover:bg-table-hover-color hover:text-secondary-red";
    
    return (
        <div className="w-full p-2 mx-auto bg-white rounded-2xl">
            <Disclosure>
            {({ open }) => (
                <>
                <Disclosure.Button className={`${open ? 'bg-table-hover-color text-secondary-red' : ''} ${nameStyle}`}>
                    <span>First Sem A.Y. 2020-2021</span>
                    <ChevronUpIcon
                        className={`${
                            open ? 'transform rotate-180' : ''
                        } w-5 h-5`}
                    />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                    <List table={2} data={FirstSem}/>
                </Disclosure.Panel>
                </>
            )}
            </Disclosure>
            <Disclosure>
            {({ open }) => (
                <>
                <Disclosure.Button className={`${open ? 'bg-table-hover-color text-secondary-red' : ''} ${nameStyle}`}>
                    <span>Second Sem A.Y. 2020-2021</span>
                    <ChevronUpIcon
                        className={`${
                            open ? 'transform rotate-180' : ''
                        } w-5 h-5`}
                    />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                    <List table={2} data={SecondSem}/>
                </Disclosure.Panel>
                </>
            )}
            </Disclosure>
            <Disclosure>
            {({ open }) => (
                <>
                <Disclosure.Button className={`${open ? 'bg-table-hover-color text-secondary-red' : ''} ${nameStyle}`}>
                    <span>Third Sem A.Y. 2020-2021</span>
                    <ChevronUpIcon
                        className={`${
                            open ? 'transform rotate-180' : ''
                        } w-5 h-5`}
                    />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                    <List table={2} data={ThirdSem}/>
                </Disclosure.Panel>
                </>
            )}
            </Disclosure>
        </div>
    )
}

export default TableDivider