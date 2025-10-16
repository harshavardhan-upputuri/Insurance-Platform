import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { createProduct } from "../State/Seller/SellerProductSlice";
import { Products } from "../Assets/Products";

const Data = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  // localStorage.removeItem("productsInserted");
  useEffect(() => {
    // Run only once (first load)
    const alreadyInserted = localStorage.getItem("productsInserted");
    if (alreadyInserted) return;

    Products.forEach((item) => {
      const request = {
        categoryName: item.category,
        image: item.image,
        name: item.name,
        head: item.head,
        subName: item.sub_name,
        type: item.type,
        premium: item.premium,
        coverage: item.coverage,
        desc1: item.desc.desc1,
        desc2: item.desc.desc2,
        desc3: item.desc.desc3,
      };
      dispatch(createProduct({ request, jwt }));
    });

    localStorage.setItem("productsInserted", "true");
  }, [dispatch, jwt]);

  return <div>Bulk inserting products...</div>;
};

export default Data;
