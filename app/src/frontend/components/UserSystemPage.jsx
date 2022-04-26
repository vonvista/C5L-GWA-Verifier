import { useEffect, useState } from 'react';
import './UserList.css';
import List from './List';
import UploadFileBtn from './buttons/UploadFileBtn';
import Pagination from './Pagination';
import AdminNav from './AdminNavigation';
import UploadFileBtn from './buttons/UploadFileBtn';
import UploadFileBtn from './buttons/UploadFileBtn';
import HeaderWithoutArrowbck from './HeaderWithoutArrowbck';
import AddUser from './AddUser';


const UserSystemPage = () => {

  const Users = [
    {
      "uname": "eyds_15",
      "name": "Carl Adrian Angeles",
    },
    {
      "uname": "mau_23",
      "name": "Maurice Paguagan",
    },
    {
      "uname": "dyurj_45",
      "name": "George Gragas",
    },
    {
      "uname": "erl_23",
      "name": "Erl Lacuban",
    },
    {
      "uname": "tere_28",
      "name": "Tere Ursolino",
    },
    {
      "uname": "qreentine",
      "name": "Koreen Merida",
    },
    {
      "uname": "romel_klow",
      "name": "Carl Romel Dimacali",
    },
    {
      "uname": "otin_g",
      "name": "Ysab Parayno",
    },
    {
      "uname": "jepi_clown",
      "name": "Jeffy Escartin",
    },
    {
      "uname": "reg_booth",
      "name": "Reginald Recario",
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
    const [rows, setRows] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    //Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    return(
        <>
          <div>
            <div><AdminNav /></div>

            {/* Right Section */}
            <div className="absolute inset-0 flex wrap ml-8 xl:ml-12 justify-center ">

              <div><HeaderWithoutArrowbck pageTitle={"USER SYSTEM"}/></div>

              {/* Page Contents */}
              <div className='pt-20 md:flex flex-row space-x-10 '>
                <div className='grid content-center'>
                  <AddUser />
                </div>
                <div>
                  <div className='table-container'>
                    <List table={3} data={Users}/>
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

export default UserSystemPage
