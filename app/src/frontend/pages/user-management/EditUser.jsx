import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/solid';
import Input from 'frontend/components/inputs/Input';
import Swal from 'sweetalert2';
import user from '../../../../assets/icons/user-icon.jpg';
import 'tailwindcss/tailwind.css';

/* Parent component: ./UserManagementPage */

/* This function contains the edit user modal window. 

   HOW TO USE:
    1. In the user management page, declare and initialize showModal variable.
        {showModal ?
            (<EditUser {props}/>)
            :(<></>)
        }
*/

/* Props:
    modalState            ---  boolean; used as flag to open and close the modal window
    handleClose           ---  function used to close the modal window
    editUser              ---  receives state of current user details
    uneditedUser          ---  receives state of unedited user details
    handleEditRecordSave  ---  function that handles saving of changes in user details
*/
const EditUser = ({ modalState, handleClose, editUser, uneditedUser, handleEditRecordSave }) => {
  const [firstName, setFirstName] = useState(editUser.FirstName);
  const [middleName, setMiddleName] = useState(editUser.MiddleName);
  const [lastName, setLastName] = useState(editUser.LastName);
  const [un, setUN] = useState(editUser.Username); // username
  const [position, setPosition] = useState(editUser.Position); // username
  const [role, setRole] = useState(editUser.Role); // username

  const [firstNameUnedited, setFirstNameUnedited] = useState(
    uneditedUser.FirstName
  );
  const [middleNameUnedited, setMiddleNameUnedited] = useState(
    uneditedUser.MiddleName
  );
  const [lastNameUnedited, setLastNameUnedited] = useState(
    uneditedUser.LastName
  );
  const [unUnedited, setUNUnedited] = useState(uneditedUser.Username); // username
  const [positionUnedited, setPositionUnedited] = useState(
    uneditedUser.Position
  ); // username

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
    if (
      firstName === '' ||
      middleName === '' ||
      lastName === '' ||
      un === '' ||
      position === ''
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Fill out all fields',
      });
      return;
    }

    const credentials = {
      _id: editUser._id,
      FirstName: firstName.toUpperCase(),
      MiddleName: middleName.toUpperCase(),
      LastName: lastName.toUpperCase(),
      Username: un,
      Position: position,
      Password: pw,
      // Role: 'user',
    };
    // console.log("here")
    fetch(`http://${ip}:3001/user/update`, {
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
        // console.log(body)
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
            text: 'Successfully updated user!',
          });
          console.log(body);
          handleEditRecordSave(body);
          if (body.Role == 'admin') {
            localStorage.setItem('FirstName', body.FirstName.toUpperCase());
            localStorage.setItem('LastName', body.LastName.toUpperCase());
            localStorage.setItem('MiddleName', body.MiddleName.toUpperCase());
            localStorage.setItem('Password', body.Password);
            localStorage.setItem('Position', body.Position);
            localStorage.setItem('Username', body.Username);
          }
        }
      })
      .catch((err) => {
        // will activate if DB is not reachable or timed out or there are other errors
        Swal.fire({
          icon: 'error',
          title: 'Server Error',
          text: 'Check if the server is running or if database IP is correct',
        });
        // console.log(err)
      });
  };

  // prevent default form submission
  const preventDefault = (e) => {
    e.preventDefault();
  };
  
  /* -------------------- Styling --------------------*/
  const modalContent1 = `w-[70%] flex-col mx-auto p-2 rounded-[3.25vw] relative bg-secondary-red transform overflow-hidden p-6 text-left align-middle shadow-xl transition ease-out duration-300`;
  const modalBody1 = `h-full bg-transparent flex m-auto overflow-hidden overflow-y-auto relative w-full`;
  const inputContent = `overflow-auto pl-[1%] my-auto w-full text-[1vw]`;
  const inputStyle = `text-center w-full h-[4.85vh] rounded-xl`;
  const baybayinStyle = `bg-baybayin bg-repeat-y bg-contain -ml-[9.75vh] h-[49vh]`;
  const modalBody = `absolute inset-x-0 bg-transparent top-[2%] bottom-[2%]`;
  const modalBtnSave = `w-[14vw] h-[5vh] font-medium block bg-button-green rounded-lg text-[1vw] text-sidebar-text ease-out hover:ease-in
    hover:shadow-lg hover:bg-button-green-hover disabled:bg-sr-disabled-green transition hover:transition
    duration-300 hover:duration-300`;
  const modalBtnCancel = `w-[14vw] h-[5vh] text-[1vw] font-medium rounded-lg rounded-xl bg-discard hover:bg-white text-center ease-out hover:ease-in`;

  
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
          <div className="fixed inset-0 overflow-y-auto flex m-auto w-full h-full items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-500"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                {/* Edit User Modal Window */}
                <Dialog.Panel className={modalContent1}>
                  <div className="relative">
                    <div className={baybayinStyle} />
                    <div className={modalBody}>
                      <Dialog.Title
                        as="h3"
                        className="ml-3 text-2xl leading-6 text-gray-900 flex"
                      >
                        {/* Close button */}
                        <XIcon
                          className="h-6 w-6 cursor-pointer ml-auto mr-0 transition-all ease-out text-sidebar-text hover:text-gray-400 hover:transition-all hover:ease-in"
                          onClick={handleClose}
                        />
                      </Dialog.Title>
                    </div>

                    {/* Window body */}
                    <div className="font-montserrat m-0 absolute top-[50%] translate-y-[-50%] w-full">
                      <div className={modalBody1}>

                        {/* User Photo */}
                        <div className="w-1/6 ml-auto mt-2">
                          <img
                            className="rounded-lg w-[10vw] h-[10vw]"
                            alt="usericon"
                            src={user}
                          />
                        </div>

                        {/* Input Form */}
                        <form className="flex-rows-4 relative w-9/12">
                            
                            {/* Input fields */}
                            <div className={inputContent}>

                                {/* Name */}
                                <div className="w-full pb-4 mt-2">

                                  {/* First Name */}
                                  <section className="w-2/5 inline-block grow mr-2">
                                    <Input
                                      labelStyle="mt-1 w-full text-center text-white sr-only" // styling for label
                                      labelVal="First Name"             // label text
                                      inputStyle={inputStyle}           // styling for input
                                      name="firstName"                  // name of label-input components
                                      inputType="text"                  // type of input password, email, text, etc.
                                      inputPlaceholder="First Name"     // placeholder text for input
                                      value={firstName.toUpperCase()}   // value of the input
                                      changeHandler={(e) =>
                                        setFirstName(
                                          e.target.value.toUpperCase()
                                        )
                                      }                                 // change handling
                                    />
                                    <h4 className="mt-1 w-full text-center text-white">
                                      First Name
                                    </h4>
                                  </section>

                                  {/* Middle Initial */}
                                  <section className="w-1/12 inline-block grow mr-2">
                                    <Input
                                      labelStyle="mt-1 w-full text-center text-white sr-only" // styling for label
                                      labelVal="M.I."                   // label text
                                      inputStyle={inputStyle}           // styling for input
                                      name="middleName"                 // name of label-input components
                                      inputType="text"                  // type of input password, email, text, etc.
                                      inputPlaceholder="_"              // placeholder text for input
                                      value={middleName.toUpperCase()}  // value of the input
                                      changeHandler={(e) =>
                                        setMiddleName(
                                          e.target.value.toUpperCase()
                                        )
                                      }                                 // change handling
                                    />
                                    <h4 className="w-full text-center mt-1 text-white">
                                      M.I.
                                    </h4>
                                  </section>

                                  {/* Last Name */}
                                  <section className="w-2/5 inline-block grow mr-2">
                                    <Input
                                      labelStyle="mt-1 w-full text-center text-white sr-only" // styling for label
                                      labelVal="Last Name"              // label text
                                      inputStyle={inputStyle}           // styling for input
                                      name="lastName"                   // name of label-input components
                                      inputType="text"                  // type of input password, email, text, etc.
                                      inputPlaceholder="Last Name"      // placeholder text for input
                                      value={lastName.toUpperCase()}    // value of the input
                                      changeHandler={(e) =>
                                        setLastName(
                                          e.target.value.toUpperCase()
                                        )
                                      }                                 // change handling
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
                                      labelVal="Username"               // label text
                                      inputStyle={inputStyle}           // styling for input
                                      name="username"                   // name of label-input components
                                      max={17}                          // character limit - max no of char is 17
                                      inputType="text"                  // type of input password, email, text, etc.
                                      inputPlaceholder="Username"       // placeholder text for input
                                      value={un}                        // value of the input
                                      disabled={role == 'admin' ? true : false}
                                      changeHandler={(e) =>
                                        setUN(e.target.value)
                                      }                                 // change handling
                                    />
                                    <h4 className="mt-1 w-full text-center text-white">
                                      Username
                                    </h4>
                                  </section>

                                  {/* Position */}
                                  <section className="w-1/2 inline-block grow mr-2">
                                    <Input
                                      labelStyle="mt-1 w-full text-center text-white sr-only" // styling for label
                                      labelVal="Position"               // label text
                                      inputStyle={inputStyle}           // styling for input
                                      name="position"                   // name of label-input components
                                      inputType="text"                  // type of input password, email, text, etc.
                                      inputPlaceholder="Position"       // placeholder text for input
                                      value={position}                  // value of the input
                                      changeHandler={(e) =>
                                        setPosition(e.target.value)
                                      }                                 // change handling
                                    />
                                    <h4 className="w-full text-center mt-1 text-white">
                                      Position
                                    </h4>
                                  </section>
                                </div>

                                {/* Password */}
                                <div className="w-[91%] inline-block pb-4 mt-2 mr-2">
                                    <div className="relative w-full">
                                      <Input
                                        labelStyle="mt-1 w-full text-center text-white sr-only" // styling for label
                                        labelVal="Password"             // label text
                                        inputStyle="h-[4.85vh] rounded-xl text-center w-full appearance-none border-2 leading-tight border-gray-300 bg-gray-100 focus:outline-none focus:border-orange-300 focus:bg-white text-gray-700 pr-16 font-mono js-password" // styling for input
                                        name="password"                 // name of label-input components
                                        inputType="password"            // type of input password, email, text, etc.
                                        inputPlaceholder="*****"        // placeholder text for input
                                        value={pw}                      // value of the input
                                        changeHandler={(e) =>
                                          setPW(e.target.value)
                                        }                               // change handling
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
                                      Password (only fill up if you want to change password of user)
                                    </h4>
                                </div>
                            </div>

                            {/* Save and Cancel buttons */}
                            <section className="w-[91%] flex flex-row mt-[2vh] pl-[1%] font-poppins font-medium justify-center gap-x-[1vw]">
                                <button
                                    onClick={edit_user}
                                    className={modalBtnSave}
                                    type="button"
                                    disabled={
                                        !( pw != '' ||
                                            (firstName != firstNameUnedited ||
                                            middleName != middleNameUnedited ||
                                            lastName != lastNameUnedited ||
                                            un != unUnedited ||
                                            position != positionUnedited)
                                        )
                                    }
                                >
                                    Save
                                </button>
                                <button
                                    className={modalBtnCancel}
                                    onClick={handleClose}
                                    type="button"
                                >
                                    Cancel
                                </button>
                            </section>
                        </form>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default EditUser;
