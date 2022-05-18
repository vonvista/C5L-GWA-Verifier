import { isRequired, useForm } from '../../hooks/useForm';
import { useNavigate } from 'react-router-dom';
import 'tailwindcss/tailwind.css';
import Swal from 'sweetalert2'

{/* Components */}
import { LoginBtn } from '../../components/buttons/LoginBtn';
import TextBtn from '../../components/buttons/TextBtn';
import AppIcon from '../../../../assets/icons/icon.png';
import Input from '../../components/inputs/Input';
//import { electron } from 'process';


function isRequired(val) {
    return val != null && val.trim().length > 0;
}

const Login = () => {

    let navigate = useNavigate(); //navigator

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
            console.log(body)
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


                navigate('/user-dashboard') //redirect to user
            }
           
        })
        .catch(err => { //will activate if DB is not reachable or timed out or there are other errors
            Swal.fire({
                icon: 'error',
                title: 'Server Error',
                text: 'Check if the server is running or if database IP is correct',
            })
            console.log(err)
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
                
                <form className="justify-center pt-[8vh]" onSubmit={submitHandler}>

                    {/* Div container for input form and login button*/}
                    <div className="flex justify-center">               
                        
                        {/* Input form */}
                        <div className="overflow-hidden w-1/2 text-[1.25vw] font-montserrat rounded-lg px-5 pb-2 pt-4 bg-white text-gray-800">
                            <div className="pb-4">
                                <Input
                                    labelStyle="block mb-2 font-semibold"               // styling for label
                                    labelVal="Database IP"                              // label text
                                    inputStyle="shadow rounded border font-inter font-medium leading-tight py-2 px-3 w-full text-neutral-700"       // styling for input
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
                            <div className="pb-4">
                                <Input
                                    labelStyle="block mb-2 font-semibold"               // styling for label
                                    labelVal="Username"                                 // label text
                                    inputStyle="shadow rounded border font-medium leading-tight py-2 px-3 w-full text-neutral-700"       // styling for input
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
                            <div className="pb-4">
                                <Input
                                    labelStyle="block mb-2 font-semibold"               // styling for label
                                    labelVal="Password"                                 // label text
                                    inputStyle="shadow rounded border font-medium leading-tight py-2 px-3 w-full text-neutral-700"       // styling for input
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
                    <div className="flex justify-center mt-[4vh] text-[1.25vw]  text-sidebar-text">
                        <LoginBtn handleClick={handleLogIn}/>
                    </div>                    
                </form>

                {/* Footer */}
                <div className="flex justify-center opacity-50 text-[1.25vw] gap-[5vw] absolute bottom-[2vw] inset-x-0 text-login-footer">
                    <span><TextBtn text="UserDash" handleClick={()=>{debugUser(); localStorage.setItem("Role", "user"); navigate('/user-dashboard')}}/></span>
                    <span><TextBtn text="AdminDash" handleClick={()=>{debugUser(); localStorage.setItem("Role", "admin"); navigate('/user-dashboard')}}/></span>
                    <span><TextBtn text="UserManage" handleClick={()=>{navigate('/user-management')}}/></span>
                    <span><TextBtn text="UserRecord" handleClick={()=>{navigate('/student-record')}}/></span>
                </div>
            </section>
        </main>
    );
}

export default Login
