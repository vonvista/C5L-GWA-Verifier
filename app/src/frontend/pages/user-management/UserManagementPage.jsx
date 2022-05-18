import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import 'frontend/components/table/UserList.css';

/* Components */
import List from 'frontend/components/table/List';
import Pagination from 'frontend/components/table/Pagination';
import UserNav from 'frontend/components/common/UserNavigation';
import AdminNav from 'frontend/components/common/AdminNavigation';
import HeaderWithoutArrowbck from 'frontend/components/common/HeaderWithoutArrowbck';
import AddUserBtn from 'frontend/components/buttons/AddUserBtn';
import Search from 'frontend/components/search/Search';
import SearchModal from 'frontend/components/search/SearchModal';
import EditUser from './EditUser';
import AddUser from './AddUser';


const UserManagementPage = () => {
  const [rows, setRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [userRole, setUserRole] = useState(localStorage.getItem("Role"))

  // const Users = [
  //   {
  //     "uname": "eyds_15",
  //     "name": "Carl Adrian Angeles",
  //     "position" : "User"
  //   },
  //   {
  //     "uname": "mau_23",
  //     "name": "Maurice Paguagan",
  //     "position" : "Admin"
  //   },
  //   {
  //     "uname": "dyurj_45",
  //     "name": "George Gragas",
  //     "position" : "User"
  //   },
  //   {
  //     "uname": "erl_23",
  //     "name": "Erl Lacuban",
  //     "position" : "User"
  //   },
  //   {
  //     "uname": "tere_28",
  //     "name": "Tere Ursolino",
  //     "position" : "Admin"
  //   },
  //   {
  //     "uname": "qreentine",
  //     "name": "Koreen Merida",
  //     "position" : "User"
  //   },
  //   {
  //     "uname": "qreentine",
  //     "name": "Koreen Merida",
  //     "position" : "User"
  //   },
  //   {
  //     "uname": "romel_klow",
  //     "name": "Carl Romel Dimacali",
  //     "position" : "User"
  //   },
  //   {
  //     "uname": "otin_g",
  //     "name": "Ysab Parayno",
  //     "position" : "User"
  //   },
  //   {
  //     "uname": "otin_g",
  //     "name": "Ysab Parayno",
  //     "position" : "User"
  //   },
  //   {
  //     "uname": "jepi_clown",
  //     "name": "Jeffy Escartin",
  //     "position" : "User"
  //   }
  // ]

  const ip = localStorage.getItem("ServerIP")
  useEffect(() => {
    const fetchData = async () => {
      // Retrieve data from database
      fetch(`http://${ip}:3001/user/find-all`)
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
      })
      .catch(err => { //will activate if DB is not reachable or timed out or there are other errors
        Swal.fire({
          icon: 'error',
          title: 'Server Error',
          text: 'Check if the server is running or if database IP is correct',
        })
        console.log(err)
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

    console.log(currentRows);

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

    return(
        <>
          <div>
            <div>
              {userRole == "user" ? <UserNav /> : <AdminNav />}
            </div>
            {/* Right Section */}
            <div className="absolute inset-0 flex ml-8 xl:ml-12">
              <div><HeaderWithoutArrowbck pageTitle={"USER MANAGEMENT"}/></div>
              
              {/* Page Contents */}
              <div className='flex ml-10 mt-6 xl:ml-24 justify-center items-center h-screen space-x-14'>
                <div className='flex items-center w-1/6'>
                  <AddUserBtn handleClick={() => setShowModal(true)}/>
                  {showModal ?
                    (<AddUser modalState={true} handleClose={() => setShowModal(false)} handleAddRecord={handleAddRecord}/>)
                    :(<></>)
                  }
                  {showModalEdit ?
                    (<EditUser modalState={true} handleClose={() => setShowEditModal(false)} editUser={editUser} handleEditRecordSave={handleEditRecordSave}/>)
                    :(<></>)
                  }
                  {/* <Search user={"user"} handleSearch={(e) => setSearchUser(e.target.value)} searchValue={searchUser} buttonHandler={handleSearch} handleEnter={handleEnterPress}/> */}
                </div>
                <div>
                  <div className='table-container'>
                    <List table={3} data={currentRows} handleDeleteRecord={handleDeleteRecord} handleEditRecord={handleEditRecord}/>
                  </div>
                  <div className='float-right'>
                    <Pagination rowsPerPage={rowsPerPage} totalRows={rows.length} currentPage={currentPage} paginate={paginate} />
                  </div>
                </div>
              </div>
            </div>
        </div>
        </>
    )
}

export default UserManagementPage
