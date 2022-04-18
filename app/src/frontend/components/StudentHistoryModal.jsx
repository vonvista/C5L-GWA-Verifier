/* eslint-disable import/named */
// StudentHistoryModal contains the modal component of the student record history.

import { useState } from 'react';
import StudentsData from './StudentHistory';
import './StudentHistoryModal.css';
import 'tailwindcss/tailwind.css';
// buttons
// import { LoginBtn, LogoutBtn } from './buttons/LoginLogoutBtns';
// import TextBtn from './buttons/TextBtn';
// import DashboardBtn from './buttons/Dashboard';
// import Actions from './buttons/Actions';
// import PageBtns from './buttons/PageBtns';
// import Dropdown from './buttons/Dropdown';
// import VerifyCancel from './buttons/VerifyCancel';
// import Add from './buttons/Add';
// import UserOptions from './buttons/UserOptions';
// import Edit from './buttons/Edit';
// import UploadFileBtn from './buttons/UploadFileBtn';
// import house from '../../../assets/icons/house.svg';

const StudentHistory = () => {
  const [showModal, setShowModal] = useState(false); // modal flag to show history modal

  // contents of student record history
  const historyData = [
    {
      date: 'MM-DD-YYYY',
      info: [
        {
          main: 'Main Description',
          user: 'User',
          time: 'HH:MM:SS',
          details: [
            'Details about the changes\n',
            'Details about the changes\n',
          ],
        },
        {
          main: 'Main Description',
          user: 'User',
          time: 'HH:MM:SS',
          details: [
            'Details about the changes\n',
            'Details about the changes\n',
          ],
        },
      ],
    },
    {
      date: 'MM-DD-YYYY',
      info: [
        {
          main: 'Main Description',
          user: 'User',
          time: 'HH:MM:SS',
          details: [
            'Details about the changes\n',
            'Details about the changes\n',
          ],
        },
      ],
    },
    {
      date: 'MM-DD-YYYY',
      info: [
        {
          main: 'Main Description',
          user: 'User',
          time: 'HH:MM:SS',
          details: [
            'Details about the changes\n',
            'Details about the changes\n',
          ],
        },
        {
          main: 'Main Description',
          user: 'User',
          time: 'HH:MM:SS',
          details: [
            'Details about the changes\n',
            'Details about the changes\n',
          ],
        },
      ],
    },
  ];

  // const { main, user, time, details } = historyData;
  return (
    <>
      {/* buttons components test */}
      {/* <LoginBtn />
      <LogoutBtn />
      <TextBtn text="Terms of Service" />
      <TextBtn text="Help" />
      <TextBtn text="Privacy Policy" />
      <DashboardBtn icon={house} text="User Dashboard" />
      <Actions />
      <PageBtns />
      <Dropdown />
      <VerifyCancel />
      <Add />
      <UserOptions />
      <Edit />
      <UploadFileBtn /> */}

      <br />
      {/* sample button to show modal */}
      <button
        className="w-40 h-11 hover:bg-slate-200 border border-gray-600 m-1.25 rounded-xl text-slate-500 font-montserrat font-bold hover:shadow-lg"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Show history modal
      </button>
      {showModal ? (
        <div className="modal">
          {/* content */}
          <div
            className="modal-content"
            // id="mt"
            // className="bg-white rounded-lg mt p-4 border-1 border-solid border-gray-300 flex-col w-10/12 h-9/12 relative"
          >
            {/* modal header */}
            <div className="p-2 rounded-lg flex items-center justify-items-center">
              <h2 className="text-3xl font-montserrat font-bold pr-1.5 m-0 w-80 inline-block grow">
                Student Record History
              </h2>
              {/* exit button of modal */}
              <button
                className="bg-transparent outline-none relative ml-auto grow-0"
                type="button"
                onClick={() => setShowModal(false)}
              >
                <span className="close text-2xl p-1.5 bg-transparent inline-flex">
                  &times;
                </span>
              </button>
            </div>
            {/* modal body; Last modified and descriptions */}
            <div className="modal-body">
              {historyData.map(({ date, info, i }) => (
                <StudentsData key={i} date={date} info={info} />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default StudentHistory;
