import 'tailwindcss/tailwind.css';

const VerifyCancel = () => {
  const verifybtn = `w-40 h-11 bg-login-green m-2 rounded-xl text-white font-montserrat font-bold hover:shadow-lg hover:bg-login-green-hover`;
  const cancelbtn = `w-40 h-11 hover:bg-slate-200 border border-gray-600 m-1.25 rounded-xl text-slate-500 font-montserrat font-bold hover:shadow-lg`;

  return (
    <>
      <button className={verifybtn} type="button">
        Verify
      </button>
      <button className={cancelbtn} type="button">
        Cancel
      </button>
    </>
  );
};

export default VerifyCancel;
