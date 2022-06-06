import 'tailwindcss/tailwind.css';
import { CheckCircleIcon , XCircleIcon } from '@heroicons/react/outline'


/* Parent component >> ./ChecklistTab */

/* This component is used for displaying necessary data/details with its corresponding icons (check/cross). */
/* Props:
    icon    --- receives the number which icon to be displayed: 0 for default, 1 for checkmark, else crossmark
    detail  --- receives the statement to be displayed
    setValData  --- function that handles the validation status
    index       --- holds the index of the checklist detail to be modified
*/
const ChecklistDetail = ({ icon, detail, setValData, index}) => {
  return (
    <div className="flex w-full items-center"
        //on hover change cursor to pointer
        onMouseEnter={() => document.body.style.cursor = 'pointer'}
        onMouseLeave={() => document.body.style.cursor = 'default'}
        onClick={() => {
        setValData(index);
        }}
    >
      {/* Icon to be displayed */}
      {icon === true ? (
        <CheckCircleIcon className="w-[2vw] text-[#79C679]"/>
      ) : (
        <XCircleIcon className="w-[2vw] text-[#FE7979]"/>
      )}
      {/* Detail */}
      <span className="ml-2 text-xs xl:text-sm 1.75xl:text-base 3xl:text-lg 4xl:text-[0.95vw] font-inter">{detail}</span>
    </div>
  );
};


export default ChecklistDetail;