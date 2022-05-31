import { isRequired, useForm } from '../../hooks/useForm';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'tailwindcss/tailwind.css';

{/* Components */}
import { LoginBtn } from '../../components/buttons/LoginBtn';
import TextBtn from '../../components/buttons/TextBtn';
import AppIcon from '../../../../assets/icon.png';
import Input from '../../components/inputs/Input';
//import { electron } from 'process';

import DevTeamImage from '../../../../assets/dev_team.png'


/* Parent component >> renderer/App.jsx */
/* This is the Login page which is the initial page of the application. */
const LoginPage = () => {

    let navigate = useNavigate(); //navigator

    // Setup for input form
    const initialState = {
        databaseIP: '',
        username: '',
        password: ''
    }

    // Used for errors
    const validations = [
        ({databaseIP}) => isRequired(databaseIP) || {databaseIP: 'Database IP is required'},
        ({username}) => isRequired(username) || {username: 'Username is required'},
        ({password}) => isRequired(password) || {password: 'Password is required'}
    ]

    // useForm hook
    const {values, isValid, errors, touched, changeHandler, submitHandler, resetValues} = useForm(initialState, validations);
    const errorStyle = "block w-full mt-1 pl-1 text-sm text-red-400"

    const handleTeam = () => {
        //create sweetalert with image taking up all available space
        Swal.fire({
            imageUrl: DevTeamImage,
            width: '120vh',
            padding: '20px',
            background: '#fff',
            showCloseButton: true,
            showConfirmButton: false,
            focusConfirm: false,
        })
    }

    const handleTOS = () => {
        //swal for text
        Swal.fire({
            //make scrollable
            title: 'License Agreement',
            html: 
            //MIT LICENSE
            `
            MIT License <br><br>

            Copyright (c) 2022 Kalatas Development Team <br><br>

            Permission is hereby granted, free of charge, to any person obtaining a copy
            of this software and associated documentation files (the "Software"), to deal
            in the Software without restriction, including without limitation the rights
            to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
            copies of the Software, and to permit persons to whom the Software is
            furnished to do so, subject to the following conditions: <br> <br>

            The above copyright notice and this permission notice shall be included in all
            copies or substantial portions of the Software. <br> <br>

            THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
            IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
            FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
            AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
            LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
            OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
            SOFTWARE. <br>

            `,
            heightAuto: true,
            padding: '20px',
            background: '#fff',
            showCloseButton: true,
            showConfirmButton: false,
            focusConfirm: false,
            width: '60vw',
        })
                
    }

    const handleHelp = () => {
        //swal for text
        Swal.fire({
            position: 'left', 
            title: 'Help',
            html: 
            `    
            <div class="text-left">
                <h3 class="font-bold"> Database IP </h3>
                <p> - Start the server in the host machine by running the server executable. </p>
                <p> - Select the IP address that the server will used in the choices provided </p>
                <p> - Enter the IP address on the database IP field </p>
                <br>
                <h3 class="font-bold"> Username and Password </h3>
                <p> - Request the admin to create a user account for you </p>
                <p> - Log in with the credentials given </p>
            </div>

            `,
            heightAuto: true,
            padding: '20px',
            background: '#fff',
            showCloseButton: true,
            showConfirmButton: false,
            focusConfirm: false,
            width: '60vw',
        })
                
    }

    const handleLogIn = () => {
        const credentials = {
            Username: values.username,
            Password: values.password
        }

        //console.log(credentials)
        const ip = values.databaseIP
        
        //fetch login credentials
        fetch(`http://${ip}:3001/user/login`,{
            method: "POST",
            headers: { "Content-Type":"application/json" },
            body: JSON.stringify(credentials)
            })
        .then(response => response.json())
        .then(body => {
            //console.log(body)
            if(body.err){ //if error response returned from DB
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: body.err,
                })
            }
            else { //success state
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Successfully logged in!',
                })
                //TODO: Route to dashboard, waiting lang muna
                localStorage.setItem("FirstName", body.FirstName)
                localStorage.setItem("LastName", body.LastName)
                localStorage.setItem("MiddleName", body.MiddleName)
                localStorage.setItem("Password", body.Password)
                localStorage.setItem("Position", body.Position)
                localStorage.setItem("Role", body.Role)
                localStorage.setItem("Username", body.Username)
                localStorage.setItem("ServerIP", ip)


                navigate('/in/user-dashboard') //redirect to user
            }
           
        })
        .catch(err => { //will activate if DB is not reachable or timed out or there are other errors
            Swal.fire({
                icon: 'error',
                title: 'Server Error',
                text: 'Check if the server is running or if database IP is correct',
            })
            //console.log(err)
        })
        
        
    }

    const debugUser = () => {
        localStorage.setItem("FirstName", "Debug")
        localStorage.setItem("LastName", "User")
        localStorage.setItem("MiddleName", "_")
        localStorage.setItem("Password", "debug")
        localStorage.setItem("Position", "Tester")
        localStorage.setItem("Username", "test")
        localStorage.setItem("ServerIP", "127.0.0.1")
    }

    return (
        <main className="grid grid-cols-38/62">

            {/* Left Section */}
            <section className="flex flex-col h-screen justify-center items-center bg-primary-red text-highlight">
                
                {/* App Icon */}
                <div><img className="h-auto w-[30vw]" src={AppIcon} /></div>

                {/* App Name */}
                <div className="font-poppins font-bold tracking-widest text-[3.5vw]">KALATAS:</div>
                <div className="font-poppins tracking-wider mt-1 text-[2.5vw]">CAS GWA Verifier</div>
            </section>

            {/* Right Section */}
            <section className="flex-rows-4 h-screen relative bg-secondary-red">

                {/* Page Title */}
                <span className="flex justify-center pt-[12vh] font-montserrat font-semibold text-[2.25vw] text-sidebar-text">User Login</span>
                
                {/* Container for input form and login button*/}
                <form className="justify-center pt-[8vh]" onSubmit={submitHandler}>

                    {/* Input form */}
                    <div className="flex justify-center">               
                        <div className="overflow-hidden w-1/2 text-[1.25vw] font-montserrat rounded-lg px-[1vw] py-[1.5vh] bg-white text-gray-800">
                            <div className="pb-[2vh]">
                                <Input
                                    labelStyle="block mb-[1vh] font-semibold"           // styling for label
                                    labelVal="Database IP"                              // label text
                                    inputStyle="shadow rounded border font-inter font-medium leading-tight py-[0.75vh] px-[0.75vw] w-full text-neutral-700"  // styling for input
                                    name="databaseIP"                                   // name of label-input components
                                    inputType="text"                                    // type of input password, email, text, etc.
                                    inputPlaceholder="Database IP"                      // placeholder text for input
                                    value={values.databaseIP}                           // value of the input
                                    changeHandler={changeHandler}                       // change handling   
                                />

                                {touched.databaseIP && errors.databaseIP && 
                                    <p className={errorStyle}>{errors.databaseIP}</p>   // error message
                                }

                            </div>
                            <div className="pb-[2vh]">
                                <Input
                                    labelStyle="block mb-[1vh] font-semibold"           // styling for label
                                    labelVal="Username"                                 // label text
                                    inputStyle="shadow rounded border font-medium leading-tight py-[0.75vh] px-[0.75vw] w-full text-neutral-700"  // styling for input
                                    name="username"                                     // name of label-input components
                                    inputType="text"                                    // type of input password, email, text, etc.
                                    inputPlaceholder="Username"                         // placeholder text for input
                                    value={values.username}                             // value of the input
                                    changeHandler={changeHandler}                       // change handling   
                                />

                                {touched.username && errors.username && 
                                    <p className={errorStyle}>{errors.username}</p>     // error message
                                }

                            </div>
                            <div className="pb-[1vh]">
                                <Input
                                    labelStyle="block mb-[1vh] font-semibold"           // styling for label
                                    labelVal="Password"                                 // label text
                                    inputStyle="shadow rounded border font-medium leading-tight py-[0.75vh] px-[0.75vw] w-full text-neutral-700"  // styling for input
                                    name="password"                                     // name of label-input components
                                    inputType="password"                                // type of input password, email, text, etc.
                                    inputPlaceholder="******************"               // placeholder text for input
                                    value={values.password}                             // value of the input
                                    changeHandler={changeHandler}                       // change handling   
                                />

                                {touched.password && errors.password && 
                                    <p className={errorStyle}>{errors.password}</p>     // error message
                                }

                            </div>
                        </div>
                    </div>

                    {/* Login Button */}
                    <div className="flex justify-center mt-[4vh]  text-sidebar-text">
                        <LoginBtn handleClick={handleLogIn} disabled={!isValid}/>
                    </div>                    
                </form>

                {/* Footer */}
                <div className="flex justify-center opacity-50 text-[1.25vw] gap-[5vw] absolute bottom-[2vw] inset-x-0 text-login-footer">
                    <span><TextBtn text="About" handleClick={handleTeam}/></span>
                    <span><TextBtn text="License Agreement" handleClick={handleTOS}/></span>
                    <span><TextBtn text="Help" handleClick={handleHelp}/></span>
                </div>
            </section>
        </main>
    );
}


export default LoginPage;