import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchUserProfile, updateUserProfile } from "../../State/AuthSlice";

const AdminProfile = () => {
  const dispatch = useDispatch();

  const [editMode, setEditMode] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    addresses: [],
  });

  

  // Fetch user profile
  const fetchUser = async () => {
    try {
      const res = await dispatch(fetchUserProfile({ jwt: localStorage.getItem("jwt") })).unwrap();
      setProfileData({
        fullName: res.fullName,
        email: res.email,
        mobile: res.mobile,
        addresses: res.addresses || [],
      });
      // console.log("jwt",localStorage.getItem("jwt"))
    } catch (err) {
      console.error("Failed to fetch user:", err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddressChange = (index, e) => {
    const { name, value } = e.target;
    const updatedAddresses = [...profileData.addresses];
    updatedAddresses[index] = { ...updatedAddresses[index], [name]: value };
    setProfileData((prev) => ({ ...prev, addresses: updatedAddresses }));
  };

  const handleAddAddress = () => {
    setProfileData((prev) => ({
      ...prev,
      addresses: [
        ...prev.addresses,
        { name: "", locality: "", address: "", city: "", state: "", pinCode: "", mobile: "", id: null },
      ],
    }));
  };

  const handleUpdateProfile = async () => {
    try {
      const payload = {
        jwt: localStorage.getItem("jwt"),
        user: {
          fullName: profileData.fullName,
          email: profileData.email,
          mobile: profileData.mobile,
          addresses: profileData.addresses.map((addr) => ({ ...addr, id: addr.id || null })),
        },
      };
      await dispatch(updateUserProfile(payload)).unwrap();
      setEditMode(false);
      fetchUser();
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>

      {/* Profile Info */}
      <div className="bg-white p-6 rounded-lg shadow-md max-w-lg mb-6">
        {["fullName", "email", "mobile"].map((field) => (
          <div className="mb-4" key={field}>
            <label className="block text-gray-700 mb-2">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
            <input
              type={field === "email" ? "email" : "text"}
              name={field}
              value={profileData[field]}
              onChange={handleProfileChange}
              disabled={!editMode}
              className={`w-full p-2 border rounded ${editMode ? "border-blue-500" : "border-gray-300 bg-gray-100"}`}
            />
          </div>
        ))}
      </div>

      {/* Addresses */}
      <h2 className="text-2xl font-semibold mb-4">My Addresses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {profileData.addresses.map((addr, index) => (
          <div key={addr.id || index} className="bg-white p-4 rounded-lg shadow-md">
            {editMode ? (
              <>
                {["name", "locality", "address", "city", "state", "pinCode", "mobile"].map((field) => (
                  <div className="mb-2" key={field}>
                    <label className="block text-gray-700 mb-1">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                    <input
                      type="text"
                      name={field}
                      value={addr[field]}
                      onChange={(e) => handleAddressChange(index, e)}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                ))}
              </>
            ) : (
              <>
                <p className="font-bold">{addr.name}</p>
                <p>{addr.address}, {addr.locality}</p>
                <p>{addr.city}, {addr.state} - {addr.pinCode}</p>
                <p>Mobile: {addr.mobile}</p>
              </>
            )}
          </div>
        ))}
      </div>

      {editMode && (
        <button className="bg-blue-500 text-white px-4 py-2 rounded mb-4" onClick={handleAddAddress}>
          Add Address
        </button>
      )}

      <div className="flex gap-4 mt-4">
        {editMode ? (
          <>
            <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={handleUpdateProfile}>Save</button>
            <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded" onClick={() => setEditMode(false)}>Cancel</button>
          </>
        ) : (
          <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => setEditMode(true)}>Edit Profile</button>
        )}
      </div>
    </div>
  );
};

export default AdminProfile;
