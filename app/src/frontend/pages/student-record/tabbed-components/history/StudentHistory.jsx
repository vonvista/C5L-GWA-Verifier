import { useState } from 'react';
import { ChevronUpIcon } from '@heroicons/react/solid';
import 'tailwindcss/tailwind.css';


/* Parent component >> ./StudentRecordHistory */

/* This function contains the history entries in the student's record history.
   Function for every description having the same date.
   Reference used in accordion component: https://www.freecodecamp.org/news/build-accordion-menu-in-react-without-external-libraries/ */

/* Props:
    main     ---  main title of the history entry
    user     ---  user name who made changes in the record
    time     ---  time modified
    details  ---  additional information about the modification done
*/
const RecordHistory = ({ main, user, time, details }) => {
  const [isActive, setIsActive] = useState(false); // variable flag to expand and collapse the accordion used in the additional details about the history

  return (
    <div className="border-t border-b-zinc-300">
      <div className="flex justify-between mt-2">
          
        {/* Main description */}
        <p className="font-inter mb-3 m-1 text-md 2xl:text-lg font-semibold px-5">
          {main}
        </p>
        <button
          className="outline-none relative ml-auto mr-5 grow-0"
          type="button"
          onClick={() => setIsActive(!isActive)}
        >
          {/* Collapse or Expand button */}
          <ChevronUpIcon
              className={`${
                  !isActive ? 'transform rotate-180' : ''
              } w-[1.75vw] h-[1.75vw] duration-200`}
          />          
        </button>
      </div>

      {/* Description about the changes */}
      {isActive && (
        <div>
          <ul className="ml-14 mb-5 list-disc">
            <li className="font-inter font-medium text-md 2xl:text-lg">{details}</li>
          </ul>
        </div>
      )}

      {/* User who applied the changes */}
      <div className="font-inter mt-2 mb-3 mr-3.8 italic text-md 2xl:text-lg font-medium px-6">
        Modified by {user} at {time}
      </div>
    </div>
  );
};


export default RecordHistory;