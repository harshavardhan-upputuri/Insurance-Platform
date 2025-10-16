import React from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { logout } from "../../State/AuthSlice";

import Profile from './Profile';
import Cart from './Cart';
import DisplayApplication from './Applications/DisplayApplication';
import UserOrders from '../Pages/UserOrders';
import UserTransactions from '../Pages/UserTransactions';

const menu = [
  { name: "Profile", path: "/profile" },
  { name: "Cart", path: "/profile/cart" },
  { name: "Orders", path: "/profile/orders" },
  { name: "Applications", path: "/profile/applications" },
  { name: "Transactions", path: "/profile/transactions" },
  { name: "Logout", path: "/" }
];

const Account = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const handleClick = (item) => {
    if (item.path === "/") {
      dispatch(logout());
      navigate("/")
    } else {
      navigate(item.path);
    }
  };

  return (
    <div className='px-5  min-h-screen mt-10'>
      <div>
        <h1 className="text-2xl font-bold pb-5">Customer Panel</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 lg:min-h-[78vh] gap-5">
        {/* Sidebar */}
        <section className='col-span-1 lg:border-r lg:pr-5 py-5 h-full sticky top-20'>
          {menu.map((item) => (
            <div
              key={item.name}
              onClick={() => handleClick(item)}
              className={`
                border-b py-3 px-5 rounded-md cursor-pointer mb-4
                ${item.path === location.pathname ? "bg-blue-400 text-white" : "hover:text-black hover:bg-primary"}
              `}
            >
              <p className="capitalize">{item.name}</p>
            </div>
          ))}
        </section>

        {/* Right Panel */}
        <section className='col-span-3 lg:pl-5 py-5'>
          <Routes>
            <Route path="/" element={<Profile />} />
            <Route path="cart" element={<Cart />} />
            <Route path="orders" element={<UserOrders />} />
            <Route path="applications" element={<DisplayApplication />} />
            <Route path="transactions" element={<UserTransactions />} />
          </Routes>
        </section>
      </div>
    </div>
  );
};

export default Account;
