import React, { useState, useEffect } from 'react';
import Header from 'frontend/components/common/HeaderWithArrowbck';
import UserNav from 'frontend/components/common/UserNavigation';
import AdminNav from 'frontend/components/common/AdminNavigation';
import RecordPage from './StudentViewRecord';
import Swal from 'sweetalert2';

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

// values for checklist details
const checklistDetails = [
  {
    status: false,
    detail: "Complete units for the course"
  },
  {
    status: false,
    detail: "Complete electives"
  },
  {
    status: false,
    detail: "Correct number of units and grades"
  },
  {
    status: false,
    detail: "No underload or overload"
  },
]

// organize grades from database for RecordPage props
function organizeGrades(data){

  // final variable to be return
  let finalGrades = []

  // gradeSet template
  let gradeSet = {
    sem: "",
    data: [],
  };

  let weight = 0
  let cumulative = 0
  let total = 0

  // loop for organizing data from db
  for ( let i = 0 ; i < data.length ; i++ ){

    if (i==0){

      finalGrades.push({sem: "", data: [],})
      finalGrades[i].sem = data[i].Semyear
      finalGrades[i].data.push({})
      finalGrades[i].data[i]._id = data[i]._id
      finalGrades[i].data[i].idRow = (finalGrades[i].data.length + 1).toString()
      finalGrades[i].data[i].courseName = data[i].Course
      finalGrades[i].data[i].units = data[i].Unit.toString()
      finalGrades[i].data[i].grade = data[i].Grade
      
    } else {

      let index = null

      // find where to insert the current data
      for (let j = 0; j < finalGrades.length; j++){
        if (data[i].Semyear == finalGrades[j].sem){
          index = j
          break
        }
        index = finalGrades.length
      }

      if(index == finalGrades.length){
        finalGrades.push({sem: "", data: [],})
        finalGrades[index].sem = data[i].Semyear
      }

      finalGrades[index].data.push({})
      finalGrades[index].data[ finalGrades[index].data.length - 1 ]._id = data[i]._id
      finalGrades[index].data[ finalGrades[index].data.length - 1 ].idRow = (finalGrades[index].data.length + 1).toString()
      finalGrades[index].data[ finalGrades[index].data.length - 1 ].courseName = data[i].Course
      finalGrades[index].data[ finalGrades[index].data.length - 1 ].units = data[i].Unit.toString()
      finalGrades[index].data[ finalGrades[index].data.length - 1 ].grade = data[i].Grade.toString()

    }
  }

  for (let i = 0; i < finalGrades.length; i++){

    for (let j = 0; j < finalGrades[i].data.length; j++){

      // compute total unit per sem, weight, and cumulative
      weight = parseFloat(finalGrades[i].data[j].units) * parseFloat(finalGrades[i].data[j].grade)
      if(isNaN(weight)){
        weight = 0;
      }
      cumulative += weight
      total += parseFloat(finalGrades[i].data[j].units)

      finalGrades[i].data[ j ].enrolled = weight.toString()
      finalGrades[i].data[ j ].runningSum = cumulative.toString()
    }

    finalGrades[i].total = total
    total = 0
  }

  //console.log(finalGrades)
  return finalGrades

}

// organize history from database for RecordPage props
function organizeHistory(data){

  // final var to be returned
  const finalHistory = []

  // historySet template
  let historySet = {
    date: "",
    info: [],
  }

  // main loop for organizing history
  for ( let i = 0 ; i < data.length ; i++ ){

    // fill historySet date first
    if( i == 0 ) historySet.date = data[0].Date;

    // push prev Set and creates new Set for different date
    if ( historySet.date != data[i].Date ){

      // push previous set
      finalHistory.push( historySet )

      // reset historySet
      historySet = {
        date: "",
        info: [],
      }

      // fill historySet.date
      historySet.date = data[i].Date
    }

    // fill other data
    historySet.info.push({})
    historySet.info[ historySet.info.length - 1 ].main = data[i].Description
    historySet.info[ historySet.info.length - 1 ].user = data[i].User
    historySet.info[ historySet.info.length - 1 ].time = data[i].Time
    historySet.info[ historySet.info.length - 1 ].details = data[i].Details

    // push last Set
    if(i == data.length - 1){
      finalHistory.push( historySet )
    }

  }
  
  return finalHistory

}

export default function StudentRecord() { // this will probably transferred to another file but this stays here for now

  // Backend Linking (Database to Frontend) -lal
  const [studentProp, getStudentProp] = useState()
  const [notesProp, getNotesProp] = useState()
  const [gradesProp, getGradesProp] = useState()
  const [historyProp, getHistoryProp] = useState()
  const [validationsProp, getvalidationsProp] = useState(checklistDetails)
  //Move currStudentID and key to useEffect (localstorage access is slow)
  const [currStudentID, setCurrStudentID] = useState({StudentID: localStorage.getItem("currStudentKey")})
  const [currStudentKey, setCurrStudentKey] = useState(localStorage.getItem("currStudentID"))
  const [userRole, setUserRole] = useState(localStorage.getItem("Role"))
  const [ip, setIp] = useState(localStorage.getItem('ServerIP'));

  // get Grades, Student, Notes, History from database
  useEffect(() => {
    const fetchData = async () => {
      // await setCurrStudentID({StudentID: localStorage.getItem("currStudentKey")})
      // await setCurrStudentKey(localStorage.getItem("currStudentID"))

      GetStudentGrades()
      GetStudentHistory()
      GetStudentInfo()
      GetStudentNotes()
    }
  
    // call the function
    fetchData()

  }, [])

  // fetch Student from database using Student Number
  const GetStudentInfo = () => {

    var currUser = { // store student info here
      stud_no: '',
      name: '',
      degree_program: '',
    }

    fetch(`http://${ip}:3001/student/find`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(currStudentID)// use studentID to find student info
    })
      .then(response => response.json())
      .then(body => {

        // // save to localStorage for exporting
        // localStorage.setItem("currStudent", JSON.stringify(body))

        // save the following info to currUser
        currUser.stud_no = body.StudentID
        currUser.name = `${body.LastName}, ${body.FirstName} ${body.MiddleName}`
        currUser.degree_program = body.Degree
        currUser.status = "Pending"
        currUser.Student = body._id

        getStudentProp(currUser) // return student info from db

         //handle validations
        for(let i = 0; i < body.Validations.length; i++){
          validationsProp[i].status = body.Validations[i]
        }
      })
      .catch(err => { //will activate if DB is not reachable or timed out or there are other errors
        Swal.fire({
            icon: 'error',
            title: 'Server Error',
            text: 'Check if the server is running or if database IP is correct',
        })
        console.log(err)
      })
  }

  // fetch Grades from database using Student _id (PK)
  const GetStudentGrades = () => {
    
    // fetch grade by student from database
    fetch(`http://${ip}:3001/grade/find-by-student`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({Student: currStudentKey})
    })
      .then(response => response.json())
      .then(body => {
        //console.log(body)
        // sort body ( sort by Year, Semester )
        // const sortedGrades = body.sort( (x,y)=> (x.Semyear.localeCompare(y.Semyear)) )
        
        // save to localStorage for exporting grades
        // localStorage.setItem("currStudentGrades", JSON.stringify(sortedGrades) )
        
        //organize the data for table contents
        const studentGrades = organizeGrades(body)
        // console.log(studentGrades)
        getGradesProp(studentGrades)

      })
      .catch(err => { //will activate if DB is not reachable or timed out or there are other errors
        Swal.fire({
            icon: 'error',
            title: 'Server Error',
            text: 'Check if the server is running or if database IP is correct',
        })
        console.log(err)
      })
  }

  // fetch History from database using Student _id (PK)
  const GetStudentHistory = () => {

    // fetch history by Student _id
    fetch(`http://${ip}:3001/history/find-by-student`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({Student: currStudentKey})
    })
      .then(response => response.json())
      .then(body => {

        // sort body ( sort by Date)
        // then organize the data for table contents
        const studentHistory = organizeHistory(body.sort((x,y)=> ( y.Date.localeCompare(x.r) )))
        // console.log(studentHistory)
        getHistoryProp(studentHistory)

      })
      .catch(err => { //will activate if DB is not reachable or timed out or there are other errors
        Swal.fire({
            icon: 'error',
            title: 'Server Error',
            text: 'Check if the server is running or if database IP is correct',
        })
        console.log(err)
      })
  }

  // fetch History from database using Student _id (PK)
  const GetStudentNotes = () => {

    var studentNotes = [] // store notes here

    // fetch notes by studentkey from db
    fetch(`http://${ip}:3001/note/find-by-student`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({Student: currStudentKey}) // use student _id to find student notes
    })
      .then(response => response.json())
      .then(body => {

        // save notes from db to notesProp
        getNotesProp(body) 
        
      }).catch(err => { //will activate if DB is not reachable or timed out or there are other errors
        Swal.fire({
            icon: 'error',
            title: 'Server Error',
            text: 'Check if the server is running or if database IP is correct',
        })
        console.log(err)
      })
  }

  // // update grade table on addrow, editrow, deleterow changes
  // const setGrades = (values) => {

  //   let grades = [...gradesProp]
  //   let total = 0
  //   let cumulative = 0
  //   let weight = 0

  //   // insert new values to grades
  //   for (let i = 0; i < grades.length; i++){
  //     if(grades[i].sem == values.sem){
  //       //console.log(values)
  //       grades[i] = values
  //       break
  //     }
  //   }
    

  //   for (let i = 0; i < grades.length; i++){

  //     for (let j = 0; j < grades[i].data.length; j++){

  //       // compute total unit per sem, weight, and cumulative
  //       weight = parseFloat(grades[i].data[j].units) * parseFloat(grades[i].data[j].grade)
  //       if(isNaN(weight)){
  //         weight = 0;
  //       }
  //       cumulative += weight
  //       total += parseFloat(grades[i].data[j].units)

  //       grades[i].data[j].enrolled = weight.toString()
  //       grades[i].data[j].runningSum = cumulative.toString()
  //     }

  //     grades[i].total = total
  //     total = 0
  //   }
  //   //console.log(grades)
  //   // set new value of props
  //   getGradesProp(grades)
  // }


    return (

      // checks if props are already fetched from the DB
      (studentProp && notesProp && gradesProp && historyProp) ? 
      <>
        <nav class="sticky z-10">
          {userRole == "user" ? <UserNav /> : <AdminNav />}
        </nav>
            <div className="relative inset-0 flex ml-8 xl:ml-12 justify-center">
                <header><Header pageTitle={"Student Record"}/></header>
                <RecordPage
                  // user={user}                   // dummy data
                  student={studentProp}
                  notes={notesProp}
                  history={historyProp}
                  status={statusData}
                  grades={gradesProp} 
                  checklist={validationsProp} 
                  // autoSet={setGrades}
                />
            </div>
      </> 
      // empty div while data are not ready
      : <div></div>      
      
    );
}
