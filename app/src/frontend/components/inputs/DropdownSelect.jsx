/* 
How to use:
<Dropdown
    style =   // style options
    options = // options here
    state =   // state functions
    /> 
*/

// component/ref used: https://headlessui.dev/react/listbox

import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
    
function DropdownInput(props) {

    // dropdown select
    const options = props.options                  // pass options here
    const [selected, setSelected] = props.state    // set default option as 1
    console.log(selected)
    return(
        <>
            <div className={props.style}>
                <Listbox value={selected} onChange={setSelected}>
                    <div className="relative mt-1">
                    <Listbox.Button className="relative w-full py-2 pl-4 pr-10 text-left bg-white rounded-md shadow-lg cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
                        <span className="block truncate">{selected.name}</span>
                        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <SelectorIcon
                            className="w-5 h-5 text-gray-400"
                            aria-hidden="true"
                        />
                        </span>
                    </Listbox.Button>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {options.map((person, personIdx) => (
                            <Listbox.Option
                            key={personIdx}
                            className={({ active }) =>
                                `cursor-default select-none relative py-2 pl-4 pr-4 ${
                                active ? 'text-red-900 bg-red-100' : 'text-gray-900'    // change color of option when hovering based on theme
                                }`
                            }
                            value={person}
                            >
                            {({ selected }) => (
                                <>
                                <span
                                    className={`block truncate ${
                                    selected ? 'font-medium' : 'font-normal'
                                    }`}
                                >
                                    {person.name}
                                </span>
                                
                                </>
                            )}
                            </Listbox.Option>
                        ))}
                        </Listbox.Options>
                    </Transition>
                    </div>
                </Listbox>
            </div>
        </>
    )
}


export default DropdownInput