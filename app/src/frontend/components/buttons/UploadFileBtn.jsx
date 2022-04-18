import 'tailwindcss/tailwind.css';
import upload from '../../../../assets/icons/upload.svg';

const UploadFileBtn = () => {
  const uploadbtn = `w-40 h-11 bg-login-green m-2 rounded-xl text-white text-base font-montserrat font-bold hover:shadow-lg hover:bg-login-green-hover`;

  return (
    <>
      <button className={uploadbtn} type="button">
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
