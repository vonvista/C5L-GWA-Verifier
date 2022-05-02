import 'tailwindcss/tailwind.css';
import edit from '../../../../assets/icons/edit.svg';
import deleteSVG from '../../../../assets/icons/delete.svg';

// Function contains the Actions buttons (save and cancel)
// Used actions.jsx as base to keep consistency

// PROPS:
// handleSave, handleCancel: function to handle click event

const ActionsSaveCancel = ({ handleSave, handleCancel, isDisabled }) => {
  const btn = `
    .btn{
      width: 2vw;
      height: 2vw;
      color: #121212;
  }`; // styling of image inside the button

  const buttons = `transition-all ease-out delay-150 hover:transition-all hover:ease-out hover:delay-150 w-8 h-8 hover:bg-slate-300 rounded-3xl bg-slate-200 relative mx-1 grow btn`; // styling of button

  return (
    <div className="mx-auto w-auto items-center justify-items-center inline-block">
      <style>{btn}</style>
      {/* edit */}
      <button className={buttons} type="submit" onClick={handleSave}>
        <svg xmlns="http://www.w3.org/2000/svg" className="btn" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      </button>
      {/* delete */}
      <button className={buttons} type="button" onClick={handleCancel}>
        <svg xmlns="http://www.w3.org/2000/svg" className="btn" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
};

export default ActionsSaveCancel;