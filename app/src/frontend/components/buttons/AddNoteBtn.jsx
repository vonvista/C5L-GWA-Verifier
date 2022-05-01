import 'tailwindcss/tailwind.css';
import addNote from '../../../../assets/icons/addNote.svg';

// Function contains the Add Note button from Student Record View/Edit Page

// PROPS:
// handleClick: function to handle click event

const AddNoteBtn = ({ handleClick }) => {
  const addNoteStyle = `px-1.5 flex items-center rounded-xl text-bg-primary-red font-montserrat font-bold hover:bg-white`;

  return (
    <>
      <button className={addNoteStyle} type="button" onClick={handleClick}>
        <img
          className="my-1.5 ml-0.25 mr-1.5 inline-flex"
          width="18px"
          height="18px"
          alt="icon"
          src={addNote}
        />
        <p className="text-sm inline-block">Add Note</p>
      </button>
    </>
  );
};

export default AddNoteBtn;
