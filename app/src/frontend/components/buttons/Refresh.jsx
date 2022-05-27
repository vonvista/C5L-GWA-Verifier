import 'tailwindcss/tailwind.css';
import refresh from '../../../../assets/icons/refresh.svg';


/* Parent Components:
    UserDashboard >> frontend/pages/dashboards/UserDashboard
    StudentRecord >> frontend/pages/student-record/StudentViewRecord
*/

/* This function that contains a functioning Refresh button.
   HOW TO USE:
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
        }`;

    // Styling of button
    const buttons = `min-w-max rounded-3xl bg-slate-200 relative ml-2 btn self-center
        transition-all ease-out duration-150
        hover:transition-all hover:ease-in hover:duration-200 hover:bg-slate-300`;
    const buttonImg = `
        transform-gpu
        refresh-btn min-w-fit 
        transition ease-in-out duration-300 
        hover:transition hover:rotate-[-360deg] hover:ease-in-out hover:duration-300
        `;

    return (
        <>
            <style>{refreshBtn}</style>
            {/* Refresh Button */}
            {/* Reference: https://stackoverflow.com/questions/70069619/refresh-data-on-button-click-react */}
            <button className={buttons} type="button" onClick={handleClick}>
                <img className={buttonImg} alt="icon" src={refresh} />
            </button>
        </>
    );
};


export default Refresh;