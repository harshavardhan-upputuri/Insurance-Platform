import React, { useState } from "react";

const BecomeSellerFormStep4 = ({ form, setForm }) => {
  const [errors, setErrors] = useState({});

  const handleChange = (path, value) => {
    if (path.startsWith("businessDetails.")) {
      const field = path.split(".")[1];
      setForm((prev) => ({
        ...prev,
        businessDetails: { ...prev.businessDetails, [field]: value },
      }));
    } else {
      setForm((prev) => ({ ...prev, [path]: value }));
    }
  };

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "businessName":
        if (!value || value.length < 3)
          error = "Business name must be at least 3 characters.";
        break;
      case "sellerName":
        if (!value || value.length < 3)
          error = "Seller name must be at least 3 characters.";
        break;
      case "email":
        if (!/^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$/.test(value))
          error = "Enter a valid email.";
        break;
      case "password":
        if (!value || value.length < 6)
          error = "Password must be at least 6 characters.";
        break;
      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const renderInput = (label, path, name, type = "text", placeholder = "") => {
    const value =
      path.startsWith("businessDetails.")
        ? form.businessDetails?.[name] || ""
        : form[name] || "";

    return (
      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">{label}</label>
        <input
          type={type}
          name={name}
          value={value}
          onChange={(e) => handleChange(path, e.target.value)}
          onBlur={(e) => validateField(name, e.target.value)}
          className={`border rounded-md p-2 focus:ring-2 focus:outline-none ${
            errors[name] ? "border-red-500" : "border-gray-300"
          }`}
          placeholder={placeholder}
        />
        {errors[name] && (
          <p className="text-red-500 text-sm mt-1">{errors[name]}</p>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-5">
      <p className="text-xl font-bold text-center pb-5">Business Details</p>

      {renderInput("Business Name", "businessDetails.businessName", "businessName", "text", "Enter your business name")}
      {renderInput("Seller Name", "businessDetails.sellerName", "sellerName", "text", "Enter seller name")}
      {renderInput("Email", "email", "email", "email", "Enter your email")}
      {renderInput("Password", "password", "password", "password", "Enter password")}
    </div>
  );
};

export default BecomeSellerFormStep4;
