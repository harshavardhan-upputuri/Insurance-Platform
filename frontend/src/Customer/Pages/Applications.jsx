import { useEffect, useState } from "react";
import Stepper from "../Components/Stepper";
import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { fetchProductById } from "../../State/Customer/ProductSlice";
import { createApplicationForm } from "../../State/Customer/ApplicationFormSlice";
import { UploadToCloudinary } from "../../Util/UploadToCloudinary";

const FileUpload = ({ onFileSelect, name }) => {
    const [fileName, setFileName] = useState(null);

    const handleChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFileName(file.name);
            if (onFileSelect) onFileSelect(file);
        }
    };

    return (
        <div>
            {name && <label className="block mb-1 font-medium">{name}</label>}
            <input
                type="file"
                accept="image/*"
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
            />
            {fileName && (
                <div className="mt-2 text-sm text-gray-700">
                    <strong>Selected file:</strong> {fileName}
                </div>
            )}
        </div>
    );
};



const Application = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { product } = useSelector((state) => state.product);
    const jwt = localStorage.getItem("jwt");

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
        aadhar: "",   // Base64 string
        pan: "",      // Base64 string
    });


    // const handleAadharSelect = (base64) => {
    //     setFormData((prev) => ({ ...prev, aadhar: base64 }));
    // };

    // const handlePanSelect = (base64) => {
    //     setFormData((prev) => ({ ...prev, pan: base64 }));
    // };

    const handlePanSelect = async (file) => {
        if (!file) return;
        // setUploadingImage(true);
        try {
            const uploadedUrl = await UploadToCloudinary(file);
            setFormData(prev => ({ ...prev, pan: uploadedUrl }));
        } catch (err) {
            console.error("Image upload failed", err);
            alert("Failed to upload image");
        } finally {
            //   setUploadingImage(false);
        }
    };

    const handleAadharSelect = async (file) => {
        if (!file) return;
        // setUploadingImage(true);
        try {
            const uploadedUrl = await UploadToCloudinary(file);
            setFormData(prev => ({ ...prev, aadhar: uploadedUrl }));
        } catch (err) {
            console.error("Image upload failed", err);
            alert("Failed to upload image");
        } finally {
            //   setUploadingImage(false);
        }
    };



    useEffect(() => {
        dispatch(fetchProductById(id));
    }, [dispatch, id]);

    const handleChange = (e) => {
        const { id, value, name, type } = e.target;
        if (type === "radio") {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [id || name]: value,
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            occupation: formData.occupation,
            email: formData.email,
            phone: formData.phone,
            income: formData.income,
            dateOfBirth: formData.dateOfBirth,
            gender: formData.gender,
            married: formData.maritalStatus === "Married",
            address: formData.address,
            pinCode: formData.pinCode,
            aadharFile: formData.aadhar,
            panFile: formData.pan,

            policyId: id,
            categoryId: product?.category?.id,
        };

        delete payload.maritalStatus;

        console.log("Submitting -> ", payload);

        dispatch(createApplicationForm({ jwt: localStorage.getItem("jwt"), form: payload }));
    };




    return (
        <div className="m-4 shadow-2xl h-full">
            <div className="flex flex-col gap-10 items-center justify-between">
                <Stepper id={2} />
            </div>

            <div className="p-4 flex items-center gap-4 w-full">
                <img
                    className="w-[70px] h-[70px] border rounded-full cursor-pointer"
                    src={product?.image || ""}
                    alt=""
                />
                <p className="font-bold text-[20px]">
                    {product?.name || ""} starting at Rs.{product?.premium || ""}*
                </p>
            </div>

            <div className="ml-[20px]">
                <h1 className="font-bold text-[24px] m-6 w-[250px] mx-auto">
                    Application form
                </h1>

                <form className="m-4" onSubmit={handleSubmit}>
                    <div className="grid gap-6 mb-6 md:grid-cols-3">
                        {/* First name */}
                        <div className="md:w-[380px] w-[280px]">
                            <label
                                htmlFor="firstName"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                First name
                            </label>
                            <input
                                type="text"
                                id="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                placeholder="John"
                                required
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                            />
                        </div>

                        {/* Last name */}
                        <div className="md:w-[380px] w-[280px]">
                            <label
                                htmlFor="lastName"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Last name
                            </label>
                            <input
                                type="text"
                                id="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                placeholder="Doe"
                                required
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                            />
                        </div>

                        {/* Occupation */}
                        <div className="md:w-[380px] w-[280px]">
                            <label
                                htmlFor="occupation"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Occupation
                            </label>
                            <input
                                type="text"
                                id="occupation"
                                value={formData.occupation}
                                onChange={handleChange}
                                placeholder="Microsoft"
                                required
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                            />
                        </div>

                        {/* Phone */}
                        <div className="md:w-[380px] w-[280px]">
                            <label
                                htmlFor="phone"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Phone number
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="1234567890"
                                required
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                            />
                        </div>

                        {/* Email */}
                        <div className="md:w-[380px] w-[280px]">
                            <label
                                htmlFor="email"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Email address
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="john.doe@gmail.com"
                                required
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                            />
                        </div>

                        {/* Income */}
                        <div className="md:w-[380px] w-[280px]">
                            <label
                                htmlFor="income"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Income
                            </label>
                            <input
                                type="number"
                                id="income"
                                value={formData.income}
                                onChange={handleChange}
                                placeholder="Income"
                                required
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                            />
                        </div>

                        {/* DOB */}
                        <div className="md:w-[380px] w-[280px]">
                            <label
                                htmlFor="dateOfBirth"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Date of birth
                            </label>
                            <input
                                type="date"
                                id="dateOfBirth"
                                value={formData.dateOfBirth}
                                onChange={handleChange}
                                required
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                            />
                        </div>

                        {/* Gender */}
                        <div className="md:w-[380px] w-[280px]">
                            <label className="block mb-2 text-sm font-medium text-gray-900">
                                Gender
                            </label>
                            <div className="mt-4 flex items-center gap-10">
                                <div className="flex items-center gap-5">
                                    <input
                                        id="male"
                                        name="gender"
                                        value="Male"
                                        checked={formData.gender === "Male"}
                                        onChange={handleChange}
                                        type="radio"
                                    />
                                    <label htmlFor="male">Male</label>
                                </div>
                                <div className="flex items-center gap-5">
                                    <input
                                        id="female"
                                        name="gender"
                                        value="Female"
                                        checked={formData.gender === "Female"}
                                        onChange={handleChange}
                                        type="radio"
                                    />
                                    <label htmlFor="female">Female</label>
                                </div>
                            </div>
                        </div>

                        {/* Marital Status */}
                        <div className="md:w-[380px] w-[280px]">
                            <label className="block mb-2 text-sm font-medium text-gray-900">
                                Marital status
                            </label>
                            <div className="mt-4 flex items-center gap-10">
                                <div className="flex items-center gap-5">
                                    <input
                                        id="married"
                                        name="maritalStatus"
                                        value="Married"
                                        checked={formData.maritalStatus === "Married"}
                                        onChange={handleChange}
                                        type="radio"
                                    />
                                    <label htmlFor="married">Married</label>
                                </div>
                                <div className="flex items-center gap-5">
                                    <input
                                        id="single"
                                        name="maritalStatus"
                                        value="Single"
                                        checked={formData.maritalStatus === "Single"}
                                        onChange={handleChange}
                                        type="radio"
                                    />
                                    <label htmlFor="single">Single</label>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Address */}
                    <div className="md:flex items-center mb-6">
                        <div className="relative md:w-[1000px] w-[280px]">
                            <label
                                htmlFor="address"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Address
                            </label>
                            <input
                                type="text"
                                id="address"
                                value={formData.address}
                                onChange={handleChange}
                                placeholder="Address"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                            />
                        </div>

                        <div className="md:ml-[80px] md:w-[380px] w-[280px]">
                            <label
                                htmlFor="pinCode"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Pin code
                            </label>
                            <input
                                type="number"
                                id="pinCode"
                                value={formData.pinCode}
                                onChange={handleChange}
                                placeholder="500056"
                                required
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                            />
                        </div>
                    </div>

                    {/* File Uploads */}
                    <div className="md:flex items-center">
                        <FileUpload name={"Aadhar"} onFileSelect={handleAadharSelect} />
                        <div className="md:ml-[150px]">
                            <FileUpload name={"Pan card"} onFileSelect={handlePanSelect} />
                        </div>


                        <div className="md:ml-[170px]">
                            <label
                                htmlFor="insuranceType"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Type of Insurance
                            </label>
                            <select
                                id="insuranceType"
                                value={formData.insuranceType}
                                onChange={handleChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                            >
                                <option value="">Select Type</option>
                                <option value="Bike">Bike</option>
                                <option value="Car">Car</option>
                                <option value="Term life">Term life</option>
                                <option value="Health">Health</option>
                                <option value="Family">Family</option>
                                <option value="Travel">Travel</option>
                                <option value="Home">Home</option>
                                <option value="Corporate">Corporate</option>
                            </select>
                        </div>
                    </div>

                    {/* Submit */}
                    <div className="md:ml-[450px] md:flex items-center mt-4">
                        <div className="flex mb-4 items-center h-5">
                            <input
                                id="remember"
                                type="checkbox"
                                required
                                className="w-4 h-4 border border-gray-300 rounded-sm"
                            />
                            <label htmlFor="remember" className="ms-2 text-sm font-medium">
                                I agree with the{" "}
                                <a href="#" className="text-blue-600 hover:underline">
                                    terms and conditions
                                </a>
                                .
                            </label>
                        </div>
                        <button
                            type="submit"
                            className="ml-10 bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white rounded-2xl px-5 py-1 text-[20px]"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div >
        </div >
    );
};

export default Application;
