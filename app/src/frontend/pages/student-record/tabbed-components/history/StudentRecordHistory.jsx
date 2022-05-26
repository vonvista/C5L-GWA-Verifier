import RecordHistory from './StudentHistory';
import 'tailwindcss/tailwind.css';


/* Parent component >> frontend/pages/student-record/StudentViewRecord */

/* This function contains the contents of the tab component called "History". */
/* Props:
    historyData  ---  data of changes done on given record
*/
const StudentRecordHistory = ({ historyData, ...rest }) => {
  return (
    <>
      <div className="min-w-[25vw] max-w-[25vw] p-5 max-h-[41rem] flex-col my-0 mx-auto relative overflow-auto">
        
        {/* History Body; Last modified and descriptions */}
        <div className="flex-col h-full m-0 overflow-y-auto p-0 relative w-full">
          {historyData.length === 0 ? ( // no changes or modifications done yet
            <h2 className="font-inter font-light text-[1.05vw] italic">
              No Student Record History found.
            </h2>
          ) : (
            historyData.map(
              (
                { date, info, i } // shows the changes done; date: modification data; info: modification entries; i: index
              ) => (
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
              )
            )
          )}
        </div>
      </div>
    </>
  );
};


export default StudentRecordHistory;