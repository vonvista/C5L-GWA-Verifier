import { useState } from 'react';
import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/solid'
import 'tailwindcss/tailwind.css';

import TableContents from './TableContents';

const TableDivider = ({ grades }) => {

    return (
        <div className="w-full mx-auto bg-white">
            {
                grades.map((semData, idx)=>(
                    <TableContents key={idx} Name={semData.sem} Semester={semData.data} />
                ))
            }
        </div>
    )
}

export default TableDivider