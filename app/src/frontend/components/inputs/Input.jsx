/* 
How to use:
<userInput
    labelStyle=""       // styling for label
    labelVal=""         // label text
    inputStyle=""       // styling for input
    name=""             // name of label-input components
    max=""              // max char limit
    inputType=""        // type of input password, email, text, etc.
    inputPlaceholder="" // placeholder text for input
    value=""            // value of the input
    changeHandler=""    // change handling
    handleKeyPress=""   //key press handler
    required=""   
    /> 
*/

function userInput(props) {
  // function component for input field boxes

  return (
    <>
      <label className={props.labelStyle} htmlFor={props.name}>
        {props.labelVal}
      </label>

      <input
        className={props.inputStyle}
        type={props.inputType}
        name={props.name}
        maxLength={props.max}
        placeholder={props.inputPlaceholder}
        value={props.value}
        onChange={props.changeHandler} // lifting state up
        onKeyPress={props.handleKeyPress}
        required={props.required}
        disabled={props.disabled}
      />
    </>
  );
}

export default userInput;
