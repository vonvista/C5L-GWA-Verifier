import { check } from 'prettier';
import { useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import ChecklistDetail from './ChecklistDetail';

/* Parent component >> frontend/pages/student-record/StudentViewRecord */

/* This function contains the list or details of the validation result from student's summary of record. */
/* Props:
    oldDataState    ---  old validation state of the student's summary of record
    checklistData   ---  validation state of the student's summary of record
    setValData      ---  function that handles the validation status
    handleApply     ---  function used to apply the changes done on the validation status of the record
*/
export default function CheckListTab({ oldDataState, checklistData, setValData, handleApply }) {
  
  const ApplyChangesButton = (index) => {
    for (let i = 0; i < checklistData.length; i++) {
      if (oldDataState[i].status !== checklistData[i].status) {
        // checks if there are changes on validation status
        return (
          <button
            className="h-7 1.75xl:h-8 5xl:h-[3.25vh] px-4 5xl:px-[0.85vw] flex items-center mt-[2vh] rounded-xl bg-button-green text-white font-montserrat font-bold transition ease-out hover:transition hover:ease-in hover:shadow-lg hover:bg-button-green-hover"
            type="button"
            onClick={handleApply}
          >
            <p className="text-xs 1.75xl:text-sm 3xl:text-base 4xl:text-[0.8vw] font-poppins font-medium inline-block">
              Apply Changes
            </p>
          </button>
        );
      }
    }
    // disables button if no changes on status
    return (
      <button
        className="h-7 1.75xl:h-8 5xl:h-[3.25vh] px-4 5xl:px-[0.85vw] flex items-center mt-[2vh] rounded-xl bg-button-green text-white font-montserrat font-bold transition ease-out disabled:bg-sr-disabled-green disabled:hover:bg-sr-disabled-green"
        type="button"
        onClick={handleApply}
        disabled
      >
        <p className="text-xs 1.75xl:text-sm 3xl:text-base 4xl:text-[0.8vw] font-poppins font-medium inline-block">
          Apply Changes
        </p>
      </button>
    );
  };

  
  return (
    <div className="min-w-[25vw] max-w-[25vw] h-full max-h-[61vh] mx-auto p-[1vw] block overflow-auto">
      <p className="text-xs xl:text-sm 1.75xl:text-base 3xl:text-lg 4xl:text-[0.95vw] 3xl:leading-7 5xl:leading-10 font-inter ml-[0.5vw] text-left mb-[2vh]">
        The following are the details of the validation results from this
        student record's summary of grades:
      </p>

      {/* Mapping the list of details */}
      {checklistData.map((data, idx) => {
        return (
          <div className="grid rounded-lg ml-[0.5vw] p-[0.2vh]" key={idx}>
            <ChecklistDetail
              icon={data.status}
              detail={data.detail}
              setValData={setValData}
              index={idx}
            />
          </div>
        );
      })}

      {/* Apply changes button */}
      <ApplyChangesButton />
    </div>
  );
}
