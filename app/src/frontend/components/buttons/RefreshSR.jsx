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


// Parent Component >> StudentViewRecord.jsx

// Function that contains a functioning Refresh button for Student Record page
// --handleClick prop: function to handle click event

const Refresh = ({ handleClick , plusStyle }) => {
const buttons = `transition-all ease-out delay-150 hover:transition-all hover:ease-in hover:delay-150 hover:bg-slate-300 rounded-3xl bg-slate-200 ${plusStyle}`; // styling of button

return (
    <>
        {/* Refresh Button */}
        {/* Reference: https://stackoverflow.com/questions/70069619/refresh-data-on-button-click-react */}
        <button className={buttons} type="button" onClick={handleClick}>
            <img className="w-full h-full block" alt="icon" src={refresh} />
        </button>
    </>


);
};

export default Refresh;