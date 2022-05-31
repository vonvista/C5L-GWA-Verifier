import SaveCancel from 'frontend/components/buttons/ActionsSaveCancel'
import Actions from 'frontend/components/buttons/Actions'
import Input from 'frontend/components/inputs/Input'
import 'tailwindcss/tailwind.css'


/* Parent component >> frontend/components/table/List */

/* This function contains a component that is active when the row of the grades table is being edited */
/* Props:
    dataDynamic     ---  values that are being edited in real time
    dataStatic      ---  values that will only updated when values in the row are saved
    changeHandler   ---  holds the changeHandler for the inputs
    onSubmit        ---  submit handler for input form
    toggleHandler   ---  holds the toggling of whether to show the editRow component or not
    touched         ---  holds object that tells whether an input has been touched
    errors          ---  holds errors when invalid inputs are given
    valid           ---  checks if given data is valid or not
    sem             ---  receives the semester and academic year where the row is located
    setHistoryEditRow   --- handles pushing edit row changes to history
*/
const EditRow = ({dataDynamic, dataStatic, changeHandler, onSubmit, toggleHandler, touched, errors, valid, sem, setHistoryEditRow}) => {

    const inputStyle = `block box-border focus:outline-none text-sr-dark-text border-b border-sr-disabled-green transition ease-out duration-100 focus:transition focus:ease-in-out focus:duration-100 focus:border-b focus:border-button-green`
    const errorStyle= `block text-sm 5xl:text-[0.75vw] font-inter text-secondary-red`
    const centerInput= `w-1/3 text-center mx-auto`

    return(
        <form className="table-row inter mt-2">
            <div className="table-cell max-w-1/6 align-middle">
                <Input
                    labelStyle="hidden"                                 // styling for label
                    labelVal="course"                                   // label text
                    inputStyle={`w-2/3 ${inputStyle}`}                  // styling for input
                    name="courseName"                                   // name of label-input components
                    inputType="text"                                    // type of input password, email, text, etc.
                    inputPlaceholder={dataDynamic.courseName}           // placeholder text for input
                    value={dataDynamic.courseName}                      // value of the input
                    changeHandler={changeHandler}                       // change handling
                />
                {touched.courseName && errors.courseName && 
                    <p className={`text-left ${errorStyle}`}>{errors.courseName}</p>    // error message
                }  
            </div>
            <div className="table-cell w-1/6 align-middle">
                <Input
                    labelStyle="hidden"                                 // styling for label
                    labelVal=""                                         // label text
                    inputStyle={`${centerInput} ${inputStyle}`}         // styling for input
                    name="grade"                                        // name of label-input components
                    inputType="text"                                    // type of input password, email, text, etc.
                    inputPlaceholder={dataDynamic.grade}                // placeholder text for input
                    value={dataDynamic.grade}                           // value of the input
                    changeHandler={changeHandler}                       // change handling
                />
                {touched.grade && errors.grade && 
                    <p className={`text-center ${errorStyle}`}>{errors.grade}</p>        // error message
                }   
            </div>
            <div className="table-cell w-1/6 align-middle">
                <Input
                    labelStyle="hidden"                                 // styling for label
                    labelVal=""                                         // label text
                    inputStyle={`${centerInput} ${inputStyle}`}         // styling for input
                    name="units"                                        // name of label-input components
                    inputType="numeric"                                 // type of input password, email, text, etc.
                    inputPlaceholder={dataDynamic.units}                // placeholder text for input
                    value={dataDynamic.units}                           // value of the input
                    changeHandler={changeHandler}                       // change handling
                />
                {touched.units && errors.units && 
                    <p className={`text-center ${errorStyle}`}>{errors.units}</p>        // error message
                }   
            </div>
            
            {/* Non-editable row items */}
            <div className="table-cell w-1/6 align-middle text-center text-sr-dark-text">{dataStatic.enrolled} </div>
            <div className="table-cell w-1/6 align-middle text-center text-sr-dark-text">{dataStatic.runningSum}</div>

            <div className="table-cell w-1/6 align-middle text-center">
                <SaveCancel
                    handleSave={onSubmit}
                    handleCancel={toggleHandler}
                    isValid={valid}
                    isTouched={touched.courseName || touched.units || touched.grade}
                    handleHistory={setHistoryEditRow}
                    values={dataDynamic}
                    sem={sem}
                />
            </div>
        </form>
    );
}


export default EditRow;