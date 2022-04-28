// AUTHOR: Elroy Cabalda
// DESCRIPTION: Takes a student ID and deletes it from the database

const studentDelete = (ID) => {

  const student = {
    StudentID: ID,
  };

  // uncomment to test if proper student ID is being passed
  // console.log("Delete " + student.StudentID);

  fetch("http://localhost:3001/student/delete",{
      method: "DELETE",
      headers: { "Content-Type":"application/json" },
      body: JSON.stringify(student)
    })
    .then(response => response.json())
    .then(body => {
      console.log(body);
  })

};

export default studentDelete;
