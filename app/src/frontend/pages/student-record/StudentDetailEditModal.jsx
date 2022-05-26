import { AnimatePresence, motion } from 'framer-motion';
import { Dialog, Transition} from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
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
*/

const EditStudent = ({modalState, handleClose, studentInfo}) => {
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


    /*-------------------- State handlers --------------------*/
    const [openModal, setOpenModal] = useState(false);
    const [studNum, setStudNum] = useState('');
    const [studFName, setStudFName] = useState('');
    const [studMName, setStudMName] = useState('');
    const [studLName, setStudLName] = useState('');
    const [degree, setDegree] = useState('');
    const [currStudentID, setcurrStudentID] = useState(localStorage.getItem('currStudentID'));
    const [ip, setIp] = useState(localStorage.getItem('ServerIP'));
    const [userName, setUserName] = useState(localStorage.getItem("Username"));
        

    useEffect(() =>{
        setStudNum(studentInfo.stud_no)
        setDegree(studentInfo.degree_program)
        setStudFName(studentInfo.iname.fname)
        setStudMName(studentInfo.iname.mname)
        setStudLName(studentInfo.iname.lname)
    }, [])
    
    /*-------------------- Functions --------------------*/
    //function which updates Student input fields
    const updateStudent = () => {
        const credentials = {
            StudentID: studNum,
            FirstName: studFName, //put first name variable
            LastName: studLName, //put last name variable
            MiddleName: studMName, //put middle name variable
            Degree: degree,
            //TotalUnits: 0,
            //TotalUnits2: 0,
            //TotalCumulative: 0,
            //OverallGWA: 0,
            _id: currStudentID
        }

        fetch(`http://${ip}:3001/student/update` ,{
            method: "POST",
            headers: { "Content-Type":"application/json", "Authorization": `Bearer ${localStorage.getItem("Username")} ${localStorage.getItem("Password")}` },
            body: JSON.stringify(credentials)
        })
        .then(response => response.json())
        .then(body => {
            console.log(body)
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
    
    //function which records changes in student record 
    const addHistory = () => {
        
        const credentials = {
            User: userName,
            Student: currStudentID,
            Date: new Date().toLocaleDateString(),
            Time: new Date().toLocaleTimeString('en-US', { 
                hour12: false, 
                hour: "numeric", 
                minute: "numeric"
            }),
            Description: 'update',
            Details: "Sample Details"
        };
        
        //fetch to add history to database
        fetch(`http://${ip}:3001/history/add`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Username")} ${localStorage.getItem("Password")}` },
            body: JSON.stringify(credentials),
        })
        .then((response) => response.json())
        .then((body) => {
            console.log(body);
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

    //main function for student update and add history
    const submitStudentEdit = () =>{
        updateStudent();
        addHistory();
        setOpenModal(false);
    }

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
                                                        <button className={modalBtnSave} onClick={submitStudentEdit}>Save</button>
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
