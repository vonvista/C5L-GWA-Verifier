// AUTHOR: Elroy Cabalda
// DESCRIPTION: Takes a username and deletes it from the database

const userDelete = (username) => {

  const user = {
    Username: username,
  };

  // uncomment to test if proper student ID is being passed
  // console.log("Delete " + user.Username);

  fetch("http://localhost:3001/user/delete",{
      method: "DELETE",
      headers: { "Content-Type":"application/json" },
      body: JSON.stringify(user)
    })
    .then(response => response.json())
    .then(body => {
      console.log(body);
  })

};

export default userDelete;
