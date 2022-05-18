import ChecklistDetail from './ChecklistDetail';

export default function CheckListTab({ checklistData }) {
  return (
    <div className="min-w-[25vw] max-w-[25vw] h-[41rem] max-h-[41rem] mx-auto p-5 block overflow-auto">
      <p className="text-sm font-inter ml-[0.5vw] text-left">
        The following are the details of the validation results from this
        student record's summary of grades:
      </p>
      {checklistData.map((data, idx) => {
        return (
          <div className="grid rounded-lg ml-[0.5vw] pt-2" key={idx}>
            <ChecklistDetail icon={data.status} detail={data.detail} />
          </div>
        );
      })}
    </div>
  );
}
