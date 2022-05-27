import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/solid';
import Input from 'frontend/components/inputs/Input';
import user from '../../../../assets/icons/user-icon.jpg';
import Swal from 'sweetalert2';
import 'tailwindcss/tailwind.css';


// function which shows the add user modal; to be used in UserSystemPage
// to use EditUser and AddUserBtn, import needed files and declare and initialize showModal variable:
// <Actions handleEdit={() => setShowModal(true)}/>
// {showModal ?
//   (<EditUser handleClose={() => setShowModal(false)}/>)
//   :(<></>)
// }

/* Props:
    modalState            ---
    handleClose           ---
    editUser              ---
    handleEditRecordSave  ---  fsadas
*/
const EditUser = ({ modalState, handleClose, editUser, uneditedUser, handleEditRecordSave }) => {
  const [firstName, setFirstName] = useState(editUser.FirstName);
  const [middleName, setMiddleName] = useState(editUser.MiddleName);
  const [lastName, setLastName] = useState(editUser.LastName);
  const [un, setUN] = useState(editUser.Username); // username
  const [position, setPosition] = useState(editUser.Position); // username


  const [firstNameUnedited, setFirstNameUnedited] = useState(uneditedUser.FirstName);
  const [middleNameUnedited, setMiddleNameUnedited] = useState(uneditedUser.MiddleName);
  const [lastNameUnedited, setLastNameUnedited] = useState(uneditedUser.LastName);
  const [unUnedited, setUNUnedited] = useState(uneditedUser.Username); // username
  const [positionUnedited, setPositionUnedited] = useState(uneditedUser.Position); // username

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
  const modalContent1 = `h-[60%] w-[70%] flex-col mx-auto p-2 rounded-[30px] relative bg-secondary-red transform overflow-hidden p-6 text-left align-middle shadow-xl transition-all`;
  const modalBody1 = `h-full bg-transparent flex m-auto overflow-hidden overflow-y-auto relative w-full`;
  const inputContent = `overflow-auto w-full text-[1.25vw]`;
  const form = `bg-transparent rounded-lg py-0 px-5`;

  //prevent default form submission
  const preventDefault = (e) => {
    e.preventDefault();
  };


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
            {/* Container for the layer behind the modal window */}
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

           {/* Container for the layer containing the modal window */}
           <div className="fixed inset-0 overflow-y-auto flex min-h-full items-center justify-center p-4 text-center">
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
                    {/* Close button */}
                    <XIcon
                        className="cursor-pointer ml-auto mr-0 transition-all ease-out delay-200 text-sidebar-text hover:text-gray-400 hover:transition-all hover:ease-in hover:delay-200 h-6 w-6"
                        onClick={handleClose}
                    />
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
                              <div className="">
                                <section className="un-style">
                                  <div className="relative w-full">
                                    <Input
                                      labelStyle="mt-1 w-full text-center text-white sr-only" // styling for label
                                      labelVal="Password" // label text
                                      inputStyle="rounded-xl text-center w-[42.5vw] h-[5vh] appearance-none leading-tight border-gray-300 bg-gray-100 focus:outline-none focus:border-indigo-700 focus:bg-white text-gray-700 pr-16 js-password rounded-xl" // styling for input
                                      name="password" // name of label-input components
                                      inputType="password" // type of input password, email, text, etc.
                                      inputPlaceholder="*****" // placeholder text for input
                                      value={pw} // value of the input
                                      changeHandler={(e) =>
                                        setPW(e.target.value)
                                      } // change handling
                                    />
                                    <div className="absolute inset-y-0  right-[4.7vw] flex items-center px-2">
                                      <button
                                        className="bg-gray-300 hover:bg-gray-400 rounded px-2 py-1 text-[0.9vw] text-gray-600  cursor-pointer account-button js-password-label w-[3vw] h-11/12"
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

                        {/* Save button */}
                          <section className="mt-8 flex w-[90.5%] justify-center">
                            <button 
                              //prevent default
                              onClick={(e) => 
                                {
                                e.preventDefault();
                                edit_user();
                                }
                              }
                              className={modalBtnSave} 
                              disabled={(pw != '' && (firstName != firstNameUnedited || middleName!= middleNameUnedited || 
                                lastName != lastNameUnedited || un != unUnedited || position != positionUnedited)) ? false : true}
                            >
                              Save
                            </button>
                          
                          </section>
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
