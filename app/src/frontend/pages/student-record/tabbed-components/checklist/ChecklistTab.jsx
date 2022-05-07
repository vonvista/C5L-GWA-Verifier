import ChecklistDetail from './ChecklistDetail';

export default function CheckListTab({ checklistData }) {
  return (
    <div className="min-w-[25vw] max-w-[25vw] h-[41rem] max-h-[41rem] mx-auto p-5 block overflow-auto">
      <p className="text-[1.05vw] font-inter ml-[0.5vw] text-justify">
        The following are the details of the validation results from this
        student record's summary of grades:
      </p>
      {checklistData.map((data, idx) => {
        return (
          <div className="grid rounded-lg pl-[2vw] pt-2 pb-2" key={idx}>
            <ChecklistDetail icon={data.status} detail={data.detail} />
          </div>
        );
      })}
    </div>
  );
}
