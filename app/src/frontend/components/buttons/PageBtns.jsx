import 'tailwindcss/tailwind.css';
import next from '../../../../assets/icons/next.svg';
import previous from '../../../../assets/icons/previous.svg';

//Button for page navigation
//
//PROPS:
//handleNext, handlePrev: function to handle click event
const PageBtns = ({ handleNext, handlePrev }) => {
  const img = `p-0.25 inline-flex`;
  return (
    <div className="grid-cols-2 divide-x w-40 p-2 ml-2 mr-0 rounded-lg flex inline-flex items-center justify-items-center rounded-lg border border-slate-300">
      <button
        type="button"
        className="pl-1.5 m-0 w-80 inline-block grow hover:bg-gray-100 rounded-l-lg"
        onClick={handlePrev}
      >
        <img
          className={img}
          width="25px"
          height="25px"
          alt="icon"
          src={previous}
        />
      </button>
      <button
        type="button"
        className="pl-1.5 m-0 w-80 inline-block grow hover:bg-gray-100 rounded-r-lg"
        onClick={handleNext}
      >
        <img className={img} width="25px" height="25px" alt="icon" src={next} />
      </button>
    </div>
  );
};

export default PageBtns;
