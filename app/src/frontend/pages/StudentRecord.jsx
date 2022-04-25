import RecordPage from './components/studentRecordPage/StudentViewRecord';

// sample values for dropdown select
const semesters = [
    {name : "1st Semester A.Y. 2019-2020"},
    {name : "2nd Semester A.Y. 2019-2020"},
    {name : "1st Semester A.Y. 2020-2021"},
    {name : "2nd Semester A.Y. 2020-2021"},
  ]

// sample value for user record
const user = {
    stud_no: '2019-01234',
    name: 'Stark, Anthony Edward',
    degree_program: 'BS Computer Science',
    status: 'Pending',
}

export default function StudentRecord() { // this will probably transferred to another file but this stays here for now
    return (
      <RecordPage sem={semesters} user={user} />
    );
  }