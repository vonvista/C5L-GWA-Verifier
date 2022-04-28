import 'tailwindcss/tailwind.css';
import upload from '../../../../assets/icons/upload.svg';

//Button for upload file 
//
//PROPS:
//handleClick: function to handle click event
//
const UploadFileBtn = ({handleClick}) => {
  const uploadbtn = `w-40 h-11 bg-login-green m-2 rounded-xl text-white text-base font-montserrat font-bold hover:shadow-lg hover:bg-login-green-hover`;

  // function that "clicks" the input tag to open file dialog window
  function openFileDialog() {
    document.getElementById("myfile").click()
  }

  return (
    <>
      <input type="file" id="myfile" style={{"display":"none"}} onChange={() => handleClick(document.getElementById("myfile").files[0])}/>
      <button className={uploadbtn} type="button" onClick={openFileDialog}>
        <img
          className="p-0.25 ml-0.25 mr-1.5 inline-flex"
          width="30px"
          height="30px"
          alt="icon"
          src={upload}
        />
        <p className="text-sm inline-block">Upload a file</p>
      </button>
    </>
  );
};

export default UploadFileBtn;
