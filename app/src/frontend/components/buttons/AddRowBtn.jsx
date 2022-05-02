import 'tailwindcss/tailwind.css';
import add from '../../../../assets/icons/addRow.svg';


// Function contains the Add Row button from Student Record View/Edit Page

// PROPS:
// handleClick: function to handle click event

const AddRowBtn = ({ handleClick }) => {
  const addRowStyle = `w-3/5 h-8 bg-login-green mb-3 rounded-xl text-white font-montserrat font-bold hover:shadow-lg hover:bg-login-green-hover`;

  return (
    <>
      <button className={addRowStyle} type="button" onClick={handleClick}>
        <img
          className="p-0.25 my-1.5 ml-0.25 mr-1.5 inline-flex"
          width="18px"
          height="18px"
          alt="icon"
          src={add}
        />
        <p className="text-xs inline-block">Add Row</p>
      </button>
    </>
  );
};

export default AddRowBtn;
