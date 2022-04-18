import 'tailwindcss/tailwind.css';
import add from '../../../../assets/icons/add.svg';
// Function contains the Add button from Student Record View/Edit Page
const Add = () => {
  const addbtn = `w-20 h-8 bg-login-green m-2 rounded-xl text-white font-montserrat font-bold hover:shadow-lg hover:bg-login-green-hover`;

  return (
    <>
      <button className={addbtn} type="button">
        <img
          className="p-0.25 ml-0.25 mr-1.5 inline-flex"
          width="20px"
          height="20px"
          alt="icon"
          src={add}
        />
        <p className="text-sm inline-block">Add</p>
      </button>
    </>
  );
};

export default Add;
