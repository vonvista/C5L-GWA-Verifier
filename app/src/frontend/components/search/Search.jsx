import 'tailwindcss/tailwind.css';
import Input from '../inputs/Input';
import search from '../../../../assets/icons/search.svg';

/*
Function contains the Search component.
----- use "Student" for UserDashboard and "User" for UserManagementPage ------
To use the component, declare and initialize searchStudent and setSearchStudent variables, handleSearch() and handleEnterPress()

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

//search component
<Search user={"student number"} handleSearch={(e) => setSearchStudent(e.target.value)} searchValue={searchStudent} buttonHandler={handleSearch} handleEnter={handleEnterPress}/>

user prop: value is concatenated to text variable; used as placeholder to input field
handleSearch prop: function to handle the input value
searchValue prop: value of the input
buttonHandler prop: function handler used to show and hide password
handleEnter prop: keypress handler; in case user wants to complete its search by pressing Enter key

*/

const Search = ({
  user,
  handleSearch,
  searchValue,
  buttonHandler,
  handleEnter,
}) => {
  const text = 'Search by ';
  const inputText = text.concat(user);
  // const finalText = inputText.concat(" to search");
  return (
    <>
      <div className="relative">
        <div className="absolute inset-y-0 left-[83%] flex items-center px-2">
          <Input
            labelStyle="mt-1 w-full text-center text-white sr-only" // styling for label
            labelVal="Password" // label text
            inputStyle="hidden rounded-lg m-2 text-center w-full h-[3vw] text-[0.9vw]" // styling for input
            name="password" // name of label-input components
            inputType="checkbox" // type of input password, email, text, etc.
            inputPlaceholder={inputText} // placeholder text for input
            value={searchValue} // value of the input
            changeHandler={handleSearch} // change handling
            handleKeyPress={handleEnter}
          />
          <button
            className="bg-gray-200 hover:bg-gray-300 rounded px-2 py-1 cursor-pointer w-[2.5vw] h-11/12"
            type="button"
            onClick={buttonHandler}
          >
            <img className="btn-img" alt="icon" src={search} />
          </button>
        </div>
        <Input
          labelStyle="mt-1 w-full text-center text-white sr-only" // styling for label
          labelVal="Search" // label text
          inputStyle="rounded-lg m-2 text-center w-full h-[3vw] text-[0.9vw] appearance-none border-2 rounded py-3 px-3 leading-tight border-gray-300 bg-gray-100 focus:outline-none focus:border-indigo-700 focus:bg-white text-gray-700 pr-16 font-mono js-password" // styling for input
          name="search" // name of label-input components
          inputType="text" // type of input password, email, text, etc.
          inputPlaceholder={inputText} // placeholder text for input
          value={searchValue} // value of the input
          changeHandler={handleSearch} // change handling
          handleKeyPress={handleEnter}
        />
      </div>
    </>
  );
};

export default Search;
