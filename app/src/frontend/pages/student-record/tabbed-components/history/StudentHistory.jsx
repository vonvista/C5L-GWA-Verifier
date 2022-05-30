import { useState } from 'react';
import { ChevronUpIcon } from '@heroicons/react/solid';
import 'tailwindcss/tailwind.css';
import Swal from 'sweetalert2';


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
const RecordHistory = ({ main, user, time, details, id }) => {
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
      <div className="flex justify-between mt-2">
          
        {/* Main description */}
        <p className="font-inter mb-3 m-1 font-semibold px-5">
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
            <li className="font-inter font-medium">{details}</li>
          </ul>
        </div>
      )}

      {/* Create clickable text 'View image' with underline */}
      <div className="font-inter mt-2 mb-3 mr-3.8 italic font-medium px-6" onClick={handleImage}>
        View Image
      </div>

      {/* User who applied the changes */}
      <div className="font-inter mt-2 mb-3 mr-3.8 italic font-medium px-6">
        Modified by {user} at {time}
      </div>
    </div>
  );
};


export default RecordHistory;