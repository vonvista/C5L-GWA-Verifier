import { useEffect, useState } from 'react';
import List from './List';
import UploadFileBtn from './buttons/UploadFileBtn';
import Pagination from './Pagination';
import './UserList.css';
import AdminNav from './AdminNavigation';
import UploadFileBtn from './buttons/UploadFileBtn';
import HeaderWithoutArrowbck from './HeaderWithoutArrowbck';


const UserSystemPage = () => {
    const [rows, setRows] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(() => {
        setRows(Users);
    }, []);

    // Get current rows

    const Users = [
      {
        "uname": "eyds_15",
        "name": "Carl Adrian Angeles",
        "position": "Admin"
      },
      {
        "uname": "mau_23",
        "name": "Maurice Paguagan",
        "position": "User"
      },
      {
        "uname": "dyurj_45",
        "name": "George Gragas",
        "position": "Admin"
      },
      {
        "uname": "erl_23",
        "name": "Erl Lacuban",
        "position": "User"
      },
      {
        "uname": "tere_28",
        "name": "Tere Ursolino",
        "position": "User"
      },
      {
        "uname": "qreentine",
        "name": "Koreen Merida",
        "position": "Admin"
      },
      {
        "uname": "romel_klow",
        "name": "Carl Romel Dimacali",
        "position": "User"
      },
      {
        "uname": "otin_g",
        "name": "Ysab Parayno",
        "position": "User"
      },
      {
        "uname": "jepi_clown",
        "name": "Jeffy Escartin",
        "position": "User"
      },
      {
        "uname": "reg_booth",
        "name": "Reginald Recario",
        "position": "Admin"
      }
    ]

    return(
        <>
          <div>
            <AdminNav/>
          </div>
          <div>
            <HeaderWithoutArrowbck pageTitle="USER SYSTEM"/>
          </div>
          <div class = 'inset-x-0 top-16'>
            <span class = 'ml-28 inline-block'>
              <UploadFileBtn />
            </span>
            <span class = 'ml-28 inline-block'>
                <List table={3} data={Users}/>
            </span>
          </div>
            {/* <div><Pagination /></div> */}
        </>
    )
}

export default UserSystemPage
