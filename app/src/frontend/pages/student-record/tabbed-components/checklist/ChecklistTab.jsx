import 'tailwindcss/tailwind.css';
import ChecklistDetail from './ChecklistDetail';


/* Parent component >> frontend/pages/student-record/StudentViewRecord */

/* This function contains the list or details of the validation result from student's summary of record. */
/* Props:
    checklistData   ---  validation state of the student's summary of record
    setValData      ---  function that handles the validation status
    handleApply     ---  function used to apply the changes done on the validation status of the record
*/
export default function CheckListTab ({ checklistData, setValData, handleApply }) {

    return (
        <div className="min-w-[25vw] max-w-[25vw] h-[41rem] max-h-[41rem] mx-auto p-5 block overflow-auto">
            <p className="text-base 2xl:text-lg font-inter ml-[0.5vw] text-left mb-3">
                The following are the details of the validation results from this
                student record's summary of grades:
            </p>

            {/* Mapping the list of details */}
            {checklistData.map((data, idx) => {
                return (
                <div className="grid rounded-lg ml-[0.5vw] pt-2" key={idx}>
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
            <button
                className="h-9 px-5 flex items-center mt-6 rounded-xl bg-button-green text-white font-montserrat font-bold transition ease-out hover:transition hover:ease-in hover:shadow-lg hover:bg-button-green-hover"
                type="button"
                onClick={handleApply}
            >
                <p className="text-sm 2xl:text-base font-poppins font-medium inline-block">Apply Changes</p>
            </button>
        </div>
    );
}
