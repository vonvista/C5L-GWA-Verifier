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

    const studentsData = [
        {
          "name": "1 Ellison Maurice C. Paguagan",
          "studno": "2019-05235",
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
                <UploadFileBtn />
                <div className='table-container'>
                  <List table={1} data={currentRows}/>
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
