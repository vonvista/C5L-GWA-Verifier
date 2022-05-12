import 'tailwindcss/tailwind.css';
import upload from '../../../../assets/icons/upload.svg';

//Button for upload file 
//
//PROPS:
//handleClick: function to handle click event
//
const UploadFileBtn = ({handleClick, handleAddRecord}) => {
  const uploadbtn = `w-[11vw] h-[3vw] bg-login-green m-2 rounded-xl text-white text-base font-montserrat font-bold hover:shadow-lg hover:bg-login-green-hover`;

  // function that "clicks" the input tag to open file dialog window
  function openFileDialog() {
    document.getElementById("myfile").click()
  }

  return (
    <>
      <input type="file" id="myfile" accept="application/pdf" style={{"display":"none"}} onChange={() => handleClick(document.getElementById("myfile").files[0], handleAddRecord)}/>
      <button className={uploadbtn} type="button" onClick={openFileDialog}>
        <img
          className="p-0.25 ml-0.25 mr-1.5 inline-flex w-[2vw] h-[2vw]"
          alt="icon"
          src={upload}
        />
        <p className="text-[0.9vw] inline-block">Upload a file</p>
      </button>
    </>
  );
};

export default UploadFileBtn;
