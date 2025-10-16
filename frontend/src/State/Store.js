import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import cartReducer from "../State/Cart";    
import authSlice from "../State/AuthSlice";
import sellerAuthReducer from "../State/Seller/SellerAuthSlice"
import sellerProductReducer from "../State/Seller/SellerProductSlice";
import productSlice from "../State/Customer/ProductSlice";
import wishlistSlice from '../State/Customer/WishlistSlice';
import reviewSlice from '../State/Customer/ReviewSlice'
import applicationFormSlice from '../State/Customer/ApplicationFormSlice';
import sellerApplicationSlice from '../State/Seller/SellerApplicationSlice';
import orderSlice from "../State/Customer/OrderSlice";
import TransactionSlice from "../State/Customer/TransactionSlice";
import  SellerOrderSlice  from "./Seller/SellerOrderSlice";
import  SellerTransactionSlice  from "./Seller/SellerTransactionSlice";
import SellerReportSlice from "./Seller/SellerReportSlice";
import adminSlice from "./Admin/AdminSlice";

const rootReducer = combineReducers({
  cart: cartReducer,   
  auth: authSlice,
  sellerAuth:sellerAuthReducer,
  sellerProduct:sellerProductReducer,
  sellerApplication:sellerApplicationSlice,
  orders:orderSlice,
  sellerOrders:SellerOrderSlice,
  sellerTransactions:SellerTransactionSlice,
  sellerReport:SellerReportSlice,

  product:productSlice,
  wishlist:wishlistSlice,
  review:reviewSlice,
  applicationform:applicationFormSlice,
  transactions:TransactionSlice,


  admin:adminSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

export const useAppDispatch = () => useDispatch();
export const useAppSelector = (selector) => useSelector(selector);
export default store;
