import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, deleteProduct, updateProduct } from "../../../State/Seller/SellerProductSlice";
import { UploadToCloudinary } from '../../../Util/UploadToCloudinary';
import { useNavigate } from "react-router-dom";

// FileUpload component
const FileUpload = ({ onFileSelect }) => {
  const [fileName, setFileName] = useState(null);

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      if (onFileSelect) onFileSelect(file);
    }
  };

  return (
    <>
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
    </>
  );
};

// Icons
const EditIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
    <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
    <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
  </svg>
);

const DeleteIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" />
  </svg>
);

const SellerProduct = ({ jwt }) => {
  const navigate=useNavigate();

  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(state => state.sellerProduct);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    if (jwt) dispatch(fetchProducts({ jwt }));
  }, [dispatch, jwt]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct({ productId: id, jwt }));
    }
  };

  const handleEditClick = (product) => {
    setCurrentProduct(product);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setCurrentProduct(null);
  };

  const handleFormChange = (e) => {
    setCurrentProduct({ ...currentProduct, [e.target.name]: e.target.value });
  };

  const handleImageChange = async (file) => {
    if (!file) return;
    setUploadingImage(true);
    try {
      const uploadedUrl = await UploadToCloudinary(file);
      setCurrentProduct(prev => ({ ...prev, image: uploadedUrl }));
    } catch (err) {
      console.error("Image upload failed", err);
      alert("Failed to upload image");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSave = () => {
    if (!currentProduct.image) {
      alert("Please upload an image before saving!");
      return;
    }
    dispatch(updateProduct({ productId: currentProduct.id, req: currentProduct, jwt }));
    handleModalClose();
  };

  if (loading) return <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div></div>;
  if (error) return <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md">{error}</div>;

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">My Products</h1>
        <button className="bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-300" onClick={()=>navigate("/seller/add-products")}>+ Add New Product</button>
      </div>

      {products.length === 0 ? (
        <p className="text-gray-600 text-center py-10">No products found. Add some!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col transition-transform transform hover:-translate-y-1">
              <img src={product.image} alt={product.name} className="w-[300px] h-40 object-cover" />
              <div className="p-4 flex flex-col flex-grow">
                <span className="text-sm text-indigo-500 font-semibold">{product.category?.name || 'Uncategorized'}</span>
                <h3 className="text-lg font-bold text-gray-900 mt-1 truncate">{product.name}</h3>
                <p className="text-sm text-gray-600">{product.subName}</p>
                <div className="mt-4 mb-2">
                  <span className="text-2xl font-extrabold text-gray-800">₹{product.premium}</span>
                  <span className="text-gray-500 text-sm"> / premium</span>
                </div>
                <p className="text-gray-700 text-sm mb-4">Coverage: <span className="font-medium">{product.coverage}</span></p>
                <div className="mt-auto pt-4 border-t border-gray-200 flex justify-end space-x-2">
                  <button onClick={() => handleEditClick(product)} className="flex items-center bg-blue-500 text-white px-3 py-1 rounded-md text-sm font-semibold hover:bg-blue-600 transition-colors"><EditIcon /> Edit</button>
                  <button onClick={() => handleDelete(product.id)} className="flex items-center bg-red-500 text-white px-3 py-1 rounded-md text-sm font-semibold hover:bg-red-600 transition-colors"><DeleteIcon /> Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {isModalOpen && currentProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
          <div className="bg-white rounded-lg shadow-2xl p-6 w-full max-w-2xl max-h-full overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField label="Name" name="name" value={currentProduct.name} onChange={handleFormChange} />
              <InputField label="Sub Name" name="subName" value={currentProduct.subName} onChange={handleFormChange} />
              <InputField label="Premium" name="premium" type="number" value={currentProduct.premium} onChange={handleFormChange} />
              <InputField label="Coverage" name="coverage" value={currentProduct.coverage} onChange={handleFormChange} />

              {/* Image Upload */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
                <FileUpload onFileSelect={handleImageChange} />
                {uploadingImage && <p className="text-sm text-gray-500 mt-1">Uploading...</p>}
                {currentProduct.image && !uploadingImage && <img src={currentProduct.image} alt="Product" className="w-32 h-32 mt-2 object-cover rounded-md" />}
              </div>

              {/* Descriptions */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description 1</label>
                <textarea name="desc1" value={currentProduct.desc1} onChange={handleFormChange} className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500" rows="2"></textarea>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description 2</label>
                <textarea name="desc2" value={currentProduct.desc2} onChange={handleFormChange} className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500" rows="2"></textarea>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description 3</label>
                <textarea name="desc3" value={currentProduct.desc3} onChange={handleFormChange} className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500" rows="2"></textarea>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button onClick={handleModalClose} className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition">Cancel</button>
              <button onClick={handleSave} className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition">Save Changes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const InputField = ({ label, name, type = "text", value, onChange }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input type={type} id={name} name={name} value={value || ""} onChange={onChange} className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
  </div>
);

export default SellerProduct;
