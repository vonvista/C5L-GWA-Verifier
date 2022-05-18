import 'tailwindcss/tailwind.css';
import refresh from '../../../../assets/icons/refresh.svg';

/* HOW TO USE:
1. Copy and paste this line of code somewhere at the start of your function/page
----------------------------------------------------------
const [refreshData, setRefreshData] = useState(false);
----------------------------------------------------------
2. Add `refreshData` as a dependent of your useEffect
Example:
useEffect(() => {
      const fetchData = async () => {
        // Retrieve data from database
        await setRows(studentsData);
      }

      fetchData();
    }, [refreshData]);  <-------------- REFER TO THIS LINE OF CODE
3. To call Refresh component, copy and paste this line of code:
----------------------------------------------------------
<Refresh refreshData={refreshData} setRefreshData={setRefreshData}/>
----------------------------------------------------------
*/


// Parent Component >> UserDashboard.jsx

// Function that contains a functioning Refresh button
// --handleClick prop: function to handle click event

const Refresh = ({ handleClick }) => {
  const btn = `
    .btn{
      width: 2.2786458333333335vw;
      height: 4.847645429362881vh;
  }`; // styling of image inside the button

  const buttons = `w-8 h-8 hover:bg-slate-300 rounded-3xl bg-slate-200 relative ml-2 grow btn`; // styling of button

  return (
    <div className="pr-1.5 mr-0 items-center justify-items-center inline-block grow">
      <style>{btn}</style>
      
      {/* Refresh Button */}
      {/* Reference: https://stackoverflow.com/questions/70069619/refresh-data-on-button-click-react */}
      <button className={buttons} type="button" onClick={handleClick}>
        <img className="btn" alt="icon" src={refresh} />
      </button>
    </div>
  );
};

export default Refresh;