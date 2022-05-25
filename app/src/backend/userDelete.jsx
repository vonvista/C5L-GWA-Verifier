// AUTHOR: Elroy Cabalda
// DESCRIPTION: Takes a username and deletes it from the database

import { useState } from 'react';

const userDelete = (username) => {

  const [ip, setIp] = useState(localStorage.getItem('ServerIP'))

  const user = {
    Username: username,
  };

  // uncomment to test if proper student ID is being passed
  // console.log("Delete " + user.Username);

  fetch(`http://${ip}:3001/user/delete`,{
      method: "DELETE",
      headers: { "Content-Type":"application/json", "Authorization": `Bearer ${localStorage.getItem("Username")} ${localStorage.getItem("Password")}` },
      body: JSON.stringify(user)
    })
    .then(response => response.json())
    .then(body => {
      //console.log(body);
  })

};

export default userDelete;
