import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendLoginSignupOtp } from "../../../State/AuthSlice";
import { loginSeller } from "../../../State/Seller/SellerAuthSlice";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { FaGithub, FaGoogle } from "react-icons/fa";
 
const SellerLoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [form, setForm] = React.useState({
    email: "",
    otp: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSendOtp = () => {
    if (!form.email) {
      toast.error("⚠️ Please enter email first!");
      return;
    }
    dispatch(sendLoginSignupOtp({ email: form.email }))
      .unwrap()
      .then(() => {
        toast.success("✅ OTP sent to your email!");
      })
      .catch((err) => {
        toast.error(`❌ Failed to send OTP: ${err.message || "Error"}`);
      });
  };

  const handleLogin = () => {
    if (!form.email || !form.otp) {
      toast.error("⚠️ Please enter both email and OTP!");
      return;
    }

    dispatch(
      loginSeller({
        email: form.email,
        otp: form.otp,
        loginMethod: "otp",
      })
    )
      .unwrap()
      .then((res) => {
        toast.success("🎉 Login successful!");
        setTimeout(() => {
          navigate("/seller");
        }, 1500); // small delay so user can see popup
      })
      .catch((err) => {
        toast.error(`❌ Login failed: ${err.message || "Invalid OTP"}`);
      });
  };

  const handleOAuthLogin = (provider) => {
    window.location.href = `https://insurance-platform-6q8q.onrender.com/oauth2/authorization/${provider}`;
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
      {/* Toast container */}
      <ToastContainer position="top-right" autoClose={2000} />

      <h1 className="text-center font-bold text-xl text-blue-600 pb-5">
        Login As Seller
      </h1>

      <div className="space-y-5">
        {/* Email Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter your email"
          />
        </div>

        {/* OTP Field */}
        {form.email && (
          <div>
            <p className="font-medium text-sm text-gray-700 mb-1">
              Enter OTP sent to your email
            </p>
            <input
              type="text"
              name="otp"
              value={form.otp}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter OTP"
            />
          </div>
        )}



        {/* Buttons */}
        <button
          onClick={handleSendOtp}
          className="cursor-pointer w-full py-3 bg-gray-700 text-white font-semibold rounded-md hover:bg-gray-800 transition"
        >
          Send OTP
        </button>

        {/* Social Logins */}
        <div className='space-y-4'>
          <button
            type="button"
            onClick={() => handleOAuthLogin("google")}
            className="w-full flex items-center justify-center py-2.5 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition"
          >
            <FaGoogle className="mr-3 text-lg" />
            Sign in with Google
          </button>
          <button
            type="button"
            onClick={() => handleOAuthLogin("github")}
            className="w-full flex items-center justify-center py-2.5 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition"
          >
            <FaGithub className="mr-3 text-lg" />
            Sign in with Github
          </button>
        </div>

        <button
          onClick={handleLogin}
          disabled={!form.email || !form.otp}
          className="cursor-pointer w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Login
        </button>
      </div>


    </div>
  );
};

export default SellerLoginForm;
