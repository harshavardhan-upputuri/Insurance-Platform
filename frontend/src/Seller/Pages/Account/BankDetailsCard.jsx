import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BankDetailsCard = ({ data, setData }) => {
  const [editMode, setEditMode] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const formatLabel = (text) =>
    text.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase());

  const handleEditSave = () => {
    if (editMode) {
      console.log("Saving bank details:", data);
      toast.success("Bank details updated successfully!");
    }
    setEditMode((prev) => !prev);
  };

  return (
    <div className="bg-white w-[400px] shadow-md mx-auto rounded-lg">
      <ToastContainer position="top-right" autoClose={2000} />
      <h6 className="px-6 pt-4 font-bold text-xl">Bank Details</h6>

      <div className="p-6 max-w-lg mb-6">
        {["accountNumber", "accountHolderName", "ifscCode"].map((field) => (
          <div className="mb-4" key={field}>
            <label className="block text-gray-700 mb-2">{formatLabel(field)}</label>
            <input
              type="text"
              name={field}
              value={data[field]}
              onChange={handleChange}
              disabled={!editMode}
              className={`w-full p-2 border rounded ${
                editMode ? "border-blue-500" : "border-gray-300 bg-gray-100"
              }`}
            />
          </div>
        ))}
      </div>

      <div className="flex pb-4 px-6 justify-end">
        <button
          onClick={handleEditSave}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          <FaEdit /> {editMode ? "Save" : "Edit"}
        </button>
      </div>
    </div>
  );
};

export default BankDetailsCard;
