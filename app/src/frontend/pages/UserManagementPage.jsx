import { useEffect, useState } from 'react';
import '../components/UserList.css';

/* Components */
import List from '../components/List';
import Pagination from '../components/Pagination';
import AdminNav from '../components/AdminNavigation';
import HeaderWithoutArrowbck from '../components/HeaderWithoutArrowbck';
import AddUserBtn from '../components/buttons/AddUserBtn';
import AddUser from '../components/AddUser';
import Search from 'frontend/components/Search';
import SearchModal from 'frontend/components/SearchModal';
import Swal from 'sweetalert2'

const UserManagementPage = () => {
  const [rows, setRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

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
          Users.unshift({"uname": user.Username, "name": user.FirstName + ' ' + user.LastName, "position": user.Position});
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

    // handles page refresh on user delete
    const handleDeleteRecord = (user) => {
      let temp = rows;
      temp.splice(temp.findIndex(row => row.uname === user.Username), 1);
      setRows([...temp]);
    }

    return(
        <>
          <div>
            <div><AdminNav /></div>

            {/* Right Section */}
            <div className="absolute inset-0 flex wrap ml-8 xl:ml-12 justify-center ">

              <div><HeaderWithoutArrowbck pageTitle={"USER MANAGEMENT"}/></div>

              {/* Page Contents */}
              <div className='pt-20 md:flex flex-row space-x-10 '>
                <div className='grid content-center w-1/6'>
                  <AddUserBtn handleClick={() => setShowModal(true)}/>
                  {showModal ?
                    (<AddUser handleClose={() => setShowModal(false)}/>)
                    :(<></>)
                  }
                  {/* <Search user={"user"} handleSearch={(e) => setSearchUser(e.target.value)} searchValue={searchUser} buttonHandler={handleSearch} handleEnter={handleEnterPress}/> */}
                </div>
                <div>
                  <div className='table-container'>
                    <List table={3} data={currentRows} handleDeleteRecord={handleDeleteRecord}/>
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
