// StudentHistory file contains the history entries in the student's record history.

/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import { useState } from 'react';
import collapse from '../../../../../assets/icons/collapse.svg';
import expand from '../../../../../assets/icons/expand.svg';

// Function for every description having the same date
// Reference used in accordion component: https://www.freecodecamp.org/news/build-accordion-menu-in-react-without-external-libraries/
const RecordHistory = ({ main, user, time, details }) => {
  const [isActive, setIsActive] = useState(false); // variable flag to expand and collapse the accordion used in the additional details about the history

  return (
    <div className="border-t border-b-zinc-300">
      <div className="flex justify-between mt-2">
        {/* main description */}
        <h3 className="inter mb-0.5 m-1 text-sm font-semibold px-5">{main}</h3>
        <button
          className="outline-none relative ml-auto mr-5 grow-0"
          type="button"
          onClick={() => setIsActive(!isActive)}
        >
          {isActive ? (
            <img className="w-[1vw] h-[1vw]" alt="icon" src={collapse} />
          ) : (
            <img className="w-[1vw] h-[1vw]" alt="icon" src={expand} />
          )}
        </button>
      </div>
      {isActive && (
        // list of details about the main description
        <div>
          <ul className="ml-14 mb-0.5 list-disc">
            <li className="inter text-[1vw]">{details}</li>
          </ul>
        </div>
      )}
      <div className="inter mt-0.2 mb-3 mr-3.8 italic text-sm px-6">
        Modified by {user} at {time}
      </div>
    </div>
  );
};

export default RecordHistory;
