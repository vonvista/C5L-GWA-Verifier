import { jsPDF } from 'jspdf';      // http://raw.githack.com/MrRio/jsPDF/master/docs/jsPDF.html
import 'jspdf-autotable';           // https://www.npmjs.com/package/jspdf-autotable

// column headers for table 
const tableHeader = [['CRSE NO.', 'Grade', 'Unit', 'Enrolled', 'Cumulative', "",'Term']];

const YMargin = 50;     // top page margin
const LeftMargin = 55;  // left page margin

// consist of table styles for the table output. Also includes the header and body data to be added

const styles = {
    theme: 'plain',
    headStyles: { // styles for table header
        fontStyle: 'bold',
        fillColor: 'white',
        textColor: 'black',
        lineColor: 'black',
        lineWidth: 0.1,
        minCellWidth: 50,
        fontSize: 8,
        cellpadding: {top: 0, right: 0, bottom: 0, left: 0},
        },
    bodyStyles: { // styles for table body
        fontStyle: 'normal',
        fillColor: 'white',
        textColor: 'black',
        lineColor: 'black',
        lineWidth: 0.1,
        minCellWidth: 50,
        fontSize: 7.5,
        cellpadding: {top: 0, right: 0, bottom: 0, left: 0},
        },
    margin: {right: 55,  left: 55, top: 50, bottom: 50},
    columnStyles: { // individual column styles
        1: { halign:'right' }, 
        2: { halign:'right' }, 
        3: { halign:'right' }, 
        4: { halign:'right' }, 
        5: { halign:'right' }},
    showHead: 'firstPage',
    tableWidth: 'wrap',
    tableHeight: 'wrap',
    startY: 75,
    head: tableHeader,
    };

// this function arranges the structure of the data for export
function arrangeForExport(data){
    // storage of data to be exported
    let finalExportData = {
        studentNo: data.studnno,
        name: data.name,
        program: "BACA",
        subjects: [],
        cumulative: data.cumulative[data.cumulative.length - 1],
        gwa: 1.74486, 
        totalunits: data.totalunits,
        totalunits2: data.totalunits,
    };

    // if student number is not specified
    if (data.studnno == null){
        finalExportData.studentNo = '' 
    }

    // restructures the subjects
    for (let i = 0; i < data.courses.length; i++){
        let temp = []
        temp.push(data.courses[i])
        temp.push(data.grades[i])
        temp.push(data.units[i])
        temp.push(data.weights[i])
        temp.push(data.cumulative[i])
        temp.push(data.term[i])
        temp.push(data.sem[i])
        finalExportData.subjects.push(temp)
    }

    // removes the duplicates on the last 2 columns
    for (let i = 0; i < finalExportData.subjects.length; i++){
        if (i + 1 != finalExportData.subjects.length){
            if (finalExportData.subjects[i][6] == finalExportData.subjects[i+1][6]){
                finalExportData.subjects[i][5] = ''
                finalExportData.subjects[i][6] = ''
            }
        }
    }

    // adds another row at the end of subject containg the totalunits and final cumulative
    finalExportData.subjects.push(['', finalExportData.totalunits, '', '', finalExportData.cumulative, '', ''])

    return finalExportData
}

// function to add user watermark to document
function addWaterMark(doc) {
    // gets the total number of page
    var totalPages = doc.internal.getNumberOfPages();
    doc.setTextColor(150); // shade of grey
    doc.setFontSize(72);   // font size

    // loop for all page
    for (i = 1; i <= totalPages; i++) {
        
        doc.setPage(i);        // set current page

        doc.saveGraphicsState();
        doc.setGState(new doc.GState({opacity: 0.25})); // sets the opacity of the watermark
        
        // get the current user logged in to the app (to be implemented)
        // const user = getCurrentUser();
        
        // insert the 6 water mark
        for (let i = 0; i < 5; i++) {
            doc.text(doc.internal.pageSize.width * 11 / 32, doc.internal.pageSize.height * (i*2+1) / 8, 'user1234', {align: 'center', angle: 45});
            doc.text(doc.internal.pageSize.width * 27 / 32, doc.internal.pageSize.height * (i*2+1) / 8, 'user1234', {align: 'center', angle: 45});
        }

        doc.restoreGraphicsState();
    }
  
    return doc;
}

function exportStudentData(data){
    exportData = arrangeForExport(data)
    doc = new jsPDF({
        unit: 'px',
        format: 'letter',
    });
    
    doc.setFontSize(10);    //set font size

    doc.text(`Name: ${exportData.name}                              Student No.: ${exportData.studentNo}`, LeftMargin, YMargin); // add text
    doc.text(`Program: ${exportData.program}`, LeftMargin, YMargin + 15); // add text

    styles.body = exportData.subjects;  // add the data for body on styles

    doc.autoTable(styles);  // create table

    doc.setPage(doc.internal.getNumberOfPages()); // goes to the current last page

    // y-axis value where the table ended
    let finalY = doc.previousAutoTable.finalY;

    finalY += 15;   // increment for next line
    // checks if new finalY is on the bottom margin
    if (finalY >= doc.internal.pageSize.height - YMargin){
        doc.addPage();
        finalY = YMargin
    }

    doc.text(`GWA: ${exportData.gwa}`, LeftMargin, finalY);       // add text

    finalY += 15;   // increment for next line
    if (finalY >= doc.internal.pageSize.height - YMargin){
        doc.addPage();
        finalY = YMargin
    }
    
    doc.text(`${exportData.totalunits2}`, LeftMargin, finalY);     // add text

    doc = addWaterMark(doc);    // addwatermark
    doc.save(`${exportData.name}_${exportData.program}_summary`);     // download pdf
}

export default exportStudentData;