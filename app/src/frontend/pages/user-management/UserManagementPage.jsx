import { useEffect, useState } from 'react';
import 'tailwindcss/tailwind.css';
import Swal from 'sweetalert2';

/* Components */
import List from 'frontend/components/table/List';
import Pagination from 'frontend/components/table/Pagination';
import UserNav from 'frontend/components/common/UserNavigation';
import AdminNav from 'frontend/components/common/AdminNavigation';
// import HeaderWithoutArrowbck from 'frontend/components/common/HeaderWithoutArrowbck';
import AddUserBtn from 'frontend/components/buttons/AddUserBtn';
import Search from 'frontend/components/search/Search';
import SearchModal from 'frontend/components/search/SearchModal';
import EditUser from './EditUser';
import AddUser from './AddUser';



/* Parent component >> renderer/App.jsx */

/* This is the User Management page which is a primary navigation page. */
/* Props:
    hoverRef    --- a callbackRef used by useHover to update the listeners for the 'mouseover' and 'mouseout' events in the navigation bar
    isHovering  --- handles the hovering state of the navigation bar
    setIsHovering --- sets hover state, used for logging out user
*/
const UserManagementPage = ({ hoverRef, isHovering, setIsHovering }) => {
  const [rows, setRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [unsortedRows, setUnsortedRows] = useState([]);
  const [userRole, setUserRole] = useState(localStorage.getItem("Role"))


  const ip = localStorage.getItem("ServerIP")
  useEffect(() => {
    const fetchData = async () => {
      // Retrieve data from database
      fetch(`http://${ip}:3001/user/find-all`, {
        headers: { "Content-Type":"application/json", "Authorization": `Bearer ${localStorage.getItem("Username")} ${localStorage.getItem("Password")}` },
      })
      .then(response => response.json())
      .then(async (body) => {
        let Users = []; // initiating array that will contain the information of users
        // mapping out all the entries sent by the fetch
        body.map((user, i) => {
          Users.unshift({
            "uname": user.Username, 
            "name": user.FirstName + ' ' + user.LastName, 
            "position": user.Position,
            "FirstName": user.FirstName,
            "MiddleName": user.MiddleName,
            "LastName": user.LastName,
            "Username": user.Username,
            "Position": user.Position,
            "Role": user.Role,
            "Password": user.Password,
            "_id": user._id,
          });
        });

        await setRows(Users);
        await setUnsortedRows([...Users]);
      })
      .catch(err => { //will activate if DB is not reachable or timed out or there are other errors
        Swal.fire({
          icon: 'error',
          title: 'Server Error',
          text: 'Check if the server is running or if database IP is correct',
        })
        //console.log(err)
      })
    }

    fetchData();
  }, []);

    // Get current rows
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = rows.slice(indexOfFirstRow, indexOfLastRow)
    const [showModal, setShowModal] = useState(false)
    const [showModalEdit, setShowEditModal] = useState(false)
    const [editUser, setEditUser] = useState({})
    const [uneditedUser, setUneditedUser] = useState({})

    const [sortState, setSortState] = useState([0, 0, 0, 0]);
    const [latestSort, setLatestSort] = useState(-1);

    //Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    //used in Search component
    const [searchUser, setSearchUser] = useState("");

    const handleSearch =()=>{
      // console.log(searchStudent);
      //Add code here to search student, fetch sa database, if wala sa DB, display student cannot be found, 
      //if nasa DB, go to record of student

      //if di mahanap si student

      // Swal.fire({
      //   icon: 'error',
      //   title: 'Error',
      //   text: 'Student does not exist',
      // })

      //if nahanap si student, go straight to record
    }

    const handleEnterPress = (e) =>{
      if (e.key === "Enter") {
        handleSearch();
      }
    }

    const handleAddRecord = (user) => {
      let temp = rows;
      temp.unshift({
        "uname": user.Username, 
        "name": user.FirstName + ' ' + user.LastName, 
        "position": user.Position,
        "FirstName": user.FirstName,
        "MiddleName": user.MiddleName,
        "LastName": user.LastName,
        "Username": user.Username,
        "Position": user.Position,
        "Password": user.Password,
        "_id": user._id,
      });
      setRows([...temp]);
      setShowModal(false);
    }

    const handleEditRecord = (user) => {
      setShowEditModal(true);
      setEditUser(user);
      setUneditedUser(user);
    }

    const handleEditRecordSave = (user) => {
      let temp = rows;
      editIndex = temp.findIndex(x => x._id === user._id);
      temp[editIndex] = {
        "uname": user.Username, 
        "name": user.FirstName + ' ' + user.LastName, 
        "position": user.Position,
        "FirstName": user.FirstName,
        "MiddleName": user.MiddleName,
        "LastName": user.LastName,
        "Username": user.Username,
        "Position": user.Position,
        "Role": user.Role,   // <-  ampotek 
        "_id": user._id,
      }
      setRows([...temp]);
      setShowEditModal(false);
    }

    // handles page refresh on user delete
    const handleDeleteRecord = (user) => {
      let temp = rows;
      temp.splice(temp.findIndex(row => row.uname === user.Username), 1);
      setRows([...temp]);
    }

    // sort rows in ascending order based on the object property passed
    const sortRowsAsc = (object) => {
      const sortedRows = rows;
      sortedRows.sort((a, b) => {
        if (a[object] < b[object]) {
          return -1;
        }
        if (a[object] > b[object]) {
          return 1;
        }
        return 0;
      });
      setRows([...sortedRows]);
    };

    // sort rows in descending order based on the object property passed
    const sortRowsDsc = (object) => {
      const sortedRows = rows;
      sortedRows.sort((a, b) => {
        if (a[object] > b[object]) {
          return -1;
        }
        if (a[object] < b[object]) {
          return 1;
        }
        return 0;
      });
      setRows([...sortedRows]);
    };

    // mother function for changing sort state and row data
    const changeSort = (index) => {
      let temp = sortState; // store first in temp (NOTE: pass by reference si React)

      if (latestSort !== index) {
        // if latest sort is not equal to index, reset sortState to initial state
        temp = [0, 0, 0, 0];
      }

      temp[index] = (temp[index] + 1) % 3; // cycle through values 0 - 2
      setSortState([...temp]); // set sort state, trigger re-render

      setLatestSort(index); // set latest sort to index

      // get the object property to sort by
      let toSort = '';
      switch (index) {
        case 0:
          toSort = 'uname';
          break;
        case 1:
          toSort = 'name';
          break;
        case 2:
          toSort = 'position';
          break;
      }
      if (temp[index] === 0) {
        // if 0, return to original data from DB
        setRows([...unsortedRows]);
      }
      if (temp[index] === 1) {
        // if 1, sort ascending
        sortRowsAsc(toSort);
      } else if (temp[index] === 2) {
        // if 2, sort descending
        sortRowsDsc(toSort);
      }
    };

    return(
        <>
            {/* Right Section */}
            <div className="relative inset-0 flex ml-[4vw] justify-center">
                {/* <div><HeaderWithoutArrowbck pageTitle={"USER MANAGEMENT"}/></div> */}
                
                {/* Page Contents */}
                <div className='flex mt-[2.5vh] items-center h-screen space-x-[3vw]'>

                    {/* Add User */}
                    <div className='flex items-center w-1/6'>
                        <AddUserBtn handleClick={() => setShowModal(true)}/>

                        {/* Add User Modal */}
                        {showModal ?
                            (<AddUser modalState={true} handleClose={() => setShowModal(false)} handleAddRecord={handleAddRecord}/>)
                            :(<></>)
                        }

                        {/* Edit User Modal */}
                        {showModalEdit ?
                            (<EditUser modalState={true} handleClose={() => setShowEditModal(false)} editUser={editUser} uneditedUser={uneditedUser} handleEditRecordSave={handleEditRecordSave}/>)
                            :(<></>)
                        }
                    </div>

                    {/* Table and Pagination */}
                    <div>
                        <div className='table-container'>
                            <List table={3} changeSort={changeSort} sortState={sortState} data={currentRows} handleDeleteRecord={handleDeleteRecord} handleEditRecord={handleEditRecord}/>
                        </div>
                        <div className='float-right mt-6'>
                            <Pagination rowsPerPage={rowsPerPage} totalRows={rows.length} currentPage={currentPage} paginate={paginate} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default UserManagementPage;