import { Fragment, useState, useEffect } from 'react';
import { useForm, isRequired } from '../../../hooks/useForm';
import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/solid';
import Input from 'frontend/components/inputs/Input';
import Swal from 'sweetalert2';
import { read } from 'node:fs';


/* Parent components:
    ActionsJustification   >> frontend/components/buttons/ActionsJustification    
    ActionsSaveCancel      >> frontend/components/buttons/ActionsSaveCancel
    AddRowBtn              >> frontend/components/buttons/AddRowBtn
    Dropdown               >> frontend/components/buttons/Dropdown
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
    const [image, setImage] = useState();
    const [imgName, setImgName] = useState("Max file size is 16MB");
    const [ip, setIP] = useState(localStorage.getItem('ServerIP'));

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
        setImgName("Max file size is 16MB") // clear img name upon close
    }

    // Function that will save changes
    const saveChanges = (e) => {
        e.preventDefault()          // prevents refreshing of page
        parentSubmitHandler(e)      // submit contents of the form
        // submitHandler(e)            // update history log  <-moved to success to get id as well
        console.log(image)
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
            Details: values.desc,
            Image: image
        };

        fetch(`http://${ip}:3001/history/add`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Username")} ${localStorage.getItem("Password")}`},
            body: JSON.stringify(historyCredentials),
        })
        .then((response) => response.json())
        .then((body) => {
            //console.log(body);
            values._id = body._id;
            submitHandler(e)            // update history log 

        })
        .catch(err => { //will activate if DB is not reachable or timed out or there are other errors
            Swal.fire({
                icon: 'error',
                title: 'Server Error',
                text: 'Check if the server is running or if database IP is correct',
            })
            console.log(err)
        })
        resetModalValues();
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
                    <div className="fixed inset-0 overflow-y-auto flex min-h-full items-center justify-center p-4 text-center">
                            
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
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white py-6 px-7 text-left align-middle shadow-xl transition-all">
                                
                                {/* Window Title */}
                                <Dialog.Title
                                    as="h3"
                                    className="font-montserrat mt-[0.5vh] mb-2 text-2xl font-black leading-6 text-gray-900 flex"
                                >
                                    <span className="self-start">Justification</span>
                                    {/* Close button */}
                                    <XIcon
                                        className="w-5 cursor-pointer ml-auto mr-0 transition-all ease-out delay-200 hover:text-gray-500 hover:transition-all hover:ease-in hover:delay-200"
                                        onClick={resetModalValues}
                                    />
                                </Dialog.Title>

                                {/* Window Body */}
                                <textarea
                                    className="font-inter mt-4 mb-3 mx-auto text-sm md:text-md lg:text-lg w-full h-[13vh] block resize-none focus:outline-none"
                                    name="desc"
                                    placeholder="Enter description here."
                                    value={values.desc}
                                    onChange={changeHandler}
                                    
                                />

                                {/* Submit image with file dialog */}
                                <label 
                                    forHtml="fileInput"
                                    className="cursor-pointer w-full focus:outline-none"
                                
                                >
                                    <div className="flex w-full block gap-1">
                                        <span className="flex-none font-poppins text-sm font-medium py-1 px-2 block bg-sr-dark-gray rounded-lg text-sm text-gray-700 hover:bg-yellow-100 hover:text-secondary-red transition ease-in-out duration-300 hover:transition hover:ease-in hover:duration-300">
                                            Upload Image
                                        </span>

                                        <span // section that displays file name
                                            id="selectedFileName"
                                            className="font-inter inline truncate text-xs self-center"
                                        >
                                            {imgName}
                                        </span>
                                    </div>
                                    <input
                                        className="hidden"
                                        type="file"
                                        //only accept image files
                                        id="fileInput"
                                        name="fileInput"
                                        accept="image/png, image/jpeg, image/jpg"
                                        onChange={
                                            (e) => {
                                                console.log(e.target.files[0])
                                                
                                                var reader = new FileReader();

                                                // check if parameter is of type Blob
                                                if (!(e.target.files[0] instanceof Blob)){
                                                    return;
                                                }
                                                var result = reader.readAsDataURL(e.target.files[0])
                                                //check file size if greater than 2MB
                                                if(e.target.files[0].size > 16000000){

                                                // if(e.target.files[0].size > 16777216) {
                                                    Swal.fire({
                                                        icon: 'error',
                                                        title: 'File too large',
                                                        text: 'File size must be less than 16MB',
                                                    })
                                                    //clear file input
                                                    document.getElementById("fileInput").value = "";
                                                    return;
                                                }

                                                reader.onload = function(e) {
                                                    // get loaded data and render thumbnail.
                                                    setImage(e.target.result)
                                                }

                                                e.target.files[0] ? setImgName(e.target.files[0].name) : null // set img name to appear

                                            }
                                        }
                                    />

                                </label>

                                {/* Save Button */}
                                <button
                                    type="submit"
                                    className="rounded-lg mt-3 w-1/5 inline-flex justify-center border border-transparent bg-button-green px-3 py-1.5 text-sm lg:text-base font-poppins font-medium text-white
                                        transition-all ease-out delay-200 hover:transition-all hover:ease-in hover:bg-button-green-hover disabled:bg-sr-disabled-green disabled:hover:bg-sr-disabled-green"
                                    onClick={saveChanges}
                                    disabled={!isValid}
                                >
                                    Save
                                </button>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}


export default Justification;