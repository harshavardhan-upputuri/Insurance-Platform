import { useState } from "react";
import Stepper from '../Components/Stepper'
import { useParams } from 'react-router-dom'
import { items } from '../Assets/assets';
import FileUpload from "../Components/FileUpload";

const Application = () => {
    const { id } = useParams();
    const data = items[id];


    return (
        <div className={`m-4 shadow-2xl  h-full   `}>
            <div className='   flex flex-col gap-10 items-center justify-between]'>
                <Stepper id={2} />
            </div>

            <div className=" p-4 flex items-center gap-4 w-full ">
                <img className="w-[70px] h-[70px] border rounded-full cursor-pointer" src={data?.image || ""} alt="" />
                <p className="font-bold  text-[20px]">
                    {data?.name || ""} starting at Rs.{data?.premium || ""}*
                </p>
            </div>

            <div className='ml-[20px]'>
                <h1 className='font-bold text-[24px] m-6  w-[250px] mx-auto'>Application form</h1>

                <form className='m-4'>
                    <div className="grid  gap-6 mb-6 md:grid-cols-3 ">
                        {/* First name */}
                        <div className='md:w-[380px] w-[280px]'>
                            <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First name</label>
                            <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required />
                        </div>
                        {/* Last name */}
                        <div className='md:w-[380px] w-[280px]'>
                            <label htmlhtmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last name</label>
                            <input type="text" id="last_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Doe" required />
                        </div>
                        {/* Occupation */}
                        <div className='md:w-[380px] w-[280px]'>
                            <label htmlFor="occupation" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Occupation</label>
                            <input type="text" id="occupation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Microsoft" required />
                        </div>
                        {/* Phone */}
                        <div className='md:w-[380px] w-[280px]'>
                            <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone number</label>
                            <input type="tel" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="123-45-678" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required />
                        </div>
                        {/* Email */}
                        <div className='md:w-[380px] w-[280px]'>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
                            <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john.doe@gmail.com" required />
                        </div>
                        {/* Income */}
                        <div className='md:w-[380px] w-[280px]'>
                            <label htmlFor="income" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Income</label>
                            <input type="number" id="income" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Income" required />
                        </div>
                        {/* dateofbirth */}
                        <div className='md:w-[380px] w-[280px]'>

                            <div className="relative max-w-sm">
                                <label htmlFor="dateofbirth" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date of birth</label>

                                <input type="text" id="dateofbirth" placeholder="dd/mm/yyyy" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>


                        </div>
                        {/* Gender */}
                        <div className="md:w-[380px] w-[280px]">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Gender</label>

                            <div className=" mt-4 flex items-center gap-10">
                                <div className="flex items-center gap-5 ">
                                    <input id="male" name="gender" type="radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label htmlFor="male" className=" text-sm font-medium text-gray-900 dark:text-gray-300">male</label>
                                </div>
                                <div className="flex items-center gap-5">
                                    <input id="female" name="gender" type="radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label htmlFor="female" className="  text-sm font-medium text-gray-900 dark:text-gray-300">female</label>
                                </div>
                            </div>
                        </div>
                        {/* Martial Status */}
                        <div className="md:w-[380px] w-[280px]">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Martial status</label>

                            <div className=" mt-4 flex items-center gap-10">
                                <div className="flex items-center gap-5 ">
                                    <input id="yes" name="martial-status" type="radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label htmlFor="yes" className=" text-sm font-medium text-gray-900 dark:text-gray-300">Yes</label>
                                </div>
                                <div className="flex items-center gap-5">
                                    <input id="no" name="martial-status" type="radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label htmlFor="no" className="  text-sm font-medium text-gray-900 dark:text-gray-300">No</label>
                                </div>
                            </div>

                        </div>

                    </div>
                    {/* Address */}
                    <div className="md:flex items-center   mb-6">
                        <div className="relative   md:w-[1000px] w-[280px] ">
                            <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>

                            <input type="text" id="address" placeholder="address" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>
                        <div className='md:ml-[80px] md:w-[380px] w-[280px]'>
                            <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter date</label>
                            <input type="number" id="date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="23/11/26" required />
                        </div>
                        <div className='md:ml-[80px] md:w-[380px] w-[280px]'>
                            <label htmlFor="code" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Pin code</label>
                            <input type="number" id="code" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="500056" required />
                        </div>
                    </div>
                    {/* File Upload */}
                    <div className="md:flex items-center">
                        <FileUpload name={"Aadhar"} />
                        <div className="md:ml-[150px]"><FileUpload name={"Pan card"} /></div>
                        <div className="md:ml-[170px] ">

                            <form  >
                                <label htmlFor="countries" className="block mb-10 text-sm font-medium text-gray-900 dark:text-white">Select an option</label>
                                <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option selected>Type of insurance</option>
                                    <option value="US">Bike</option>
                                    <option value="CA">Car</option>
                                    <option value="FR">Term life</option>
                                    <option value="DE">Health</option>
                                    <option value="US">Family</option>
                                    <option value="CA">Travel</option>
                                    <option value="FR">Home</option>
                                    <option value="DE">Corporate</option>
                                </select>
                            </form>

                        </div>
                    </div>

                    {/* Submit */}
                    <div className="md:ml-[450px] md:flex items-center mt-4">
                        <div className="flex  mb-4  items-center h-5">
                            <input id="remember" type="checkbox" value="" className="w-4      h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required />
                            <label htmlFor="remember" className="ms-2  text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <a href="#" className="text-blue-600 hover:underline dark:text-blue-500 text-nowrap text-[14px] " >terms and conditions</a>.</label>
                        </div>
                        <button type="submit" className="ml-16 md:ml-10 bg-gradient-to-r  mb-4  from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white rounded-2xl px-5 py-1 text-[20px]">Submit</button>
                    </div>

                </form>

            </div>


        </div>
    )
}

export default Application