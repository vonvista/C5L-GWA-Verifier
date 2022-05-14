import 'tailwindcss/tailwind.css';
import exportIcon from '../../../../assets/icons/export.svg';

//Button for export file 
//
//PROPS:
//handleClick: function to handle click event
//
const ExportFileBtn = () => {
  const exportbtn = `w-[11vw] h-[3vw] bg-export-yellow m-2 rounded-xl text-white text-base font-montserrat font-bold hover:shadow-lg hover:bg-export-yellow-hover`;

  // function that "clicks" the input tag to open file dialog window
  function exportFile() {
    // insert backend stuff
    ;
  }

  return (
    <>
      <button className={exportbtn} type="button" onClick={exportFile}>
        <img
          className="p-0.25 ml-0.25 mr-1.5 inline-flex w-[2vw] h-[2vw]"
          alt="icon"
          src={exportIcon}
        />
        <p className="text-[0.9vw] inline-block">Export as PDF</p>
      </button>
    </>
  );
};

export default ExportFileBtn;
