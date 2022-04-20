// AUTHOR: Elroy Cabalda
// DESCRIPTION: Takes a pdf input file and extracts the text using pdf-parse npm package
// NOTES: made use of npm package pdfjs-dist

// Assumptions:
// - course names have spaces in between
// - 'term' is the total units for that semester
// - details after the subject line should conform to the weird formatting of the sample data
// - each file has only *ONE* page to process

const pdfjs = require('pdfjs-dist/legacy/build/pdf');
const pdfWorker = require('pdfjs-dist/legacy/build/pdf.worker.entry');

pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;

// key for local storage will be in the format of: 'fileBase_fileNum' ie. textFile_0 (can still be changed)
const fileBase = 'textFile';
let fileNum = 0;

const Test = () => {
  // simply checks if string has a number within it
  function hasNumber(string){
    // returns 1 if theres a number
    return /\d/.test(string);
  }

  // gets the text content of a singular page
  async function getFileContent(src) {
    // gets the pdf document
    const file = await pdfjs.getDocument(src).promise;
    // gets the first page of the pdf document
    const page = await file.getPage(1);
    // gets the content of the page and returns it
    return await page.getTextContent();
  }

  // processes the pdf file and extracts the necessary items from it
  async function getItems(src) {
    // gets the content of the first page of the pdf document
    const content = await getFileContent(src);

    // student data object and arrays
    const studentData = {};
    const courses = [];
    const grades = [];
    const units = [];
    const weights = [];
    const cumulative = [];
    const term = [];
    const sem = [];

    // last Y value or Y coordinate of the item; aka last line
    let lastY;
    // content of the file per line
    let line = '';
    // simplified line number to track where the each section start based on the sample file
    // 0 = name
    // 1 = program
    // 2 = headers
    // 3+ = courses and other details
    let lineNum = 0;
    // index of each entry for all the arrays
    let arrayIndex = 0;
    // index of the last entry with term and sem
    let lastIndexWithoutTermAndSem = 0;
    // indicates the how many lines after the subject part
    let numOfLineAfterSubjs = 0;

    // loops through each of the items in content
    const items = content.items.map((item) => {
      // if the line coordinate is equal append normally
      if (lastY === item.transform[5] || !lastY) {
        line += item.str;
        // else process the line to update the studentData object
      } else {
        if (lineNum == 0) {
          studentData.name = line;
        } else if (lineNum == 1) {
          studentData.program = line;
        } else if (lineNum > 2) {
          const tempArray = line.split(' ');
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
              grades[arrayIndex] = tempArray[1];
              units[arrayIndex] = tempArray[2];
              weights[arrayIndex] = tempArray[3];
              cumulative[arrayIndex] = tempArray[4];
              // index of the last word in the line
              let lastWordIndex = 4;
              
              // if the next two words are still within the length of the line array, then the term and sem exists
              if (lastWordIndex + 2 < tempArray.length) {
                // update all the preceding indices with the same term and sem
                for (let i = lastIndexWithoutTermAndSem; i <= arrayIndex; i++) {
                  term[i] = tempArray[lastWordIndex + 1];
                  sem[i] = tempArray[lastWordIndex + 2];
                }
                lastIndexWithoutTermAndSem = arrayIndex + 1;
              }
            } else {
              // if the first element (aka the subj) doesnt have a number on it, theres a space between subj name and subj code
              // line format : ENG 1(AH)   2   3   6   6
              // line indices:  0    1     2   3   4   5
              courses[arrayIndex] = tempArray[0] + ' ' + tempArray[1];
              grades[arrayIndex] = tempArray[2];
              units[arrayIndex] = tempArray[3];
              weights[arrayIndex] = tempArray[4];
              cumulative[arrayIndex] = tempArray[5];
              // index of the last word in the line
              let lastWordIndex = 5;

              // if the next two words are still within the length of the line array, then the term and sem exists
              if (lastWordIndex + 2 < tempArray.length) {
                // update all the preceding indices with the same term and sem
                for (let i = lastIndexWithoutTermAndSem; i <= arrayIndex; i++) {
                  term[i] = tempArray[lastWordIndex + 1];
                  sem[i] = tempArray[lastWordIndex + 2];
                }
                lastIndexWithoutTermAndSem = arrayIndex + 1;
              }
            }
            arrayIndex += 1;
          } else {
            // !! ---- NOTE: Formatting of the sample data is really weird (ie. UNITS EARNED not aligned with anything)
            if (numOfLineAfterSubjs == 0) {
              studentData.totalunits = tempArray[0];
            } else if (numOfLineAfterSubjs == 1) {
              studentData.gwa = tempArray[1];
            } else if (numOfLineAfterSubjs == 2) {
              studentData.totalunits2 = tempArray[0];
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
    return studentData;
  }

  function displayInputText() {
    // read the pdf file
    const reader = new FileReader();
    reader.readAsArrayBuffer(document.getElementById('myfile').files[0]);

    // once the pdf file read is done execute the function
    reader.onload = function () {
      // get the contents of the pdf file as an array buffer
      const fileURL = reader.result;
      // process the contents to simple text
      getItems(fileURL).then(function (data) {
        // modifying the key for storing in local storage
        var key = fileBase + '_' + fileNum.toString();
        // store the data to local storage
        localStorage.setItem(key, JSON.stringify(data));
        // update file number
        fileNum++;

        // optional displaying of text in paragraph
        document.getElementById('displayText').innerHTML = JSON.stringify(data);
      });
    };
  }

  return (
    <div>
      <input type="file" id="myfile" name="myfile"></input>
      <button onClick={displayInputText}>Read File</button>
      <p id="displayText">This is a Test</p>
    </div>
  );
};

export default Test;
