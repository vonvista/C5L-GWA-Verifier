import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition} from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import 'tailwindcss/tailwind.css';


/* Parent component >> frontend/components/buttons/AddRowBtn.jsx */

/* Function for the "Add Row" feature in the Student View Record page */
/* Shows the modal window after clicking the AddRowBtn */
/* 
   Props:
    modalState          ---     holds the state of the add row modal
    handleSave          ---     function used to close the add row modal and open the justification modal 
    handleClose         ---     function used to close add row modal and reset the input fields
    courseNameState     ---     holds the current value of courseName input field
    courseNameHandler   ---     function that sets the value of courseName input field
    unitsState          ---     holds the current value of units input field
    unitsHandler        ---     function that sets the value of units input field
    gradeState          ---     holds the current value of grade input field
    gradeHandler        ---     function that sets the value of grade input field
    histTitleHandler    ---     holds the main description for logging history about the changes made
    semState            ---     receives the sem and year that indicates which table should the new row be added in
*/
const AddRow = ({modalState, handleSave, handleClose,  courseNameState, courseNameHandler, unitsState, unitsHandler, gradeState, gradeHandler, histTitleHandler, semState}) => {

    // Styling
    const addRowModal = `relative bg-secondary-red h-[37vh] w-[45vw] rounded-[3.25vw] px-[3.25vw] font-normal font-montserrat m-auto overflow-hidden py-0 fixed inset-0 z-50`;
    const baybayinStyle = `bg-baybayin bg-repeat-y bg-contain mt-0 relative top-0 ml-[-11.25vh] h-[37vh]`;
    const modalBody = `absolute inset-x-0 bg-secondary-red top-[8%] bottom-[10%]`;
    const modalClose = `text-[4.85vh] text-white float-right`;
    const modalTitle = `text-white text-center font-bold italic text-[1.30vw] mt-[4.15vh] mb-[4.85vh]`;
    const modalInputs = `text-[1vw] flex items-center justify-center`;
    const inputContainer = `ml-5 mr-[1.15vw]`;
    const inputStyle = `text-center w-full h-[4.85vh] rounded-xl`
    const sectionCoursename = `inline-block w-[11.71875vw]`;
    const sectionUnits = `inline-block w-[3.9vw]`;
    const sectionGrade = `inline-block w-[4.8vw]`;
    const modalFooter = `absolute font-poppins right-0 bottom-0 mt-[4.85vh] text-[1vw] flex items-end justify-end gap-x-[1vw]`;
    const modalBtnSave = `h-[4.75vh] w-[8.8vw] rounded-xl  text-center text-white disabled:bg-sr-disabled-green disabled:hover:bg-sr-disabled-green
                        bg-button-green hover:bg-button-green-hover transition ease-out hover:transition hover:ease-in hover:shadow-lg
                        duration-300 hover:duration-300`;
    const modalBtnDiscard = `h-[4.75vh] w-[8.8vw] rounded-xl mr-[0.65vw] bg-discard hover:bg-white text-center transition ease-out hover:transition hover:ease-in hover:shadow-lg`;

    // Change courseName handler
    const handleCourseChange = (event) => {
        courseNameHandler(event.target.value.toUpperCase());
    }

    // Change units handler
    const handleUnitsChange = (event) => {
        unitsHandler(event.target.value);
    }

    // Change grade handler
    const handleGradeChange = (event) => {
        gradeHandler(event.target.value.toUpperCase());
    }

    // Used for disabling up-down arrows in input number textfield
    const inputs = 
        `input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }

        input[type=number] {
            -moz-appearance: textfield;
        }`;
        
    return (
        <>
            {/* Wrapping everything with transition component to use transition effects from @headlessui/react */}
            <Transition appear show={modalState} as={Fragment}>

                {/* Wrapping everything with dialog component */}
                <Dialog as="div" className="relative z-50" open={modalState} onClose={handleClose}>

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
                                        
                                        {/* Close button */}
                                        <div className={modalClose}>
                                            <XIcon
                                                className="w-[1.5vw] cursor-pointer transition-all ease-out duration-200 hover:text-gray-400 hover:transition-all hover:ease-in hover:duration-200"
                                                onClick={handleClose}
                                            />
                                        </div>

                                        {/* Window text */}
                                        <div className={modalTitle}>Please fill in the fields below to insert a new row</div>

                                        {/* Input form */}
                                        <form className={modalInputs}>

                                            {/* Course Name */}
                                            <div className={inputContainer}>
                                                <section className={sectionCoursename}>
                                                    <input 
                                                        className={inputStyle}
                                                        type="text"
                                                        name="courseName"
                                                        placeholder='Enter course name'
                                                        value={courseNameState.toUpperCase()}
                                                        onChange={handleCourseChange}
                                                    />
                                                    <div className='w-full text-white text-center'>Course Name</div>
                                                </section>
                                            </div>

                                            {/* Grade */}
                                            <div className={inputContainer}>
                                                <section className={sectionGrade}>
                                                    <input 
                                                        className={inputStyle}
                                                        type="text"
                                                        maxLength={4}
                                                        name="grade"
                                                        placeholder='0'
                                                        value={gradeState.toUpperCase()}
                                                        onChange={handleGradeChange}
                                                    />
                                                    <div className='w-full text-white text-center'>Grade</div>
                                                </section>
                                            </div>

                                            {/* Units */}
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
                                        </form>

                                        {/* Save and Cancel buttons */}
                                        <div className={modalFooter}>
                                            <button 
                                                onClick={() => {
                                                    handleSave();
                                                    histTitleHandler(`Created student grade row with Course: ${courseNameState}, Grade: ${gradeState}, and Units: ${unitsState} on Semester: ${semState}`);
                                                }}
                                                className={modalBtnSave} 
                                                type="button"
                                                disabled={ !(courseNameState && unitsState && gradeState) }
                                            >Save
                                            </button>
                                            <button className={modalBtnDiscard} onClick={handleClose}>Cancel</button>
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