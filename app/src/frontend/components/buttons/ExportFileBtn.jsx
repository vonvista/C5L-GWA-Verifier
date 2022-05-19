import 'tailwindcss/tailwind.css';
import exportIcon from '../../../../assets/icons/export.svg';
import exportStudentList from 'backend/ExportStudentList';
import { useState } from 'react';
import Swal from 'sweetalert2';

//Button for export file 
const ExportFileBtn = ({ list }) => {
  const exportbtn = `w-[11vw] h-[3vw] bg-export-yellow m-2 rounded-xl text-white text-base font-montserrat font-bold hover:shadow-lg hover:bg-export-yellow-hover`;
  const [currUser, setUser] = useState(`${localStorage.getItem("FirstName")} ${localStorage.getItem("LastName")} ${localStorage.getItem("MiddleName")}`);

  const handleExport = async () => {

    // does not proceed if no student in list
    if (list.length <= 0){
      // swal error message
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No student to be exported',
      })
      return
    }

    // allows user to select the sort option using sweet alerts
    const { value: sortOption } = await Swal.fire({
      title: 'Select sort option of summary',
      input: 'select',
      inputOptions: {
        'nameAsc': 'Name (A to Z)',
        'nameDsc': 'Name (Z to A)',
        'studNoAsc': 'Student Number (Ascending)',
        'studNoDsc': 'Student Number (Descending)',
        'programAsc': 'Degree Program (A to Z)',
        'programDsc': 'Degree Program (Z to A)',
        'gwaAsc': 'GWA (Ascending)',
        'gwaDsc': 'GWA (Descending)',
      },
      inputPlaceholder: 'Select sort option',
      showCancelButton: true,
    })

    // proceed after selecting sortOption
    if (sortOption) {

      // creates the pdf export file
      exportStudentList(sortOption, list, currUser);

      // swal success message
      Swal.fire(
        'Successfully imported student summary!',
        'Wait for your download to finish',
        'success'
      )
      
    }
  }
  
  return (
    <>
      <button className={exportbtn} type="button" onClick={handleExport}>
        <img
          className="p-0.25 ml-0.25 mr-1.5 inline-flex w-[2vw] h-[2vw]"
          alt="icon"
          src={exportIcon}
        />
        <p className="text-[0.9vw] inline-block">Export as PDF</p>
      </button>
    </>
  );
};

export default ExportFileBtn;
