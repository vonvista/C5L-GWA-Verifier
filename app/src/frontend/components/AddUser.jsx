import 'tailwindcss/tailwind.css';
import './AddEditUser.css';
import { useState } from 'react';
import user from '../../../assets/icons/user-icon.jpg';
import Input from './inputs/Input';
import Swal from 'sweetalert2'

// function which shows the add user modal; to be used in UserSystemPage
// to use AddUser and AddUserBtn, import needed files and declare and initialize showModal variable:
// <AddUserBtn handleClick={() => setShowModal(true)}/>
// {showModal ?
//   (<AddUser handleClose={() => setShowModal(false)}/>)
//   :(<></>)
// }

const AddUser = ({ handleClose, handleAddRecord }) => {
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [un, setUN] = useState(''); // username
  const [position, setPosition] = useState(''); // username
  const [pw, setPW] = useState(''); // password
  const [status, setStatus] = useState('show');

  const ip = localStorage.getItem('ServerIP');

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
  
  //Please put this logic on parent component/main page -vov
  const add_user = () => {

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
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    })
    .then((response) => response.json())
    .then(body => {
      console.log(body)
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
          text: 'Successfully add user!',
        })
        handleAddRecord(body)

      }
    })
    .catch(err => { //will activate if DB is not reachable or timed out or there are other errors
      Swal.fire({
        icon: 'error',
        title: 'Server Error',
        text: 'Check if the server is running or if database IP is correct',
      })
      console.log(err)
    })
  };

  return (
    <>
      {/* add user button */}
      <div className="modal-add h-screen">
        {/* content */}
        <div className="modal-content1">
          {/* exit button */}
          <button
            className="close-btn1 bg-transparent text-white flex relative ml-auto grow-0"
            type="button"
            onClick={handleClose}
          >
            &times;
          </button>

          {/* photo  */}
          <div className="modal-body1">
            <div className="w-1/6 ml-auto mt-2">
              <img
                className="rounded-lg"
                width="250px"
                height="250px"
                alt="usericon"
                src={user}
              />
            </div>
            {/* form */}
            <section className="flex-rows-4 relative w-9/12">
              <form className="input-group1">
                <div className="flex justify-center">
                  {/* Input form */}
                  <div className="input-content1 form1">
                    {/* name */}
                    <div className="w-full pb-4 mt-2">
                      <section className="w-2/5 inline-block grow mr-2">
                        <Input
                          labelStyle="mt-1 w-full text-center text-white sr-only" // styling for label
                          labelVal="First Name" // label text
                          inputStyle="input-style" // styling for input
                          name="firstName" // name of label-input components
                          inputType="text" // type of input password, email, text, etc.
                          inputPlaceholder="" // placeholder text for input
                          value={firstName} // value of the input
                          changeHandler={(e) => setFirstName(e.target.value)} // change handling
                        />
                        <h4 className="mt-1 w-full text-center text-white">
                          First Name
                        </h4>
                      </section>
                      <section className="w-1/12 inline-block grow mr-2">
                        <Input
                          labelStyle="mt-1 w-full text-center text-white sr-only" // styling for label
                          labelVal="M.I." // label text
                          inputStyle="input-style" // styling for input
                          name="middleName" // name of label-input components
                          inputType="text" // type of input password, email, text, etc.
                          inputPlaceholder="" // placeholder text for input
                          value={middleName} // value of the input
                          changeHandler={(e) => setMiddleName(e.target.value)} // change handling
                        />
                        <h4 className="w-full text-center mt-1 text-white">
                          M.I.
                        </h4>
                      </section>
                      <section className="w-2/5 inline-block grow mr-2">
                        <Input
                          labelStyle="mt-1 w-full text-center text-white sr-only" // styling for label
                          labelVal="Last Name" // label text
                          inputStyle="input-style" // styling for input
                          name="lastName" // name of label-input components
                          inputType="text" // type of input password, email, text, etc.
                          inputPlaceholder="" // placeholder text for input
                          value={lastName} // value of the input
                          changeHandler={(e) => setLastName(e.target.value)} // change handling
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
                          inputStyle="input-style" // styling for input
                          name="username" // name of label-input components
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
                          inputStyle="input-style" // styling for input
                          name="position" // name of label-input components
                          inputType="text" // type of input password, email, text, etc.
                          inputPlaceholder="" // placeholder text for input
                          value={position} // value of the input
                          changeHandler={(e) => setPosition(e.target.value)} // change handling
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
                              inputStyle="hidden input-style" // styling for input
                              name="password" // name of label-input components
                              inputType="checkbox" // type of input password, email, text, etc.
                              inputPlaceholder="*****" // placeholder text for input
                              value={pw} // value of the input
                              changeHandler={(e) => setPW(e.target.value)} // change handling
                            />
                            <button
                              className="bg-gray-300 hover:bg-gray-400 rounded px-2 py-1 text-sm text-gray-600 font-mono cursor-pointer account-button js-password-label"
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
                            inputStyle="input-style appearance-none border-2 rounded w-full py-3 px-3 leading-tight border-gray-300 bg-gray-100 focus:outline-none focus:border-indigo-700 focus:bg-white text-gray-700 pr-16 font-mono js-password" // styling for input
                            name="password" // name of label-input components
                            inputType="password" // type of input password, email, text, etc.
                            inputPlaceholder="*****" // placeholder text for input
                            value={pw} // value of the input
                            changeHandler={(e) => setPW(e.target.value)} // change handling
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
                <div className="account-button">
                  <div className="w-full flex">
                    <section className="un-style">
                      <button
                        className="inter w-2/5 block ml-auto mr-auto bg-white rounded-lg hover:bg-slate-200 user-btn"
                        type="button"
                        onClick={add_user}
                      >
                        Create Account
                      </button>
                    </section>
                  </div>
                </div>
              </form>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddUser;
