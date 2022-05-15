import { jsPDF } from 'jspdf';      // http://raw.githack.com/MrRio/jsPDF/master/docs/jsPDF.html
import 'jspdf-autotable';           // https://www.npmjs.com/package/jspdf-autotable

// column headers for table 
const tableHeader = [['', 'Name', 'Student No.', 'Degree Program', 'GWA']];

var YMargin = 50;     // top page margin
const LeftMargin = 55;  // left page margin


const styles = {
    theme: 'plain',
    headStyles: { // styles for table header
        fontStyle: 'bold',
        fillColor: 'white',
        textColor: 'black',
        lineColor: 'black',
        lineWidth: 0.1,
        fontSize: 8,
        cellpadding: {top: 0, right: 0, bottom: 0, left: 0},
        },
    bodyStyles: { // styles for table body
        fontStyle: 'normal',
        fillColor: 'white',
        textColor: 'black',
        lineColor: 'black',
        lineWidth: 0.1,
        fontSize: 7.5,
        cellpadding: {top: 0, right: 0, bottom: 0, left: 0},
        },
    columnStyles: { // individual column styles
        0: { halign:'center', minCellWidth: 20, }, 
        1: { halign:'left', minCellWidth: 100, }, 
        2: { halign:'left', minCellWidth: 50, }, 
        3: { halign:'left', minCellWidth: 90, }, 
        4: { halign:'left', minCellWidth: 40, }, 
    },
    showHead: 'firstPage',
    tableWidth: 'wrap',
    tableHeight: 'wrap',
    startY: YMargin + 15,
    head: tableHeader,
    };

function organizeList(data, opt){
    var studentList = []

    // format data to 2D studentListay
    for (let i = 0; i < data.length; i++){

        // only students checked and with <1.75 gwa will be included
        if (data[i].status != 'Checked' || parseFloat(data[i].gwa) > 1.75){
            continue
        }

        let temp = []

        temp.push(data[i].name)
        temp.push(data[i].studno.replace('-', ''))
        temp.push(data[i].degprog)
        temp.push(parseFloat(data[i].gwa))

        studentList.push(temp)
    }

    let finalList = []
    
    if (opt === 'nameAsc'){
        console.log(opt)
        finalList = studentList.sort((a, b) => a[0].localeCompare(b[0]));
    } else if (opt === 'nameDsc') {
        console.log(opt)
        finalList = studentList.sort((a, b) => b[0].localeCompare(a[0]));
    } else if (opt === 'studNoAsc'){
        console.log(opt)
        finalList = studentList.sort(function(a,b) {
            return a[1] - b[1];
        });
    } else if (opt === 'studNoDsc'){
        console.log(opt)
        finalList = studentList.sort(function(a,b) {
            return b[1] - a[1];
        });
    } else if (opt === 'programAsc'){
        console.log(opt)
        finalList = studentList.sort((a, b) => a[2].localeCompare(b[2]));
    } else if (opt === 'programDsc'){
        console.log(opt)
        finalList = studentList.sort((a, b) => b[2].localeCompare(a[2]));
    } else if (opt === 'gwaAsc'){
        console.log(opt)
        finalList = studentList.sort(function(a,b) {
            return a[3] - b[3];
        });
    } else if (opt === 'gwaDsc'){
        console.log(opt)
        finalList = studentList.sort(function(a,b) {
            return b[3] - a[3];
        });
    }

    for (let i = 0; i < finalList.length; i++){
        finalList[i] = [i+1, ...finalList[i]]
    }

    console.log(finalList)
    return finalList
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

function exportStudentList(sortOpt, list, user){

    // format data for export
    const exportData = organizeList(list, sortOpt)

    // initialize pdf document
    doc = new jsPDF({
        unit: 'px',
        format: 'letter',
    })

    let wantedTableWidth = 300;
    let pageWidth = doc.internal.pageSize.width;
    let pageHeight = doc.internal.pageSize.height;
    let margin = (pageWidth - wantedTableWidth) / 2;

    //set font size
    doc.setFontSize(20)    

    // add text
    doc.text('Student List Summary', (pageWidth/2), YMargin, 'center');

    //set font size
    doc.setFontSize(10)    

    // add the data for body on styles
    styles.margin = {right: margin,  left: margin, top: 50, bottom: 50}
    styles.body = exportData

    if (exportData === undefined || exportData == 0) {
        // array empty or does not exist
        doc.setFontSize(15)    
        doc.setTextColor('#d43535')
        doc.text('No student in the summary list', (pageWidth/2), (pageHeight/2), 'center');
    } else {
        // create table
        doc.autoTable(styles)
    }

    // addwatermark
    doc = addWaterMark(doc, user)
    
    // download pdf
    doc.save(`student_list_summary`)
}

export default exportStudentList;