import { useEffect, useState } from 'react';
import '../components/UserList.css';

/* Components */
import List from '../components/List';
import Pagination from '../components/Pagination';
import AdminNav from '../components/AdminNavigation';
import HeaderWithoutArrowbck from '../components/HeaderWithoutArrowbck';
import AddUserBtn from '../components/buttons/AddUserBtn';
import AddUser from '../components/AddUser';


const UserManagementPage = () => {
  const [rows, setRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);


  const Users = [
    {
      "uname": "eyds_15",
      "name": "Carl Adrian Angeles",
      "position" : "User"
    },
    {
      "uname": "mau_23",
      "name": "Maurice Paguagan",
      "position" : "Admin"
    },
    {
      "uname": "dyurj_45",
      "name": "George Gragas",
      "position" : "User"
    },
    {
      "uname": "erl_23",
      "name": "Erl Lacuban",
      "position" : "User"
    },
    {
      "uname": "tere_28",
      "name": "Tere Ursolino",
      "position" : "Admin"
    },
    {
      "uname": "qreentine",
      "name": "Koreen Merida",
      "position" : "User"
    },
    {
      "uname": "qreentine",
      "name": "Koreen Merida",
      "position" : "User"
    },
    {
      "uname": "romel_klow",
      "name": "Carl Romel Dimacali",
      "position" : "User"
    },
    {
      "uname": "otin_g",
      "name": "Ysab Parayno",
      "position" : "User"
    },
    {
      "uname": "otin_g",
      "name": "Ysab Parayno",
      "position" : "User"
    },
    {
      "uname": "jepi_clown",
      "name": "Jeffy Escartin",
      "position" : "User"
    }
  ]

  useEffect(() => {
    const fetchData = async () => {
      // Retrieve data from database
      await setRows(Users);
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
                </div>
                <div>
                  <div className='table-container'>
                    <List table={3} data={currentRows}/>
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
