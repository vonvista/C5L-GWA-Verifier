import Actions from './buttons/Actions'

export default ReadRow = ({data, clickHandler, delHandler}) => {

    const delRow = () => { 
        // function for deletingRow
        delHandler(data)
    }

    return(
        <div className="table-row">
            <div className="table-cell">{data.courseName}</div>
            <div className="table-cell text-center">{data.units}</div>
            <div className="table-cell text-center">{data.grade}</div>
            <div className="table-cell text-center">{data.enrolled}</div>
            <div className="table-cell text-center">{data.runningSum}</div>
            <div className="table-cell text-center">
                <button onClick={clickHandler}>Edit</button>
                <button onClick={delRow}>Delete</button>
            </div>
        </div>
    );
}
