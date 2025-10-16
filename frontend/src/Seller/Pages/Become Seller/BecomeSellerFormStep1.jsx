import React, { useState } from "react";

const BecomeSellerFormStep1 = ({ form, setForm }) => {
  const [errors, setErrors] = useState({});

  const handleChange = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validateField = (name, value) => {
    let error = "";

    if (name === "mobile") {
      if (!/^[0-9]{10}$/.test(value)) {
        error = "Enter a valid 10-digit mobile number.";
      }
    }

    if (name === "GSTIN") {
      if (!/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][0-9]Z[0-9]$/.test(value)) {
        error = "Enter a valid GSTIN.";
      }
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  return (
    <div>
      <p className="text-xl font-bold text-center pb-9">Contact Details</p>

      <div className="space-y-6">
        {/* Mobile Field */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Mobile</label>
          <input
            type="text"
            name="mobile"
            value={form.mobile}
            onChange={(e) => handleChange("mobile", e.target.value)}
            onBlur={(e) => validateField("mobile", e.target.value)}
            className={`border rounded-md p-2 focus:ring-2 focus:outline-none ${
              errors.mobile ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your mobile number"
          />
          {errors.mobile && (
            <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>
          )}
        </div>

        {/* GSTIN Field */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">GSTIN</label>
          <input
            type="text"
            name="GSTIN"
            value={form.GSTIN}
            onChange={(e) => handleChange("GSTIN", e.target.value)}
            onBlur={(e) => validateField("GSTIN", e.target.value)}
            className={`border rounded-md p-2 focus:ring-2 focus:outline-none ${
              errors.GSTIN ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your GSTIN"
          />
          {errors.GSTIN && (
            <p className="text-red-500 text-sm mt-1">{errors.GSTIN}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BecomeSellerFormStep1;
