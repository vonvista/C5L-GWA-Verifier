import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { refresh } from 'electron-debug';

/* Components */
import Header from 'frontend/components/common/HeaderWithoutArrowbck';
import UploadFileBtn from 'frontend/components/buttons/UploadFileBtn';
import AdminNav from 'frontend/components/common/AdminNavigation';
import UserNav from 'frontend/components/common/UserNavigation';
import Pagination from 'frontend/components/table/Pagination';
import Refresh from 'frontend/components/buttons/Refresh';
import Search from 'frontend/components/search/Search';
import List from 'frontend/components/table/List';
import ExportFileBtn from 'frontend/components/buttons/ExportFileBtn';

/* CSS */
import 'frontend/components/table/List.css';
import 'tailwindcss/tailwind.css';

/* Backend */
import readInputFile from 'backend/read-input';
import Swal from 'sweetalert2';

const UserDashboard = () => {
  const [rows, setRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [unsortedRows, setUnsortedRows] = useState([]);

  const [userRole, setUserRole] = useState(localStorage.getItem('Role'));
  const [ip, setIp] = useState(localStorage.getItem('ServerIP'))

  // index 0: name; 1: num; 2: degree; index 3: GWA;
  const [sortState, setSortState] = useState([0, 0, 0, 0]);
  const [latestSort, setLatestSort] = useState(-1);

  const navigate = useNavigate();


  
  useEffect(() => {
    const fetchData = async () => {
      // Retrieve data from database
      fetch(`http://${ip}:3001/student/find-all`)
        .then((response) => response.json())
        .then(async (body) => {
          const studentsData = []; // initiating array that will contain the information of students
          // mapping out all the entries sent by the fetch
          body.map((student, i) => {
            studentsData.unshift({
              name: `${student.FirstName} ${student.LastName}`,
              studno: student.StudentID,
              degprog: student.Degree,
              gwa: student.OverallGWA,
              status: student.Status,
              _id: student._id,
            });
          });

          await setRows(studentsData);
          await setUnsortedRows(studentsData);
        })
        .catch((err) => {
          // will activate if DB is not reachable or timed out or there are other errors
          Swal.fire({
            icon: 'error',
            title: 'Server Error',
            text: 'Check if the server is running or if database IP is correct',
          });
          console.log(err);
        });
    };

    fetchData();
  }, []);

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
        toSort = 'name';
        break;
      case 1:
        toSort = 'studno';
        break;
      case 2:
        toSort = 'degprog';
        break;
      case 3:
        toSort = 'gwa';
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

  // handles page refresh on file upload, magiging unsorted ulit yung data dapat
  const handleAddRecord = (student) => {
    const temp = unsortedRows; // let original data
    temp.unshift({
      _id: student._id,
      name: `${student.FirstName} ${student.LastName}`,
      studno: student.StudentID,
      degprog: student.Degree,
      gwa: student.OverallGWA,
      status: student.Status,
    });
    setRows([...temp]);
    setUnsortedRows([...temp]);
    setSortState([0, 0, 0, 0]); // reset sort state
    console.log(rows);
  };

  // handles page refresh on student delete
  const handleDeleteRecord = (student) => {
    const temp = rows;
    temp.splice(
      temp.findIndex((row) => row.studno === student.StudentID),
      1
    );
    setRows([...temp]);
    setUnsortedRows([...temp]);
  };

  // Get current rows
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = rows.slice(indexOfFirstRow, indexOfLastRow);
  console.log('REFRESH');
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // used in Search component
  const [searchStudent, setSearchStudent] = useState('');

  const handleSearch = () => {
    // console.log(searchStudent);
    // Add code here to search student, fetch sa database, if wala sa DB, display student cannot be found,
    // if nasa DB, go to record of student

    // if di mahanap si student

    // Swal.fire({
    //   icon: 'error',
    //   title: 'Error',
    //   text: 'Student does not exist',
    // })

    // if nahanap si student, go straight to record

    fetch(`http://${ip}:3001/student/find`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ StudentID: searchStudent }),
    })
      .then((response) => response.json())
      .then((body) => {
        console.log(body);
        localStorage.setItem('currStudentID', body._id);
        localStorage.setItem('currStudentKey', body.StudentID);
        navigate('/student-record');
      })
      .catch((err) => {
        // will activate if DB is not reachable or timed out or there are other errors
        Swal.fire({
          icon: 'error',
          title: 'Student does not exist',
          text: 'Check if the student number entered is correct',
        });
        console.log(err);
      });
    setSearchStudent('');
  };

  const handleEnterPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <>
      <div>
        <div>{userRole == 'user' ? <UserNav /> : <AdminNav />}</div>

        {/* Right Section */}
        <div className="absolute inset-0 flex ml-8 xl:ml-12 justify-center">
          <div>
            <Header
              pageTitle={
                userRole == 'user' ? 'USER DASHBOARD' : 'ADMIN DASHBOARD'
              }
            />
          </div>

          {/* Page Contents */}
          <div className="pt-20 flex-column">
            <div className="flex">
              {/* Upload button */}
              <div className="flex ml-auto order-2">
                <ExportFileBtn list={rows}/>
                <UploadFileBtn
                  handleClick={readInputFile}
                  handleAddRecord={handleAddRecord}
                />
              </div>
              {/* Search input button */}
              <div className="float-left items-center">
                <Search
                  user="student number"
                  handleSearch={(e) => setSearchStudent(e.target.value)}
                  searchValue={searchStudent}
                  buttonHandler={handleSearch}
                  handleEnter={handleEnterPress}
                />
              </div>
              {/* Refresh button */}
              <div className="flex items-center ml-2">
                <Refresh handleClick={() => navigate('/user-dashboard')} />
              </div>
            </div>
            <div className="table-container">
              <List
                table={1}
                data={currentRows}
                changeSort={changeSort}
                sortState={sortState}
                handleDeleteRecord={handleDeleteRecord}
              />
            </div>
            <div className="float-right">
              <Pagination
                rowsPerPage={rowsPerPage}
                totalRows={rows.length}
                currentPage={currentPage}
                paginate={paginate}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
