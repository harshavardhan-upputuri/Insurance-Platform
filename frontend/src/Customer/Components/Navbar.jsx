import React, { useEffect, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";  // Dropdown Icon
import { LuMenu } from "react-icons/lu";  // Menu Icon
import { FaLocationDot } from "react-icons/fa6";  // Location Icon
import { IoCartOutline } from "react-icons/io5";  // Cart Icon
import { assets } from "../../../Assets/assets";
import { CiSearch } from "react-icons/ci";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../../State/Store";   // ✅ custom hook from store
import { CgProfile } from "react-icons/cg";
import { CiShop } from "react-icons/ci";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchSellerProfile } from "../../State/Seller/SellerAuthSlice";
import { RiAdminFill } from "react-icons/ri";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const location = useLocation();

  // ✅ get items from Redux (use lowercase 'items')
  const carts = useAppSelector((state) => state.cart.items);

  const customerJwt = localStorage.getItem("jwt");
  const customer = useSelector((state) => state.auth.user);

  const role=localStorage.getItem("role");


  // ✅ directly calculate total quantity
  const totalQuantity = carts.reduce((total, item) => total + item.quantity, 0);

  const [menuOpen, setMenuOpen] = useState(false);
  const [covered, setCovered] = useState(location.pathname === "/login");

  useEffect(() => {
    setCovered(location.pathname === "/login");
  }, [location]);

  const handleClick = (cover) => {
    setCovered(cover);
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        await dispatch(fetchSellerProfile({ jwt: localStorage.getItem("jwt") })).unwrap();
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, [dispatch]);


  const seller = useSelector((state) => state.sellerAuth?.seller);
  useEffect(() => {
    console.log(seller);
  }, [seller])

  return (
    <div className="flex flex-col w-full p-2">

      {/* Top Bar */}
      <div className="flex  items-center w-full bg-white">
        {/* Logo */}
        <div
          className="flex items-center gap-4 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img
            className="w-[60px] h-[60px] rounded-full cursor-pointer"
            src={assets.logo}
            alt="Logo"
          />
          <p className="hidden lg:block lg:text-[22px] lg:font-semibold">Insurance Company</p>
        </div>

        <div className="hidden lg:flex justify-center items-center px-8 py-2 text-black text-[16px] ">
          <ul className="flex justify-between items-center gap-[30px] cursor-pointer">
            <li className="cursor-pointer px-2 flex items-center gap-1 font-semibold">
              <a href="/products">Products</a>
              <MdKeyboardArrowDown />
            </li>
            <li className="cursor-pointer px-2 flex items-center gap-1 font-semibold">
              <a href="/about">About</a>
              <MdKeyboardArrowDown />
            </li>
            {/*<li className="cursor-pointer px-2 flex items-center gap-1">
              <a href="/">Claim</a>
              <MdKeyboardArrowDown />
            </li>
            <li className="cursor-pointer px-2 flex items-center gap-1">
              <a href="/">Support</a>
              <MdKeyboardArrowDown />
            </li> */}
            <li className="font-semibold   px-6 py-2 cursor-pointer flex items-center gap-2 border-green-400 border-1 rounded-md">
              <RiAdminFill size={30} />
              <Link to={role==="ROLE_ADMIN" ? "/admin" : "/login"}>
                {role==="ROLE_ADMIN" ? "Admin" :"Login As Admin"}
              </Link>
            </li>

            <li className="font-semibold px-6 py-2 cursor-pointer flex items-center gap-2 border-green-400 border-1 rounded-md">
              <CiShop size={30} />
              <Link to={seller ? "/seller" : "/become-seller"}>
                {seller ? "Seller Panel" : "Become Seller"}
              </Link>


            </li>
          </ul>
        </div>
        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-6">
          {/* Search Bar */}
          {/* <div className="relative flex items-center md:w-[600px]">
              <div className="absolute left-3 text-slate-400">
                <CiSearch />
              </div>
              <input
                className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-10 pr-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                placeholder="Search Here"
              />
            </div> */}

          {/* Auth Buttons */}
          {!customerJwt && <div className="flex items-center justify-center">
            <button
              onClick={() => {
                handleClick(true);
                navigate("/login");
              }}
              className={`w-[100px] ${covered
                ? "text-white bg-[#1e6089]"
                : "text-black bg-[#f0f9ff]"
                } cursor-pointer font-medium rounded-l-lg text-sm px-6 py-2.5 text-center inline-flex items-center transition-all duration-1000 ease-in-out`}
            >
              Login
            </button>
            <button
              onClick={() => {
                handleClick(false);
                navigate("/signup");
              }}
              className={`w-[100px] ${!covered
                ? "text-white bg-[#1e6089]"
                : "text-black bg-[#f0f9ff]"
                } cursor-pointer font-medium rounded-r-lg text-sm px-5 py-2.5 text-center inline-flex items-center transition-all duration-1000 ease-in-out`}
            >
              SignUp
            </button>
          </div>}

          {/* Tracking */}
          {/* <div className="flex flex-col items-center cursor-pointer">
            <FaLocationDot size={20} />
            <p className="text-sm">Tracking</p>
          </div> */}

          {customerJwt && <div className="flex flex-col items-center cursor-pointer" onClick={() => navigate("/profile")}>
            <CgProfile size={30} />
            <p className="text-sm">Profile</p>
          </div>}

          {/* Cart */}
          {/* <div
            className="relative cursor-pointer"
            onClick={() => navigate("/cart")}
          >
            <IoCartOutline size={24} />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {totalQuantity}
            </span>
          </div> */}
        </div>

        {/* Mobile Menu */}
        <div className="lg:hidden flex items-center justify-between gap-4">

          {customerJwt && <div className="cursor-pointer" onClick={() => navigate("/profile")} >
            <CgProfile size={20} />

          </div>}
          <div
            className="cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <LuMenu size={28} />
          </div>
        </div>
      </div>

      {/* Secondary Navbar */}


      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="lg:hidden flex flex-col gap-4 p-4 bg-white shadow-md font-bold">
          {!customerJwt &&
            <>
              <a href="/login" className="bg-orange-500 border-b-[1px] p-1">
                Login
              </a>
              <a href="/signup" className="border-b-[1px] p-1">
                Sign up
              </a></>
          }
          <a href="/products" className="border-b-[1px] p-1">
            Products
          </a>
          <a href="/about" className="border-b-[1px] p-1">About</a>
          {/*<a href="#" className="border-b-[1px] p-1">
            Claim
          </a>
          <a href="#" className="border-b-[1px] p-1">
            Support
          </a> */}
          <a href="/admin" className="border-b-[1px] p-1">
            Admin
          </a>
          <Link to={seller ? "/seller" : "/become-seller"}>
            {seller ? "Seller Panel" : "Become Seller"}
          </Link>

        </div>
      )}
    </div>
  );
};

export default Navbar;
