import { useEffect, useState } from 'react';

/* Buttons */
import UploadFileBtn from '../components/buttons/UploadFileBtn';
import Refresh from '../components/buttons/Refresh';

/* Components */
import List from '../components/List';
import Header from '../components/common/HeaderWithoutArrowbck';
// import AdminNav from '../components/common/AdminNavigation';
import Pagination from '../components/Pagination';
import Search from '../components/search/Search';
import SearchModal from '../components/search/SearchModal';

/* CSS */
import '../components/List.css';
import 'tailwindcss/tailwind.css';
import { refresh } from 'electron-debug';


const AdminDashboard = () => {
    const [rows, setRows] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const [refreshData, setRefreshData] = useState(false);

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
    }, [refreshData]);

    //sort rows in ascending order based on the object property passed
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

    //sort rows in descending order based on the object property passed
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

    //mother function for changing sort state and row data
    const changeSort = (index) => {

      let temp = sortState //store first in temp (NOTE: pass by reference si React)

      if(latestSort !== index){ //if latest sort is not equal to index, reset sortState to initial state
        temp = [0,0,0,0]
      }
      
      temp[index] = (temp[index] + 1) % 3 //cycle through values 0 - 2
      setSortState([...temp]) //set sort state, trigger re-render

      setLatestSort(index) //set latest sort to index

      //get the object property to sort by
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
      if(temp[index] === 0){ //if 0, return to original data from DB
        setRows([...studentsData]);
      }
      if(temp[index] === 1){ //if 1, sort ascending
        sortRowsAsc(toSort)
      }
      else if(temp[index] === 2){ //if 2, sort descending
        sortRowsDsc(toSort)
      }

    }

    // Get current rows
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = rows.slice(indexOfFirstRow, indexOfLastRow)

    //Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    //used in Search component
    const [searchStudent, setSearchStudent] = useState("");
    const [isGenerated, setIsGenerated] = useState(false);
    const [showModal, setShowModal] = useState(false)


    const handleSearch =()=>{
      // console.log(searchStudent);
      //Add code here to search student; assign true to isGenerated if student exists; assign true to showModal if student does not exist
      //sample code to test modal window
      if(searchStudent === "hello"){
        setIsGenerated(true);
        setSearchStudent("");
      }
      else{
        setShowModal(true);
        setSearchStudent("");
      }
    }

    const handleEnterPress = (e) =>{
      if (e.key === "Enter") {
        handleSearch();
      }
    }
    return(
      <>
        <div>
            <div><AdminNav /></div>

            {/* Right Section */}
            <div className="absolute inset-0 flex ml-8 xl:ml-12 justify-center">

              <div><Header pageTitle={"ADMIN DASHBOARD"}/></div>

              {/* Page Contents */}
              <div className='pt-20 flex-column'>
                <div className='flex'>
                  {/* Upload button */}
                  <div className='flex ml-auto order-2'>
                    <UploadFileBtn />
                  </div>
                  {/* Search input button */}
                  <div className='float-left w-[18vw] h-[1vw]'>
                    <Search user={"student"} handleSearch={(e) => setSearchStudent(e.target.value)} searchValue={searchStudent} buttonHandler={handleSearch} handleEnter={handleEnterPress}/>
                    {
                      showModal ?
                      (<SearchModal user={"STUDENT"} handleClose={() => setShowModal(false)}/>):
                      <></>
                    }
                  </div>
                  {/* Refresh button */}
                  <div className='flex items-center'>
                    <Refresh refreshData={refreshData} setRefreshData={setRefreshData}/>
                  </div>
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

export default AdminDashboard
