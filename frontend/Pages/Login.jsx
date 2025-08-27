import React, { useState } from 'react';
import { assets } from '../Assets/assets';
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
 

const Login = () => {
    const navigate = useNavigate();
    const [emailOrUsername, setEmailOrUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

     

    return (
        <div className='flex items-center rounded-xl h-[500px] md:h-[900px] shadow-xl bg-[#EAF4F4]'>
            <div className='md:ml-[30px] m-4 md:w-[600px] w-[190px]'>
                <img className='h-[400px] md:h-[800px] rounded-l-xl' src={assets.login} alt="" />
            </div>

            <div className='relative m-4 -ml-[20px] h-[400px] md:h-[800px] md:w-[600px] w-[200px] rounded-r-2xl bg-blue-300'>
                <h2 className='absolute top-[-40px] md:left-1/2 md:top-[30px] transform -translate-x-1/2 md:text-[34px] font-bold text-nowrap'>Welcome Back!</h2>
                <form   className='absolute left-1/2 transform -translate-x-1/2 flex flex-col md:top-[100px] ml-[10px] p-2'>
                    <div className="ml-[20px] md:ml-[30px] md:w-[400px] gap-6 mb-6">
                        <div className="md:mb-6 mb-3">
                            <label className="block mb-2 md:text-[22px] font-medium text-gray-900 dark:text-white">Email or Username</label>
                            <input 
                                type="text" 
                                value={emailOrUsername} 
                                onChange={(e) => setEmailOrUsername(e.target.value)} 
                                className=" w-[150px] bg-gray-50 border border-gray-300 text-gray-900 text-[9px] md:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block md:w-full p-2 md:p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                placeholder="Enter Your email or username" 
                                required 
                            />
                        </div>
                        <div className="md:mb-6 mb-3">
                            <label className="block mb-2 md:text-[22px] font-medium text-gray-900 dark:text-white">Password</label>
                            <input 
                                type="password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                className="w-[150px] bg-gray-50 border border-gray-300 text-gray-900 text-[9px] md:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block md:w-full  p-2 md:p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                placeholder="•••••••••" 
                                required 
                            />
                        </div>
                    </div>

                    <div className='ml-[20px] md:ml-[150px] mb-6'>
                        <a href="#">Forget Password?</a>
                    </div>

                    {/* {error && <p className="text-red-500 ml-[30px]">{error}</p>} */}

                    <div className='ml-[20px] w-[120px] md:ml-[30px] '>
                        <button 
                            type="submit" 
                            className="w-full md:w-[400px] text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 font-medium rounded-lg text-sm px-5 py-2 md:py-2.5 text-center me-2 mb-2"
                            disabled={loading}
                        >
                            {loading ? "Logging In..." : "Login"}
                        </button>
                    </div>

                    <div className="flex items-center ml-[15px] md:mx-[32px] w-[150px] md:w-[400px] mt-4">
                        <div className="flex-grow border-t border-black"></div>
                        <span className="mx-4 text-black">OR</span>
                        <div className="flex-grow border-t border-black"></div>
                    </div>

                    <div className='ml-[20px] md:ml-[30px] m-5 md:m-10'>
                        <button 
                            type="button" 
                            className="w-[150px] md:w-[400px] text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-[9px] md:text-sm px-2 md:px-5 md:py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 flex items-center md:pl-10"
                        >
                            <FcGoogle size={30} /> 
                            <span className='ml-4 text-[8px] md:text-[20px] text-nowrap'>Sign in with Google</span>
                        </button>
                    </div>

                    <div className='ml-[10px] mt-[-10px] md:ml-[30px] text-[8px] md:text-[22px]'>
                        <p>Don't have an account? 
                            <span onClick={() => navigate("/signup")} className='ml-2 md:ml-10 text-blue-900 cursor-pointer'>Create an Account</span>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;