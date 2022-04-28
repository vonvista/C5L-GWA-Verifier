import { useState } from 'react';
import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/solid'
import 'tailwindcss/tailwind.css';

import TableContents from './TableContents';

const TableDivider = ({ grades }) => {

    const [gradeState, gradeHandler] = useState(grades)

    return (
        <div className="w-full mx-auto bg-white">
            {
                gradeState.map((semData, idx)=>(
                    <TableContents key={idx} Name={semData.sem} Semester={semData.data} handler={gradeHandler} />
                ))
            }
        </div>
    )
}

export default TableDivider