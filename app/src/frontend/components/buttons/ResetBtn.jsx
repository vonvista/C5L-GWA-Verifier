import 'tailwindcss/tailwind.css';

// Parent Component >> UserDashboard.jsx

// Function that contains a functioning Reset button
// --handleClick prop: function to handle click event

const Reset = ({ handleClick }) => {
  const resetbtn = `w-[9vw] h-[4.847645429362881vh] bg-primary-red ml-0 mr-2 mt-2 mb-2 rounded-3xl text-white text-base font-montserrat font-bold hover:shadow-lg hover:bg-red-hover`;

  return (
    <>
      <button className={resetbtn} type="button" onClick={handleClick}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="[1.5vw] h-[1.5vw] m-auto inline-block"
          viewBox="0 0 23 23"
          fill="#fefefe"
        >
          <path d="M18 6h-6a2 2 0 0 0-2-2H6C4.346 4 3 5.346 3 7v10c0 1.654 1.346 3 3 3h12c1.654 0 3-1.346 3-3V9c0-1.654-1.346-3-3-3zM6 6h4a2 2 0 0 0 2 2h6a1 1 0 0 1 1 1H5V7a1 1 0 0 1 1-1zm12 12H6a1 1 0 0 1-1-1v-7h14v7a1 1 0 0 1-1 1zm-3-4H9a1 1 0 1 1 0-2h6a1 1 0 1 1 0 2z" />
        </svg>
        <p className="text-[0.9vw] m-1 inline-block">Clear all data</p>
      </button>
    </>
  );
};

export default Reset;
