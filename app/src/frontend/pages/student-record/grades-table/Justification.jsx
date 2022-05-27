import { Fragment, useState, useEffect } from 'react';
import { useForm, isRequired } from '../../../hooks/useForm';
import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/solid';
import Input from 'frontend/components/inputs/Input';
import Swal from 'sweetalert2';


/* Parent components:
    ActionsJustification   >> frontend/components/buttons/ActionsJustification    
    ActionsSaveCancel      >> frontend/components/buttons/ActionsSaveCancel
    AddRowBtn              >> frontend/components/buttons/AddRowBtn
    StudentDetailEditModal >> frontend/pages/student-record/StudentDetailEditModal
*/

/* This function contains the component that creates a modal window for justification.
   Referenced from: https://headlessui.dev/react/dialog */
/* Props:
    modalState          ---  boolean; holds state of the modal from the parent component
    modalHandler        ---  function that will set modalState to false
    parentSubmitHandler ---  function that handles the "form submission" of the parent component
    historyHandler      ---  handles the "submission" of the history and recording of changes
    histTitle           ---  holds title of history
*/
const Justification = ({ modalState, modalHandler, parentSubmitHandler, handleHistory, histTitle }) => {

    // Get username of user and student number of student record where the action has taken place
    const [userName, setUserName] = useState(localStorage.getItem("Username"));
    const [currStudentID, setStudentID] = useState(localStorage.getItem('currStudentID'));

    const initialState = {
        title: '',
        desc: '',
        user: userName,
    }
    const validations = [
        ({desc}) => isRequired(desc) || {desc: 'Please give a justification for editing the grades'}
    ]

    const {values, isValid, errors, touched, changeHandler, submitHandler, resetValues} = useForm(initialState, validations, handleHistory);

    // Function that will clear text area when exiting modal
    const resetModalValues = () => {
        resetValues()
        modalHandler()
    }

    // Function that will save changes
    const saveChanges = (e) => {
        e.preventDefault()          // prevents refreshing of page
        parentSubmitHandler(e)      // submit contents of the form
        submitHandler(e)            // update history log

        // updates history in db with title and description
        const historyCredentials = {
            User: userName,
            Student: currStudentID,
            Date: new Date().toLocaleDateString(),
            Time: new Date().toLocaleTimeString('en-US', { 
                hour12: false, 
                hour: "numeric", 
                minute: "numeric"
            }),
            Description: histTitle,
            Details: values.desc
        };

        fetch(`http://localhost:3001/history/add`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Username")} ${localStorage.getItem("Password")}`},
            body: JSON.stringify(historyCredentials),
        })
        .then((response) => response.json())
        .then((body) => {
            //console.log(body);
            if(body.err){ //if error response returned from DB
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: body.err,
                })
            }
            else { //success state
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Successfully Edited!',
                })
            }    
        })
        .catch(err => { //will activate if DB is not reachable or timed out or there are other errors
            Swal.fire({
                icon: 'error',
                title: 'Server Error',
                text: 'Check if the server is running or if database IP is correct',
            })
            console.log(err)
        })
    }

    return (
        <>
            {/* Wrapping everything with transition component to use transition effects from @headlessui/react */}
            <Transition appear show={modalState} as={Fragment}>
                <Dialog as="div" className="relative z-30" openModal={modalState} onClose={resetModalValues}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        {/* Container for the layer behind the modal window */}
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    {/* Container for the layer containing the modal window */}
                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            
                            {/* Transition effect for the element inside this Transition.Child tag*/}
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >   
                                {/* Justification modal window */}
                                <Dialog.Panel className="w-full max-w-md h-[30vh] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    
                                    {/* Window Title */}
                                    <Dialog.Title
                                        as="h3"
                                        className="font-montserrat ml-3 mt-2 text-2xl font-black leading-6 text-gray-900 flex"
                                    >
                                        <span className="self-start">Justification</span>
                                        {/* Close button */}
                                        <XIcon
                                            className="cursor-pointer ml-auto mr-0 transition-all ease-out delay-200 hover:text-gray-500 hover:transition-all hover:ease-in hover:delay-200 h-5 w-5"
                                            onClick={resetModalValues}
                                        />
                                    </Dialog.Title>

                                    {/* Window Body */}
                                    <div className="mt-2 grid h-[85%]">
                                        <textarea
                                            className="inter mx-auto text-sm px-3 py-1 w-full h-full block resize-none focus:outline-none"
                                            name="desc"
                                            placeholder="Enter description here."
                                            value={values.desc}
                                            onChange={changeHandler}
                                            
                                        />

                                        {/* Save Button */}
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


export default Justification;