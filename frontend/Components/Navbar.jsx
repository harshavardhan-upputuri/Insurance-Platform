import React, { useEffect, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";  // Dropdown Icon
import { LuMenu } from "react-icons/lu";  // Menu Icon
import { FaLocationDot } from "react-icons/fa6";  // Location Icon
import { IoCartOutline } from "react-icons/io5";  // Cart Icon
import { assets } from "../Assets/assets";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLocation } from 'react-router-dom';

const Navbar = () => {
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
  useEffect(()=>{
    if(location.pathname == '/login'){
      setCovered(true);
    }else{
      setCovered(false);
    }
  },[location])
  const handleClick = (cover) => {
    setCovered(cover);
  }
  const navigate = useNavigate();
  return (
    <div className="flex flex-col w-full  ">

      <div className="flex justify-between items-center p-3 w-full  bg-white ">

        <div className="flex items-center gap-4 cursor-pointer" onClick={() => navigate("/")}>
          <img className="w-[50px] h-[50px] rounded-full cursor-pointer" src={assets.logo} alt="Logo" />
          <p className="hidden lg:block">Insurance Company</p>
        </div>


        <div className="hidden lg:flex items-center gap-6">
          <div className="relative flex  items-center  md:w-[600px] ">
            <div className=" absolute left-3 text-slate-400">
              <CiSearch />
            </div>
            <input className=" w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-10 pr-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Search Here"></input>
          </div>
          <div className="flex items-center justify-center">
            <button onClick={() =>{ handleClick(true);navigate("/login")}} className={`w-[100px]  ${covered ? "text-white bg-[#1e6089]" : "text-black bg-[#f0f9ff]"} cursor-pointer  font-medium rounded-l-lg text-sm px-6 py-2.5 text-center inline-flex items-center   transition-all duration-1000 ease-in-out`} >Login</button>
            <button onClick={() =>{ handleClick(false);navigate("/signup")}} className={` w-[100px]  ${!covered ? "text-white bg-[#1e6089]" : "text-black bg-[#f0f9ff]"} cursor-pointer   font-medium rounded-r-lg text-sm px-5 py-2.5 text-center inline-flex items-center transition-all duration-1000 ease-in-out`} >SignUp</button>

          </div>

          <div className="flex flex-col items-center cursor-pointer">
            <FaLocationDot size={20} />
            <p className="text-sm">Tracking</p>
          </div>

          <div className="relative cursor-pointer" onClick={()=>navigate("/cart")}>
            <IoCartOutline size={24} />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">{totalquantity}</span>
          </div>
        </div>

        <div className="lg:hidden flex items-center justify-between gap-4">

          <CiSearch size={28} />

          <div className="relative cursor-pointer" onClick={()=>navigate("/cart")}>
            <IoCartOutline size={24} />
            <span className="absolute -top-2  bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">{totalquantity}</span>
          </div>
          <div className=" cursor-pointer" onClick={() => setMenuOpen(!menuOpen)}>
            <LuMenu size={28} />
          </div>
        </div>


      </div>



      <div className="hidden lg:flex justify-center items-center px-8 py-2 text-black text-[20px] shadow-md">
        <div>
          <ul className="flex  justify-between items-center gap-[30px] cursor-pointer">

            <li className="cursor-pointer px-2 flex items-center gap-1">
              <a href="/products">Products </a><span><MdKeyboardArrowDown /></span>
            </li>
            <li className="cursor-pointer px-2 flex items-center gap-1">
              <a href="/">Renew</a><span><MdKeyboardArrowDown /></span>
            </li>
            <li className="cursor-pointer px-2 flex items-center gap-1">

              <a href="/">Claim </a><span><MdKeyboardArrowDown /></span>
            </li>
            <li className="cursor-pointer px-2 flex items-center gap-1">
              <a href="/">Support </a><span><MdKeyboardArrowDown /></span>
            </li>
            <li className="cursor-pointer px-2 flex items-center gap-1">
              <a href="/agent">Agent </a><span><MdKeyboardArrowDown /></span>
            </li>
         
          </ul>
        </div>


      </div>

      {menuOpen && (
        <div className="lg:hidden flex flex-col  gap-4   p-4 bg-white shadow-md font-bold ">

          <a href="/login" className="bg-orange-500 border-b-[1px] p-1">Login </a>

          <a href="/signup" className="  border-b-[1px] p-1">Sign up</a>

          <a href="/products" className="border-b-[1px] p-1">Products</a>

          <a href="#" className="border-b-[1px] p-1">Renew</a>

          <a href="#" className="border-b-[1px] p-1">Claim</a>

          <a href="#" className="border-b-[1px] p-1">Support</a>

          <a href="/agent" className="border-b-[1px] p-1">Agent</a>
 
        </div>
      )}
    </div>
  );
};

export default Navbar;


