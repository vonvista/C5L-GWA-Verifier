import Actions from 'frontend/components/buttons/Actions'

const ReadRow = ({data, clickHandler, delHandler}) => {

    const delRow = () => { 
        // function for deletingRow
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
                <Actions handleEdit={clickHandler} handleDelete={delRow}/>
            </div>
        </div>
    );
}

export default ReadRow;