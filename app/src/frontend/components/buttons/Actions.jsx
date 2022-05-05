import 'tailwindcss/tailwind.css';
import edit from '../../../../assets/icons/edit.svg';
import deleteSVG from '../../../../assets/icons/delete.svg';

// Function contains the Actions buttons (edit and delete)

// PROPS:
// handleEdit, handleDelete: function to handle click event

const Actions = ({ handleEdit, handleDelete, data }) => {
  const btn = `
    .btn{
      width: 2vw;
      height: 2vw;
  }`; // styling of image inside the button

  const buttons = `transition-all ease-out delay-150 hover:transition-all hover:ease-out hover:delay-150 w-8 h-8 hover:bg-slate-300 rounded-3xl bg-slate-200 relative mx-1 grow btn`; // styling of button

  return (
    <div className="mx-auto w-auto items-center justify-items-center inline-block">
      
      <style>{btn}</style>
      {/* edit */}
      <button className={buttons} type="button" onClick={handleEdit}>
        <img className="btn" alt="icon" src={edit} />
      </button>
      {/* delete */}
      {/*This is for user management page lang -vov*/}
      {data && data.Role === "admin" ? (<></>) : (

      <button className={buttons} type="button" onClick={handleDelete}>
        <img className="btn" alt="icon" src={deleteSVG} />
      </button>
      )}
    </div>
  );
};

export default Actions;
