import 'tailwindcss/tailwind.css';
import refresh from '../../../../assets/icons/refresh.svg';


/* Parent Components:
    frontend/pages/dashboards/UserDashboard.jsx
    frontend/pages/student-record/StudentViewRecord.jsx
*/

/* This function that contains a functioning Refresh button */

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


/* Props:
    handleClick --- function to handle click event
*/
const Refresh = ({ handleClick }) => {
    // Styling of image inside the button
    const refreshBtn = `
        .refresh-btn{
            width: 2.5vw;
            height: 4.5vh;
        }`; // styling of image inside the button

    // Styling of button
    const buttons = `hover:bg-slate-300 rounded-3xl bg-slate-200 relative ml-2 grow btn self-center
        transition-all hover:transition-all hover:bg-slate-300 rounded-3xl bg-slate-200 min-w-max`;

    return (
        <>
            <div className="pr-1.5 mr-0 items-center justify-items-center inline-block grow">
                <style>{refreshBtn}</style>
                {/* Refresh Button */}
                {/* Reference: https://stackoverflow.com/questions/70069619/refresh-data-on-button-click-react */}
                <button className={buttons} type="button" onClick={handleClick}>
                    <img className="refresh-btn min-w-fit" alt="icon" src={refresh} />
                </button>
            </div>
        </>
    );
};


export default Refresh;