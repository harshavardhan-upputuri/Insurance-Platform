import React from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { logout } from "../../State/AuthSlice";

import AdminDashboard from './AdminDashboard';
import AdminOrdersTable from './AdminOrdersTable';
import AdminProfile from './AdminProfile';
import AdminSellersTable from './AdminSellersTable';
import AdminTransactionTable from './AdminTransactionTable';
import AdminUsersTable from './AdminUsersTable';

const menu = [
  { name: "Profile", path: "/admin" },
  { name: "Dashboard", path: "/admin/dashboard" },
  { name: "Orders", path: "/admin/orders" },
  { name: "Sellers", path: "/admin/sellers" },
  { name: "Users", path: "/admin/users" },
  { name: "Transactions", path: "/admin/transactions" },
  { name: "Logout", path: "/" }
];

const AdminAccount = () => {
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
        <h1 className="text-2xl font-bold pb-5">Admin Panel</h1>
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
            <Route path="/" element={<AdminProfile />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="orders" element={<AdminOrdersTable />} />
            <Route path="users" element={<AdminUsersTable />} />
            <Route path="sellers" element={<AdminSellersTable />} />
            <Route path="transactions" element={<AdminTransactionTable />} />
          </Routes>
        </section>
      </div>
    </div>
  );
};

export default AdminAccount;
