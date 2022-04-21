import 'tailwindcss/tailwind.css';
import { LoginBtn } from '../frontend/components/buttons/LoginLogoutBtns';
import TextBtn from '../frontend/components/buttons/TextBtn';
import AppIcon from '../../assets/icons/icon.png';
import userInput from '../frontend/components/inputs/Input';


const Login = () => {

    return (
        <main className="grid grid-cols-38/62">

            {/* Left Section */}
            <section className="flex flex-col h-screen justify-center items-center bg-primary-red text-highlight">
                
                {/* App Icon */}
                <div className="">
                    <img
                        className="rounded-full scale-75 -mt-20 xl:scale-100 1.75xl:scale-150 2xl:mt-2"justify-center 
                        width= "300"
                        height= "300"
                        src={AppIcon}
                    />
                </div>

                {/* App Name */}
                <div className="xl:mt-8 1.75xl:mt-20 text-4xl xl:text-5xl 1.75xl:text-6xl  font-bold">KALATAS:</div>
                <div className="mt-3 xl:mt-5 text-3xl 1.75xl:text-4xl 3xl:text-5xl">CAS GWA Verifier</div>
            </section>

            {/* Right Section */}
            <section className="flex flex-col h-screen relative bg-secondary-red">

                {/* Page Title */}
                <span className="flex justify-center mt-20 1.5xl:mt-24 1.75xl:mt-32 3xl:mt-44 text-2xl 1.75xl:text-3xl text-sidebar-text">User Login</span>
                <div className="flex justify-center mt-16 1.75xl:mt-20 3xl:mt-26">

                    {/* Input form */}
                    <div class="w-6/12 text-base 1.75xl:text-xl">
                        <form class="bg-white rounded-lg px-5 pt-4 pb-0">
                            <div class="mb-4">
                                <label class="block text-gray-700 font-bold mb-2" for="databaseIP">
                                    Database IP
                                </label>
                                <input class="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight" id="db-ip" type="text" placeholder="Database IP"/>
                            </div>
                            <div class="mb-4">
                                <label class="block text-gray-700 font-bold mb-2" for="username">
                                    Username
                                </label>
                                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight" id="username" type="text" placeholder="Username"/>
                            </div>
                            <div class="mb-6">
                                <label class="block text-gray-700 font-bold mb-2" for="password">
                                    Password
                                </label>
                                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight" id="password" type="password" placeholder="******************"/>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Login Button */}
                <div className="flex justify-center items-center text-sidebar-text 1.5xl:mt-4">
                    <LoginBtn />
                </div>

                {/* Footer */}
                <div className="absolute inset-x-0 flex bottom-10 justify-center gap-x-10 1.5xl:gap-x-16 3xl:gap-x-20 items-center text-red-200 opacity-50">
                    <span>Terms of Use</span>
                    <span>Help</span>
                    <span>Privacy Policy</span>
                </div>
            </section>
        </main>
    );
}

export default Login
