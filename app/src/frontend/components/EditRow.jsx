import Actions from './buttons/Actions'
import Input from './inputs/Input'
import 'tailwindcss/tailwind.css'

export default EditRow = ({data, changeHandler, onSubmit, toggleHandler, touched, errors, valid}) => {

    const inputStyle = `block box-border focus:outline-none border-b border-white focus:border-b focus:border-login-green`
    const errorStyle= `block text-center text-sm inter text-secondary-red`
    const centerInput= `w-1/3 text-center mx-auto`

    return(
        <form className="table-row inter" onSubmit={onSubmit}>
            <div className="table-cell max-w-1/6">
                <Input
                    labelStyle="hidden"       // styling for label
                    labelVal="course"         // label text
                    inputStyle={` ${inputStyle}`}       // styling for input
                    name="courseName"             // name of label-input components
                    inputType="text"        // type of input password, email, text, etc.
                    inputPlaceholder={data.courseName} // placeholder text for input
                    value={data.courseName}            // value of the input
                    changeHandler={changeHandler}    // change handling
                    //required={true}   
                    />
                {touched.courseName && errors.courseName && 
                    <p className={errorStyle}>{errors.courseName}</p>    // errror message
                }  
            </div>
            <div className="table-cell w-1/6">
                <Input
                    labelStyle="hidden"       // styling for label
                    labelVal=""         // label text
                    inputStyle={`${centerInput} ${inputStyle}`}       // styling for input
                    name="units"             // name of label-input components
                    inputType="numeric"        // type of input password, email, text, etc.
                    inputPlaceholder={data.units} // placeholder text for input
                    value={data.units}            // value of the input
                    changeHandler={changeHandler}    // change handling
                    //required={true}    
                    />
                {touched.units && errors.units && 
                    <p className={errorStyle}>{errors.units}</p>    // errror message
                }   
            </div>
            <div className="table-cell w-1/6">
                <Input
                    labelStyle="hidden"       // styling for label
                    labelVal=""         // label text
                    inputStyle={`${centerInput} ${inputStyle}`}       // styling for input
                    name="grade"             // name of label-input components
                    inputType="numeric"        // type of input password, email, text, etc.
                    inputPlaceholder={data.grade} // placeholder text for input
                    value={data.grade}            // value of the input
                    changeHandler={changeHandler}    // change handling
                    //required={true}    
                    />
                {touched.grade && errors.grade && 
                    <p className={errorStyle}>{errors.grade}</p>    // errror message
                }   
            </div>
            <div className="table-cell w-1/6">
                <Input
                    labelStyle="hidden"       // styling for label
                    labelVal=""         // label text
                    inputStyle={`${centerInput} ${inputStyle}`}       // styling for input
                    name="enrolled"             // name of label-input components
                    inputType="numeric"        // type of input password, email, text, etc.
                    inputPlaceholder={data.enrolled} // placeholder text for input
                    value={data.enrolled}            // value of the input
                    changeHandler={changeHandler}    // change handling
                    //required={true}    
                    />
                {touched.enrolled && errors.enrolled && 
                    <p className={errorStyle}>{errors.enrolled}</p>    // errror message
                }   
            </div>
            <div className="table-cell w-1/6">
                <Input
                    labelStyle="hidden"       // styling for label
                    labelVal=""         // label text
                    inputStyle={`${centerInput} ${inputStyle}`}       // styling for input
                    name="runningSum"             // name of label-input components
                    inputType="numeric"        // type of input password, email, text, etc.
                    inputPlaceholder={data.runningSum} // placeholder text for input
                    value={data.runningSum}            // value of the input
                    changeHandler={changeHandler}    // change handling
                    //required={true}    
                    />
                {touched.runningSum && errors.runningSum && 
                    <p className={errorStyle}>{errors.runningSum}</p>    // errror message
                }   
            </div>

            <div className="table-cell w-1/6 text-center">
                <button type="submit" disabled={!valid}>Save</button>
                <button type="button" onClick={toggleHandler}>Cancel</button>
                {/* <Actions/> */}
            </div>
        </form>
    );
}
