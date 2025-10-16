import React, { useState } from "react";

const BecomeSellerFormStep2 = ({ form, setForm }) => {
  const [errors, setErrors] = useState({});

  const handleChange = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "name":
        if (!value || value.length < 3) error = "Name must be at least 3 characters.";
        break;
      case "mobile":
        if (!/^[0-9]{10}$/.test(value)) error = "Enter a valid 10-digit mobile number.";
        break;
      case "pincode":
        if (!/^[0-9]{6}$/.test(value)) error = "Enter a valid 6-digit pincode.";
        break;
      case "address":
        if (!value) error = "Address is required.";
        break;
      case "locality":
        if (!value) error = "Locality is required.";
        break;
      case "city":
        if (!value) error = "City is required.";
        break;
      case "state":
        if (!value) error = "State is required.";
        break;
      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const renderInput = (label, name, placeholder = "") => (
    <div className="flex flex-col w-full">
      <label className="text-sm font-medium mb-1">{label}</label>
      <input
        type="text"
        name={name}
        value={form[name] || ""}
        onChange={(e) => handleChange(name, e.target.value)}
        onBlur={(e) => validateField(name, e.target.value)}
        className={`border rounded-md p-2 focus:ring-2 focus:outline-none ${
          errors[name] ? "border-red-500" : "border-gray-300"
        }`}
        placeholder={placeholder}
      />
      {errors[name] && <p className="text-red-500 text-sm mt-1">{errors[name]}</p>}
    </div>
  );

  return (
    <div>
      <p className="text-xl font-bold text-center pb-9">Pickup Address</p>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">{renderInput("Name", "name", "Enter name")}</div>
        {renderInput("Mobile", "mobile", "Enter mobile number")}
        {renderInput("Pincode", "pincode", "Enter 6-digit pincode")}
        <div className="md:col-span-2">{renderInput("Address", "address", "Enter full address")}</div>
        <div className="md:col-span-2">{renderInput("Locality", "locality", "Enter locality")}</div>
        {renderInput("City", "city", "Enter city")}
        {renderInput("State", "state", "Enter state")}
      </form>
    </div>
  );
};

export default BecomeSellerFormStep2;
