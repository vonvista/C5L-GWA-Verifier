import ChecklistDetail from './ChecklistDetail';
import TextButton from './../../../../components/buttons/TextBtn'

export default function CheckListTab({ checklistData, setValData, handleApply}) {
  return (
    <div className="min-w-[25vw] max-w-[25vw] h-[41rem] max-h-[41rem] mx-auto p-5 block overflow-auto">
      <p className="text-sm font-inter ml-[0.5vw] text-left">
        The following are the details of the validation results from this
        student record's summary of grades:
      </p>
      {checklistData.map((data, idx) => {
        return (
          <div className="grid rounded-lg ml-[0.5vw] pt-2" key={idx}>
            <ChecklistDetail icon={data.status} detail={data.detail} setValData={setValData} index={idx} />
          </div>
        );
      }
      )}
      <button className="w-[11vw] h-[3vw] bg-button-green m-2 rounded-xl text-white text-base font-montserrat font-bold hover:shadow-lg hover:bg-button-green-hover" 
      type="button"
      onClick={handleApply}>
        <p className="p-2">Apply Changes</p>
      </button>
    </div>
  );
}
