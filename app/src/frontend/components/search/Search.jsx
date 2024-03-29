import { SearchIcon } from '@heroicons/react/solid';
import Input from '../inputs/Input';
import 'tailwindcss/tailwind.css';


/* Parent component >> frontend/pages/dashboards/UserDashboard */

/* This function contains the search component.
   HOW TO USE:
    1. Declare and initialize searchStudent and setSearchStudent variables, handleSearch() and handleEnterPress():

        const [searchStudent, setSearchStudent] = useState("");

        const handleSearch =()=>{
            // console.log(searchStudent);
            //Add code here to search student
            }

        const handleEnterPress = (e) =>{
            if (e.key === "Enter") {
            handleSearch();
            }
        }
    
    2. Importing the component to pages:
        <Search user={"student number"} handleSearch={(e) => setSearchStudent(e.target.value)} searchValue={searchStudent} buttonHandler={handleSearch} handleEnter={handleEnterPress}/>
/*

/* Props:
    user            --- value is concatenated to text variable; used as placeholder to input field
    handleSearch    --- function to handle the input value
    searchValue     --- value of the input
    buttonHandler   --- function handler used to show and hide password
    handleEnter     --- keypress handler; in case user wants to complete its search by pressing Enter key
*/
const Search = ({ user, handleSearch, searchValue, buttonHandler, handleEnter }) => {
    
    // Styling of image inside the search bar
    const searchBtn = `
        .search-btn{
            width: 1.5vw;
        }`;

    return (
        <>
            <div className="flex relative">
                <style>{searchBtn}</style>
                <Input
                    inputStyle="h-[3vw] text-[1vw] pr-[3.5vw] font-mono rounded-xl my-2 appearance-none border-2 px-4
                        border-gray-300 bg-gray-100 focus:border-orange-400 focus:bg-white text-gray-700"  // styling for input
                    name="search"                               // name of label-input components
                    inputType="text"                            // type of input password, email, text, etc.
                    inputPlaceholder="Search by student no."    // placeholder text for input
                    value={searchValue}                         // value of the input
                    changeHandler={handleSearch}                // change handling
                    handleKeyPress={handleEnter}
                />
                <div className="absolute inset-y-0 left-[83%] flex items-center px-2">
                    <SearchIcon
                        className="w-[1.5vw] text-[#bfbfbf] rounded cursor-pointer h-11/12"
                        onClick={buttonHandler}
                    />
                </div>
            </div>
        </>
    );
};


export default Search;