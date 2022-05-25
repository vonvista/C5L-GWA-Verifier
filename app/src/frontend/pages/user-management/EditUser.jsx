import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import Swal from 'sweetalert2'

import Input from 'frontend/components/inputs/Input';
import user from '../../../../assets/icons/user-icon.jpg';
import 'tailwindcss/tailwind.css';
import './AddEditUser.css';


// function which shows the add user modal; to be used in UserSystemPage
// to use EditUser and AddUserBtn, import needed files and declare and initialize showModal variable:
// <Actions handleEdit={() => setShowModal(true)}/>
// {showModal ?
//   (<EditUser handleClose={() => setShowModal(false)}/>)
//   :(<></>)
// }

const EditUser = ({ modalState, handleClose, editUser, handleEditRecordSave }) => {
  const [firstName, setFirstName] = useState(editUser.FirstName);
  const [middleName, setMiddleName] = useState(editUser.MiddleName);
  const [lastName, setLastName] = useState(editUser.LastName);
  const [un, setUN] = useState(editUser.Username); // username
  const [position, setPosition] = useState(editUser.Position); // username
  const [pw, setPW] = useState(''); // password
  const [status, setStatus] = useState('show');
  const [ip, setIP] = useState(localStorage.getItem('ServerIP'));

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

  const edit_user = () => {

    if(
      firstName === "" || 
      middleName === "" || 
      lastName === "" || 
      un === "" || 
      position === "" || 
      pw === ""
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Fill out all fields',
      })
      return
    }


    const credentials = {
        _id: editUser._id,
        FirstName: firstName,
        MiddleName: middleName,
        LastName: lastName,
        Username: un,
        Position: position,
        Password: pw,
        // Role: 'user',
    };
    //console.log("here")
    fetch(`http://${ip}:3001/user/update`,{
        method: "POST",
        headers: { "Content-Type":"application/json", "Authorization": `Bearer ${localStorage.getItem("Username")} ${localStorage.getItem("Password")}` },
        body: JSON.stringify(credentials)
        })
    .then((response) => response.json())
    .then(body => {
      //console.log(body)
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
          text: 'Successfully updated user!',
        })
        console.log(body)
        handleEditRecordSave(body)
        if(body.Role == "admin"){
          localStorage.setItem("FirstName", body.FirstName)
          localStorage.setItem("LastName", body.LastName)
          localStorage.setItem("MiddleName", body.MiddleName)
          localStorage.setItem("Password", body.Password)
          localStorage.setItem("Position", body.Position)
          localStorage.setItem("Username", body.Username)
        }

      }
    })
    .catch(err => { //will activate if DB is not reachable or timed out or there are other errors
      Swal.fire({
        icon: 'error',
        title: 'Server Error',
        text: 'Check if the server is running or if database IP is correct',
      })
      //console.log(err)
    })
  };

  // styling
  const modalContent1 = `h-[60%] w-[70%] flex-col mx-auto p-2 rounded-[30px] relative bg-secondary-red transform overflow-hidden p-6 text-left align-middle shadow-xl transition-all`;
  const modalBody1 = `h-full bg-transparent flex m-auto overflow-hidden overflow-y-auto relative w-full`;
  const inputContent = `overflow-auto w-full text-[1.25vw]`;
  const form = `bg-transparent rounded-lg py-0 px-5`;
  const inputStyle = `rounded-lg text-center w-full h-[2.5vw]`;

  return (
    <>
      <Transition appear show={modalState} as={Fragment}>
        <Dialog as="div" className="relative z-10 inter" onClose={handleClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25 text-montserrat" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex m-auto w-full h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-500"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className={modalContent1}>
                  <Dialog.Title
                    as="h3"
                    className="ml-3 text-2xl leading-6 text-gray-900 flex"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="ml-auto mr-0 transition-all ease-out delay-200 hover:text-gray-500 hover:transition-all hover:ease-in hover:delay-200 h-6 w-6"
                      viewBox="0 0 20 20"
                      fill="white"
                      onClick={handleClose}
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Dialog.Title>

                  <div className="m-0 absolute top-[50%] translate-y-[-50%] w-full">
                    <div className={modalBody1}>
                      {/* photo  */}
                      <div className="w-1/6 ml-auto mt-2">
                        <img
                          className="rounded-lg w-[10vw] h-[10vw]"
                          alt="usericon"
                          src={user}
                        />
                      </div>
                      {/* form */}
                      <section className="flex-rows-4 relative w-9/12">
                        <form className="justify-center">
                          <div className="flex justify-center">
                            {/* Input form */}
                            <div className={[inputContent, form]}>
                              {/* name */}
                              <div className="w-full pb-4 mt-2">
                                <section className="w-2/5 inline-block grow mr-2">
                                  <Input
                                    labelStyle="mt-1 w-full text-center text-white sr-only" // styling for label
                                    labelVal="First Name" // label text
                                    inputStyle={inputStyle} // styling for input
                                    name="firstName" // name of label-input components
                                    inputType="text" // type of input password, email, text, etc.
                                    inputPlaceholder="" // placeholder text for input
                                    value={firstName} // value of the input
                                    changeHandler={(e) =>
                                      setFirstName(e.target.value)
                                    } // change handling
                                  />
                                  <h4 className="mt-1 w-full text-center text-white">
                                    First Name
                                  </h4>
                                </section>
                                <section className="w-1/12 inline-block grow mr-2">
                                  <Input
                                    labelStyle="mt-1 w-full text-center text-white sr-only" // styling for label
                                    labelVal="M.I." // label text
                                    inputStyle={inputStyle} // styling for input
                                    name="middleName" // name of label-input components
                                    inputType="text" // type of input password, email, text, etc.
                                    inputPlaceholder="" // placeholder text for input
                                    value={middleName} // value of the input
                                    changeHandler={(e) =>
                                      setMiddleName(e.target.value)
                                    } // change handling
                                  />
                                  <h4 className="w-full text-center mt-1 text-white">
                                    M.I.
                                  </h4>
                                </section>
                                <section className="w-2/5 inline-block grow mr-2">
                                  <Input
                                    labelStyle="mt-1 w-full text-center text-white sr-only" // styling for label
                                    labelVal="Last Name" // label text
                                    inputStyle={inputStyle} // styling for input
                                    name="lastName" // name of label-input components
                                    inputType="text" // type of input password, email, text, etc.
                                    inputPlaceholder="" // placeholder text for input
                                    value={lastName} // value of the input
                                    changeHandler={(e) =>
                                      setLastName(e.target.value)
                                    } // change handling
                                  />
                                  <h4 className="w-full text-center mt-1 text-white">
                                    Last Name
                                  </h4>
                                </section>
                              </div>
                              {/* username and position */}
                              <div className="w-full pb-4 mt-2">
                                <section className="w-2/5 inline-block grow mr-2">
                                  <Input
                                    labelStyle="mt-1 w-full text-center text-white sr-only" // styling for label
                                    labelVal="Username" // label text
                                    inputStyle={inputStyle} // styling for input
                                    name="username" // name of label-input components
                                    max={17} // character limit - max no of char is 17
                                    inputType="text" // type of input password, email, text, etc.
                                    inputPlaceholder="" // placeholder text for input
                                    value={un} // value of the input
                                    changeHandler={(e) => setUN(e.target.value)} // change handling
                                  />
                                  <h4 className="mt-1 w-full text-center text-white">
                                    Username
                                  </h4>
                                </section>
                                <section className="w-1/2 inline-block grow mr-2">
                                  <Input
                                    labelStyle="mt-1 w-full text-center text-white sr-only" // styling for label
                                    labelVal="Position" // label text
                                    inputStyle={inputStyle} // styling for input
                                    name="position" // name of label-input components
                                    max={17} // character limit - max no of char is 17
                                    inputType="text" // type of input password, email, text, etc.
                                    inputPlaceholder="" // placeholder text for input
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
                              {/* password */}
                              <div className="w-full pb-4 mt-2">
                                <section className="un-style">
                                  <div className="relative w-full">
                                    <div className="absolute inset-y-0 right-0 flex items-center px-2">
                                      <Input
                                        labelStyle="mt-1 w-full text-center text-white sr-only" // styling for label
                                        labelVal="Password" // label text
                                        inputStyle={[inputStyle, 'hidden']} // styling for input
                                        name="password" // name of label-input components
                                        inputType="checkbox" // type of input password, email, text, etc.
                                        inputPlaceholder="*****" // placeholder text for input
                                        value={pw} // value of the input
                                        changeHandler={(e) =>
                                          setPW(e.target.value)
                                        } // change handling
                                      />
                                      <button
                                        className="bg-gray-300 hover:bg-gray-400 rounded px-2 py-1 text-[0.9vw] text-gray-600  cursor-pointer account-button js-password-label w-[3vw] h-11/12"
                                        htmlFor="toggle"
                                        type="button"
                                        onClick={buttonHandler}
                                      >
                                        {status}
                                      </button>
                                    </div>
                                    <Input
                                      labelStyle="mt-1 w-full text-center text-white sr-only" // styling for label
                                      labelVal="Password" // label text
                                      inputStyle="rounded-lg text-center w-full h-[2.5vw] appearance-none border-2 leading-tight border-gray-300 bg-gray-100 focus:outline-none focus:border-indigo-700 focus:bg-white text-gray-700 pr-16 js-password" // styling for input
                                      name="password" // name of label-input components
                                      inputType="password" // type of input password, email, text, etc.
                                      inputPlaceholder="*****" // placeholder text for input
                                      value={pw} // value of the input
                                      changeHandler={(e) =>
                                        setPW(e.target.value)
                                      } // change handling
                                    />
                                  </div>
                                  <h4 className="mt-1 mb-2 w-full text-center text-white">
                                    Password
                                  </h4>
                                </section>
                              </div>
                            </div>
                          </div>

                          {/* create user button */}
                          <div className="w-full flex">
                            <section className="my-auto ml-0 mr-auto w-[90.5%]">
                              <button
                                className="inter w-2/5 h-[5vh] block ml-auto mr-auto bg-button-green hover:bg-button-green-hover text-white font-bold rounded-lg hover:bg-slate-200 user-btn text-[1vw]"
                                type="button"
                                onClick={edit_user}
                              >
                                Save
                              </button>
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

export default EditUser;
