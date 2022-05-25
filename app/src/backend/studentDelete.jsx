// AUTHOR: Elroy Cabalda
// DESCRIPTION: Takes a student ID and deletes it from the database

import { useState } from 'react';

const studentDelete = (ID) => {

  const [ip, setIp] = useState(localStorage.getItem('ServerIP'));

  const student = {
    StudentID: ID,
  };

  // uncomment to test if proper student ID is being passed
  // console.log("Delete " + student.StudentID);

  fetch(`http://${ip}:3001/student/delete`,{
      method: "DELETE",
      headers: { "Content-Type":"application/json", "Authorization": `Bearer ${localStorage.getItem("Username")} ${localStorage.getItem("Password")}` },
      body: JSON.stringify(student)
    })
    .then(response => response.json())
    .then(body => {
      //console.log(body);
  })

};

export default studentDelete;
