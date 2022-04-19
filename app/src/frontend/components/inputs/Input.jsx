/* 
How to use:
<userInput
    labelClass=""       // styling for label
    labelVal=""         // label text
    inputClass=""       // styling for input
    name=""             // name of label-input components
    inputType=""        // type of input password, email, text, etc.
    inputPlaceholder="" // placeholder text for input
    value=""            // value of the input
    changeHandler=""    // change handling   
    /> 
*/
    
function userInput(props) {

    // function component for input field boxes

    return(
        <>
            <label 
                className={props.labelStyle}
                for={props.name}
                >
                {props.labelVal}
            </label>

            <input 
                className={props.inputStyle}
                type={props.inputType} 
                name={props.name} 
                placeholder={props.inputPlaceholder}
                value={props.value}
                onChange={props.changeHandler}         // lifting state up
                />
        </>
    )
}

export default userInput