import { AnimatePresence, motion } from 'framer-motion';
import { Dialog, Transition} from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';

/* Components */
import AddRowSave from 'frontend/components/buttons/AddRowSave';

/* CSS */
import 'tailwindcss/tailwind.css';


// Parent component >> AddRowBtn.jsx

// For disabling up-down arrows in input number textfield
const inputs = 
    `input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    input[type=number] {
        -moz-appearance: textfield;
    }`;

/* Function for the "Add Row" feature in the Student View Record page */
/* Shows the modal window after clicking the AddRowBtn */
    /* 
    Props:
        modalState              ---     state of the add row modal
        handleSave              ---     closes add row modal and opens justification modal 
        handleClose             ---     closes add row modal and resets the input fields
        courseNameState         ---     holds the current value of courseName input field
        courseNameHandler       ---     function that sets the value of courseName input field
        unitsState              ---     holds the current value of units input field
        unitsHandler            ---     function that sets the value of units input field
        gradeState              ---     holds the current value of grade input field
        gradeHandler            ---     function that sets the value of grade input field
    */
const AddRow = ({modalState, handleSave, handleClose,  courseNameState, courseNameHandler, unitsState, unitsHandler, gradeState, gradeHandler}) => {

    // Styling
    const addRowModal = `relative bg-secondary-red h-[36.70360110803324vh] w-[49.479166666666664vw] rounded-[3.2552083333333335vw] px-[3.2552083333333335vw] font-normal font-montserrat m-auto overflow-hidden py-0 fixed inset-0 z-50`;
    const baybayinStyle = `bg-baybayin bg-repeat-y bg-contain mt-0 relative top-0 ml-[-11.25vh] h-[36.70360110803324vh]`;
    const modalBody = `absolute inset-x-0 bg-secondary-red top-[10%] bottom-[10%]`;
    const modalClose = `text-[4.847645429362881vh] text-white float-right`;
    const modalTitle = `text-white text-center font-bold italic text-[1.3020833333333333vw] mt-[4.1551246537396125vh] mb-[4.847645429362881vh]`;
    const modalInputs = `text-[1.1067708333333333vw] flex items-center justify-center`;
    const inputContainer = `ml-5 mr-[0.9765625vw]`;
    const inputStyle = `text-center w-full h-[4.847645429362881vh] rounded-[0.6510416666666666vw]`
    const sectionCoursename = `inline-block w-[11.71875vw]`;
    const sectionUnits = `inline-block w-[3.90625vw]`;
    const sectionGrade = `inline-block w-[4.8828125vw]`;
    const modalFooter = `absolute right-0 bottom-0 mt-[4.847645429362881vh] text-[1.1067708333333333vw] flex items-end justify-end`;
    const modalBtnSave = `h-[5.54016620498615vh] w-[9.765625vw] py-[0.6510416666666666vw] px-[1.770083102493075vh] rounded-[0.6510416666666666vw] mr-[0.6510416666666666vw] bg-save hover:bg-save-hover text-center text-white`;
    const modalBtnDiscard = `h-[5.54016620498615vh] w-[9.765625vw] py-[0.6510416666666666vw] px-[1.770083102493075vh] rounded-[0.6510416666666666vw] mr-[0.6510416666666666vw] bg-discard hover:bg-white text-center`;

    // Change courseName handler
    const handleCourseChange = (event) => {
        courseNameHandler(event.target.value);
    }

    // Change units handler
    const handleUnitsChange = (event) => {
        unitsHandler(event.target.value);
    }

    // Change grade handler
    const handleGradeChange = (event) => {
        gradeHandler(event.target.value);
    }

    return (
        <>
            {/* Wrapping everything with transition component to use transition effects from @headlessui/react */}
            <Transition appear show={modalState} as={Fragment}>

                {/* Wrapping everything with dialog component */}
                <Dialog as="div" className="relative z-50" onClose={handleClose}>

                    <style>{inputs}</style>

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
                            {/* Add Row modal window */}
                            <Dialog.Panel className={addRowModal}>
                                <div className='relative'>
                                    <div className={baybayinStyle}></div>
                                    <div className={modalBody}>

                                        {/* title */}
                                        <div className={modalClose}>
                                            <button onClick={handleClose}>
                                                <span>&times;</span>
                                            </button>
                                        </div>

                                        <div className={modalTitle}>Please fill in the fields below to insert a new row</div>

                                        {/* input form */}
                                        <form className={modalInputs}>

                                            {/* course name */}
                                            <div className={inputContainer}>
                                                <section className={sectionCoursename}>
                                                    <input 
                                                        className={inputStyle}
                                                        type="text"
                                                        name="courseName"
                                                        placeholder='Enter course name'
                                                        onChange={handleCourseChange}
                                                    />
                                                    <div className='w-full text-white text-center'>Course Name</div>
                                                </section>
                                            </div>

                                            {/* units */}
                                            <div className={inputContainer}>
                                                <section className={sectionUnits}>
                                                    <input 
                                                        className={inputStyle}
                                                        type="number"
                                                        name="units"
                                                        placeholder='0'
                                                        onChange={handleUnitsChange}
                                                    />
                                                    <div className='w-full text-white text-center'>Units</div>
                                                </section>
                                            </div>

                                            {/* grade */}
                                            <div className={inputContainer}>
                                                <section className={sectionGrade}>
                                                    <input 
                                                        className={inputStyle}
                                                        type="number"
                                                        name="grade"
                                                        placeholder='0'
                                                        onChange={handleGradeChange}
                                                    />
                                                    <div className='w-full text-white text-center'>Grade</div>
                                                </section>
                                            </div>
                                        </form>

                                        {/* save and discard buttons */}
                                        <div className={modalFooter}>                                        
                                            <button className={modalBtnDiscard} onClick={handleClose}>Discard</button>
                                            <AddRowSave handleSave={handleSave}/>
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


export default AddRow;