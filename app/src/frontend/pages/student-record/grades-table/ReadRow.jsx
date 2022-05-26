import Actions from 'frontend/components/buttons/ActionsJustification'


/* Parent component >> frontend/components/table/List */

/* This function contains a component that displays a static view of the data in the row the grades table. */
/* Props:
    data          ---  contains data to be displayed
    clickHandler  ---  handles toggle for editing the row
    delRow        ---  handles toggle for deleting the row
*/
const ReadRow = ({data, clickHandler, delHandler, histHandler, sem}) => {

    // Function for deleting row
    const delRow = () => { 
        delHandler(data)
    }

    return(
        <div className="table-row">
            <div className="table-cell align-middle self-center text-sr-dark-text">{data.courseName}</div>
            <div className="table-cell align-middle self-center text-sr-dark-text text-center">{data.units}</div>
            <div className="table-cell align-middle self-center text-sr-dark-text text-center">{data.grade}</div>
            <div className="table-cell align-middle self-center text-sr-dark-text text-center">{data.enrolled}</div>
            <div className="table-cell align-middle self-center text-sr-dark-text text-center">{data.runningSum}</div>
            <div className="table-cell align-middle self-center text-sr-dark-text text-center">
                <Actions handleEdit={clickHandler} handleDelete={delRow} handleHist={histHandler} data={data} sem={sem}/>
            </div>
        </div>
    );
}


export default ReadRow;