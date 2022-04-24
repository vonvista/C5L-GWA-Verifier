import 'tailwindcss/tailwind.css';
import './AddUser.css';
import { useEffect, useState } from 'react';
import user from '../../../assets/icons/default-user-icon.jpg';
import user1 from '../../../assets/icons/user1.svg';

const AddUser = () => {
  const [showModal, setShowModal] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [un, setUN] = useState(''); // username
  const [pw, setPW] = useState(''); // password

  // --test: to see if onchange handlers work; TODO: delete this block of code
  // useEffect(() => {
  //   console.log(firstName, middleName, lastName, un, pw);
  // }, [firstName, middleName, lastName, un, pw]);

  return (
    <>
      {/* add user button */}
      <button
        className="w-1/6 h-10 bg-login-green m-2 rounded-xl text-white font-montserrat font-bold hover:shadow-lg hover:bg-login-green-hover"
        type="button"
        onClick={() => setShowModal(true)}
      >
        <img
          className="p-0.25 ml-0.25 mr-1.5 inline-flex"
          width="20px"
          height="20px"
          alt="icon"
          src={user1}
        />
        <p className="text-sm inline-block">Add User</p>
      </button>
      {showModal ? (
        <div className="modal">
          {/* content */}
          <div className="modal-content">
            {/* exit button */}
            <div className="p-2 rounded-lg flex items-center justify-items-center">
              <button
                className="bg-transparent outline-none relative ml-auto grow-0"
                type="button"
                onClick={() => setShowModal(false)}
              >
                <span className="close text-4xl text-white p-1 bg-transparent inline-flex">
                  &times;
                </span>
              </button>
            </div>

            {/* photo  */}
            <div className="modal-body">
              <div className="w-1/6 ml-auto mt-5">
                <img
                  className="rounded-lg"
                  width="250px"
                  height="250px"
                  alt="usericon"
                  src={user}
                />
              </div>

              {/* input form */}
              <form className="w-9/12 ml-auto mt-auto mb-auto flex-row">
                {/* name field */}
                <div className="w-full mt-5">
                  <section className="w-2/5 inline-block grow mr-2">
                    <input
                      className="input-style"
                      type="text"
                      name="firstName"
                      placeholder=""
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                    <h4 className="mt-1 w-full text-center text-white">
                      First Name
                    </h4>
                  </section>
                  <section className="w-1/12 inline-block grow mr-2">
                    <input
                      className="input-style"
                      type="text"
                      name="middlename"
                      placeholder=""
                      onChange={(e) => setMiddleName(e.target.value)}
                    />
                    <h4 className="w-full text-center mt-1 text-white">M.I.</h4>
                  </section>
                  <section className="w-2/5 inline-block grow mr-2">
                    <input
                      className="input-style"
                      type="text"
                      name="lastName"
                      placeholder=""
                      onChange={(e) => setLastName(e.target.value)}
                    />
                    <h4 className="w-full text-center mt-1 text-white">
                      Last Name
                    </h4>
                  </section>
                </div>

                {/* username */}
                <section className="un-style">
                  <input
                    className="input-style"
                    type="text"
                    name="username"
                    placeholder=""
                    onChange={(e) => setUN(e.target.value)}
                  />
                  <h4 className="mt-1 w-full text-center text-white">
                    Username
                  </h4>
                </section>

                {/* password */}
                <div className="w-full mt-5">
                  <section className="un-style">
                    <input
                      className="input-style"
                      type="text"
                      name="password"
                      placeholder=""
                      onChange={(e) => setPW(e.target.value)}
                    />
                    <h4 className="mt-1 w-full text-center text-white">
                      Password
                    </h4>
                  </section>
                </div>

                {/* create user button */}
                <div className="w-full mt-8">
                  <section className="un-style">
                    <button
                      className="inter w-2/5 h-12 block ml-auto mr-auto bg-white rounded-lg hover:bg-slate-200"
                      type="button"
                    >
                      Create Account
                    </button>
                  </section>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default AddUser;
