/*
ChecklistTab.jsx file contains the list or details of the validation result from student's summary of record
Parent Component: StudentViewRecord.jsx

checklistData prop: validation state of the student's summary of record
setValData prop: function that handles the validation status
handleApply prop: function used to apply the changes done on the validation status of the record

*/

import ChecklistDetail from './ChecklistDetail';

export default function CheckListTab({
  checklistData,
  setValData,
  handleApply,
}) {
  return (
    <div className="min-w-[25vw] max-w-[25vw] h-[41rem] max-h-[41rem] mx-auto p-5 block overflow-auto">
      <p className="text-sm font-inter ml-[0.5vw] text-left">
        The following are the details of the validation results from this
        student record's summary of grades:
      </p>
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
      <button
        className="w-[11vw] h-[3vw] bg-button-green m-2 rounded-xl text-white text-base font-montserrat font-bold hover:shadow-lg hover:bg-button-green-hover"
        type="button"
        onClick={handleApply}
      >
        <p className="p-2">Apply Changes</p>
      </button>
    </div>
  );
}
