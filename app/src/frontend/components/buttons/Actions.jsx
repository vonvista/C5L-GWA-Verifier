import 'tailwindcss/tailwind.css';
import edit from '../../../../assets/icons/edit.svg';
import deleteSVG from '../../../../assets/icons/delete.svg';

// Function contains the Actions buttons (edit and delete)

// PROPS:
// handleEdit, handleDelete: function to handle click event

const Actions = ({ handleEdit, handleDelete }) => {
  const btn = `
    .btn{
      width: 2vw;
      height: 2vw;
  }`; // styling of image inside the button

  const buttons = `w-8 h-8 hover:bg-slate-300 rounded-3xl bg-slate-200 relative ml-2 grow btn`; // styling of button

  return (
    <div className="pr-1.5 mr-0 w-24 items-center justify-items-center inline-block grow">
      <style>{btn}</style>
      {/* edit */}
      <button className={buttons} type="button" onClick={handleEdit}>
        <img className="btn" alt="icon" src={edit} />
      </button>
      {/* delete */}
      <button className={buttons} type="button" onClick={handleDelete}>
        <img className="btn" alt="icon" src={deleteSVG} />
      </button>
    </div>
  );
};

export default Actions;
