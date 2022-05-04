import { useState } from 'react';
import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/solid'
import TableContents from './TableContents';
import 'tailwindcss/tailwind.css';


// This component's main purpose is to pass the student's data for each semester to TableContents component
// -- grades prop: receives the current student's summary of grades
const TableDivider = ({ grades }) => {

    const [gradeState, gradeHandler] = useState(grades)

    return (
        <div className="w-full mx-auto bg-white">
            {
                gradeState.map((semData, idx)=>(
                    <TableContents key={idx} Name={semData.sem} Semester={semData.data} Total={semData.total} handler={gradeHandler} />
                ))
            }
        </div>
    )
}

export default TableDivider