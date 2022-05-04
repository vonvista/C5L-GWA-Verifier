import { Dialog, Transition} from '@headlessui/react';
import { Fragment, useState, useEffect } from 'react';
import Input from './inputs/Input';

// component from: https://headlessui.dev/react/dialog

const Justification = ({ modalState, modalHandler, submitHandler, historyHandler }) => {
        
    // state+handler for text area
    const [textArea, textAreaHandler] = useState('')
    const [isDisabled, setIsDisabled] = useState(true)

    useEffect(() => { 
        // check if justification has any text data
        // user should not be able to save grade unless they have inputted a justification
        textArea.length != 0
        ? setIsDisabled(false)
        : setIsDisabled(true)
    })

    const handleTextArea = (e) => {
        textAreaHandler(e.target.value)
    }

    const resetModalValues = () => {
        // function that will clear text area when exiting modal
        textAreaHandler('')
        modalHandler()
    }

    const saveChanges = (e) => {
        // function that'll save changes
        // -- insert function for handling changes to history here --
        e.preventDefault()  // prevents refreshing of page
        submitHandler(e)    // submit contents of the form
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
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="font-montserrat ml-3 mt-2 text-2xl font-black leading-6 text-gray-900 flex"
                                    >
                                        <span className="self-start">Justification</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="ml-auto mr-0 transition-all ease-out delay-200 hover:text-gray-500 hover:transition-all hover:ease-in hover:delay-200 h-5 w-5" viewBox="0 0 20 20" fill="currentColor" onClick={resetModalValues}>
                                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </Dialog.Title>

                                    <div className="mt-3 h-[15vh]">
                                        <textarea
                                            className="inter mx-auto p-3 w-full h-full block resize-none focus:outline-none"
                                            placeholder='Enter justification here...'
                                            value={textArea}
                                            onChange={handleTextArea}
                                        />
                                    </div>

                                    <div className="mt-4">
                                        <button
                                            type="submit"
                                            className="inter inline-flex justify-center rounded-md border border-transparent bg-login-green px-4 py-2 text-sm font-medium text-white transition-all ease-out delay-200 hover:transition-all hover:ease-in hover:delay-200 hover:bg-login-green-hover disabled:bg-sr-disabled-green disabled:hover:bg-sr-disabled-green"
                                            onClick={saveChanges}
                                            disabled={isDisabled}
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