import { useEffect, useState } from 'react';
import List from './List';
import UploadFileBtn from './buttons/UploadFileBtn';
import Pagination from './Pagination';
import './UserList.css';
import './List.css';


const UserDashboard = () => {
    const [rows, setRows] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const studentsData = [
        {
          "name": "Ellison Maurice C. Paguagan",
          "studno": "2019-05235",
          "degprog": "BS Computer Science",
          "gwa": "1.01234",
          "status": "Checked"
        },
        {
          "name": "Eyds Angeles",
          "studno": "2019-05235",
          "degprog": "BS Computer Science",
          "gwa": "1.0",
          "status": "Unchecked"
        },
        {
          "name": "George Gragas",
          "studno": "2019-05235",
          "degprog": "BS Computer Science",
          "gwa": "1.0",
          "status": "Pending"
        },
        {
            "name": "Maurice Paguagan",
            "studno": "2019-05235",
            "degprog": "BS Computer Science",
            "gwa": "1.0",
            "status": "Checked"
          },
          {
            "name": "Eyds Angeles",
            "studno": "2019-05235",
            "degprog": "BS Computer Science",
            "gwa": "1.0",
            "status": "Unchecked"
          },
          {
            "name": "George Gragas",
            "studno": "2019-05235",
            "degprog": "BS Computer Science",
            "gwa": "1.0",
            "status": "Pending"
          },
          {
            "name": "Maurice Paguagan",
            "studno": "2019-05235",
            "degprog": "BS Computer Science",
            "gwa": "1.0",
            "status": "Checked"
          },
          {
            "name": "Eyds Angeles",
            "studno": "2019-05235",
            "degprog": "BS Computer Science",
            "gwa": "1.0",
            "status": "Unchecked"
          },
          {
            "name": "George Gragas",
            "studno": "2019-05235",
            "degprog": "BS Computer Science",
            "gwa": "1.0",
            "status": "Pending"
          },
           {
            "name": "Maurice Paguagan",
            "studno": "2019-05235",
            "degprog": "BS Computer Science",
            "gwa": "1.0",
            "status": "Checked"
          }
    ];

    const Program = [
        {
            "programName": "Bachelor of Science in Computer Science",
            "department": "ICS"
        },
        {
            "courseTitle": "Bachelor of Science in Computer Science",
            "department": "ICS"
        },
        {
            "courseTitle": "Bachelor of Science in Computer Science",
            "department": "ICS"
        },
    ];

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

    useEffect(() => {
        setRows(studentsData);
        // setRows(Program);
        // setRows(Users);
    }, []);

    // Get current rows


    return(
        <>
            {/* <div><UploadFileBtn /></div> */}
            {/* <div className='table-container'>
                <List table={1} data={rows}/>
            </div> */}
            {/* <List table={2} data={Program}></List> */}
            <div className='table-container'>
                <List table={3} data={Users}></List>
            </div>
            {/* <div><Pagination /></div> */}
        </>
    )
}

export default UserDashboard
