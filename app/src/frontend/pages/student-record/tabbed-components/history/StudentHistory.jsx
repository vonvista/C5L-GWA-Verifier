import { ChevronUpIcon, PhotographIcon } from '@heroicons/react/solid';
import { useState } from 'react';
import Swal from 'sweetalert2';
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
    hasImage ---  display view image button based on hasImage
*/
const RecordHistory = ({ main, user, time, details, id, hasImage }) => {
  const [isActive, setIsActive] = useState(false); // variable flag to expand and collapse the accordion used in the additional details about the history
  const [ip, setIP] = useState(localStorage.getItem('ServerIP'));

  const handleImage = () => {

    //remove scroll
    const scrollY = window.scrollY;

    const image = {
      _id: id
    }

    fetch(`http://${ip}:3001/history/image`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Username")} ${localStorage.getItem("Password")}`},
          body: JSON.stringify(image),
      })
      .then((response) => response.json())
      .then((body) => {
          if(body.suc){
            //Swal image
            Swal.fire({
              heightAuto: false,
              padding: '20px',
              showCloseButton: true,
              showConfirmButton: false,
              focusConfirm: false,
              imageUrl: body.suc,
              didClose: () => {
                window.scrollTo(0, scrollY);
              }
            })
          }
          else {
            Swal.fire({
              title: 'Info',
              text: 'No image found / No image provided',
              icon: 'info',
              didClose: () => {
                window.scrollTo(0, scrollY);
              }
            })
          }
      })
      .catch(err => { //will activate if DB is not reachable or timed out or there are other errors
          Swal.fire({
              icon: 'error',
              title: 'Server Error',
              text: 'Check if the server is running or if database IP is correct',
              didClose: () => {
                window.scrollTo(0, scrollY);
              }
          })
          //console.log(err)
      })
  }

  return (
    <div className="border-t border-b-zinc-300">
      <div className="flex justify-between mt-[1vh]">
          
        {/* Main description */}
        <p className="font-inter p-[0.25vw] text-[0.95vw] mb-[1vh] font-semibold px-5 break-words">
          {main}
        </p>
        <button
          className="outline-none relative ml-auto mr-[0.75vw] grow-0"
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
          <ul className="ml-[3vw] mt-[0.5vh] mb-[1.5vh] pr-[2vw] text-[0.95vw] list-disc">
            <li className="font-inter font-medium break-words">{details}</li>
          </ul>

          {hasImage && ( // create clickable 'view image' button
            <button
              onClick={handleImage}
              className="font-poppins font-medium text-[0.9vw] inline-block ml-5 px-2 py-1 rounded-lg align-middle 
                        hover:bg-highlight hover:text-secondary-red bg-sr-dark-gray text-gray-700
                        transition ease-in-out duration-300 hover:transition hover:ease-in-out hover:duration-300" 
            >
              <PhotographIcon className="w-[1.25vw] h-[1.25vw] inline"/> 
              <span className="inline align-middle ml-1">
                View
              </span>
            </button>
          )}
        </div>
      )}

      {/* User who applied the changes */}
      <div className="mb-[1vh] px-5 text-[0.95vw] italic font-inter font-medium">
        Modified by {user} at {time}
      </div>
    </div>
  );
};


export default RecordHistory;