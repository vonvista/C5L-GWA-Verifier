import 'tailwindcss/tailwind.css';

// Edit button
const Edit = () => {
  const editbtn = `w-40 h-11 hover:bg-slate-200 border border-gray-600 m-1.25 rounded-xl text-slate-500 font-montserrat font-bold hover:shadow-lg`;

  return (
    <>
      <button className={editbtn} type="button">
        Edit
      </button>
    </>
  );
};

export default Edit;
