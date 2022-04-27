
//Temporary File for student edit and add history functionalities

import React, {useState, useEffect } from "react";

export default function App() {
    const initialState = { //initialization of temporary holder for student fields
        StudentNo: '',
        FirstName: '',
        MiddleName: '',
        LastName: '',
        Degree: '',
        Course: '',
        TotalUnits: 0,
        TotalUnits2: 0,
        TotalCumulative: 0,
        OverallGWA: 0  
    };
    const [currentChanges, setCurrentChanges] = useState(initialState); //state which will hold initial fields
    const [modifedChanges, setModifiedChanges] = useState([]); //state which will hold modified fields
   
    
    useEffect(() => {
         setModifiedChanges(prevState => [currentChanges, ...prevState]);
    }, [currentChanges])


    const submitChanges = () => { //function command which will push modified fields to database 
        fetch(`http://localhost:3001/student/update`, {
            method: "PUT",
            headers: { "Content-Type":"application/json" },
            body: JSON.stringify(currentChanges)
        })
        .then(response => response.json())
        .then(body => {
            console.log(body)

        })
    }


    useEffect(() => { //command which will add a new history to database
        fetch(`http://localhost:3001/history/add`, {
            method: "POST",
            headers: { "Content-Type":"application/json" },
            body: JSON.stringify(modifedChanges)
        })
        .then(response => response.json())
        .then(body => {
            console.log(body)

        })
    }, [currentChanges])

}