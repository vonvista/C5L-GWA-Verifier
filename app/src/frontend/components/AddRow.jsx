import { useEffect, useState } from 'react';
import {AnimatePresence, motion} from 'framer-motion';

/* Components */
import Add from './buttons/AddRowBtn.jsx';

/* CSS */
import 'tailwindcss/tailwind.css';
import './AddRow.css';

/* Function for the "Add Row" feature in the Student View Record page */
/* Initially shows an "Add" button and prompts the modal window after clicking it */
const AddRow = () => {
    const [openModal, setOpenModal] = useState(false);
    const [courseName, setCourseName] = useState('');
    const [units, setUnits] = useState('');
    const [grade, setGrade] = useState('');
    const [enrolled, setEnrolled] = useState('');
    const [runningGWA, setRunningGWA] = useState('');
    
    return (
        <>
            <Add handleClick={setOpenModal}/>
            { openModal && (
                <AnimatePresence>
                    {/* Modal animations */}
                    <motion.div 
                        initial={{
                            opacity: 0
                        }}
                        animate={{
                            opacity: 1,
                            transition: {
                                duration: 0.2
                            }
                        }}
                        exit={{
                            opacity: 0,
                            transition: {
                                duration: 0.2
                            }
                        }}
                        className='add-row-modal-backdrop'>
                        <motion.div 
                            initial={{
                                scale: 0
                            }}
                            animate={{
                                scale: 1,
                                transition: {
                                    duration: 0.2
                                }
                            }}
                            exit={{
                                scale: 0,
                                transition: {
                                    duration: 0.2
                                }
                            }}

                            className='add-row-modal'>
                            <motion.div className="add-row-modal-content">
                            {/* Baybayin Background Image */}
                            <motion.div className="bg-baybayin add-row-baybayin-style"></motion.div>

                            {/* content */}
                                <motion.div className='add-row-modal-body'>
                                    {/* title */}
                                    <motion.div className='add-row-modal-close text-white float-right'>
                                        <button onClick={() => {setOpenModal(false)}}>
                                            <span>&times;</span>
                                        </button>
                                    </motion.div>
                                    <motion.div className='add-row-modal-title text-white text-center'>Please fill in the fields below to insert a new row</motion.div>

                                    {/* input form */}
                                    <form className='add-row-modal-inputs flex'>
                                        {/* course name */}
                                        <motion.div className='add-row-input-container'>
                                            <section className='inline-block add-row-section-coursename'>
                                                <input 
                                                    className='add-row-input-style'
                                                    type="text"
                                                    name="courseName"
                                                    placeholder='Enter course name'
                                                    onChange={(e) => setCourseName(e.target.value)}
                                                />
                                                <motion.div className='w-full text-white text-center'>Course Name</motion.div>
                                            </section>
                                        </motion.div>

                                        {/* units */}
                                        <motion.div className='add-row-input-container'>
                                            <section className='inline-block add-row-section-units'>
                                                <input 
                                                    className='add-row-input-style'
                                                    type="text"
                                                    name="units"
                                                    placeholder='0'
                                                    onChange={(e) => setUnits(e.target.value)}
                                                />
                                                <motion.div className='w-full text-white text-center'>Units</motion.div>
                                            </section>
                                        </motion.div>

                                        {/* grade */}
                                        <motion.div className='add-row-input-container'>
                                            <section className='inline-block add-row-section-grade'>
                                                <input 
                                                    className='add-row-input-style'
                                                    type="text"
                                                    name="grade"
                                                    placeholder='0'
                                                    onChange={(e) => setGrade(e.target.value)}
                                                />
                                                <motion.div className='w-full text-white text-center'>Grade</motion.div>
                                            </section>
                                        </motion.div>

                                        {/* enrolled */}
                                        <motion.div className='add-row-input-container'>
                                            <section className='inline-block add-row-section-enrolled'>
                                                <input 
                                                    className='add-row-input-style'
                                                    type="text"
                                                    name="enrolled"
                                                    placeholder='0'
                                                    onChange={(e) => setEnrolled(e.target.value)}
                                                />
                                                <motion.div className='w-full text-white text-center'>Enrolled</motion.div>
                                            </section>
                                        </motion.div>

                                        {/* running gwa */}
                                        <motion.div className='add-row-input-container'>
                                            <section className='inline-block add-row-section-runningGWA'>
                                                <input 
                                                    className='add-row-input-style'
                                                    type="text"
                                                    name="runningGWA"
                                                    placeholder='0'
                                                    onChange={(e) => setRunningGWA(e.target.value)}
                                                />
                                                <motion.div className='w-full text-white text-center'>Running GWA</motion.div>
                                            </section>
                                        </motion.div>
                                    </form>
                                    {/* save and discard buttons */}
                                    <motion.div className='add-row-modal-footer'>
                                        <button className='add-row-modal-btn add-row-btn-discard text-center' onClick={() => {setOpenModal(false)}}>Discard</button>
                                        <button className='add-row-modal-btn add-row-btn-save text-white'>Save changes</button>
                                    </motion.div>
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </AnimatePresence>
            )}
        </>
    )
}


export default AddRow;