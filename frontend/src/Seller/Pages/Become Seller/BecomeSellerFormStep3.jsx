import React, { useState } from "react";

const BecomeSellerFormStep3 = ({ form, setForm }) => {
  const [errors, setErrors] = useState({});

  const handleChange = (path, value) => {
    setForm((prev) => ({
      ...prev,
      bankDetails: {
        ...prev.bankDetails,
        [path]: value,
      },
    }));
  };

  const validateField = (name, value) => {
    let error = "";

    if (name === "accountNumber") {
      if (!/^[0-9]{9,18}$/.test(value)) {
        error = "Enter a valid account number (9–18 digits).";
      }
    }

    if (name === "ifscCode") {
      if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(value)) {
        error = "Enter a valid IFSC code.";
      }
    }

    if (name === "accountHolderName") {
      if (!value || value.length < 3) {
        error = "Account holder name is required.";
      }
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const renderInput = (label, name, placeholder = "") => (
    <div className="flex flex-col">
      <label className="text-sm font-medium mb-1">{label}</label>
      <input
        type="text"
        name={name}
        value={form.bankDetails?.[name] || ""}
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
    <div className="space-y-5">
      <p className="text-xl font-bold text-center pb-5">Bank Details</p>

      {renderInput("Account Number", "accountNumber", "Enter account number")}
      {renderInput("IFSC Code", "ifscCode", "Enter IFSC code")}
      {renderInput("Account Holder Name", "accountHolderName", "Enter account holder name")}
    </div>
  );
};

export default BecomeSellerFormStep3;
