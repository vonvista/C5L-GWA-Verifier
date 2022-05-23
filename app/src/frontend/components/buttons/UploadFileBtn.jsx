import 'tailwindcss/tailwind.css';
import upload from '../../../../assets/icons/upload.svg';
import Swal from 'sweetalert2';


// Parent component >> UserDashboard.jsx

// This button component is used for uploading files
// -- handleClick prop  : function to handle click event
// -- handleAddRecord   : function to handle addition of new student record

const UploadFileBtn = ({handleClick, handleAddRecord}) => {
  const uploadbtn = `w-[11vw] h-[3vw] bg-button-green m-2 rounded-xl text-white text-base font-montserrat font-bold hover:shadow-lg hover:bg-button-green-hover`;
  const ip = localStorage.getItem("ServerIP");

  // function that "clicks" the input tag to open file dialog window
  function openFileDialog() {
    Swal.fire({
      title: 'Upload File',
      text: 'Select method of file upload',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Single',
      denyButtonText: 'Bulk',
      denyButtonColor: '#2a7546',
    }).then((result) => {
      if (result.isConfirmed) {
        document.getElementById("singleFile").value = null;
        document.getElementById("singleFile").click();
      } else if (result.isDenied) {
        document.getElementById("bulkFile").value = null;
        document.getElementById("bulkFile").click();
      }
    })
  }

  function handleOnChange(uploadMethod) {
    let file;
    if (uploadMethod) {
      file = document.getElementById("singleFile");
    } else {
      file = document.getElementById("bulkFile");
    }

    handleClick(file, handleAddRecord);
  }  

  return (
    <>
      <input type="file" id="singleFile" accept="application/pdf" style={{"display":"none"}} onChange={() => handleOnChange(true)} />
      <input type="file" id="bulkFile" accept="application/pdf" style={{"display":"none"}} onChange={() => handleOnChange(false)} multiple/>
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
