// StudentHistory file contains the history entries in the student's record history.

/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import { useState } from 'react';

// Function for every description having the same date
// Reference used in accordion component: https://www.freecodecamp.org/news/build-accordion-menu-in-react-without-external-libraries/

/*
Parent component: StudentRecordHistory.jsx
  main prop: main title of the history entry
  user prop: user name who made changes in the record
  time prop: time modified
  details prop: additional information about the modification done
*/

const RecordHistory = ({ main, user, time, details }) => {
  const [isActive, setIsActive] = useState(false); // variable flag to expand and collapse the accordion used in the additional details about the history

  return (
    <div className="border-t border-b-zinc-300">
      <div className="flex justify-between mt-2">
        {/* main description */}
        <p className="font-inter mb-1.5 m-1 text-sm font-semibold px-5">
          {main}
        </p>
        <button
          className="outline-none relative ml-auto mr-5 grow-0"
          type="button"
          onClick={() => setIsActive(!isActive)}
        >
          {/* collapse or expand button */}
          {isActive ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-[1.75vw] h-[1.75vw]"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-[1.75vw] h-[1.75vw]"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>
      </div>
      {/* more info about the changes */}
      {isActive && (
        // list of details about the main description
        <div>
          <ul className="ml-14 mb-1.5 list-disc">
            <li className="font-inter font-medium text-sm">{details}</li>
          </ul>
        </div>
      )}
      {/* user who modified */}
      <div className="font-inter mt-0.2 mb-3 mr-3.8 italic text-sm font-medium px-6">
        Modified by {user} at {time}
      </div>
    </div>
  );
};

export default RecordHistory;
