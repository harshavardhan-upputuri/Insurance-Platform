import React from 'react';
import { IoClose } from "react-icons/io5";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteFromCart } from '../../State/Cart'; // optional if implemented
import { addProductToWishlist } from '../../State/Customer/WishlistSlice';

const ItemCart = ({ data }) => {


  const dispatch = useDispatch();
  const navigate = useNavigate();

  // each wishlist item = product details (from backend)
  const product = data.product || data; // handle both cases

  const deleteCart = () => {
    dispatch(addProductToWishlist({
        jwt:localStorage.getItem("jwt"),
        productId:data.id
    }))
  };

  if (!product) return null;

  return (
    <div className="relative w-[350px] md:w-[470px] h-[220px] mx-4 my-4 rounded-2xl shadow-lg mt-4 bg-gradient-to-r from-blue-200 to-green-200">
      <div className="md:flex md:gap-4 m-3">
        <img
          onClick={() => navigate(`/singleproduct/${product.id}`)}
          className="cursor-pointer w-[40px] h-[40px] border rounded-full object-cover"
          src={product.image}
          alt={product.name}
        />
        <div className="flex flex-col gap-2 ml-4">
          <h2 className="font-bold md:text-[16px]">{product.name}</h2>
          <p className="text-sm hidden md:block text-gray-700">
            {product.category.name || "Insurance plan details"}
          </p>
          <p className="text-sm hidden md:block text-gray-700">
            {product.subName || "Insurance plan details"}
          </p>
          <p className="hidden md:block bg-pink-400 items-center w-[75px] text-[10px] rounded-xl px-4 py-1">
            {product.type || "Health"}
          </p>
        </div>

        <div className="absolute top-0 right-0 flex">
          <button
            onClick={() => navigate(`/application/${product.id}`)}
            className="cursor-pointer md:w-[30px] md:h-[30px] m-4  rounded-2xl flex items-center justify-center"
          >
            <FaArrowUpRightFromSquare size={24} />
          </button>

          <button
            onClick={deleteCart}
            className="cursor-pointer md:w-[30px] md:h-[30px] m-4 md:mr-6 rounded-2xl bg-red-500 text-white flex items-center justify-center"
          >
            <IoClose size={24} />
          </button>
        </div>
      </div>

      <div className="flex m-4 justify-between">
        <div>
          <h2>Premium</h2>
          <p className="font-bold">{product.premium || "₹2,000"}*</p>
        </div>
        <div>
          <h2>Coverage</h2>
          <p className="font-bold">{product.coverage || "₹5 Lakh"}</p>
        </div>
        <div>
          <h2>Tenure</h2>
          <p className="font-bold">2 years</p>
        </div>
      </div>
    </div>
  );
};

export default ItemCart;
