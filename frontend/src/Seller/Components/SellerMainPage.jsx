import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { FiShoppingBag } from "react-icons/fi";
import { FaFileAlt } from "react-icons/fa";
import { BiTransferAlt } from "react-icons/bi";
import { IoCartOutline } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";

import Profile from "../Pages/Account/Profile";
import SellerProduct from "../Pages/Product/SellerProduct";
import SellerAddProducts from "../Pages/Product/SellerAddProducts";
import ApplicationSeller from "../Pages/ApplicationsForm/ApplicationSeller";
import SellerOrders from "../Pages/SellerOrder/SellerOrders";
import SellerTransactions from "../Pages/SellerTransactions/SellerTransactions";
import SellerDashboard from "../Pages/SellerDashboard/SellerDashboard";

const features = [
  { name: "Profile", path: "/seller", icon: <CgProfile /> },
  { name: "Dashboard", path: "/seller/dashboard", icon: <MdDashboard /> },
  { name: "Products", path: "/seller/products", icon: <FiShoppingBag /> },
  { name: "Add Products", path: "/seller/add-products", icon: <FiShoppingBag /> },
  { name: "Orders", path: "/seller/orders", icon: <FaFileAlt /> },
  { name: "Requests", path: "/seller/requests", icon: <BiTransferAlt /> },
  { name: "Transactions", path: "/seller/transactions", icon: <IoCartOutline /> },
];

const SellerMainPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg rounded-r-xl p-6 flex flex-col">
        <h2 className="text-2xl font-bold mb-6 text-indigo-600">Seller Panel</h2>
        {features.map((feature) => (
          <div
            key={feature.name}
            className="flex items-center gap-3 p-3 mb-3 rounded-lg cursor-pointer hover:bg-indigo-100 hover:text-indigo-800 transition-colors duration-200"
            onClick={() => navigate(feature.path)}
          >
            <span className="text-xl">{feature.icon}</span>
            <span className="font-medium">{feature.name}</span>
          </div>
        ))}

        {/* Logout */}
        <div
          className="flex items-center gap-3 p-3  rounded-lg cursor-pointer hover:bg-red-500 hover:text-white transition-colors duration-200 text-red-600 font-medium"
          onClick={handleLogout}
        >
          <FiLogOut className="text-xl" />
          <span>Logout</span>
        </div>
      </div>

      {/* Right Panel */}
      <section className="flex-1 p-8 bg-gray-50 rounded-l-xl shadow-inner">
        <Routes>
          <Route path="dashboard" element={<SellerDashboard />} />
          <Route path="/" element={<Profile />} />
          <Route path="products" element={<SellerProduct jwt={localStorage.getItem("jwt")} />} />
          <Route path="add-products" element={<SellerAddProducts />} />
          <Route path="orders" element={<SellerOrders />} />
          <Route path="requests" element={<ApplicationSeller />} />
          <Route path="transactions" element={<SellerTransactions />} />
        </Routes>
      </section>
    </div>
  );
};

export default SellerMainPage;
