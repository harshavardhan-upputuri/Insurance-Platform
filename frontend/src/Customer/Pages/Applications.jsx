import React, { useEffect, useState, useRef } from "react";
import Stepper from "../Components/Stepper";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById } from "../../State/Customer/ProductSlice";
import { createApplicationForm } from "../../State/Customer/ApplicationFormSlice";
import { UploadToCloudinary } from "../../Util/UploadToCloudinary";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FileUpload = ({ onFileSelect, name, resetRef }) => {
    const [fileName, setFileName] = useState(null);

    const handleChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFileName(file.name);
            onFileSelect?.(file);
        }
    };

    useEffect(() => {
        if (resetRef?.current) {
            resetRef.current.value = "";
            setFileName(null);
        }
    }, [resetRef]);

    return (
        <div>
            {name && <label className="block mb-1 font-medium">{name}</label>}
            <input
                ref={resetRef}
                type="file"
                accept="image/*"
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
            />
            {fileName && <div className="mt-2 text-sm text-gray-700"><strong>Selected file:</strong> {fileName}</div>}
        </div>
    );
};

const Application = () => {
    const navigate=useNavigate();
    
    const { id } = useParams();
    const dispatch = useDispatch();
    const { product } = useSelector((state) => state.product);

    const aadharResetRef = useRef(null);
    const panResetRef = useRef(null);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        occupation: "",
        phone: "",
        email: "",
        income: "",
        dateOfBirth: "",
        gender: "",
        maritalStatus: "",
        address: "",
        pinCode: "",
        aadhar: "",
        pan: "",
        insuranceType: "",
    });

    useEffect(() => {
        dispatch(fetchProductById(id));
    }, [dispatch, id]);

    const handleChange = (e) => {
        const { id, name, value, type } = e.target;
        setFormData((prev) => ({
            ...prev,
            [type === "radio" ? name : id || name]: value,
        }));
    };

    const handleFileSelect = async (file, key) => {
        if (!file) return;
        try {
            const uploadedUrl = await UploadToCloudinary(file);
            setFormData((prev) => ({ ...prev, [key]: uploadedUrl }));
        } catch (err) {
            console.error("Image upload failed", err);
            toast.error("Failed to upload image.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            ...formData,
            married: formData.maritalStatus === "Married",
            aadharFile: formData.aadhar,
            panFile: formData.pan,
            policyId: id,
            categoryId: product?.category?.id,
        };
        delete payload.maritalStatus;

        dispatch(createApplicationForm({ jwt: localStorage.getItem("jwt"), form: payload }))
            .unwrap()
            .then(() => {
                toast.success("🎉 Login successful!");
                setTimeout(() => {
                    navigate("/profile/applications");
                }, 1500);

                // reset form
                setFormData({
                    firstName: "",
                    lastName: "",
                    occupation: "",
                    phone: "",
                    email: "",
                    income: "",
                    dateOfBirth: "",
                    gender: "",
                    maritalStatus: "",
                    address: "",
                    pinCode: "",
                    aadhar: "",
                    pan: "",
                    insuranceType: "",
                });

                // reset file inputs
                aadharResetRef.current.value = "";
                panResetRef.current.value = "";
            })
            .catch((err) => {
                console.error(err);
                toast.error("Failed to submit form.", { position: toast.POSITION.TOP_RIGHT, autoClose: 3000 });
            });
    };

    return (
        <div className="m-4 shadow-2xl h-full">
            <ToastContainer />
            <div className="flex flex-col gap-10 items-center justify-between">
                <Stepper id={2} />
            </div>

            <div className="p-4 flex items-center gap-4 w-full">
                <img className="w-[70px] h-[70px] border rounded-full cursor-pointer" src={product?.image || ""} alt="" />
                <p className="font-bold text-[20px]">{product?.name || ""} starting at Rs.{product?.premium || ""}*</p>
            </div>

            <div className="ml-[20px]">
                <h1 className="font-bold text-[24px] m-6 w-[250px] mx-auto">Application form</h1>

                <form className="m-4" onSubmit={handleSubmit}>
                    <div className="grid gap-6 mb-6 md:grid-cols-3">
                        {/* First Name */}
                        <div className="md:w-[380px] w-[280px]">
                            <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900">First name</label>
                            <input type="text" id="firstName" value={formData.firstName} onChange={handleChange} placeholder="John" required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
                        </div>

                        {/* Last Name */}
                        <div className="md:w-[380px] w-[280px]">
                            <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900">Last name</label>
                            <input type="text" id="lastName" value={formData.lastName} onChange={handleChange} placeholder="Doe" required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
                        </div>

                        {/* Occupation */}
                        <div className="md:w-[380px] w-[280px]">
                            <label htmlFor="occupation" className="block mb-2 text-sm font-medium text-gray-900">Occupation</label>
                            <input type="text" id="occupation" value={formData.occupation} onChange={handleChange} placeholder="Microsoft" required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
                        </div>

                        {/* Phone */}
                        <div className="md:w-[380px] w-[280px]">
                            <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900">Phone number</label>
                            <input type="tel" id="phone" value={formData.phone} onChange={handleChange} placeholder="1234567890" required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
                        </div>

                        {/* Email */}
                        <div className="md:w-[380px] w-[280px]">
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email address</label>
                            <input type="email" id="email" value={formData.email} onChange={handleChange} placeholder="john.doe@gmail.com" required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
                        </div>

                        {/* Income */}
                        <div className="md:w-[380px] w-[280px]">
                            <label htmlFor="income" className="block mb-2 text-sm font-medium text-gray-900">Income</label>
                            <input type="number" id="income" value={formData.income} onChange={handleChange} placeholder="Income" required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
                        </div>

                        {/* DOB */}
                        <div className="md:w-[380px] w-[280px]">
                            <label htmlFor="dateOfBirth" className="block mb-2 text-sm font-medium text-gray-900">Date of birth</label>
                            <input type="date" id="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
                        </div>

                        {/* Gender */}
                        <div className="md:w-[380px] w-[280px]">
                            <label className="block mb-2 text-sm font-medium text-gray-900">Gender</label>
                            <div className="mt-4 flex items-center gap-10">
                                {["Male", "Female"].map((g) => (
                                    <div key={g} className="flex items-center gap-5">
                                        <input id={g.toLowerCase()} name="gender" type="radio" value={g} checked={formData.gender === g} onChange={handleChange} />
                                        <label htmlFor={g.toLowerCase()}>{g}</label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Marital Status */}
                        <div className="md:w-[380px] w-[280px]">
                            <label className="block mb-2 text-sm font-medium text-gray-900">Marital status</label>
                            <div className="mt-4 flex items-center gap-10">
                                {["Married", "Single"].map((m) => (
                                    <div key={m} className="flex items-center gap-5">
                                        <input id={m.toLowerCase()} name="maritalStatus" type="radio" value={m} checked={formData.maritalStatus === m} onChange={handleChange} />
                                        <label htmlFor={m.toLowerCase()}>{m}</label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Address and Pin */}
                    <div className="md:flex items-center mb-6">
                        <div className="relative md:w-[1000px] w-[280px]">
                            <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900">Address</label>
                            <input type="text" id="address" value={formData.address} onChange={handleChange} placeholder="Address" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
                        </div>
                        <div className="md:ml-[80px] md:w-[380px] w-[280px]">
                            <label htmlFor="pinCode" className="block mb-2 text-sm font-medium text-gray-900">Pin code</label>
                            <input type="number" id="pinCode" value={formData.pinCode} onChange={handleChange} placeholder="500056" required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
                        </div>
                    </div>

                    {/* File Uploads */}
                    <div className="md:flex items-center gap-10">
                        <FileUpload name="Aadhar" onFileSelect={(f) => handleFileSelect(f, "aadhar")} resetRef={aadharResetRef} />
                        <FileUpload name="Pan card" onFileSelect={(f) => handleFileSelect(f, "pan")} resetRef={panResetRef} />
                        <div className="md:ml-[20px]">
                            <label htmlFor="insuranceType" className="block mb-2 text-sm font-medium text-gray-900">Type of Insurance</label>
                            <select id="insuranceType" value={formData.insuranceType} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5">
                                <option value="">Select Type</option>
                                {["Bike", "Car", "Term life", "Health", "Family", "Travel", "Home", "Corporate"].map((type) => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Submit */}
                    <div className="md:ml-[450px] md:flex items-center mt-4">
                        <div className="flex mb-4 items-center h-5">
                            <input id="remember" type="checkbox" required className="w-4 h-4 border border-gray-300 rounded-sm" />
                            <label htmlFor="remember" className="ms-2 text-sm font-medium">
                                I agree with the{" "}
                                <a href="#" className="text-blue-600 hover:underline">terms and conditions</a>.
                            </label>
                        </div>
                        <button type="submit" className="ml-10 bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white rounded-2xl px-5 py-1 text-[20px]">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Application;
