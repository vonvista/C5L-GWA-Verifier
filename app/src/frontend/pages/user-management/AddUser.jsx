import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/solid';
import Input from 'frontend/components/inputs/Input';
import user from '../../../../assets/icons/user-icon.jpg';
import Swal from 'sweetalert2';
import 'tailwindcss/tailwind.css';


/* Parent component: ./UserManagementPage */

/* This function contains the add user modal window. 

   HOW TO USE:
    1. Import AddUserBtn.jsx and AddUser.jsx into the file.
    2. Declare and initialize showModal variable.
        <AddUserBtn handleClick={() => setShowModal(true)}/>
        {showModal ?
            (<AddUser modalState={true} handleClose={() => setShowModal(false)}/>)
            :(<></>)
        }
*/

/* Props:
    modalState      --- boolean; used as flag to open and close the modal window
    handleClose     --- function used to close the modal window
    handleAddRecord --- function used to add user to the database
*/
const AddUser = ({ modalState, handleClose, handleAddRecord }) => {
  // State handlers for input form
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [un, setUN] = useState(''); // username
  const [position, setPosition] = useState(''); // position
  const [pw, setPW] = useState(''); // password

  const [status, setStatus] = useState('show');
  const [ip, setIp] = useState(localStorage.getItem('ServerIP'));

  // reference for password toggle: https://codepen.io/huphtur/pen/OKJJQY
  const buttonHandler = () => {
    const password = document.querySelector('.js-password');

    if (password.type === 'password') {
      password.type = 'text';
      setStatus('hide');
    } else {
      password.type = 'password';
      setStatus('show');
    }

    password.focus();
  };

  // Please put this logic on parent component/main page -vov
  const add_user = () => {

    const credentials = {
      FirstName: firstName,
      MiddleName: middleName,
      LastName: lastName,
      Username: un,
      Position: position,
      Password: pw,
      Role: 'user',
    };

    fetch(`http://${ip}:3001/user/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem(
          'Username'
        )} ${localStorage.getItem('Password')}`,
      },
      body: JSON.stringify(credentials),
    })
      .then((response) => response.json())
      .then((body) => {
        // console.log(body);
        if (body.err) {
          // if error response returned from DB
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: body.err,
          });
        } else {
          // success state
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Successfully added user!',
          });
          handleAddRecord(body);
        }
      })
      .catch((err) => {
        // will activate if DB is not reachable or timed out or there are other errors
        Swal.fire({
          icon: 'error',
          title: 'Server Error',
          text: 'Check if the server is running or if database IP is correct',
        });
        // console.log(err);
      });
  };

  // Create user Button
  const CreateUserButton = () => {
    const createbtn = `w-2/5 h-[5vh] block ml-auto mr-auto bg-button-green rounded-lg user-btn text-[1vw] text-sidebar-text
            hover:shadow-lg hover:bg-button-green-hover disabled:bg-sr-disabled-green
            transition ease-out duration-300 hover:transition hover:ease-in hover:duration-300`;
    // check if all input fields have been filled
    if (firstName && middleName && lastName && un && position && pw) {
      return (
        <button className={createbtn} type="button" onClick={add_user}>
          Create Account
        </button>
      );
    }
    return (
      <button className={createbtn} type="button" disabled>
        Create Account
      </button>
    );
  };

  // Styling
  const modalContent1 = `h-[60%] w-[70%] flex-col mx-auto p-2 rounded-[30px] relative bg-secondary-red transform overflow-hidden p-6 text-left align-middle shadow-xl transition ease-out duration-300`;
  const modalBody1 = `h-full bg-transparent flex m-auto overflow-hidden overflow-y-auto relative w-full`;
  const inputContent = `overflow-auto w-full text-[1.25vw]`;
  const form = `bg-transparent rounded-lg py-0 px-5`;
  const inputStyle = `rounded-lg text-center w-full h-[2.5vw]`;
  const modalBtnCancel = `w-2/5 h-[5vh] block ml-auto mr-auto rounded-lg user-btn text-[1vw] text-sidebar-text bg-transparent border border-zinc-200
  hover:shadow-lg hover:bg-white
  transition ease-out duration-300 hover:transition hover:ease-in hover:duration-300 hover:text-black`;


  return (
    <>
      {/* Wrapping everything with transition component to use transition effects from @headlessui/react */}
      <Transition appear show={modalState} as={Fragment}>
        {/* Wrapping everything with dialog component */}
        <Dialog as="div" className="relative z-30 " onClose={handleClose}>
          {/* Transition effect for the element inside this Transition.Child tag */}
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
          <div className="fixed inset-0 overflow-y-auto ">
            <div className="flex m-auto w-full h-full items-center justify-center p-4 text-center">
              {/* Transition effect for the element inside this Transition.Child tag */}
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-500"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                {/* Add User Modal Window */}
                <Dialog.Panel className={modalContent1}>
                  {/* Window Title */}
                  <Dialog.Title
                    as="h3"
                    className="ml-3 text-2xl leading-6 text-gray-900 flex"
                  >
                    {/* Close button */}
                    <XIcon
                        className="cursor-pointer ml-auto mr-0 transition-all ease-out delay-200 text-sidebar-text hover:text-gray-400 hover:transition-all hover:ease-in hover:delay-200 h-6 w-6"
                        onClick={handleClose}
                    />
                  </Dialog.Title>

                  

                  {/* Window body */}
                  <div className="font-inter m-0 absolute top-[50%] translate-y-[-50%] w-full">
                    <div className={modalBody1}>
                      {/* User Photo */}
                      <div className="w-1/6 ml-auto mt-2">
                        <img
                          className="rounded-lg w-[10vw] h-[10vw]"
                          alt="usericon"
                          src={user}
                        />
                      </div>

                      <section className="flex-rows-4 relative w-9/12">
                        {/* Input form */}
                        <form className="justify-center">
                          <div className="flex justify-center">
                            <div className={[inputContent, form]}>
                              {/* Name */}
                              <div className="w-full pb-4 mt-2">
                                {/* First Name */}
                                <section className="w-2/5 inline-block grow mr-2">
                                  <Input
                                    labelStyle="mt-1 w-full text-center text-white sr-only" // styling for label
                                    labelVal="First Name" // label text
                                    inputStyle={inputStyle} // styling for input
                                    name="firstName" // name of label-input components
                                    inputType="text" // type of input password, email, text, etc.
                                    inputPlaceholder="FIRST NAME" // placeholder text for input
                                    value={firstName} // value of the input
                                    changeHandler={(e) =>
                                      setFirstName(e.target.value.toUpperCase())
                                    } // change handling
                                  />
                                  <h4 className="mt-1 w-full text-center text-white">
                                    First Name
                                  </h4>
                                </section>

                                {/* Middle Initial */}
                                <section className="w-1/12 inline-block grow mr-2">
                                  <Input
                                    labelStyle="mt-1 w-full text-center text-white sr-only" // styling for label
                                    labelVal="M.I." // label text
                                    inputStyle={inputStyle} // styling for input
                                    name="middleName" // name of label-input components
                                    inputType="text" // type of input password, email, text, etc.
                                    inputPlaceholder="_" // placeholder text for input
                                    value={middleName} // value of the input
                                    changeHandler={(e) =>
                                      setMiddleName(e.target.value.toUpperCase())
                                    } // change handling
                                  />
                                  <h4 className="w-full text-center mt-1 text-white">
                                    M.I.
                                  </h4>
                                </section>

                                {/* Last Name */}
                                <section className="w-2/5 inline-block grow mr-2">
                                  <Input
                                    labelStyle="mt-1 w-full text-center text-white sr-only" // styling for label
                                    labelVal="Last Name" // label text
                                    inputStyle={inputStyle} // styling for input
                                    name="lastName" // name of label-input components
                                    inputType="text" // type of input password, email, text, etc.
                                    inputPlaceholder="LAST NAME" // placeholder text for input
                                    value={lastName} // value of the input
                                    changeHandler={(e) =>
                                      setLastName(e.target.value.toUpperCase())
                                    } // change handling
                                  />
                                  <h4 className="w-full text-center mt-1 text-white">
                                    Last Name
                                  </h4>
                                </section>
                              </div>

                              {/* Username and Position */}
                              <div className="w-full pb-4 mt-2">
                                {/* Username */}
                                <section className="w-2/5 inline-block grow mr-2">
                                  <Input
                                    labelStyle="mt-1 w-full text-center text-white sr-only" // styling for label
                                    labelVal="Username" // label text
                                    inputStyle={inputStyle} // styling for input
                                    name="username" // name of label-input components
                                    max={17} // character limit - max no of char is 17
                                    inputType="text" // type of input password, email, text, etc.
                                    inputPlaceholder="Username" // placeholder text for input
                                    value={un} // value of the input
                                    changeHandler={(e) => setUN(e.target.value)} // change handling
                                  />
                                  <h4 className="mt-1 w-full text-center text-white">
                                    Username
                                  </h4>
                                </section>

                                {/* Position */}
                                <section className="w-1/2 inline-block grow mr-2">
                                  <Input
                                    labelStyle="mt-1 w-full text-center text-white sr-only" // styling for label
                                    labelVal="Position" // label text
                                    inputStyle={inputStyle} // styling for input
                                    name="position" // name of label-input components
                                    max={17} // character limit - max no of char is 17
                                    inputType="text" // type of input password, email, text, etc.
                                    inputPlaceholder="Position" // placeholder text for input
                                    value={position} // value of the input
                                    changeHandler={(e) =>
                                      setPosition(e.target.value)
                                    } // change handling
                                  />
                                  <h4 className="w-full text-center mt-1 text-white">
                                    Position
                                  </h4>
                                </section>
                              </div>

                              {/* Password */}
                              <div className="w-full pb-4 mt-2 pr-24">
                                <section className="un-style">
                                  <div className="relative w-full">
                                    <Input
                                      labelStyle="mt-1 w-full text-center text-white sr-only" // styling for label
                                      labelVal="Password" // label text
                                      inputStyle="rounded-xl text-center w-full h-[2.5vw] appearance-none border-2 leading-tight border-gray-300 bg-gray-100 focus:outline-none focus:border-indigo-700 focus:bg-white text-gray-700 pr-16 font-mono js-password" // styling for input
                                      name="password" // name of label-input components
                                      inputType="password" // type of input password, email, text, etc.
                                      inputPlaceholder="*****" // placeholder text for input
                                      value={pw} // value of the input
                                      changeHandler={(e) =>
                                        setPW(e.target.value)
                                      } // change handling
                                    />
                                    <div className="absolute inset-y-0 right-0 flex items-center px-2">
                                      <button
                                        className="bg-gray-300 hover:bg-gray-400 rounded px-2 py-1 text-[0.9vw] text-gray-600 font-mono cursor-pointer account-button js-password-label w-[3vw] h-11/12"
                                        htmlFor="toggle"
                                        type="button"
                                        onClick={buttonHandler}
                                      >
                                        {status}
                                      </button>
                                    </div>
                                  </div>

                                  <h4 className="mt-1 mb-2 w-full text-center text-white">
                                    Password
                                  </h4>
                                </section>
                              </div>
                            </div>
                          </div>

                          {/* Create User Button */}
                          <div className="w-full flex flex-row">
                            <section className="my-auto ml-0 mr-auto w-[90.5%] font-poppins font-medium flex justify-center">
                              <button className={modalBtnCancel} onClick={handleClose}>
                                Cancel
                              </button>
                              <CreateUserButton />
                            </section>
                          </div>
                        </form>
                      </section>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default AddUser;
