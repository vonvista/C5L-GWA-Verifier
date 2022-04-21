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
      <div className="ml-6 flex justify-between">
        {/* main description */}
        <h3 className="mb-0.5 m-1 font-inter font-semibold">{main}</h3>
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
          <ul className="ml-14 mb-0.5 font-inter list-disc">
            {details.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      )}
      <div className="mt-0.2 ml-6 mb-2 mr-3.8 font-inter italic">
        Modified by {user} at {time}
      </div>
    </div>
  );
};

export default RecordHistory;
