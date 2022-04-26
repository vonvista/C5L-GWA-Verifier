import 'tailwindcss/tailwind.css';

//For user options
//
//PROPS:
// handleCancel: function to handle click event
//
const Cancel = ({ handleCancel, ...rest }) => {
  const cancelbtn = `w-auto h-11 hover:bg-slate-200 border border-gray-600 m-0 rounded-xl text-slate-500 font-montserrat font-bold hover:shadow-lg disabled:hover:shadow-none`;
  const state = rest;
  

  return (
    <>
      <button className={cancelbtn} disbled={state.state} type="button" onClick={handleCancel}>
        Cancel
      </button>
    </>
  );
};

export default Cancel;
