import Actions from './buttons/Actions'

const ReadRow = ({data, clickHandler, delHandler}) => {

    const delRow = () => { 
        // function for deletingRow
        delHandler(data)
    }

    return(
        <div className="table-row">
            <div className="table-cell align-middle self-center">{data.courseName}</div>
            <div className="table-cell align-middle self-center text-center">{data.units}</div>
            <div className="table-cell align-middle self-center text-center">{data.grade}</div>
            <div className="table-cell align-middle self-center text-center">{data.enrolled}</div>
            <div className="table-cell align-middle self-center text-center">{data.runningSum}</div>
            <div className="table-cell align-middle self-center text-center">
                <Actions handleEdit={clickHandler} handleDelete={delRow}/>
            </div>
        </div>
    );
}

export default ReadRow;