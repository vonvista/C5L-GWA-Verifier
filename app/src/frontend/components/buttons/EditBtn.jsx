import 'tailwindcss/tailwind.css';


// Function contains the Edit button from Student Record View/Edit Page's Dropdown Menu
// -- handleClick prop: function to handle click event

const Edit = ({ handleClick }) => {
  const editBtnStyle = `text-gray-700 block px-4 rounded-xl py-2 text-sm z-1 w-full hover:bg-button-green-hover`;

  return (
    <>
      <button
        className={editBtnStyle}
        type="button"
        onClick={handleClick}
      >
        <p className="text-white">Edit</p>
      </button>
    </>
  );
};

export default Edit;
