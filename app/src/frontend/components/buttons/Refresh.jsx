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
// --typeSR           : if true change style for SR page

const Refresh = ({ handleClick, typeSR }) => {
    // styling of button
    const buttonSR = `self-center transition-all ease-out hover:transition-all hover:ease-in hover:delay-50 hover:bg-slate-300 rounded-3xl bg-slate-200`;

    return (
        <>
            {/* Reference: https://stackoverflow.com/questions/70069619/refresh-data-on-button-click-react */}
            <button className={buttonSR} type="button" onClick={handleClick}>
                <img className="w-18 h-18" alt="icon" src={refresh} />
            </button>
        </>
  );
};

export default Refresh;