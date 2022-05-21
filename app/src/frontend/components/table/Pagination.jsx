import { useState } from "react"

/* Components */
import List from './List';

/* CSS */
// import './Pagination.css'
import 'tailwindcss/tailwind.css';

/* Assets */
import leftarrow from '../../../assets/icons/pagination-left-arrow.svg';
import rightarrow from '../../../assets/icons/pagination-right-arrow.svg';

/* HOW TO USE:
   1. Copy and paste this code block at the very beginning of the function/page that will use Pagination
   ------------------------------------------------------------------
   const [rows, setRows] = useState([]);
   const [currentPage, setCurrentPage] = useState(1);
   const [rowsPerPage, setRowsPerPage] = useState(10);
   ------------------------------------------------------------------

   2. In retrieving data, use `setRows`
   Example:
   useEffect(() => {
      const fetchData = async () => {
        // Retrieve data from database
        await setRows(studentsData);   <--------- REFER TO THIS LINE
      }

      fetchData();
    }, []);
   
   3. Copy and paste this code block just outside your page's return statement
   ------------------------------------------------------------------
      // Get current rows
      const indexOfLastRow = currentPage * rowsPerPage;
      const indexOfFirstRow = indexOfLastRow - rowsPerPage;
      const currentRows = rows.slice(indexOfFirstRow, indexOfLastRow)

      //Change page
      const paginate = pageNumber => setCurrentPage(pageNumber);
   ------------------------------------------------------------------

   3. Copy and paste this line of code to call Pagination
   <Pagination rowsPerPage={rowsPerPage} totalRows={rows.length} currentPage={currentPage} paginate={paginate} />
*/

const Pagination = ({ rowsPerPage, totalRows, currentPage, paginate }) => {
   let [num, setNum] = useState(1);
   const numberOfPages = Math.ceil(totalRows / rowsPerPage);
   const pageNumbers = []

   if (numberOfPages < 3){
      // If buttons are less than 3, follow that as the number of buttons to show (1 or 2)
      for (let i=0; i < numberOfPages; i++) {
         pageNumbers.push({page: num + i});
      }
   }else{
      // 3 page buttons shown at a time
      for (let i=0; i <= 2; i++) {
         pageNumbers.push({page: num + i});
      }
   }

   // Show succeeding pages to choose
   function next () {
      num < numberOfPages-2 && setNum(++num)
   }

   // Show previous pages to choose
   function prev () {
      num > 1 && setNum(--num)
   }

   /* Styling */
   const paginationBox = `flex bg-white rounded-lg font-montserrat drop-shadow`;
   const buttonStyle = `rounded-lg py-0 hover:text-white hover:bg-secondary-red h-[4.847645429362881vh] px-[1.0416666666666667vw]`;
   const arrowStyle = `h-[2.770083102493075vh] w-[1.3020833333333333vw] fill-current`
   const pageButton = `h-[4.847645429362881vh] w-[2.2786458333333335vw] rounded-[0.5208333333333334vw] px-[1.0416666666666667vw] py-0 text-[1.1067708333333333vw]`;
   const currentPageStyle = `text-white bg-secondary-red`;

   return (
      <div className={paginationBox}>
         <button onClick={prev} className={buttonStyle}>
            <svg class={arrowStyle} viewBox="0 0 20 20">
               <path d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" fill-rule="evenodd"></path>
            </svg>
         </button>
         {
            pageNumbers.map((pg, i) => (
               <button key={i} onClick={() => paginate(pg.page)} className={`${pageButton} ${currentPage === pg.page && currentPageStyle}`}>{pg.page}</button>
            ))
         }
         <button onClick={next} className={buttonStyle}>
            <svg class={arrowStyle} viewBox="0 0 20 20">
               <path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" fill-rule="evenodd"></path>
            </svg>
         </button>
      </div>
   )
}

export default Pagination