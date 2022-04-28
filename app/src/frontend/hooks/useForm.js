// reference used: https://dimitr.im/form-validation-react-hooks
// https://github.com/g00glen00b/medication-assistant/blob/63da6d5166d95e34c3f18ecaec1af8a552596dde/medication-assistant-frontend/src/shared/hooks/useForm.js
import { useState } from 'react';

/*
basic guide

    const initialState = {
        email: '',
        numeric: '',
        password: ''
    }
    const validations = [
        ({email}) => isRequired(email) || {email: 'E-mail is required'},
        ({password}) => isRequired(password) || {password: 'Password is required'}
    ]

    const {values, isValid, errors, touched, changeHandler, submitHandler} = useForm(initialState, validations);

    ** place values.name into value field of input component
    ** pass changeHandler to changeHandler field of input component
    
    ** sample error message
    {touched.name && errors.name && 
        <p className={errorStyle}>{errors.name}</p> // error message
    }

*/

export function useForm( initState = {}, validations = [], onSubmit = () => {}) {

    const {isValid: initIsValid, errors: initErrors} = validate(validations, initState)

    const [values, setValues] = useState(initState);
    const [errors, setErrors] = useState(initErrors);
    const [isValid, setValid] = useState(initIsValid);
    const [touched, setTouched] = useState({})

    const changeHandler = e => {
        // fxn for setting values in the inputs
        const newVals = {...values, [e.target.name]: e.target.value};
        const {isValid, errors} = validate(validations, newVals);
        setValues(newVals)
        setValid(isValid)
        setErrors(errors)
        setTouched({...touched, [e.target.name]: true})
    }

    const submitHandler = e => {
        e.preventDefault()          // prevent page from refreshing
        onSubmit(values)
        //console.log(values)       // for testing
    }

    const resetValues = () => {
        // function to reset state of values to default
        const newVals = initState 
        const {isValid, errors} = validate(validations, newVals);
        setValues(newVals)
        setValid(isValid)
        setErrors(errors)
        setTouched({})  
    }

    return {values, changeHandler, isValid, errors, touched, submitHandler, resetValues};
}

function validate(validations, values) {
    const errors = validations 
        .map(validation => validation(values))
        .filter(validation => typeof validation === 'object')

    return {
        isValid: errors.length === 0,
        errors: errors.reduce((errors, error) => ({...errors, ...error}), {})
    }
}

// error validation functions...

export function isRequired(val) {
    // check if this has value
    return val != null && val.trim().length > 0;
}
