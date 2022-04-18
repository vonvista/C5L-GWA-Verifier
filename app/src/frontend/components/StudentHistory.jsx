// StudentHistory file contains the history entries in the student's record history.

/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import { useState } from 'react';
import collapse from '../../../assets/icons/collapse.svg';
import expand from '../../../assets/icons/expand.svg';

// Function for every description having the same date
// Reference used in accordion component: https://www.freecodecamp.org/news/build-accordion-menu-in-react-without-external-libraries/
const RecordHistory = ({ main, user, time, details }) => {
  const [isActive, setIsActive] = useState(false); // variable flag to expand and collapse the accordion used in the additional details about the history

  return (
    <div className="border-b-2 border-b-zinc-300">
      <div className="ml-7 flex justify-between">
        {/* main description */}
        <h3 className="mb-2 m-2.5 font-inter font-semibold">{main}</h3>
        <button
          className="bg-transparent outline-none relative ml-auto grow-0"
          type="button"
          onClick={() => setIsActive(!isActive)}
        >
          {isActive ? (
            <img width="20px" height="20px" alt="icon" src={collapse} />
          ) : (
            <img width="20px" height="20px" alt="icon" src={expand} />
          )}
        </button>
      </div>
      {isActive && (
        // list of details about the main description
        <div>
          {details.map((item, i) => (
            <ul key={i} className="ml-20 mb-0.5 font-inter list-disc">
              <li key={i}>{item}</li>
            </ul>
          ))}
        </div>
      )}
      <div className="mt-0.2 ml-12 mb-2 mr-3.8 font-inter italic">
        Modified by {user} at {time}
      </div>
    </div>
  );
};

// Function for every date
const StudentHistoryData = ({ date, info }) => {
  return (
    <section className="pt-4 pr-7 pb-3 rounded-lg">
      {/* History per date */}
      <div className="rounded-lg border-b-2 border-t-2 border-solid border-t-zinc-200 border-b-zinc-200">
        <h2 className="pt-1 pb-1.5 ml-7 font-inter font-light text-base">
          Last Modified: {date}
        </h2>
        <hr />
        {/* descriptions of the same date */}
        {info.map(({ main, user, time, details, i }) => (
          <RecordHistory
            key={i}
            main={main}
            user={user}
            time={time}
            details={details}
          />
        ))}
      </div>
    </section>
  );
};
export default StudentHistoryData;
