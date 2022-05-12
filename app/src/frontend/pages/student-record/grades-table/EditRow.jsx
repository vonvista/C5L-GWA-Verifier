import SaveCancel from 'frontend/components/buttons/ActionsSaveCancel'
import Actions from 'frontend/components/buttons/Actions'
import Input from 'frontend/components/inputs/Input'
import 'tailwindcss/tailwind.css'


const EditRow = ({dataDynamic, dataStatic, changeHandler, onSubmit, toggleHandler, touched, errors, valid, histHandler}) => {

    const inputStyle = `block box-border focus:outline-none text-sr-dark-text border-b border-sr-disabled-green transition ease-out delay-100 focus:transition focus:ease-in-out focus:delay-100 focus:border-b focus:border-login-green`
    const errorStyle= `block text-sm inter text-secondary-red`
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
                    inputPlaceholder={dataDynamic.courseName}                  // placeholder text for input
                    value={dataDynamic.courseName}                             // value of the input
                    changeHandler={changeHandler}                       // change handling
                    //required={true}   
                    />
                {touched.courseName && errors.courseName && 
                    <p className={`text-left ${errorStyle}`}>{errors.courseName}</p>    // errror message
                }  
            </div>
            <div className="table-cell w-1/6 align-middle">
                <Input
                    labelStyle="hidden"                                 // styling for label
                    labelVal=""                                         // label text
                    inputStyle={`${centerInput} ${inputStyle}`}         // styling for input
                    name="units"                                        // name of label-input components
                    inputType="numeric"                                 // type of input password, email, text, etc.
                    inputPlaceholder={dataDynamic.units}                       // placeholder text for input
                    value={dataDynamic.units}                                  // value of the input
                    changeHandler={changeHandler}                       // change handling
                    //required={true}    
                    />
                {touched.units && errors.units && 
                    <p className={`text-center ${errorStyle}`}>{errors.units}</p>        // errror message
                }   
            </div>
            <div className="table-cell w-1/6 align-middle">
                <Input
                    labelStyle="hidden"                                 // styling for label
                    labelVal=""                                         // label text
                    inputStyle={`${centerInput} ${inputStyle}`}         // styling for input
                    name="grade"                                        // name of label-input components
                    inputType="numeric"                                 // type of input password, email, text, etc.
                    inputPlaceholder={dataDynamic.grade}                       // placeholder text for input
                    value={dataDynamic.grade}                                  // value of the input
                    changeHandler={changeHandler}                       // change handling
                    //required={true}    
                    />
                {touched.grade && errors.grade && 
                    <p className={`text-center ${errorStyle}`}>{errors.grade}</p>        // errror message
                }   
            </div>
            
            {/* non-editable row items */}
            <div className="table-cell w-1/6 align-middle text-center text-sr-dark-text">{dataStatic.enrolled} </div>
            <div className="table-cell w-1/6 align-middle text-center text-sr-dark-text">{dataStatic.runningSum}</div>

            <div className="table-cell w-1/6 align-middle text-center">
                {/* <button type="submit" disabled={!valid}>Save</button>
                <button type="button" onClick={toggleHandler}>Cancel</button> */}
                <SaveCancel handleSave={onSubmit} handleCancel={toggleHandler} isValid={valid} isTouched={touched.courseName || touched.units || touched.grade} histHandler={histHandler}/>
            </div>
        </form>
    );
}

export default EditRow;