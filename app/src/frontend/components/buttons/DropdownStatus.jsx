import 'tailwindcss/tailwind.css';
import { useState } from 'react';
import expand from '../../../../assets/icons/collapse(1).svg';

// Function contains the buttons in Actions Dropdown seen in Student Record View/Edit Page
// Additional references: https://tailwindui.com/components/application-ui/elements/dropdowns
const Dropdown = () => {
  const [valueClicked, setValueClicked] = useState('Status');
  const [isActive, setIsActive] = useState(false);
  return (
    <div className="w-40 relative m-auto grow-0">
      {/* Actions and arrow down */}
      <div className="grid-cols-2 divide-x w-40 p-2 bg-white mr-0 rounded-lg flex inline-flex items-center justify-items-center rounded-lg">
        <button
          type="button"
          className="pl-1.75 m-0 inline-block grow hover:bg-login-green-hover rounded-l-lg"
          // add onclick
        >
          <p className="pl-1.5 m-0 inline-block grow text-center ">
            {valueClicked}
          </p>
        </button>
        <button
          type="button"
          className="pl-1.5 m-0 inline-block bg-login-green grow hover:bg-login-green-hover rounded-r-lg"
          onClick={() => {
            setIsActive(!isActive);
          }}
        >
          <section className="pl-1.5 m-0 inline-block grow">
            <img
              className="p-0.25 inline-flex"
              width="20px"
              height="20px"
              alt="icon"
              src={expand}
            />
          </section>
        </button>
      </div>
      {isActive ? (
        // buttons after expanding
        <div
          className="origin-top-right z-50 absolute right-0 mt-0.5 w-full rounded-md shadow-lg ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none"
          tabIndex="-1"
        >
          <div className="pt-1 bg-login-green rounded-lg">
            <button
              className="text-gray-700 block px-4 py-2 text-sm z-1 w-full hover:bg-login-green-hover hover:rounded-t-lg"
              type="button"
              onClick={() => {
                setIsActive(!isActive);
                setValueClicked('Unchecked');
              }}
            >
              <p className="text-white">Unchecked</p>
            </button>
            <button
              className="text-gray-700 block px-4 py-2 text-sm z-1 w-full hover:bg-login-green-hover hover:rounded-t-lg"
              type="button"
              onClick={() => {
                setIsActive(!isActive);
                setValueClicked('Pending');
              }}
            >
              <p className="text-white">Pending</p>
            </button>
            <button
              className="text-gray-700 block px-4 py-2 text-sm z-1 w-full hover:bg-login-green-hover hover:rounded-t-lg"
              type="button"
              onClick={() => {
                setIsActive(!isActive);
                setValueClicked('Checked');
              }}
            >
              <p className="text-white">Checked</p>
            </button>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Dropdown;
