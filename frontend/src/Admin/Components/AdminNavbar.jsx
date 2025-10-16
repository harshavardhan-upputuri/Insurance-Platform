import React, { useEffect, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { LuMenu } from "react-icons/lu";
import { CgProfile } from "react-icons/cg";
import { CiShop } from "react-icons/ci";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { assets } from "../../../Assets/assets";
import { useAppSelector } from "../../State/Store";
import { fetchUserProfile } from "../../State/AuthSlice";
import { RiAdminFill } from "react-icons/ri";

const AdminNavbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  // ✅ Cart (if you have one for admin, else remove)
  const carts = useAppSelector((state) => state.cart.items);
  const totalQuantity = carts.reduce((total, item) => total + item.quantity, 0);

  const adminJwt = localStorage.getItem("jwt");
  const [menuOpen, setMenuOpen] = useState(false);
  const [covered, setCovered] = useState(location.pathname === "/login");

  useEffect(() => {
    setCovered(location.pathname === "/login");
  }, [location]);

  const handleClick = (cover) => setCovered(cover);

  // ✅ Fetch admin profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        await dispatch(fetchUserProfile({ jwt: localStorage.getItem("jwt") })).unwrap();
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, [dispatch]);

  // const admin = useSelector((state) => state.adminAuth?.admin);

  return (
    <div className="flex flex-col w-full px-5">
      {/* Top Bar */}
      <div className="flex justify-between items-center p-3 w-full bg-white shadow-sm">
        {/* Logo */}
        <div
          className="flex items-center gap-4 cursor-pointer"
          onClick={() => navigate("/admin")}
        >
          <img
            className="w-[60px] h-[60px] rounded-full cursor-pointer"
            src={assets.logo}
            alt="Logo"
          />
          <p className="hidden lg:block lg:text-[22px] lg:font-semibold">Admin Portal</p>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex justify-center items-center px-8 py-2 text-black text-[20px]">
          <ul className="flex justify-between items-center gap-[30px] cursor-pointer">
            <li className="cursor-pointer px-2 flex items-center gap-1 font-semibold">
              <a href="/admin/users">Users</a>
              <MdKeyboardArrowDown />
            </li>
            <li className="cursor-pointer px-2 flex items-center gap-1 font-semibold">
              <a href="/admin/sellers">Sellers</a>
              <MdKeyboardArrowDown />
            </li>
            <li className="cursor-pointer px-2 flex items-center gap-1 font-semibold">
              <a href="/products">Products</a>
              <MdKeyboardArrowDown />
            </li>
             
            <li className="cursor-pointer px-2 flex items-center gap-1 font-semibold">
              <a href="/about">About</a>
              <MdKeyboardArrowDown />
            </li>
            <li className="font-semibold px-8 py-2 cursor-pointer flex items-center gap-2 border-green-400 border-1 rounded-md">
              <RiAdminFill size={30} />
              <Link to="/admin">Admin Dashboard</Link>
            </li>
          </ul>
        </div>

        {/* Right Side (Login/Profile) */}
        <div className="hidden lg:flex items-center gap-6">
          {!adminJwt && (
            <div className="flex items-center justify-center">
              <button
                onClick={() => {
                  handleClick(true);
                  navigate("/login");
                }}
                className={`w-[100px] ${
                  covered ? "text-white bg-[#1e6089]" : "text-black bg-[#f0f9ff]"
                } cursor-pointer font-medium rounded-l-lg text-sm px-6 py-2.5 transition-all duration-1000 ease-in-out`}
              >
                Login
              </button>
              <button
                onClick={() => {
                  handleClick(false);
                  navigate("/signup");
                }}
                className={`w-[100px] ${
                  !covered ? "text-white bg-[#1e6089]" : "text-black bg-[#f0f9ff]"
                } cursor-pointer font-medium rounded-r-lg text-sm px-5 py-2.5 transition-all duration-1000 ease-in-out`}
              >
                SignUp
              </button>
            </div>
          )}

          {adminJwt && (
            <div
              className="flex flex-col items-center cursor-pointer"
              onClick={() => navigate("/admin")}
            >
              <CgProfile size={30} />
              <p className="text-sm">Profile</p>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="lg:hidden flex items-center justify-between gap-4">
          {adminJwt && (
            <div
              className="cursor-pointer"
              onClick={() => navigate("/admin")}
            >
              <CgProfile size={20} />
            </div>
          )}
          <div
            className="cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <LuMenu size={28} />
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="lg:hidden flex flex-col gap-4 p-4 bg-white shadow-md font-bold">
          {!adminJwt && (
            <>
              <a href="/login" className="bg-orange-500 border-b-[1px] p-1 text-white rounded-md">
                Login
              </a>
              <a href="/signup" className="border-b-[1px] p-1">
                Sign up
              </a>
            </>
          )}
          <a href="/admin/users" className="border-b-[1px] p-1">
            Users
          </a>
          <a href="/admin/sellers" className="border-b-[1px] p-1">
            Sellers
          </a>
          <a href="/products" className="border-b-[1px] p-1">
            Products
          </a>
          
          <a href="/about" className="border-b-[1px] p-1">
            About
          </a>
          <Link to="/admin/dashboard">Admin Dashboard</Link>
        </div>
      )}
    </div>
  );
};

export default AdminNavbar;
