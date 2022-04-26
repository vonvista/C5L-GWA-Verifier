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
]

export default function StudentRecord() { // this will probably transferred to another file but this stays here for now
    return (
      <RecordPage sem={semesters} user={user} notes={notes} />
    );
}