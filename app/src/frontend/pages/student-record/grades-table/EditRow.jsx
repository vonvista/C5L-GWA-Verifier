import SaveCancel from 'frontend/components/buttons/ActionsSaveCancel'
import Actions from 'frontend/components/buttons/Actions'
import Input from 'frontend/components/inputs/Input'
import 'tailwindcss/tailwind.css'


const EditRow = ({data, changeHandler, onSubmit, toggleHandler, touched, errors, valid, histHandler}) => {

    const inputStyle = `block box-border focus:outline-none border-b border-sr-disabled-green transition ease-out delay-100 focus:transition focus:ease-in-out focus:delay-100 focus:border-b focus:border-login-green`
    const errorStyle= `block text-center text-sm inter text-secondary-red`
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
                    inputPlaceholder={data.courseName}                  // placeholder text for input
                    value={data.courseName}                             // value of the input
                    changeHandler={changeHandler}                       // change handling
                    //required={true}   
                    />
                {touched.courseName && errors.courseName && 
                    <p className={errorStyle}>{errors.courseName}</p>    // errror message
                }  
            </div>
            <div className="table-cell w-1/6 align-middle">
                <Input
                    labelStyle="hidden"                                 // styling for label
                    labelVal=""                                         // label text
                    inputStyle={`${centerInput} ${inputStyle}`}         // styling for input
                    name="units"                                        // name of label-input components
                    inputType="numeric"                                 // type of input password, email, text, etc.
                    inputPlaceholder={data.units}                       // placeholder text for input
                    value={data.units}                                  // value of the input
                    changeHandler={changeHandler}                       // change handling
                    //required={true}    
                    />
                {touched.units && errors.units && 
                    <p className={errorStyle}>{errors.units}</p>        // errror message
                }   
            </div>
            <div className="table-cell w-1/6 align-middle">
                <Input
                    labelStyle="hidden"                                 // styling for label
                    labelVal=""                                         // label text
                    inputStyle={`${centerInput} ${inputStyle}`}         // styling for input
                    name="grade"                                        // name of label-input components
                    inputType="numeric"                                 // type of input password, email, text, etc.
                    inputPlaceholder={data.grade}                       // placeholder text for input
                    value={data.grade}                                  // value of the input
                    changeHandler={changeHandler}                       // change handling
                    //required={true}    
                    />
                {touched.grade && errors.grade && 
                    <p className={errorStyle}>{errors.grade}</p>        // errror message
                }   
            </div>
            
            {/* non-editable row items */}
            <div className="table-cell w-1/6 align-middle text-center">{data.enrolled} </div>
            <div className="table-cell w-1/6 align-middle text-center">{data.runningSum}</div>

            <div className="table-cell w-1/6 align-middle text-center">
                {/* <button type="submit" disabled={!valid}>Save</button>
                <button type="button" onClick={toggleHandler}>Cancel</button> */}
                <SaveCancel handleSave={onSubmit} handleCancel={toggleHandler} isDisabled={!valid} histHandler={histHandler}/>
            </div>
        </form>
    );
}

export default EditRow;