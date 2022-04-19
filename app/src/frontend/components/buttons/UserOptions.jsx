import 'tailwindcss/tailwind.css';

const UserOptions = () => {
  const savebtn = `w-40 h-11 inline-block bg-login-green rounded-xl text-white font-montserrat font-bold hover:shadow-lg hover:bg-login-green-hover`;
  const discardbtn = `w-40 h-11 mb-2 inline-block hover:bg-slate-200 border border-gray-600 rounded-xl text-slate-500 font-montserrat font-bold hover:shadow-lg`;

  return (
    <div className="w-40 h-24 flex-col inline-flex grow">
      <button className={discardbtn} type="button">
        Discard
      </button>
      <button className={savebtn} type="button">
        Save
      </button>
    </div>
  );
};

export default UserOptions;