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

function organizeRecord(info, grades){

    // storage of data to be exported
    let finalExportData = {
        studentNo: info.stud_no,
        name: info.name,
        program: info.degree_program,
        grades: [],
        gwa: 0, 
    };

    // reformat grades to be jspdf-autotable ready
    let reGrades = [];
    let totalUnits = 0;
    
    for (let i = 0; i < grades.length; i++){

        for (let j = 0; j < grades[i].data.length; j++){

            reGrades.push([
                grades[i].data[j].courseName,
                grades[i].data[j].grade,
                grades[i].data[j].units,
                grades[i].data[j].enrolled,
                grades[i].data[j].runningSum,
            ]);

            
            if (grades[i].data[j].grade != 'S' && grades[i].data[j].units != '0' && grades[i].data[j].grade != 'INC' && grades[i].data[j].grade != 'DRP' && grades[i].data[j].grade != '0'){
                totalUnits += parseFloat(grades[i].data[j].units)
            }
        }

        // add total units per sem and semester 
        reGrades[ reGrades.length - 1 ].push(grades[i].total)
        reGrades[ reGrades.length - 1 ].push(grades[i].sem)
    }

    let cumulative = parseFloat(reGrades[ reGrades.length - 1 ][4])

    // store grades
    finalExportData.grades = reGrades
    finalExportData.grades.push(['', totalUnits, '', '', cumulative, '', ''])
    finalExportData.gwa = cumulative / totalUnits

    return finalExportData
}

// function to add user watermark to document
function addWaterMark(doc, user) {

    // gets the total number of page
    var totalPages = doc.internal.getNumberOfPages();

    doc.setTextColor(150); // shade of grey
    doc.setFontSize(72);   // font size

    // loop for all page
    for (i = 1; i <= totalPages; i++) {

        // set current page
        doc.setPage(i)

        // sets the opacity of the watermark
        doc.saveGraphicsState()
        doc.setGState(new doc.GState({opacity: 0.25})); 
        
        // insert the 6 water mark
        for (let i = 0; i < 5; i++) {
            doc.text(doc.internal.pageSize.width * 11 / 32, doc.internal.pageSize.height * (i*2+1) / 8, user, {align: 'center', angle: 45});
            doc.text(doc.internal.pageSize.width * 27 / 32, doc.internal.pageSize.height * (i*2+1) / 8, user, {align: 'center', angle: 45});
        }

        doc.restoreGraphicsState();
    }
  
    return doc;
}

function exportStudentData(info, grades, user){

    // format data for export
    exportData = organizeRecord(info, grades)

    // initialize pdf document
    doc = new jsPDF({
        unit: 'px',
        format: 'letter',
    })

    //set font size
    doc.setFontSize(10)    

    // add text
    doc.text(`Name: ${exportData.name}                              Student No.: ${exportData.studentNo}`, LeftMargin, YMargin)
    doc.text(`Program: ${exportData.program}`, LeftMargin, YMargin + 15)

    // add the data for body on styles
    styles.body = exportData.grades

    // create table
    doc.autoTable(styles)

    // goes to the current last page
    doc.setPage(doc.internal.getNumberOfPages())

    // y-axis value where the table ended
    let finalY = doc.previousAutoTable.finalY;

    // increment for next line
    finalY += 15

    // checks if new finalY is on the bottom margin
    if (finalY >= doc.internal.pageSize.height - YMargin){
        doc.addPage();
        finalY = YMargin
    }

    // add text
    doc.text(`GWA: ${exportData.gwa}`, LeftMargin, finalY)     

    // increment for next line
    finalY += 15

    if (finalY >= doc.internal.pageSize.height - YMargin){
        doc.addPage();
        finalY = YMargin
    }
    
    // add text
    // doc.text(`${exportData.totalunits2}`, LeftMargin, finalY)

    // addwatermark
    doc = addWaterMark(doc, user)
    
    // download pdf
    doc.save(`${exportData.name.replaceAll(".", "").replaceAll(",", "").replaceAll(" ", "_")}_${exportData.program}_summary`)
}

export default exportStudentData;