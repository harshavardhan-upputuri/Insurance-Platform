

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { UploadToCloudinary } from '../../../Util/UploadToCloudinary'
import { createProduct } from '../../../State/Seller/SellerProductSlice'; // Adjust import

const SellerAddProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, success } = useSelector((state) => state.sellerProduct);

  const [uploadingImage, setUploadingImage] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    subName: '',
    image: '', // Single image string
    categoryName: '',
    type: '',
    head: '',
    premium: '',
    coverage: '',
    desc1: '',
    desc2: '',
    desc3: '',
  });

  // Generic input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle image file upload to Cloudinary
  const handleFileSelect = async (file) => {
    if (!file) return;

    try {
      setUploadingImage(true);
      const uploadedUrl = await UploadToCloudinary(file);
      setFormData(prevState => ({
        ...prevState,
        image: uploadedUrl
      }));
    } catch (err) {
      console.error("Image upload failed:", err);
      alert("Image upload failed. Try again!");
    } finally {
      setUploadingImage(false);
    }
  };

  // Form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const jwt = localStorage.getItem("jwt");

    if (!formData.image) {
      alert("Please upload a product image!");
      return;
    }

    if (jwt) {
      dispatch(createProduct({ request: formData, jwt }));
    } else {
      alert("You are not authenticated!");
    }
  };

  // Redirect after successful creation
  useEffect(() => {
    if (success) {
      alert("Product created successfully!");
      navigate('/seller/products'); // Redirect to product list
    }
  }, [success, navigate]);

  return (
    <div className='bg-gray-100 min-h-screen p-4 md:p-8'>
      <div className="max-w-4xl mx-auto bg-white p-6 md:p-8 rounded-xl shadow-lg">
        <h1 className='text-3xl font-bold text-gray-800 mb-6 border-b pb-4'>Add New Product</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-6" role="alert">
            <strong className="font-bold">Error: </strong>
            <span>{typeof error === 'string' ? error : 'Failed to create product.'}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className='space-y-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {/* Name */}
            <InputField label="Name of Product" name="name" value={formData.name} onChange={handleChange} required />
            
            {/* Category */}
            <InputField label="Type of Category" name="categoryName" value={formData.categoryName} onChange={handleChange} required />

            {/* Company Name */}
            <InputField label="Company Name" name="subName" value={formData.subName} onChange={handleChange} required />

            {/* Plan Title */}
            <InputField label="Plan Title" name="head" value={formData.head} onChange={handleChange} required />

            {/* Policy Type */}
            <InputField label="Policy Type" name="type" value={formData.type} onChange={handleChange} required />

            {/* Premium */}
            <InputField label="Premium (₹)" name="premium" type="number" value={formData.premium} onChange={handleChange} required />

            {/* Coverage */}
            <InputField label="Coverage" name="coverage" value={formData.coverage} onChange={handleChange} required />

            {/* Image Upload */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Icon</label>
              <FileUpload onFileSelect={handleFileSelect} />
              {uploadingImage && <p className="text-sm text-gray-500 mt-2">Uploading image...</p>}
              {formData.image && (
                <div className="mt-2">
                  <p className='text-sm text-gray-500'>Uploaded Image:</p>
                  <img src={formData.image} alt="Uploaded" className="w-32 h-32 object-cover rounded-md border" />
                </div>
              )}
            </div>

            {/* Descriptions */}
            <div className="md:col-span-2 space-y-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Features</label>
              <textarea name="desc1" value={formData.desc1} onChange={handleChange} placeholder="Feature 1" required className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"></textarea>
              <textarea name="desc2" value={formData.desc2} onChange={handleChange} placeholder="Feature 2" required className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"></textarea>
              <textarea name="desc3" value={formData.desc3} onChange={handleChange} placeholder="Feature 3" required className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"></textarea>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-6 border-t mt-8">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300 disabled:bg-indigo-400 disabled:cursor-not-allowed"
            >
              {loading ? "Creating..." : "Create Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Generic Input Field component
const InputField = ({ label, name, type = "text", value, onChange, ...props }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
      {...props}
    />
  </div>
);


const FileUpload = ({ onFileSelect }) => {
    const [fileName, setFileName] = useState(null);

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file ) {
        setFileName(file.name);  
        if(onFileSelect) onFileSelect(file);
    }
  };

  return (
    <>
    <input type="file" accept="image/*" onChange={handleChange}  className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"/>
    {fileName && (
        <div className="mt-2 text-sm text-gray-700">
          <strong>Selected file:</strong> {fileName}
        </div>
      )}
    </>
  );
};

export default SellerAddProducts;
