import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { isRequired, useForm } from '../../hooks/useForm';
import { useState } from 'react';
import 'tailwindcss/tailwind.css';
import DropSel from './DropdownSelect';
import Input from './Input';


function isRequired(val) {
    return val != null && val.trim().length > 0;
}

const InputTest = () => {

    // function component for testing the behavior and styling of the input components

    // values for dropdown select
    const semesters = [
        {name : "1st Semester A.Y. 2019-2020"},
        {name : "2nd Semester A.Y. 2019-2020"},
        {name : "1st Semester A.Y. 2020-2021"},
        {name : "2nd Semester A.Y. 2020-2021"},
      ]

    // setup for form
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
    
    // styling
    const inputStyle = "appearance-none shadow-lg rounded-none relative block w-full px-4 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
    const labelStyle = "block w-full pl-1 mt-3 mb-1" 
    const errorStyle = "block w-full mt-1 pl-1 text-sm text-red-300"
    const buttonStyle = "mx-auto block my-10 bg-red-300 px-8 py-4 rounded-md disabled:bg-red-100"

    return(
        <>

            <DropSel
                style="w-1/2 fixed top-0 z-50 left-1/4" 
                options={semesters}
                />

            <form className="w-2/3 mt-16 mx-auto" onSubmit={submitHandler}>
                <Input
                    labelStyle={labelStyle}                         // styling for label
                    labelVal="Email"                                // label text
                    inputStyle={inputStyle}                         // styling for input
                    name="email"                                    // name of label-input components
                    inputType="email"                               // type of input password, email, text, etc.
                    inputPlaceholder="Enter email"                  // placeholder text for input
                    value={values.email}                            // value of the input
                    changeHandler={changeHandler}                   // change handling   
                    />

                {touched.email && errors.email && 
                    <p className={errorStyle}>{errors.email}</p>    // errror message
                } 

                <Input
                    labelStyle={labelStyle}                         // styling for label
                    labelVal="Number"                               // label text
                    inputStyle={inputStyle}                         // styling for input
                    name="numeric"                                  // name of label-input components
                    inputType="numeric"                             // type of input password, email, text, etc.
                    inputPlaceholder="Place a number"               // placeholder text for input
                    value={values.numeric}                          // value of the input
                    changeHandler={changeHandler}                   // change handling   
                    />
                
                <Input
                    labelStyle={labelStyle}                         // styling for label
                    labelVal="Password"                             // label text
                    inputStyle={inputStyle}                         // styling for input
                    name="password"                                 // name of label-input components
                    inputType="password"                            // type of input password, email, text, etc.
                    inputPlaceholder="Enter password"               // placeholder text for input
                    value={values.password}                         // value of the input
                    changeHandler={changeHandler}                   // change handling   
                    />
                {touched.password && errors.password && 
                    <p className={errorStyle}>{errors.password}</p> // error message
                }

                <button disabled={!isValid} type="submit" className={buttonStyle}>
                    Submit
                </button>
                           
            </form>
        </>
    )
}

export default function Tester() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<InputTest />} />
        </Routes>
      </Router>
    );
  }