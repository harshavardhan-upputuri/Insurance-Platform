import React, { useState } from "react";
import BecomeSellerFormStep1 from "./BecomeSellerFormStep1";
import BecomeSellerFormStep2 from "./BecomeSellerFormStep2";
import BecomeSellerFormStep3 from "./BecomeSellerFormStep3";
import BecomeSellerFormStep4 from "./BecomeSellerFormStep4";
import { useDispatch } from "react-redux";
import { signupSeller } from "../../../State/Seller/SellerAuthSlice";
const steps = [
  "Tax Details & Mobile",
  "Pickup Address",
  "Bank Details",
  "Supplier Details",
];

const SellerAccountForm = () => {
  const dispatch = useDispatch();


  const [activeStep, setActiveStep] = useState(0);

  const [form, setForm] = useState({
    mobile: "",
    otp: "",
    gstin: "",
    pickupAddress: {
      name: "",
      mobile: "",
      pincode: "",
      address: "",
      locality: "",
      city: "",
      state: "",
    },
    bankDetails: {
      accountNumber: "",
      ifscCode: "",
      accountHolderName: "",
    },
    sellerName: "",
    email: "",
    businessDetails: {
      businessName: "",
      businessEmail: "",
      businessMobile: "",
      logo: "",
      banner: "",
      businessAddress: "",
    },
    password: "",
  });

  const handleStep = (step) => {
    if (activeStep < steps.length - 1 && step === 1) {
      setActiveStep(activeStep + 1);
    } else if (activeStep > 0 && step === -1) {
      setActiveStep(activeStep - 1);
    } else if (activeStep === steps.length - 1 && step === 1) {
      handleCreateAccount();
    }
  };

  const handleCreateAccount = async () => {
    try {
       const res = await dispatch(signupSeller({ SellerData: form })).unwrap();
      console.log("Signup Success:", res);
      alert("Account Created Successfully!");
    } catch (error) {
      console.error("Signup Failed:", err);
      alert(err.message || "Signup failed. Please try again.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-8">
      {/* Stepper */}
      <div className="flex justify-between items-center mb-10">
        {steps.map((label, index) => (
          <div
            key={index}
            className={`flex-1 flex flex-col items-center relative ${index !== steps.length - 1 ? "after:content-[''] after:w-full after:h-0.5 after:bg-gray-300 after:absolute after:top-2.5 after:left-1/2" : ""
              }`}
          >
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full z-10 ${index <= activeStep
                ? "bg-blue-600 text-white"
                : "bg-gray-300 text-gray-700"
                }`}
            >
              {index + 1}
            </div>
            <span
              className={`mt-2 text-sm ${index === activeStep ? "font-semibold text-blue-600" : "text-gray-600"
                }`}
            >
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* Form Steps */}
      <section className="space-y-10">
        <div>
          {activeStep === 0 ? (
            <BecomeSellerFormStep1 form={form} setForm={setForm} />
          ) : activeStep === 1 ? (
            <BecomeSellerFormStep2 form={form} setForm={setForm} />
          ) : activeStep === 2 ? (
            <BecomeSellerFormStep3 form={form} setForm={setForm} />
          ) : (
            <BecomeSellerFormStep4 form={form} setForm={setForm} />
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => handleStep(-1)}
            disabled={activeStep === 0}
            className={`cursor-pointer px-6 py-2 rounded-md font-medium ${activeStep === 0
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-gray-600 text-white hover:bg-gray-700"
              }`}
          >
            Back
          </button>

          <button
            onClick={() => handleStep(1)}
            className="cursor-pointer px-6 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700"
          >
            {activeStep === steps.length - 1 ? "Create Account" : "Continue"}
          </button>
        </div>
      </section>
    </div>
  );
};

export default SellerAccountForm;
