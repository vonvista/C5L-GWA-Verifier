import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Input from './inputs/Input';
import DropSel from './inputs/DropdownSelect';
import 'tailwindcss/tailwind.css';

const InputTest = () => {

    // function component for testing the behavior and styling of the input components

    const semesters = [
        {name : "1st Semester A.Y. 2019-2020"},
        {name : "2nd Semester A.Y. 2019-2020"},
        {name : "1st Semester A.Y. 2020-2021"},
        {name : "2nd Semester A.Y. 2020-2021"},
      ]

    
    const [values, setVal] = useState({
        email: '',
        numeric: '',
        password: ''
        }
    )

    const setValue = e => {
        // fxn for setting values in the inputs
        const newVal = {...values, [e.target.name]: e.target.value};
        setVal(newVal)
    }


    const inputStyle = "appearance-none shadow-lg rounded-none relative block w-full px-4 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
  
    return(
        <>

            <DropSel
                style="w-1/2 fixed top-0 z-50 left-1/4" 
                options={semesters}
                />

            <form className="w-2/3 mt-16 mx-auto">
                <Input
                    labelStyle="block w-full pl-2 mt-3 mb-1"       // styling for label
                    labelVal="Email"         // label text
                    inputStyle={inputStyle}       // styling for input
                    name="email"             // name of label-input components
                    inputType="email"        // type of input password, email, text, etc.
                    inputPlaceholder="Enter email" // placeholder text for input
                    value={values.email}            // value of the input
                    changeHandler={setValue}    // change handling   
                    />

                <Input
                    labelStyle="block w-full pl-2 mt-3 mb-1"       // styling for label
                    labelVal="Number"         // label text
                    inputStyle={inputStyle}       // styling for input
                    name="numeric"             // name of label-input components
                    inputType="numeric"        // type of input password, email, text, etc.
                    inputPlaceholder="Place a number" // placeholder text for input
                    value={values.numeric}            // value of the input
                    changeHandler={setValue}    // change handling   
                    />
                
                <Input
                    labelStyle="block w-full pl-2 mt-3 mb-1"       // styling for label
                    labelVal="Password"         // label text
                    inputStyle={inputStyle}       // styling for input
                    name="password"             // name of label-input components
                    inputType="password"        // type of input password, email, text, etc.
                    inputPlaceholder="Enter password" // placeholder text for input
                    value={values.password}            // value of the input
                    changeHandler={setValue}    // change handling   
                    />
                           
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