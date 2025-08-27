

import React, { useEffect, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";  // Dropdown Icon
import { LuMenu } from "react-icons/lu";  // Menu Icon
import { FaLocationDot } from "react-icons/fa6";  // Location Icon
import { IoCartOutline } from "react-icons/io5";  // Cart Icon
import { assets } from "../../Assets/assets";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLocation } from 'react-router-dom';

const AgentNav = () => {
  const [totalquantity, setTotalQuantity] = useState(0);
  const carts = useSelector(store => store.cart.Items);
  const location = useLocation();

  useEffect(() => {
    let total = 0;
    carts.forEach((item) => {
      total += item.quantity;
    });
    console.log(3)
    setTotalQuantity(total);
  }, [carts])

  const [menuOpen, setMenuOpen] = useState(false);
  const [covered, setCovered] = useState(true);
  useEffect(() => {
    if (location.pathname == '/login') {
      setCovered(true);
    } else {
      setCovered(false);
    }
  }, [location])
  const handleClick = (cover) => {
    setCovered(cover);
  }
  const navigate = useNavigate();
  return (
    <div className="flex flex-col w-full  ">

      <div className="flex  justify-between md:justify-start items-center p-3  w-full  bg-white ">

        <div className="flex items-center gap-4 cursor-pointer" onClick={() => navigate("/")}>
          <img className="w-[50px] h-[50px] rounded-full cursor-pointer" src={assets.logo} alt="Logo" />
          <p className="hidden lg:block md:text-[20px]">Insurance Company</p>
        </div>


        <div className="hidden lg:flex items-center gap-6 md:ml-[170px]">
          <div className="hidden lg:flex justify-center items-center px-8 py-2 text-black text-[20px] ">

            <ul className="flex  justify-between items-center gap-[30px] cursor-pointer">

              <li className="cursor-pointer px-2 flex items-center gap-1">
                <a href="/agent/products">Products </a><span><MdKeyboardArrowDown /></span>
              </li>
              <li className="cursor-pointer px-2 flex items-center gap-1">
                <a href="/agent/clients">Clients</a><span><MdKeyboardArrowDown /></span>
              </li>
              <li className="cursor-pointer px-2 flex items-center gap-1">

                <a href="/agent/requests">Requests </a><span><MdKeyboardArrowDown /></span>
              </li>

            </ul>
          </div>

          <div className="flex items-center justify-center ml-[70px]">
            <button onClick={() => { handleClick(true); navigate("/agent/login") }} className={`w-[100px]  ${covered ? "text-white bg-[#1e6089]" : "text-black bg-[#f0f9ff]"} cursor-pointer  font-medium rounded-l-lg text-sm px-6 py-2.5 text-center inline-flex items-center   transition-all duration-1000 ease-in-out`} >Login</button>
            <button onClick={() => { handleClick(false); navigate("/agent/signup") }} className={` w-[100px]  ${!covered ? "text-white bg-[#1e6089]" : "text-black bg-[#f0f9ff]"} cursor-pointer   font-medium rounded-r-lg text-sm px-5 py-2.5 text-center inline-flex items-center transition-all duration-1000 ease-in-out`} >SignUp</button>

          </div>


        </div>

        <div className="lg:hidden flex items-center justify-between gap-4">

         
          <div className=" cursor-pointer" onClick={() => setMenuOpen(!menuOpen)}>
            <LuMenu size={28} />
          </div>
        </div>


      </div>





      {menuOpen && (
        <div className="lg:hidden flex flex-col  gap-4   p-4 bg-white shadow-md font-bold ">

          <a href="/agent/login" className="bg-orange-500 border-b-[1px] p-1">Login </a>

          <a href="/agent/signup" className="  border-b-[1px] p-1">Sign up</a>

          <a href="/agent/products" className="border-b-[1px] p-1">Products</a>

          <a href="/agent/clients" className="border-b-[1px] p-1">Clients</a>

          <a href="/agent/requests" className="border-b-[1px] p-1">Requests</a>


        </div>
      )}
    </div>
  );
};

export default AgentNav;



