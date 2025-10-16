import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IoClose } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import ItemCart from '../../Customer/Components/ItemCart';
import Stepper from '../../Customer/Components/Stepper';
import { fetchWishlistByUser } from '../../State/Customer/WishlistSlice';
const Cart = () => {
    const carts = useSelector(store => store.cart.items);
    const { wishlists, loading, error } = useSelector((store) => store.wishlist);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchWishlistByUser({ jwt: localStorage.getItem("jwt") }));
    }, [dispatch]);

    const navigate = useNavigate();
    return (
        <div className='bg-gradient-to-r from-blue-100 to-green-100 min-h-[550px] h-full pb-2'>
            <div className='   flex flex-col gap-10 items-center justify-between]'>

                <Stepper id={1} />
            </div>
            <div className="flex justify-between items-center mx-4">
                <h2 className='p-5 text-2xl'>Policies</h2>
                <button onClick={() => navigate("/")} className='cursor-pointer w-[30px] h-[30px] m-4 mr-10 rounded-2xl bg-red-500 text-white  flex items-center justify-center'><IoClose size={30} /></button>
            </div>
            <div className="md:flex md:justify-between md:flex-wrap md:mx-[100px] "  >
                {wishlists?.products?.length > 0 ? (
                    wishlists.products.map((item, key) => (
                        <ItemCart key={key} data={item} />
                    ))
                ) : (
                    <p className="text-center text-gray-600 w-full">No items in wishlist</p>
                )}

            </div>

        </div>
    )
}

export default Cart
