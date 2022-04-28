import RecordPage from './components/studentRecordPage/StudentViewRecord';
import Header from '../components/HeaderWithArrowbck';
import UserNav from '../components/UserNavigation';


// sample value for user record
const user = {
    stud_no: '2019-01234',
    name: 'Stark, Anthony Edward',
    degree_program: 'BS Computer Science',
    status: 'Pending',
}

// sample values for status tab
const statusData = {
  GPAUnits: {
      taken: 33.000,
      passed: 33.000
  },
  NotGPAUnits: {
      taken: 33.000,
      passed: 33.000
  },
  GPACalc: {
      totalGradePoints: 33.000,
      totalUnitsGPA: 33.000,
      totalGWA: 1.000
  }
}

// sample value for notes in user records grades
const notes = [
  {
      sem: "1st Semester AY 2019-2020",
      author: "John Doe",
      date: "03/03/2022",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse lobortis, nisl ut convallis vulputate, elit neque ultrices nulla, et elementum felis dui eget purus. Donec massa nunc, aliquet ut vestibulum a, cursus quis lacus. Suspendisse et volutpat leo, a lacinia neque. Nam sagittis lectus nibh, a pretium leo tincidunt et"
  },
  {
      sem: "2nd Semester AY 2019-2020",
      author: "Jane Doe",
      date: "03/04/2022",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse lobortis"
  },
  {
    sem: "2nd Semester AY 2019-2020",
    author: "Jane Doe",
    date: "03/04/2022",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse lobortis"
  },
  {
    sem: "2nd Semester AY 2019-2020",
    author: "Jane Doe",
    date: "03/04/2022",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse lobortis"
  },
]

// sample values for change history;
const history = [
  {
    date: 'MM-DD-YYYY',
    info: [
      // history entries
      {
        main: 'Main Description',
        user: 'User',
        time: 'HH:MM:SS',
        details: 'Details about the changes\n',
      },
      {
        main: 'Main Description',
        user: 'User',
        time: 'HH:MM:SS',
        details: 'Details about the changes\n',
      },
    ],
  },
  {
    date: 'MM-DD-YYYY',
    info: [
      {
        main: 'Main Description',
        user: 'User',
        time: 'HH:MM:SS',
        details: 'Details about the changes\n',
      },
    ],
  },
  {
    date: 'MM-DD-YYYY',
    info: [
      {
        main: 'Main Description',
        user: 'User',
        time: 'HH:MM:SS',
        details: 'Details about the changes\n',
      },
    ],
  },
  {
    date: 'MM-DD-YYYY',
    info: [
      {
        main: 'Main Description',
        user: 'User',
        time: 'HH:MM:SS',
        details: 'Details about the changes\n',
      },
    ],
  },
  {
    date: 'MM-DD-YYYY',
    info: [
      {
        main: 'Main Description',
        user: 'User',
        time: 'HH:MM:SS',
        details: 'Details about the changes\n',
      },
    ],
  },
  {
    date: 'MM-DD-YYYY',
    info: [
      {
        main: 'Main Description',
        user: 'User',
        time: 'HH:MM:SS',
        details: 'Details about the changes\n',
      },
    ],
  },
  {
    date: 'MM-DD-YYYY',
    info: [
      {
        main: 'Main Description',
        user: 'User',
        time: 'HH:MM:SS',
        details: 'Details about the changes\n',
      },
    ],
  },
  {
    date: 'MM-DD-YYYY',
    info: [
      {
        main: 'Main Description',
        user: 'User',
        time: 'HH:MM:SS',
        details: 'Details about the changes\n',
      },
    ],
  },
  {
    date: 'MM-DD-YYYY',
    info: [
      {
        main: 'Main Description',
        user: 'User',
        time: 'HH:MM:SS',
        details: 'Details about the changes\n',
      },
    ],
  },
]

// sample value for grades
const grades = [
  {
    sem: "First Semester A.Y. 2019-2020",
    data: [
        {   
            "idRow": "1",
            "courseName": "CMSC 12",
            "units": "3.0",
            "grade": "1.00",
            "enrolled": "3.00",
            "runningSum": "3.00"
        },
        {
            "idRow": "2",
            "courseName": "CMSC 56",
            "units": "3.0",
            "grade": "1.50",
            "enrolled": "4.50",
            "runningSum": "7.50"
        },
        {
            "idRow": "3",
            "courseName": "MATH 27",
            "units": "3.0",
            "grade": "1.75",
            "enrolled": "5.25",
            "runningSum": "12.75"
        },
        {
            "idRow": "4",
            "courseName": "ETHICS 1",
            "units": "3.0",
            "grade": "1.50",
            "enrolled": "4.50",
            "runningSum": "17.25"
        },
        {
            "idRow": "5",
            "courseName": "STS 1",
            "units": "3.0",
            "grade": "1.75",
            "enrolled": "5.25",
            "runningSum": "22.50"
        },
        {
            "idRow": "6",
            "courseName": "HK 11",
            "units": "2.0",
            "grade": "1.00",
            "enrolled": "2.00",
            "runningSum": "22.50"
        },
    ]
  },
  {
    sem: "Second Semester A.Y. 2019-2020",
    data: [
        {
            "idRow": "1",
            "courseName": "CMSC 21",
            "units": "3.0",
            "grade": "1.00",
            "enrolled": "3.00",
            "runningSum": "25.50"
        },
        {
            "idRow": "2",
            "courseName": "CMSC 57",
            "units": "3.0",
            "grade": "1.50",
            "enrolled": "4.50",
            "runningSum": "30.00"
        },
        {
            "idRow": "3",
            "courseName": "MATH 28",
            "units": "3.0",
            "grade": "1.50",
            "enrolled": "4.50",
            "runningSum": "34.50"
        },
        {
            "idRow": "4",
            "courseName": "KAS 1",
            "units": "3.0",
            "grade": "1.75",
            "enrolled": "5.25",
            "runningSum": "39.75"
        },
        {
            "idRow": "5",
            "courseName": "ARTS 1",
            "units": "3.0",
            "grade": "1.00",
            "enrolled": "3.00",
            "runningSum": "42.75"
        },
    ]
  },
  {
    sem: "First Semester A.Y. 2020-2021",
    data: [
        {
            "idRow": "1",
            "courseName": "CMSC 22",
            "units": "3.0",
            "grade": "1.00",
            "enrolled": "3.00",
            "runningSum": "45.75"
        },
        {
            "idRow": "2",
            "courseName": "CMSC 123",
            "units": "3.0",
            "grade": "2.25",
            "enrolled": "6.75",
            "runningSum": "52.50"
        },
        {
            "idRow": "3",
            "courseName": "CMSC 130",
            "units": "3.0",
            "grade": "1.00",
            "enrolled": "3.00",
            "runningSum": "55.50"
        },
        {
            "idRow": "4",
            "courseName": "CMSC 150",
            "units": "3.0",
            "grade": "1.50",
            "enrolled": "4.50",
            "runningSum": "60.00"
        },
        {
            "idRow": "5",
            "courseName": "SCIENCE 11",
            "units": "3.0",
            "grade": "1.50",
            "enrolled": "4.50",
            "runningSum": "64.50"
        },
        {
            "idRow": "6",
            "courseName": "NSTP 1",
            "units": "2.0",
            "grade": "1.25",
            "enrolled": "2.50",
            "runningSum": "64.50"
        },
    ]
  }
]

export default function StudentRecord() { // this will probably transferred to another file but this stays here for now
    return (
      <>
        <nav className="sticky z-10"><UserNav /></nav>
            <div className="relative inset-0 flex ml-8 xl:ml-12 justify-center">
                <header><Header pageTitle={"Student Record"}/></header>
                <RecordPage user={user} notes={notes} history={history} status={statusData} grades={grades} />
            </div>
      </>
    );
}
