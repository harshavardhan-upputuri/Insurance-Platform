import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ProfileDetailsCard from "./ProfileDetailsCard";
import BusinessDetailsCard from "./BusinessDetailsCard";
import PickupAddressCard from "./PickupAddressCard";
import BankDetailsCard from "./BankDetailsCard";
import { fetchSellerProfile, updateSellerProfile } from "../../../State/Seller/SellerAuthSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Profile = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt"); 

  // State for all cards
  const [profileData, setProfileData] = useState({
    personal: {
      sellerName: "",
      email: "",
      mobile: ""
    },
    business: {
      businessName: "",
      businessEmail: "",
      businessMobile: "",
      businessAddress: ""
    },
    pickupAddress: {
      name: "",
      locality: "",
      address: "",
      city: "",
      state: "",
      pinCode: "",
      mobile: ""
    },
    bankDetails: {
      accountNumber: "",
      accountHolderName: "",
      ifscCode: ""
    }
  });

  const seller = useSelector((state) => state.sellerAuth?.seller);



  const fetchSeller=async ()=>{
    try {
      const res=await dispatch(fetchSellerProfile({jwt:localStorage.getItem("jwt")})).unwrap();
      // console.log("res seller",res);
      setProfileData({
        personal:{
          sellerName:res.sellerName || "",
          email:res.email || "",
          mobile : res.mobile || ""
        },
    business: {
      businessName:res?.businessDetails.businessName|| "",
      businessEmail: res?.businessDetails.businessEmail||"",
      businessMobile:res?.businessDetails.businessMobile|| "",
      businessAddress: res?.businessDetails.businessAddress||""
    },
    pickupAddress: {
      name: res?.pickupAddress.name||"",
      locality: res?.pickupAddress.locality||"",
      address: res?.pickupAddress.address||"",
      city: res?.pickupAddress.city||"",
      state: res?.pickupAddress.state||"",
      pinCode: res?.pickupAddress.pinCode||"",
      mobile: res?.pickupAddress.mobile||""
    },
    bankDetails: {
      accountNumber: res?.bankDetails.accountNumber || "",
      accountHolderName: res?.bankDetails.accountHolderName ||"",
      ifscCode: res?.bankDetails.ifscCode ||""
    }
      })
    } catch (error) {
      console.error("Failed to fetch user:", err);
    }
  }

  useEffect(()=>{
    // console.log(jwt)
    fetchSeller();
  },[])

  const handleUpdate = () => {
    const payload = {
    sellerName: profileData.personal.sellerName,
    email: profileData.personal.email,
    mobile: profileData.personal.mobile,
    businessDetails: { ...profileData.business },
    pickupAddress: { ...profileData.pickupAddress },
    bankDetails: { ...profileData.bankDetails }
  };
    dispatch(updateSellerProfile({ jwt, SellerData: payload  }))
      .unwrap()
      .then((res) => {
        console.log("Profile updated successfully:", res);
      })
      .catch((err) => {
        console.error("Failed to update profile:", err);
      });

    toast.success("Seller details updated successfully!");
      
  };

  return (
    <div className="flex flex-col gap-20 items-center justify-center">
      <ToastContainer position="top-right" autoClose={2000} />
      
      <ProfileDetailsCard
        data={profileData.personal}
        setData={(newData) =>
          setProfileData((prev) => ({ ...prev, personal: newData }))
        }
      />
      <BusinessDetailsCard
        data={profileData.business}
        setData={(newData) =>
          setProfileData((prev) => ({ ...prev, business: newData }))
        }
      />
      <PickupAddressCard
        data={profileData.pickupAddress}
        setData={(newData) =>
          setProfileData((prev) => ({ ...prev, pickupAddress: newData }))
        }
      />
      <BankDetailsCard
        data={profileData.bankDetails}
        setData={(newData) =>
          setProfileData((prev) => ({ ...prev, bankDetails: newData }))
        }
      />

      <button
        onClick={handleUpdate}
        className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Update Profile
      </button>
    </div>
  );
};

export default Profile;
