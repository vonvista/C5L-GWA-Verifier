import 'tailwindcss/tailwind.css';


/* Styles */
const modalBtnSave = `h-[5.54016620498615vh] w-[9.765625vw] py-[0.6510416666666666vw] px-[1.770083102493075vh] rounded-[0.6510416666666666vw] mr-[0.6510416666666666vw] bg-save hover:bg-save-hover text-center text-white`;


/* Save button for AddRow.jsx */
const AddRowSave = ({ handleSave }) => {
    return (
        <>
            <button className={modalBtnSave} onClick={handleSave}>Save</button>
        </>
    )
}

export default AddRowSave