import React, { useState } from 'react';
import { assets } from '../Assets/assets';
import { FaIdCard } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const navigate = useNavigate();
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);


    return (
        <div className='flex items-center rounded-xl h-[700px] md:h-[900px] shadow-xl '>
            <div className='md:ml-[200px] -mr-[5px] md:w-[600px] w-[180px]'>
                <img className='md:h-[650px] h-[500px] rounded-l-xl' src={assets.signup} alt="Sign Up" />
            </div>
            <div className='relative md:-ml-[136px] md:h-[650px] h-[500px] md:w-[500px] w-[200px] rounded-r-2xl bg-blue-300 '>
                <h2 className='ml-[70px] absolute md:ml-[210px] top-[30px] transform -translate-x-1/2 md:text-[32px] font-bold text-[#2abb92]'>One Click to go</h2>
                <h2 className='ml-[70px] text-nowrap absolute md:ml-[220px] top-[70px] transform -translate-x-1/2 md:text-[32px] font-bold'>Digital Insurance</h2>
                <form className='absolute left-1/2 transform -translate-x-1/2 flex flex-col top-[120px] md:top-[180px]'>
                    <div className="ml-[10px] md:ml-[30px] w-[170px] md:w-[300px] gap-6 mb-3 md:mb-6">
                        {[{ label: 'Fullname', value: fullname, setter: setFullname },
                        { label: 'Email', value: email, setter: setEmail },
                        { label: 'Username', value: username, setter: setUsername }]
                            .map((field, index) => (
                                <div key={index} className="relative flex items-center mb-6">
                                    <div className='absolute ml-1 text-gray-300 text-[22px] md:text-[46px]'><FaIdCard /></div>
                                    <input
                                        type="text"
                                        value={field.value}
                                        onChange={(e) => field.setter(e.target.value)}
                                        className="pl-7 md:pl-14 pr-1.5 md:pr-3 py-1 md:py-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full"
                                        placeholder={`Enter Your ${field.label}`}
                                        required
                                    />
                                </div>
                            ))}
                        {[{ label: 'New Password', value: password, setter: setPassword },
                        { label: 'Confirm Password', value: confirmPassword, setter: setConfirmPassword }]
                            .map((field, index) => (
                                <div key={index} className="relative flex items-center mb-6">
                                    <div className='absolute text-gray-300 text-[22px] md:text-[46px]'><RiLockPasswordLine /></div>
                                    <input
                                        type="password"
                                        value={field.value}
                                        onChange={(e) => field.setter(e.target.value)}
                                        className="pl-7 md:pl-14 pr-1.5 md:pr-3 py-1 md:py-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full"
                                        placeholder={field.label}
                                        required
                                    />
                                </div>
                            ))}
                    </div>
                    {error && <p className="text-red-500 ml-[30px]">{error}</p>}
                    <div className='ml-[15px] md:ml-[30px]'>
                        <button
                            type="submit"
                            className="w-[150px] md:w-[300px] text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 font-medium rounded-lg text-sm px-2.5 md:px-5 py-1.5 md:py-2.5 text-center"
                            disabled={loading}
                        >
                            {loading ? "Signing Up..." : "Sign Up"}
                        </button>
                    </div>
                    <div className='ml-[20px]  text-[10px] mt-6 md:text-[22px] text-nowrap'>
                        <p>Already have an account? <span onClick={() => navigate("/login")} className='ml-1 cursor-pointer text-blue-900'>Sign in</span></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUp;