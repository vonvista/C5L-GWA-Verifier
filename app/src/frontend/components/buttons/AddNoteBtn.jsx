import 'tailwindcss/tailwind.css';
import addNote from '../../../../assets/icons/addRow.svg';

// Function contains the Add Note button from Student Record View/Edit Page

// PROPS:
// handleClick: function to handle click event

const AddNoteBtn = ({ handleClick }) => {
  const addNoteStyle = `h-8 px-3.5 flex items-center mb-2 rounded-xl bg-login-green text-white font-montserrat font-bold hover:shadow-lg hover:bg-login-green-hover`;

  return (
    <>
      <button className={addNoteStyle} type="button" onClick={handleClick}>
        <img
          className="p-0.25 my-1.5 ml-0.25 mr-1.5 inline-flex"
          width="18px"
          height="18px"
          alt="icon"
          src={addNote}
        />
        <p className="text-xs inline-block">Add Note</p>
      </button>
    </>
  );
};

export default AddNoteBtn;
