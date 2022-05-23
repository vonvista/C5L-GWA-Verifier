// AUTHOR: Elroy Cabalda
// DESCRIPTION: Takes a pdf input file and extracts the text using pdfjs-dist npm package
// NOTES: made use of npm package pdfjs-dist

// Assumptions:
// - 'term' is the total units for that semester
// - details after the subject line should conform to the weird formatting of the sample data
// - each file has only *ONE* page to process
// - studno is always at 3rd line
// - last name is delimited by a comma "<last>,"
// - middle name is delimited by a period "<middle>."
// - middle name is only *ONE* word long
// - sem and year are assumed to be in the form of xx/xx/xx

import Swal from 'sweetalert2'

const pdfjs = require('pdfjs-dist/legacy/build/pdf');
const pdfWorker = require('pdfjs-dist/legacy/build/pdf.worker.entry');

pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;

// key for local storage will be in the format of: 'fileBase_fileNum' ie. textFile_0 (can still be changed)
const fileBase = 'textFile';
let fileNum = 0;

const readInputFile = (file, handleAddRecord) => {

  // verifies the validity of input file
  function verifyInput(studentData){
    const isSuccessful = {};  
    const numOfData = studentData.courses.length;

    // if the student doesnt have a first name or a last name 
    if (studentData.FirstName === '' || studentData.LastName === ''){
      isSuccessful.success = false;
      isSuccessful.message = "Student does not have a valid First Name or Last Name.";
    // if the student number exists and has no number
    } else if (studentData.StudentID && !hasNumber(studentData.StudentID)) {
      isSuccessful.success = false;
      isSuccessful.message = "Student does not have a valid Student Number.";
    // if the amount of data is not equal
    // NOTE: if one value is missing, the rightmost element (year and cumulative) would have an NaN and undefined value
    } else if (studentData.cumulative.includes(NaN) || studentData.year.includes(undefined)) {
      isSuccessful.success = false;
      isSuccessful.message = "Amount of data is inconsistent."; 
    // if no error encountered
    } else {
      isSuccessful.success = true;
      isSuccessful.message = "Input file was successfully read!";
    }

    return isSuccessful;
  }

  // simply checks if string has a number within it
  function hasNumber(string){
    return /\d/.test(string); // returns 1 if theres a number
  }

  // gets the text content of a singular page
  async function getFileContent(src) {
    
    const file = await pdfjs.getDocument(src).promise; // gets the pdf document
    const page = await file.getPage(1); // gets the first page of the pdf document
    return await page.getTextContent(); // gets the content of the page and returns it
  }

  // processes the pdf file and extracts the necessary items from it
  async function getItems(src) {
    const content = await getFileContent(src); // gets the content of the first page of the pdf document

    // student data object and arrays
    const studentData = {};
    const courses = [];
    const grades = [];
    const units = [];
    const weights = [];
    const cumulative = [];
    const term = [];
    const sem = [];
    const year = [];
    const notes = [];

    let lastY; // last Y value or Y coordinate of the item; aka last line
    let line = ''; // content of the file per line

    // simplified line number to track where the each section start based on the sample file
    // 0 = name
    // 1 = program
    // 2 = studno
    // 3 = headers
    // 4+ = courses and other details

    let lineNum = 0; // index of each entry for all the arrays
    let arrayIndex = 0; // index of the last entry with term and sem
    let lastIndexWithoutTermAndSem = 0; // indicates the how many lines after the subject part
    let numOfLineAfterSubjs = 0;
    let numOfNotes = 0;

    // loops through each of the items in content
    const items = content.items.map((item) => {

      // if the line coordinate is equal append normally
      if (lastY === item.transform[5] || !lastY) {
        line += item.str;

      // else process the line to update the studentData object
      } else {  
        const tempArray = line.split(' ');
        if (lineNum == 0) {

          let firstname = '';
          let middlename = '';
          let lastname = '';
          let isLastName = true;

          // loops through each word of the line to find the name of student
          for (let currentIndex = 0; currentIndex < tempArray.length; currentIndex++){
            // if current word has a comma, then its the end of it then its the last part of the last name
            if (tempArray[currentIndex].indexOf(',') !== -1){
              lastname = lastname + ' ' + tempArray[currentIndex];
              isLastName = false;
            // assume that all the first part is a surname
            } else if (isLastName) {
              lastname = lastname + ' ' + tempArray[currentIndex];
            // if the current word has a period, then its the middle name
            } else if (tempArray[currentIndex].indexOf('.') !== -1) {
              middlename = tempArray[currentIndex];
            // if none of the above is specified, then its the first name
            }  else {
              firstname = firstname + ' ' + tempArray[currentIndex];
            }
          }

          studentData.FirstName = firstname.trim();
          studentData.MiddleName = middlename
          studentData.LastName = lastname.trim().replace(',', '');

        } else if (lineNum == 1) {
          studentData.Degree = line;
        } else if (lineNum == 2) {
          studentData.StudentID = line;
        } else if (lineNum > 3) {
          if (tempArray.length > 2 && numOfLineAfterSubjs == 0) {

            // explaining all the hard-coded numbers
            // each line has at most 8 indices
            // line format : SPCM   1(AH)   1.75   3   5.25   29.25   18   I/15/16
            // line indices:   0      1       2    3     4      5      6      7

            // if the first element (aka the subj) has a number on it, meaning no space between subj name and subj code
            // line format : MATH1(MST)   2   3   6   54
            // line indices:     0        1   2   3    4
            if (hasNumber(tempArray[0])) {
              courses[arrayIndex] = tempArray[0];
              
              // if element does not have a number, keep it as a string (ie. S, INC, DRP)
              if (hasNumber(tempArray[1])){
                grades[arrayIndex] = parseFloat(tempArray[1]);
              } 
              else {
                grades[arrayIndex] = tempArray[1];
              }
              
              // remove numbers inside parenthesis before converting to int
              units[arrayIndex] = parseInt(tempArray[2].replace(/ *\([^)]*\) */g, ""));
              weights[arrayIndex] = parseFloat(tempArray[3]);
              cumulative[arrayIndex] = parseFloat(tempArray[4]);
              // index of the last word in the line
              let lastWordIndex = 4;
              
              // if the next two words are still within the length of the line array, then the term and sem exists
              if (lastWordIndex + 2 < tempArray.length) {
                let semAndYear = tempArray[lastWordIndex + 2].split('/');

                // update all the preceding indices with the same term and sem
                for (let i = lastIndexWithoutTermAndSem; i <= arrayIndex; i++) {
                  term[i] = parseInt(tempArray[lastWordIndex + 1]);
                  sem[i] = semAndYear[0];
                  if (semAndYear[1] !== undefined && semAndYear[2] !== undefined) {
                    year[i] = semAndYear[1] + '/' + semAndYear[2];
                  }
                }
                lastIndexWithoutTermAndSem = arrayIndex + 1;
              }
            } else {
              
              // if the first element (aka the subj) doesnt have a number on it, theres a space between subj name and subj code
              // line format : ENG 1(AH)   2   3   6   6
              // line indices:  0    1     2   3   4   5
              courses[arrayIndex] = tempArray[0] + ' ' + tempArray[1];
              
              // if element does not have a number, keep it as a string (ie. S, INC, DRP)
              if (hasNumber(tempArray[2])){
                grades[arrayIndex] = parseFloat(tempArray[2]);
              } else {
                grades[arrayIndex] = tempArray[2];
              }
              
              // remove numbers inside parenthesis before converting to int
              units[arrayIndex] = parseInt(tempArray[3].replace(/ *\([^)]*\) */g, ""));
              weights[arrayIndex] = parseFloat(tempArray[4]);
              cumulative[arrayIndex] = parseFloat(tempArray[5]);
              // index of the last word in the line
              let lastWordIndex = 5;

              // if the next two words are still within the length of the line array, then the term and sem exists
              if (lastWordIndex + 2 < tempArray.length) {
                let semAndYear = tempArray[lastWordIndex + 2].split('/');

                // update all the preceding indices with the same term and sem
                for (let i = lastIndexWithoutTermAndSem; i <= arrayIndex; i++) {
                  term[i] = parseInt(tempArray[lastWordIndex + 1]);
                  sem[i] = semAndYear[0];
                  // if years are NOT undefined then save to year
                  if (semAndYear[1] !== undefined && semAndYear[2] !== undefined) {
                    year[i] = semAndYear[1] + '/' + semAndYear[2];
                  }
                }
                lastIndexWithoutTermAndSem = arrayIndex + 1;
              }
            }
            arrayIndex += 1;
          } else {
            // !! ---- NOTE: Formatting of the sample data is really weird (ie. UNITS EARNED not aligned with anything)
            if (numOfLineAfterSubjs == 0) {
              studentData.TotalUnits = parseInt(tempArray[0]);
              studentData.TotalCumulative = parseFloat(tempArray[1]);
            } else if (numOfLineAfterSubjs == 1) {
              studentData.OverallGWA = parseFloat(tempArray[1]);
            } else if (numOfLineAfterSubjs == 2) {
              studentData.TotalUnits2 = parseInt(tempArray[0]);
            } else {
              notes[numOfNotes] = line;
              numOfNotes += 1;
            }
            numOfLineAfterSubjs += 1;
          }
        }

        // update line content and lineNum
        line = item.str;
        lineNum += 1;
      }

      // update the last value of the line coordinate
      lastY = item.transform[5];
    });
    studentData.courses = courses;
    studentData.grades = grades;
    studentData.units = units;
    studentData.weights = weights;
    studentData.cumulative = cumulative;
    studentData.term = term;
    studentData.sem = sem;
    studentData.year = year;
    studentData.notes = notes;
    return studentData;
  }

  function displayInputText(file) {

    // read the pdf file
    const reader = new FileReader();

    // check if parameter is of type Blob
    const myBlob = document.getElementById('myfile').files[0];
    if (!(myBlob instanceof Blob)){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occured. Please try again.',
      })
      return false;
    }

    reader.readAsArrayBuffer(document.getElementById('myfile').files[0]);

    // once the pdf file read is done execute the function
    reader.onload = function () {
      const fileURL = reader.result;  // get the contents of the pdf file as an array buffer
     
      getItems(fileURL).then(function (data) {  // process the contents to simple text
        const isSuccessful = verifyInput(data); // verifies inputs not catched by the database
        if (isSuccessful.success) {
          
          //set validations
          numOfValidations = 4
          validations = []
          for (let i = 0; i < numOfValidations; i++) {
            validations.push(false);
          }
          //console.log(validations)

          const ip = localStorage.getItem("ServerIP");
          student = {
            StudentID: data.StudentID,
            FirstName: data.FirstName,
            LastName: data.LastName,
            MiddleName: data.MiddleName,
            Degree: data.Degree,
            TotalUnits: data.TotalUnits,
            TotalUnits2: data.TotalUnits2,
            TotalCumulative: data.TotalCumulative,
            OverallGWA: data.OverallGWA,
            Status: "Unchecked",
            Validations: validations,
          };

          // checks if the student already exists in the database
          fetch(`http://${ip}:3001/student/find`,{
            method: "POST",
            headers: { "Content-Type":"application/json" },
            body: JSON.stringify(student)
          })
          .then(response => response.json())
          .then(body =>  {
            // an error occured during finding
            if (body.err == 'An error occured'){
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: body.err,
              })
            } else if (body.err == 'Unable to find student') { // no student found in the database, hence proceed
              
              // posting to database
              fetch(`http://${ip}:3001/student/add`,{
                method: "POST",
                headers: { "Content-Type":"application/json" },
                body: JSON.stringify(student)
              })
              .then(response => response.json())
              .then(body =>  {
                if(body.err){
                  Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: body.err,
                  })
                } else {
                  let StudentKey = body._id;
                  var key = fileBase + '_' + fileNum.toString(); // modifying the key for storing in local storage
                  localStorage.setItem(key, JSON.stringify(data)); // store the data to local storage
                  fileNum++; // update file number
                  
                  handleAddRecord(body);

                  // add grades data to database
                  let Grades = [];
                  // loops through each row of the columns
                  for (let i=0; i<data.courses.length; i++){
                    // pushes each row object to the array
                    Grades.push({
                      "Student" : StudentKey,
                      "Course" : data.courses[i],
                      "Grade" : data.grades[i].toString(),
                      "Unit" : data.units[i],
                      "Weight" : data.weights[i],
                      "Cumulative" : data.cumulative[i],
                      "Semyear" : data.sem[i] + '/' + data.year[i]
                    });
                  }
                  let grades = {"Grades" : Grades};
                  // posting to database
                  fetch(`http://${ip}:3001/grade/add-many`,{
                    method: "POST",
                    headers: { "Content-Type":"application/json" },
                    body: JSON.stringify(grades)
                  })
                  .then(response => response.json())
                  .then(body =>  {
                    if(body.err){
                      Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: body.err,
                      })
                    } else {
                      Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: isSuccessful.message
                      })
                    }
                  })
                  .catch(err => { //will activate if DB is not reachable or timed out or there are other errors
                    Swal.fire({
                      icon: 'error',
                      title: 'Server Error',
                      text: 'Check if the server is running or if database IP is correct'
                    })
                  })
                }
              })
              .catch(err => { //will activate if DB is not reachable or timed out or there are other errors
                Swal.fire({
                  icon: 'error',
                  title: 'Server Error',
                  text: 'Check if the server is running or if database IP is correct'
                })
              })
            } else { // student already exists, prompt user to delete student first
              Swal.fire({
                icon: 'error',
                title: 'Student already exists',
                text: `Delete previous record of ${body.StudentID} before adding it again`,
              })
            }
          })
          .catch(err => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Check if the server is running or if database IP is correct',
            })
          })
        } else {
          Swal.fire({ // will activate if preliminary verification of read input sees an error
            icon: 'error',
            title: 'Error',
            text: isSuccessful.message
          })
        }
        return isSuccessful.success;  // indicating everything read input is successful
      });
    };
  }

  return displayInputText(file);
};

export default readInputFile;