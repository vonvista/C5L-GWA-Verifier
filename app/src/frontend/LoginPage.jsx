import { isRequired, useForm } from './hooks/useForm';
import 'tailwindcss/tailwind.css';
import './LoginPage.css';

{/* Components */}
import { LoginBtn } from '../frontend/components/buttons/LoginLogoutBtns';
import TextBtn from '../frontend/components/buttons/TextBtn';
import AppIcon from '../../assets/icons/icon.png';
import Input from '../frontend/components/inputs/Input';


function isRequired(val) {
    return val != null && val.trim().length > 0;
}



const Login = () => {

    // Setup for input form
    const initialState = {
        databaseIP: '',
        username: '',
        password: ''
    }

    const validations = [
        ({databaseIP}) => isRequired(databaseIP) || {databaseIP: 'Database IP is required'},
        ({username}) => isRequired(username) || {username: 'Username is required'},
        ({password}) => isRequired(password) || {password: 'Password is required'}
    ]

    const {values, errors, touched, changeHandler, submitHandler} = useForm(initialState, validations);
    const errorStyle = "block w-full mt-1 pl-1 text-sm text-red-300"

    const handleLogIn = () => {
        const credentials = {
            email: this.state.email,
            password: this.state.pass
        }

        // fetch("http://localhost:3001/login",{
        //     method: "POST",
        //     headers: { "Content-Type":"application/json" },
        //     body: JSON.stringify(credentials)
        //     })
        // .then(response => response.json())
        // .then(body => {
        //     console.log(body)
        // })
    }

    return (
        <main class="grid grid-cols-38/62">

            {/* Left Section */}
            <section class="flex flex-col h-screen justify-center items-center bg-primary-red text-highlight">
                
                {/* App Icon */}
                <div><img src={AppIcon} /></div>

                {/* App Name */}
                <div class="app-name">KALATAS:</div>
                <div class="second-name">CAS GWA Verifier</div>
            </section>

            {/* Right Section */}
            <section class="flex-rows-4 h-screen relative bg-secondary-red">

                {/* Page Title */}
                <span class="flex page-title text-sidebar-text">User Login</span>
                
                <form class="input-group" onSubmit={submitHandler}>

                    {/* Div container for input form */}
                    <div class="flex justify-center">               
                        
                        {/* Input form */}
                        <div class="input-content form">
                            <div class="pb-4">
                                <Input
                                    labelStyle="input-label"                            // styling for label
                                    labelVal="Database IP"                              // label text
                                    inputStyle="shadow input-style"                     // styling for input
                                    name="databaseIP"                                   // name of label-input components
                                    inputType="text"                                    // type of input password, email, text, etc.
                                    inputPlaceholder="Database IP"                      // placeholder text for input
                                    value={values.databaseIP}                           // value of the input
                                    changeHandler={changeHandler}                       // change handling   
                                    />

                                {touched.databaseIP && errors.databaseIP && 
                                    <p class={errorStyle}>{errors.databaseIP}</p>   // error message
                                }

                            </div>
                            <div class="pb-4">
                                <Input
                                    labelStyle="input-label"                            // styling for label
                                    labelVal="Username"                                 // label text
                                    inputStyle="shadow input-style"                     // styling for input
                                    name="username"                                     // name of label-input components
                                    inputType="text"                                    // type of input password, email, text, etc.
                                    inputPlaceholder="Username"                         // placeholder text for input
                                    value={values.username}                             // value of the input
                                    changeHandler={changeHandler}                       // change handling   
                                    />

                                {touched.username && errors.username && 
                                    <p class={errorStyle}>{errors.username}</p>     // error message
                                }

                            </div>
                            <div class="pb-4">
                                <Input
                                    labelStyle="input-label"                            // styling for label
                                    labelVal="Password"                                 // label text
                                    inputStyle="shadow input-style"                     // styling for input
                                    name="password"                                     // name of label-input components
                                    inputType="password"                                // type of input password, email, text, etc.
                                    inputPlaceholder="******************"               // placeholder text for input
                                    value={values.password}                             // value of the input
                                    changeHandler={changeHandler}                       // change handling   
                                    />

                                {touched.password && errors.password && 
                                    <p class={errorStyle}>{errors.password}</p>     // error message
                                }

                            </div>
                        </div>
                    </div>

                    {/* Login Button */}
                    <div class="login-button text-sidebar-text">
                        <LoginBtn handleClick={handleLogIn}/>
                    </div>                    
                </form>

                {/* Footer */}
                <div class="flex footer absolute inset-x-0">
                    <span><TextBtn text="Terms of Use"/></span>
                    <span><TextBtn text="Help"/></span>
                    <span><TextBtn text="Privacy Policy"/></span>
                </div>
            </section>
        </main>
    );
}

export default Login
