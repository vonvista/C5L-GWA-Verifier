import { AnimatePresence, motion } from 'framer-motion';
import { Dialog, Transition} from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import Justification from './grades-table/Justification';
import 'tailwindcss/tailwind.css';
import EditBtn from 'frontend/components/buttons/EditStudentBtn.jsx';
import 'tailwindcss/tailwind.css';

/* Parent component >> frontend/components/buttons/EditStudentBtn.jsx */
/* Function for the "Edit Student" feature in the Student View Record page's Dropdown Menu */
/* Initially shows an "Edit" button on the dropdown menu and prompts the modal window after clicking it */
/* 
   Props:
    modalState          ---     holds the state of the edit student modal
    handleClose         ---     function used to close edit student modal and reset the input fields
    handleSave          ---     handles changes after saving on edit student modal
    studNum             ---     holds the value of student number field
    studFName           ---     holds the value of student first name field
    studMName           ---     holds the value of student middle name field
    studLName           ---     holds the value of student last name field
    degree              ---     holds the value of student degree field
    setStudNum          ---     change handler for studNum state
    setStudFName        ---     change handler for studFName state
    setStudMName        ---     change handler for studMName state
    setStudLName        ---     change handler for studLName state
    setDegree           ---     change handler for degree state
    studNumUnedited     ---     holds the value of the unedited student number field for save button access
    studFNameUnedited   ---     holds the value of the unedited student first name field for save button access
    studMNameUnedited   ---     holds the value of the unedited student middle name field for save button access
    studLNameUnedited   ---     holds the value of the unedited student last name field for save button access
    degreeUnedited      ---     holds the value of the unedited student degree field for save button access
    setStudNumUnedited  ---     change handler for studNumUnedited state
    setStudFNameUnedited---     change handler for studFNameUnedited state
    setStudMNameUnedited---     change handler for studMNameUnedited state
    setStudLNameUnedited---     change handler for studLNameUnedited state
    setDegreeUnedited   ---     change handler for degreeUnedited state
    setJustModal        ---     change handler for opening/closing justification modal
*/
const EditStudent = ({ modalState, handleClose, handleSave, setcurrStudentID,studNum, studFName, studMName, studLName, degree, setStudNum, setStudFName, setStudMName, setStudLName, setDegree, studNumUnedited, studFNameUnedited, studMNameUnedited, studLNameUnedited, degreeUnedited, setStudNumUnedited, setStudFNameUnedited, setStudMNameUnedited, setStudLNameUnedited, setDegreeUnedited, setJustModal, setTitle }) => {
    
    /*-------------------- Styling --------------------*/
    const editStudentModal = `relative bg-secondary-red h-[47vh] w-[50vw] rounded-[3.25vw] px-[3.25vw] font-normal font-montserrat m-auto overflow-hidden py-0 fixed inset-0 z-50`;
    const baybayinStyle = `bg-baybayin bg-repeat-y bg-contain mt-0 relative top-0 ml-[-11.25vh] h-[37vh]`;
    const modalBody = `absolute inset-x-0 bg-secondary-red top-[8%] bottom-[10%]`;
    const modalClose = `text-[4.85vh] text-white float-right`;
    const modalTitle = `text-white text-center font-bold italic text-[1.30vw] mt-[4.15vh] mb-[4.85vh]`;
    const modalInputs = `text-[1.10vw] flex flex-col space-y-4 items-center justify-center`;
    const inputContainer = `ml-5 mr-[1.15vw]`;
    const inputStyle = `text-center w-full h-[4.85vh] rounded-xl`
    const sectionInputField = `inline-block w-[11.71875vw]`;
    const sectionFLName = `inline-block w-[16.71875vw] truncate`;
    const sectionMI = `inline-block w-[6.71875vw]`;
    const modalFooter = `mt-[4.85vh] text-[1.11vw] flex items-center justify-center`;
    const modalBtnSave = `h-[5vh] w-[9.25vw] rounded-xl mr-[0.65vw] bg-button-green hover:bg-button-green-hover text-center text-white disabled:bg-sr-disabled-green disabled:hover:bg-sr-disabled-green`;

    // Save Button
    const SaveButton = () => {

        // check if there is atleast one change in all input fields
        if (studFName != studFNameUnedited || studMName != studMNameUnedited || studLName != studLNameUnedited || studNum != studNumUnedited || degree != degreeUnedited ){
          return <button 
          className={modalBtnSave} 
          onClick={() => {
                // update history title for edit
                setTitle(prevTitle => prevTitle + `Name: ${studLName}, ${studFName} ${studMName}., Student No.: ${studNum}, and Degree: ${degree}.`)
                // update current student number on localStorage
                localStorage.setItem('currStudentKey', studNum);
                handleSave()           // close edit student modal
                setJustModal(true);     // open justification
            }}>Save</button>
        } else {
          return <button className={modalBtnSave} disabled>Save</button>
        };
    };

    return (
        <>                           
            {/* Wrapping everything with transition component to use transition effects from @headlessui/react */}
            <Transition appear show={modalState} as={Fragment}>

                {/* Wrapping everything with dialog component */}
                <Dialog as="div" className="relative z-50" onClose={handleClose}>

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

                                            {/* Window title */}
                                            <div className={modalClose}>
                                                <button onClick={handleClose}>
                                                    <span>&times;</span>
                                                </button>
                                            </div>

                                            <div className={modalTitle}>Please fill in the fields below to edit student's details</div>
                                            <div className='flex flex-col justify-center'>
                                                {/* input form */}
                                                <form className={modalInputs}>
                                                        <div className='flex flex-row'> 
                                                            {/* Student Name */}
                                                            <div className={inputContainer}>
                                                                <section className={sectionFLName}>
                                                                    <input
                                                                        className={inputStyle}
                                                                        type="text"
                                                                        name="studFName"
                                                                        placeholder='First Name'
                                                                        value={studFName}
                                                                        onChange={(e) => setStudFName(e.target.value)}
                                                                    />

                                                                    <div className='w-full text-white text-center'>First Name</div>
                                                                </section>
                                                            </div>
                                                            <div className={inputContainer}>
                                                                <section className={sectionMI}>
                                                                    <input
                                                                        className={inputStyle}
                                                                        type="text"
                                                                        name="studMName"
                                                                        placeholder='M.I.'
                                                                        value={studMName}
                                                                        onChange={(e) => setStudMName(e.target.value)}
                                                                    />
                                                                    <div className='w-full text-white text-center text-sm'>Middle Initial</div>
                                                                </section>
                                                            </div>

                                                            {/* Last Name */}
                                                            <div className={inputContainer}>
                                                                <section className={sectionFLName}>
                                                                    <input
                                                                        className={inputStyle}
                                                                        type="text"
                                                                        name="studLName"
                                                                        placeholder='Surname'
                                                                        value={studLName}
                                                                        onChange={(e) => setStudLName(e.target.value)}
                                                                    />
                                                                    <div className='w-full text-white text-center'>Surname</div>
                                                                </section>
                                                            </div> 
                                                        </div>
                                                        <div className='flex flex-row'>

                                                            {/* Student Number */}
                                                            <div className={inputContainer}>
                                                                <section className={sectionInputField}>
                                                                    <input
                                                                        className={inputStyle}
                                                                        type="text"
                                                                        name="studNum"
                                                                        placeholder='20XX-XXXX'
                                                                        value={studNum}
                                                                        onChange={(e) => setStudNum(e.target.value)}
                                                                    />
                                                                    <div className='w-full text-white text-center'>Student Number</div>
                                                                </section>
                                                            </div>
                                                            {/* Degree Program */}
                                                            <div className={inputContainer}>
                                                                <section className={sectionInputField}>
                                                                    <input
                                                                        className={inputStyle}
                                                                        type="text"
                                                                        name="degree"
                                                                        placeholder='Degree Program'
                                                                        value={degree}
                                                                        onChange={(e) => setDegree(e.target.value)}
                                                                    />
                                                                    <div className='w-full text-white text-center'>Degree Program</div>
                                                                </section>
                                                            </div>
                                                        </div> 
                                                </form>

                                                {/* Save button */}
                                                <div className={modalFooter}>
                                                    <SaveButton />
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
