import React, { useState, useEffect } from 'react';
import RecordPage from './StudentViewRecord';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';


/* Parent component >> renderer/App.jsx */
/* This is the Student Record page which is a secondary navigation page. */

// Values for checklist details
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


// Organize grades from database for RecordPage props
function organizeGrades(data,ip,currStudentID){

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
    let finalTotal = 0;
    
    // for computation of GPA and non-GPA units
    let tunitTotal = 0;
    let punitTotal = 0;
    let tnunitTotal = 0;
    let pnunitTotal = 0;

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
            
            // compute total units earned
            if(finalGrades[i].data[j].units != "0" && finalGrades[i].data[j].grade != "0" && finalGrades[i].data[j].grade != 'S' && finalGrades[i].data[j].grade != 'INC' && finalGrades[i].data[j].grade != 'DRP' && finalGrades[i].data[j].grade != 'P' && finalGrades[i].data[j].grade != 'DFG' && finalGrades[i].data[j].grade != 'U' && !isNaN(finalGrades[i].data[j].grade)){
                finalTotal += parseFloat(finalGrades[i].data[j].units)
                // total += parseFloat(finalGrades[i].data[j].units)
            }
            
            if(finalGrades[i].data[j].units != "0" && finalGrades[i].data[j].grade != "0"){
                total += parseFloat(finalGrades[i].data[j].units)
            }

            // if weight is a text then weight considered 0
            if(isNaN(weight)){
                weight = 0;
            }

            // computation of taken GPA units
            if(finalGrades[i].data[j].units != "0" && finalGrades[i].data[j].grade != 'S' && finalGrades[i].data[j].grade != 'INC'  && finalGrades[i].data[j].grade != 'DRP' && finalGrades[i].data[j].grade != 'P' && finalGrades[i].data[j].grade != 'DFG' && finalGrades[i].data[j].grade != 'U' && !isNaN(finalGrades[i].data[j].grade)) {
                tunitTotal += parseFloat(finalGrades[i].data[j].units)
            } 

            // computation of passed GPA units
            if(finalGrades[i].data[j].units != "0") {
                if(finalGrades[i].data[j].grade != "0" && finalGrades[i].data[j].grade != 'S' && finalGrades[i].data[j].grade != 'INC'  && finalGrades[i].data[j].grade != 'DRP' && finalGrades[i].data[j].grade != 'P' && finalGrades[i].data[j].grade != 'DFG' && finalGrades[i].data[j].grade != 'U' && !isNaN(finalGrades[i].data[j].grade)) {
                punitTotal += parseFloat(finalGrades[i].data[j].units)
                } 
            }

            // computation of taken non-GPA units
            if(finalGrades[i].data[j].units == "0" || finalGrades[i].data[j].grade == 'P' || finalGrades[i].data[j].grade == 'INC' || finalGrades[i].data[j].grade == 'DRP' || finalGrades[i].data[j].grade == 'S' || finalGrades[i].data[j].grade == 'DFG' || finalGrades[i].data[j].grade == 'U') {
                
                if(finalGrades[i].data[j].units == "0"){
                    tnunitTotal += 3; 
                } else {
                    tnunitTotal += parseFloat(finalGrades[i].data[j].units)
                }
            }

            // computation of passed non-GPA units
            if(finalGrades[i].data[j].units == "0" || finalGrades[i].data[j].grade == 'P' || finalGrades[i].data[j].grade == 'INC' || finalGrades[i].data[j].grade == 'DFG' || finalGrades[i].data[j].grade == 'S') {
                if(finalGrades[i].data[j].grade != "0" && finalGrades[i].data[j].grade != 'DRP' && finalGrades[i].data[j].grade != 'U') {
                    if(finalGrades[i].data[j].units == "0"){
                        pnunitTotal += 3; 
                    } else {
                        pnunitTotal += parseFloat(finalGrades[i].data[j].units)
                    }
                }
            }

            // increment cumulative
            cumulative += weight

            // store computed weight and cumulative
            finalGrades[i].data[j].enrolled = weight.toString()
            finalGrades[i].data[j].runningSum = cumulative.toString()
        }

        // store total per sem and reset
        finalGrades[i].total = total
        total = 0
    }

    // for computation of status tab
    let unitsGPA = {GPAUnits: {taken: tunitTotal, passed: punitTotal}, NotGPAUnits: {taken: tnunitTotal, passed: pnunitTotal}}
    let gpaCalc = {totalGradePoints: cumulative, totalUnitsGPA: finalTotal, gwa: cumulative/finalTotal}

    // data to be sent to DB for update
    let newGPA = {
        _id: currStudentID,
        TotalUnits: parseFloat(gpaCalc.totalUnitsGPA),
        TotalCumulative: parseFloat(gpaCalc.totalGradePoints),
        OverallGWA: parseFloat(gpaCalc.gwa)
    }
    // update student gpa to DB
    fetch(`http://${ip}:3001/student/update-gpa`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("Username")} ${localStorage.getItem("Password")}` },
        body: JSON.stringify(newGPA)// use studentID to find student info
    })
    .then(response => response.json())
    .then(body => {
        // console.log(body)
    })
    .catch(err => { //will activate if DB is not reachable or timed out or there are other errors
        Swal.fire({
            icon: 'error',
            title: 'Server Error',
            text: 'Check if the server is running or if database IP is correct',
        })
        //console.log(err)
    })
    // console.log(gpaCalc)
    // console.log(finalTotal)
    // console.log(cumulative)
    // console.log(finalGrades)
    return [finalGrades, gpaCalc, unitsGPA]
}


// Organize history from database for RecordPage props
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
        historySet.info[ historySet.info.length - 1 ].id = data[i]._id
        historySet.info[ historySet.info.length - 1 ].hasImage = data[i].HasImage
        // push last Set
        if(i == data.length - 1){
        finalHistory.push( historySet )
        }

    }
    
    return finalHistory
}


export default function StudentRecord() {

    // Backend Linking (Database to Frontend)
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
    const [gpaCalc, setGPA] = useState();
    const [unitGPA, setunitGPA] = useState();
    const [reload, setReload] = useState('false');

    const navigate = useNavigate();

    const fetchData = async () => {

        await GetStudentInfo()
        await GetStudentGrades()
        await GetStudentHistory()
        await GetStudentNotes()
        setReload(!reload)

        // console.log("HERE")
    }  
        
    // get Grades, Student, Notes, History from database
    useEffect(() => {
        // call the function
        fetchData()

    }, [])


    // fetch Student from database using Student Number
    const GetStudentInfo = async () => {

        var currUser = { // store student info here
            stud_no: '',
            name: '',
            degree_program: '',
            iname:{},
        }

        var fetchResult;

        fetchResult = await fetch(`http://${ip}:3001/student/update-status`, {
        method: "POST",
        headers: {"Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("Username")} ${localStorage.getItem("Password")}` },
        body: JSON.stringify(currStudentID)// use studentID to find student info
        })
        .then(response => response.json())
        .then(body => {
            
            if(body.err){
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: body.err,
                })
                navigate("/in/user-dashboard");
                return false
            }
        })
        .catch(err => { //will activate if DB is not reachable or timed out or there are other errors
            Swal.fire({
                icon: 'error',
                title: 'Server Error',
                text: 'Check if the server is running or if database IP is correct',
            })
            // console.log(err)
        })

        if(fetchResult == false){
            return
        }

        fetchResult = await fetch(`http://${ip}:3001/student/find`, {
        method: "POST",
        headers: {"Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("Username")} ${localStorage.getItem("Password")}` },
        body: JSON.stringify(currStudentID)// use studentID to find student info
        })
        .then(response => response.json())
        .then(body => {
            // console.log(body)
            if(body.err){
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: body.err,
                })
                navigate("/in/user-dashboard");
                return
            }
            // save the following info to currUser
            currUser.stud_no = body.StudentID
            currUser.name = `${body.LastName}, ${body.FirstName} ${body.MiddleName}`
            currUser.degree_program = body.Degree
            currUser.status = body.Status          
            currUser.Student = body._id
            currUser.iname = {
                fname: body.FirstName,
                mname: body.MiddleName,
                lname: body.LastName
            }

            // set Student prop
            getStudentProp({...currUser}) // return student info from db

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
            //console.log(err)
        })

        if(fetchResult == false){
            return
        }

    }

    // fetch Grades from database using Student _id (PK)
    const GetStudentGrades = async () => {

        // fetch grade by student from database
        await fetch(`http://${ip}:3001/grade/find-by-student`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("Username")} ${localStorage.getItem("Password")}` },
        body: JSON.stringify({Student: currStudentKey})
        })
        .then(response => response.json())
        .then(body => {
            // console.log(body)
            if(body.err){
                Swal.fire({
                    icon: 'error',
                    title: 'Server Error',
                    text: 'Check if the server is running or if database IP is correct',
                })
                navigate("/in/user-dashboard");
            }
            //organize the data for table contents
            const studentGrades = organizeGrades(body,ip,currStudentKey)
            
            // set Grades prop
            getGradesProp(studentGrades[0])
            setGPA(studentGrades[1])
            //console.log(studentGrades[2])
            setunitGPA(studentGrades[2])
                        

        })
        .catch(err => { //will activate if DB is not reachable or timed out or there are other errors
            Swal.fire({
                icon: 'error',
                title: 'Server Error',
                text: 'Check if the server is running or if database IP is correct',
            })
            //console.log(err)
        })
    }


    // fetch History from database using Student _id (PK)
    const GetStudentHistory = async () => {

        // fetch history by Student _id
        await fetch(`http://${ip}:3001/history/find-by-student`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("Username")} ${localStorage.getItem("Password")}` },
        body: JSON.stringify({Student: currStudentKey})
        })
        .then(response => response.json())
        .then(body => {
            if(body.err){
                Swal.fire({
                    icon: 'error',
                    title: 'Server Error',
                    text: 'Check if the server is running or if database IP is correct',
                })
                navigate("/in/user-dashboard");
            }
            // sort body ( sort by Date)
            // then organize the data for table contents
            const studentHistory = organizeHistory(body.sort((x,y)=> ( y.Date.localeCompare(x.r) )))

            // set History props
            getHistoryProp(studentHistory)

        })
        .catch(err => { //will activate if DB is not reachable or timed out or there are other errors
            Swal.fire({
                icon: 'error',
                title: 'Server Error',
                text: 'Check if the server is running or if database IP is correct',
            })
            //console.log(err)
        })
    }


    // fetch History from database using Student _id (PK)
    const GetStudentNotes = async () => {

        // fetch notes by studentkey from db
        await fetch(`http://${ip}:3001/note/find-by-student`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("Username")} ${localStorage.getItem("Password")}` },
        body: JSON.stringify({Student: currStudentKey}) // use student _id to find student notes
        })
        .then(response => response.json())
        .then(body => {
            if(body.err){
                Swal.fire({
                    icon: 'error',
                    title: 'Server Error',
                    text: 'Check if the server is running or if database IP is correct',
                })
                navigate("/in/user-dashboard");
            }
            // set Notes prop
            getNotesProp(body) 
            
        }).catch(err => { //will activate if DB is not reachable or timed out or there are other errors
            Swal.fire({
                icon: 'error',
                title: 'Server Error',
                text: 'Check if the server is running or if database IP is correct',
            })
            // console.log(err)
        })
    }


    return (

        // Checks if props are already fetched from the DB
        (studentProp && notesProp && gradesProp && historyProp && gpaCalc && unitGPA) ? 
        <div className="relative inset-0 flex ml-[4vw] justify-center">
            <RecordPage key={reload}
                student={studentProp}
                notes={notesProp}
                history={historyProp}
                status={unitGPA}
                grades={gradesProp} 
                checklist={validationsProp} 
                gpa={gpaCalc}
                refresh = {fetchData} 
            />
        </div>
        
        // empty div while data are not ready
        : <div></div>      
    );
}
