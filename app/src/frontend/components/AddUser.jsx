import 'tailwindcss/tailwind.css';
import './AddEditUser.css';
import { useState } from 'react';
import user from '../../../assets/icons/user-icon.jpg';
import Input from './inputs/Input';

// function which shows the add user modal; to be used in UserSystemPage
// to use AddUser and AddUserBtn, import needed files and declare and initialize showModal variable:
// <AddUserBtn handleClick={() => setShowModal(true)}/>
// {showModal ?
//   (<AddUser handleClose={() => setShowModal(false)}/>)
//   :(<></>)
// }

const AddUser = ({ handleClose }) => {
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [un, setUN] = useState(''); // username
  const [position, setPosition] = useState(''); // username
  const [pw, setPW] = useState(''); // password
  const [status, setStatus] = useState('show');

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

  const add_user = () => {
    const credentials = {
        FirstName: "firstName3",
        MiddleName: "middleName3",
        LastName: "lastName3",
        Username: "un3",
        Position: "position3",
        Password: "Pwwwwwwwww883",
        Role: "user"
    }

        fetch(`http://localhost:3001/user/add`,{
            method: "POST",
            headers: { "Content-Type":"application/json" },
            body: JSON.stringify(credentials)
            })
        .then(response => response.json())
        .then(body => {
            console.log(body)
          })       
  }

  return (
    <>
      {/* add user button */}
      <div className="modal-add h-screen">
        {/* content */}
        <div className="modal-content">
          {/* exit button */}
          <button
            className="close-btn bg-transparent text-white flex relative ml-auto grow-0"
            type="button"
            onClick={handleClose}
          >
            &times;
          </button>

          {/* photo  */}
          <div className="modal-body">
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
              <form className="input-group">
                <div className="flex justify-center">
                  {/* Input form */}
                  <div className="input-content form">
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
