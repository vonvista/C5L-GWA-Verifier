/* eslint-disable import/named */
// StudentRecordHistory contains the tab component of the student record history.
// ----- new changes: modal to tab

// import { useState } from 'react';
import RecordHistory from './StudentHistory';
import './StudentRecordHistory.css';
import 'tailwindcss/tailwind.css';

const StudentRecordHistory = () => {
  // const historyData = [];
  const historyData = [
    {
      date: 'MM-DD-YYYY',
      info: [
        // history entries
        {
          main: 'Main Description',
          user: 'User',
          time: 'HH:MM:SS',
          details: 'Details about the changes\n',
        },
        {
          main: 'Main Description',
          user: 'User',
          time: 'HH:MM:SS',
          details: 'Details about the changes\n',
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
          details: 'Details about the changes\n',
        },
      ],
    },
  ];

  if (historyData.length === 0) {
    return (
      <>
        <div className="modal-content">
          <div className="modal-body">
            <h2 className="inter font-light text-sm italic">
              No Student Record History found.
            </h2>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="modal-content">
        {/* history body; Last modified and descriptions */}
        <div className="modal-body">
          {historyData.map(({ date, info, i }) => (
            <section key={i} className="pt-1 pr-3.5 pb-3 rounded-lg">
              {/* History per date */}
              <div className="rounded border-b-2 border-t-2 border-solid border-t-zinc-200 border-b-zinc-200">
                <h2 className="inter pt-1 pb-1.5 ml-4 font-light text-sm">
                  Last Modified: {date}
                </h2>
                <hr />
                {/* descriptions of the same date */}
                {info.map(({ main, user, time, details, j }) => (
                  <RecordHistory
                    key={j}
                    main={main}
                    user={user}
                    time={time}
                    details={details}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </>
  );
};

export default StudentRecordHistory;
