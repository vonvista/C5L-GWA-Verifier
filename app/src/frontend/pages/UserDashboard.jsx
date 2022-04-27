import { useEffect, useState } from 'react';
import UploadFileBtn from '../components/buttons/UploadFileBtn';

/* Components */
import List from '../components/List';
import Header from '../components/HeaderWithoutArrowbck';
import UserNav from '../components/UserNavigation';
import Pagination from '../components/Pagination';

/* CSS */
import '../components/List.css';
import 'tailwindcss/tailwind.css';


const UserDashboard = () => {
    const [rows, setRows] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    //index 0: name; 1: num; 2: degree; index 3: GWA;
    const [sortState, setSortState] = useState([0,0,0,0])
    const [latestSort, setLatestSort] = useState(-1);

    const studentsData = [
        {
          "name": "1 Ellison Maurice C. Paguagan",
          "studno": "2019-00000",
          "degprog": "BS Computer Science",
          "gwa": "1.01234",
          "status": "Checked"
        },
        // {
        //   "name": "Eyds Angeles",
        //   "studno": "2019-05235",
        //   "degprog": "BS Computer Science",
        //   "gwa": "1.0",
        //   "status": "Unchecked"
        // },
        // {
        //   "name": "George Gragas",
        //   "studno": "2019-05235",
        //   "degprog": "BS Computer Science",
        //   "gwa": "1.0",
        //   "status": "Pending"
        // },
        // {
        //     "name": "Maurice Paguagan",
        //     "studno": "2019-05235",
        //     "degprog": "BS Computer Science",
        //     "gwa": "1.0",
        //     "status": "Checked"
        //   },
        //   {
        //     "name": "Eyds Angeles",
        //     "studno": "2019-05235",
        //     "degprog": "BS Computer Science",
        //     "gwa": "1.0",
        //     "status": "Unchecked"
        //   },
          {
            "name": "2 George Gragas",
            "studno": "2019-00001",
            "degprog": "BS Computer Science",
            "gwa": "1.0",
            "status": "Pending"
          },
          {
            "name": "Maurice Paguagan",
            "studno": "2019-00002",
            "degprog": "BS Mau",
            "gwa": "1.0",
            "status": "Checked"
          },
          {
            "name": "Eyds Angeles",
            "studno": "2019-00003",
            "degprog": "BS Eyds",
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
            "name": "3 George Gragas",
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
        "position": "Basic"
      },
      {
        "uname": "dyurj_45",
        "name": "George Gragas",
        "position": "Admin"
      }
    ]

    useEffect(() => {
      const fetchData = async () => {
        // Retrieve data from database
        await setRows(studentsData);
      }

      fetchData();
    }, []);

    const sortRowsAsc = (object) => {
      let sortedRows = rows;
      sortedRows.sort((a, b) => {
        if (a[object] < b[object]) {
          return -1;
        }
        else if (a[object] > b[object]) {
          return 1;
        }
        return 0;
      })
      setRows([...sortedRows]);
    }

    const sortRowsDsc = (object) => {
      let sortedRows = rows;
      sortedRows.sort((a, b) => {
        if (a[object] > b[object]) {
          return -1;
        }
        else if (a[object] < b[object]) {
          return 1;
        }
        return 0;
      })
      setRows([...sortedRows]);
    }

    const changeSort = (index) => {

      let temp = sortState

      // if(latestSort === -1){
      //   setLatestSort(index)
      // }
      if(latestSort !== index){
        temp = [0,0,0,0]
      }
      
      temp[index] = (temp[index] + 1) % 3
      setSortState([...temp])

      setLatestSort(index)

      let toSort = "";
      switch(index){
        case 0:
          toSort = "name";
          break;
        case 1:
          toSort = "studno";
          break;
        case 2:
          toSort = "degprog";
          break;
        case 3:
          toSort = "gwa";
          break;
      }

      if(temp[index] === 1){
        sortRowsAsc(toSort)
      }
      else if(temp[index] === 2){
        sortRowsDsc(toSort)
      }

    }

    // Get current rows
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = rows.slice(indexOfFirstRow, indexOfLastRow)

    //Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    return(
      <>
        <div>
            <div><UserNav /></div>

            {/* Right Section */}
            <div className="absolute inset-0 flex ml-8 xl:ml-12 justify-center">

              <div><Header pageTitle={"USER DASHBOARD"}/></div>

              {/* Page Contents */}
              <div className='pt-20 flex-column'>
                {/* Upload button */}
                <div className='float-right'>
                  <UploadFileBtn />
                </div>
                <div className='table-container'>
                  <List table={1} data={currentRows} changeSort={changeSort} sortState={sortState}/>
                </div>
                <div className='float-right'>
                  <Pagination rowsPerPage={rowsPerPage} totalRows={rows.length} currentPage={currentPage} paginate={paginate} />
                </div>
              </div>

            </div>
        </div>

      </>
    )
}

export default UserDashboard
