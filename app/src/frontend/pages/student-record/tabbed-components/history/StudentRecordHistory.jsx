/* eslint-disable import/named */
// StudentRecordHistory contains the tab component of the student record history.
// ----- new changes: modal to tab

import RecordHistory from './StudentHistory';
import 'tailwindcss/tailwind.css';

const StudentRecordHistory = ({ historyData, ...rest }) => {
  return (
    <>
      <div className="min-w-[25vw] max-w-[25vw] p-5 max-h-[41rem] flex-col my-0 mx-auto relative overflow-auto">
        {/* history body; Last modified and descriptions */}
        <div className="flex-col h-full m-0 overflow-y-auto p-0 relative w-full">
          {historyData.length === 0 ? (
            <h2 className="font-inter font-light text-[1.05vw] italic">
              No Student Record History found.
            </h2>
          ) : (
            historyData.map(({ date, info, i }) => (
              <section key={i} className="mb-3">
                {/* History per date */}
                <div className="rounded-lg border border-solid border-t-zinc-200 border-b-zinc-200">
                  <h2 className="font-inter pt-2 pb-2 pl-4 font-light text-sm">
                    Last Modified: {date}
                  </h2>
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
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default StudentRecordHistory;
