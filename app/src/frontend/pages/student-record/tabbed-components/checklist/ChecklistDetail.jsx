import 'tailwindcss/tailwind.css';

/* 
    props:
    • icon - 0 for default, 1 for checkmark, else crossmark
    • detail - what ever the statement or details to be put (c/o backend)
*/

// This component is used for displaying necessary data/details with its corresponding icons (check/cross)
const ChecklistDetail = ({ icon, detail, setValData, index}) => {
  return (
    <div className="flex w-full items-center"
    
    onClick={() => {
      setValData(index);
    }}
    >
      {/* Icon to be displayed */}
      {icon === true ? (
        <div>
          <svg
            width="1.6276041666666667vw"
            height="3.4626038781163433vh"
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.33325 13.0209L11.4583 16.1459L16.6666 9.89587"
              stroke="#BBDABB"
              strokeWidth="2.08333"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12.4999 22.9167C18.2529 22.9167 22.9166 18.253 22.9166 12.5C22.9166 6.74707 18.2529 2.08337 12.4999 2.08337C6.74695 2.08337 2.08325 6.74707 2.08325 12.5C2.08325 18.253 6.74695 22.9167 12.4999 22.9167Z"
              stroke="#BBDABB"
              strokeWidth="2.08333"
            />
          </svg>
        </div>
      ) : (
        <div>
          <svg
            width="1.6276041666666667vw"
            height="3.4626038781163433vh"
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.625 15.625L9.375 9.375M15.625 9.375L9.375 15.625"
              stroke="#F29B9B"
              strokeWidth="2.08333"
              strokeLinecap="round"
            />
            <path
              d="M12.5 22.9167C18.253 22.9167 22.9167 18.253 22.9167 12.5C22.9167 6.74707 18.253 2.08337 12.5 2.08337C6.74707 2.08337 2.08337 6.74707 2.08337 12.5C2.08337 18.253 6.74707 22.9167 12.5 22.9167Z"
              stroke="#F29B9B"
              strokeWidth="2.08333"
            />
          </svg>
        </div>
      )}
      {/* Detail */}
      <span className="ml-2 text-sm font-inter">{detail}</span>
    </div>
  );
};

export default ChecklistDetail;
