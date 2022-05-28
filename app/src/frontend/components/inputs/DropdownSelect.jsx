import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'


/* Parent component: frontend/pages/student-record/tabbed-components/notes/AddNote */

/* This functional component is for a dropdown select button
   Referenced from: https://headlessui.dev/react/listbox */
/* HOW TO USE:
    <Dropdown
        style =   // style options
        options = // options here
        state =   // state functions
    /> 
*/

/* Props:
    props.options : holds an array that contains the options to be used for the button
    props.state : holds the initialized useState made by parent
    props.style : for styling options of the dropdown select
    props.placeHolderChange : function passes the selected choice in the dropdown from this component to parent
*/   
const DropdownInput = (props) => {

    // Dropdown select
    const options = props.options                   // Pass options here
    const [selected, setSelected] = props.state     // Set default option as 1

    // Lifting up state for notes component
    const handleChange = (newSelect) => {
        setSelected(newSelect)
        props.placeholderChange(newSelect)          // Setting placeholder text
    }

    return(
        <>
            <div className={props.style}>
                <Listbox value={selected} onChange={(setSelected) => {handleChange(setSelected)}}>
                    <div className="relative mt-1">
                    <Listbox.Button className="relative w-full py-2 pl-4 pr-10 text-left font-medium bg-white rounded-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75">
                        <span className="block truncate">{selected.sem}</span>
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
                        <Listbox.Options className="absolute w-full py-2 mt-1 overflow-auto bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none">
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
                                    className={`block truncate py-0.5 ${
                                    selected ? 'font-medium' : 'font-normal'
                                    }`}
                                >
                                    {person.sem}
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