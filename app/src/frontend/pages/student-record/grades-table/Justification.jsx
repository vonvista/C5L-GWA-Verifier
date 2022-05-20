import { Dialog, Transition} from '@headlessui/react';
import { Fragment, useState, useEffect } from 'react';
import { useForm, isRequired } from '../../../hooks/useForm';
import Input from 'frontend/components/inputs/Input';

// component that creates a modal window for justification from: https://headlessui.dev/react/dialog

const Justification = ({ modalState, modalHandler, parentSubmitHandler, handleHistory }) => {
    /* how to use
    
        parent will provide modalState and modalHandler
        modalState is 'true' or 'false'
        modalHandler is a function that will set modalState to false

        parentSubmitHandler takes in a function that deals with submitting the values from the edited row
        handleHistory is for giving the justification to the history and recording the changes
    
    */

    const initialState = {
        title: '',
        desc: '',
    }
    const validations = [
        ({title}) => isRequired(title) || {title: 'Please provide a title'},
        ({desc}) => isRequired(desc) || {desc: 'Please give a justification for editing the grades'}
    ]

    const {values, isValid, errors, touched, changeHandler, submitHandler, resetValues} = useForm(initialState, validations, handleHistory);

    const resetModalValues = () => {
        // function that will clear text area when exiting modal
        resetValues()
        modalHandler()
    }

    const saveChanges = (e) => {
        // function that'll save changes
        // -- insert function for handling changes to history here --
        e.preventDefault()  // prevents refreshing of page
        submitHandler(e) // update history log
        parentSubmitHandler(e)    // submit contents of the form

        const historyCredentials = { //updates history in db with title(?) and description
            User: localStorage.getItem("Username"),
            Student: localStorage.getItem('currStudentID'),
            // Date: currentDate,
            // Time: currentTime,
            Date: new Date().toLocaleDateString(),
            Time: new Date().toLocaleTimeString('en-US', { 
                hour12: false, 
                hour: "numeric", 
                minute: "numeric"
            }),
            Description: values.title,
            Details: values.desc
        };

        fetch(`http://localhost:3001/history/add`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(historyCredentials),
        })
        .then((response) => response.json())
        .then((body) => {
            console.log(body);
        })
    }

    return (
        <>
            <Transition appear show={modalState} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={resetModalValues}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md h-[30vh] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="font-montserrat ml-3 mt-2 text-2xl font-black leading-6 text-gray-900 flex"
                                    >
                                        <span className="self-start">Justification</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="ml-auto mr-0 transition-all ease-out delay-200 hover:text-gray-500 hover:transition-all hover:ease-in hover:delay-200 h-5 w-5" viewBox="0 0 20 20" fill="currentColor" onClick={resetModalValues}>
                                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </Dialog.Title>

                                    <div className="mt-2 grid h-[85%]">
                                        <input
                                            className="inter font-bold text-md mx-auto px-3 py-1 w-full block resize-none focus:outline-none"
                                            name="title"
                                            placeholder="Enter title here."
                                            value={values.title}
                                            onChange={changeHandler}
                                        />
                                        <textarea
                                            className="inter mx-auto text-sm px-3 py-1 w-full h-full block resize-none focus:outline-none"
                                            name="desc"
                                            placeholder="Enter description here."
                                            value={values.desc}
                                            onChange={changeHandler}
                                            
                                        />
                                        <button
                                            type="submit"
                                            className="inter mt-4 w-[20%] self-end inline-flex justify-center rounded-md border border-transparent bg-button-green px-4 py-2 text-sm font-medium text-white transition-all ease-out delay-200 hover:transition-all hover:ease-in hover:delay-200 hover:bg-button-green-hover disabled:bg-sr-disabled-green disabled:hover:bg-sr-disabled-green"
                                            onClick={saveChanges}
                                            disabled={!isValid}
                                        >
                                            Save
                                        </button>
                                    </div>

                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

export default Justification