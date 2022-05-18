import 'tailwindcss/tailwind.css';


// Function contains the Edit button from Student Record View/Edit Page's Dropdown Menu
// -- handleClick prop: function to handle click event

const Edit = ({ handleClick }) => {
  const editbtn = `w-20 h-8 bg-login-green m-2 rounded-xl text-white font-montserrat font-bold hover:shadow-lg hover:bg-login-green-hover`;

  return (
    <>
      <button
        className="text-gray-700 block px-4 rounded-xl py-2 text-sm z-1 w-full hover:bg-login-green-hover"
        type="button"
        onClick={handleClick}
      >
        <p className="text-white">Edit</p>
      </button>
    </>
  );
};

export default Edit;
