/* This functional component is a component that condenses the label and input */
/* HOW TO USE:
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
/* Props:
    props.lableStyle      : contains styling for label
    props.labelVal        : contains text for the label
    props.inputStyle      : contains styling for the input field
    props.name            : name for the input field
    props.max             : char limit for the input field
    props.inputType       : type of input
    props.value           : value that input contains
    props.changeHandler   : holds the function for handling changes of input
    props.handleKeyPress  : key press handler
    props.required        : if input field is required (set to false for more more customizability)
*/
const Input = (props) => {
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

export default Input;
