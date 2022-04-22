import 'tailwindcss/tailwind.css';
import edit from '../../../../assets/icons/edit.svg';
import deleteSVG from '../../../../assets/icons/delete.svg';


//Function contains the Actions buttons (edit and delete)
//
//PROPS:
//handleEdit, handleDelete: function to handle click event
//
const Actions = ({handleEdit, handleDelete}) => {
  const textClass = `w-8 h-8 hover:bg-slate-300 rounded-3xl bg-slate-200 relative ml-2 grow`;
  const img = `p-0.25 inline-flex`;
  return (
    <div className="pr-1.5 mr-0 w-24 items-center justify-items-center inline-block grow">
      {/* edit */}
      <button className={textClass} type="button" onClick={handleEdit}>
        <img className={img} width="25px" height="25px" alt="icon" src={edit} />
      </button>
      {/* delete */}
      <button className={textClass} type="button" onClick={handleDelete}>
        <img
          className={img}
          width="25px"
          height="25px"
          alt="icon"
          src={deleteSVG}
        />
      </button>
    </div>
  );
};

export default Actions;
