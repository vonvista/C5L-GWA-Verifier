import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition} from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import Input from 'frontend/components/inputs/Input';
import 'tailwindcss/tailwind.css';


/* Parent component >> frontend/components/buttons/Dropdown */

/* Function for the "Edit Student" feature in the Student View Record page's Dropdown Menu */
/* Initially shows an "Edit" button on the dropdown menu and prompts the modal window after clicking it */
/* 
   Props:
    modalState          ---     holds the state of the edit student modal
    handleClose         ---     function used to close edit student modal and reset the input fields
    setJustModal        ---     function used to set JustModal state in parent component
    editModalSave       ---     closes edit student detail modal and opens justification modal
    setTitle            ---     used for updating history title for student detail edit
    
    studentInfo         ---     values that will only updated when values in the row are saved
    values              ---     values that are being edited in real time
    isValid             ---     checks if given data is valid or not
    errors              ---     holds errors when invalid inputs are given
    touched             ---     holds object that tells whether an input has been touched
    changeHandler       ---     holds the changeHandler for the inputs
    submitHandler       ---     change handler for studFName state  
*/
const EditStudent = ({ modalState, handleClose, setJustModal, editModalSave, setTitle, studentInfo, values, isValid, errors, touched, changeHandler, submitHandler}) => {

    
    /*-------------------- Styling --------------------*/
    const editStudentModal = `relative bg-secondary-red h-[49vh] w-[50vw] rounded-[3.25vw] px-[3.25vw] font-normal font-montserrat m-auto overflow-hidden py-0 fixed inset-0 z-50`;
    const baybayinStyle = `bg-baybayin bg-repeat-y bg-contain -ml-[14.25vh] h-[49vh]`;
    const errorStyle= `block text-sm 5xl:text-[0.75vw] font-inter text-white`;
    const modalBody = `absolute inset-x-0 bg-secondary-red top-[8%] bottom-[10%]`;
    const modalClose = `text-[4.85vh] text-white float-right`;
    const modalTitle = `text-white text-center font-bold italic text-[1.30vw] mt-[4.15vh] mb-[4.85vh]`;
    const modalInputs = `text-[1vw] flex flex-col space-y-4 items-center justify-center`;
    const inputContainer = `ml-5 mr-[1.15vw]`;
    const inputStyle = `text-center w-full h-[4.85vh] rounded-xl`
    const sectionInputField = `inline-block w-[11.71875vw]`;
    const sectionFLName = `inline-block w-[15vw]`;
    const sectionMI = `inline-block w-[6.71875vw]`;
    const modalFooter = `font-poppins mt-[4.85vh] text-[1vw] flex justify-center gap-x-[1vw]`;
    const modalBtnSave = `h-[4.75vh] w-[8.8vw] rounded-xl bg-button-green hover:bg-button-green-hover text-center text-white disabled:bg-sr-disabled-green transition ease-out hover:transition hover:ease-in hover:shadow-lg`;
    const modalBtnCancel = `h-[4.75vh] w-[8.8vw] rounded-xl bg-discard hover:bg-white text-center transition ease-out hover:transition hover:ease-in hover:shadow-lg`;

    // Save Handler
    const handleSave = () => {
        // update history title for edit
        setTitle(prevTitle => prevTitle + `Name: ${values.studLName.toUpperCase()}, ${values.studFName.toUpperCase()} ${values.studMName.toUpperCase()}., Student No.: ${values.studNum}, and Degree: ${values.degree.toUpperCase()}.`)
        
        // update current student number on localStorage
        localStorage.setItem('currStudentKey', values.studNum);
        editModalSave();       // close edit student modal
        setJustModal(true);    // open justification
    };

    return (
        <>                           
            {/* Wrapping everything with transition component to use transition effects from @headlessui/react */}
            <Transition appear show={modalState} as={Fragment}>

                {/* Wrapping everything with dialog component */}
                <Dialog as="div" className="relative z-50" openModal={modalState} onClose={handleClose}>

                    {/* Transition effect for the element inside this Transition.Child tag*/}
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

                            {/* Edit Student Details modal window */}
                            <Dialog.Panel className={editStudentModal}>
                                <div className='relative'>
                                    <div className={baybayinStyle}></div>
                                    <div className={modalBody}>

                                        {/* Close button */}
                                        <div className={modalClose}>
                                            <XIcon
                                                className="w-[1.5vw] cursor-pointer transition-all ease-out hover:text-gray-400 hover:transition-all hover:ease-in"
                                                onClick={handleClose}
                                            />
                                        </div>
                                        
                                        {/* Window text */}
                                        <div className={modalTitle}>Please fill in the fields below to edit student's details</div>
                                        <div className='flex flex-col justify-center'>

                                            {/* Input form */}
                                            <form className={modalInputs}>

                                                {/* Student Name */}
                                                <div className='flex flex-row'> 

                                                    {/* First Name */}
                                                    <div className={inputContainer}>
                                                        <section className={sectionFLName}>
                                                            <Input
                                                                labelStyle="w-full text-white text-center"      // styling for label
                                                                labelVal="First Name"                           // label text
                                                                inputStyle={inputStyle}                         // styling for input
                                                                name="studFName"                                // name of label-input components
                                                                inputType="text"                                // type of input password, email, text, etc.
                                                                inputPlaceholder="First Name"                   // placeholder text for input
                                                                value={values.studFName.toUpperCase()}          // value of the input
                                                                changeHandler={changeHandler}                   // change handling
                                                            />
                                                            {touched.studFName && errors.studFName && 
                                                                <p className={`text-left ${errorStyle}`}>{errors.studFName}</p>    // error message
                                                            }
                                                        </section>
                                                    </div>

                                                    {/* Middle Initial */}
                                                    <div className={inputContainer}>
                                                        <section className={sectionMI}>
                                                            <Input
                                                                labelStyle="w-full text-white text-center"  // styling for label
                                                                labelVal="M.I."                             // label text
                                                                inputStyle={inputStyle}                     // styling for input
                                                                name="studMName"                            // name of label-input components
                                                                inputType="text"                            // type of input password, email, text, etc.
                                                                inputPlaceholder="-"                        // placeholder text for input
                                                                value={values.studMName.toUpperCase()}      // value of the input
                                                                changeHandler={changeHandler}               // change handling
                                                            />
                                                            {touched.studMName && errors.studMName && 
                                                                <p className={`text-left ${errorStyle}`}>{errors.studMName}</p>    // error message
                                                            }
                                                        </section>
                                                    </div>

                                                    {/* Last Name */}
                                                    <div className={inputContainer}>
                                                        <section className={sectionFLName}>
                                                            <Input
                                                                labelStyle="w-full text-white text-center"     // styling for label
                                                                labelVal="Last Name"                           // label text
                                                                inputStyle={inputStyle}                        // styling for input
                                                                name="studLName"                               // names of label-input components
                                                                inputType="text"                               // type of input password, email, text, etc.
                                                                inputPlaceholder="Last Name"                   // placeholder text for input
                                                                value={values.studLName.toUpperCase()}         // value of the input
                                                                changeHandler={changeHandler}                  // change handling
                                                            />
                                                            {touched.studLName && errors.studLName && 
                                                                <p className={`text-left ${errorStyle}`}>{errors.studLName}</p>    // error message
                                                            }
                                                        </section>
                                                    </div> 
                                                </div>

                                                <div className='flex flex-row'>

                                                    {/* Student Number */}
                                                    <div className={inputContainer}>
                                                        <section className={sectionInputField}>
                                                            <Input
                                                                labelStyle="w-full text-white text-center"          // styling for label
                                                                labelVal="Student Number"                           // label text
                                                                inputStyle={inputStyle}                             // styling for input
                                                                name="studNum"                                      // name of label-input components
                                                                inputType="text"                                    // type of input password, email, text, etc.
                                                                inputPlaceholder="XXXX-XXXXX"                       // placeholder text for input
                                                                value={values.studNum}                              // value of the input
                                                                changeHandler={changeHandler}                       // change handling
                                                            />
                                                            {touched.studNum && errors.studNum && 
                                                                <p className={`text-left ${errorStyle}`}>{errors.studNum}</p>    // error message
                                                            }
                                                        </section>
                                                    </div>

                                                    {/* Degree Program */}
                                                    <div className={inputContainer}>
                                                        <section className={sectionInputField}>
                                                            <Input
                                                                labelStyle="w-full text-white text-center"          // styling for label
                                                                labelVal="Degree Program"                           // label text
                                                                inputStyle={inputStyle}                             // styling for input
                                                                name="degree"                                       // name of label-input components
                                                                inputType="text"                                    // type of input password, email, text, etc.
                                                                inputPlaceholder="Degree Program"                   // placeholder text for input
                                                                value={values.degree}                               // value of the input
                                                                changeHandler={changeHandler}                       // change handling
                                                            />
                                                            {touched.degree && errors.degree && 
                                                                <p className={`text-left ${errorStyle}`}>{errors.degree}</p>    // error message
                                                            }
                                                        </section>
                                                    </div>
                                                </div> 
                                            </form>

                                            {/* Save button */}
                                            <div className={modalFooter}>
                                                <button className={modalBtnSave} onClick={handleSave}
                                                        disabled = { !(isValid && ( touched.studFName ||
                                                                                    touched.studMName ||
                                                                                    touched.studLName ||
                                                                                    touched.studNum ||
                                                                                    touched.degree ))}
                                                    >
                                                    Save
                                                </button>
                                                <button className={modalBtnCancel} onClick={handleClose}>
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}


export default EditStudent;
