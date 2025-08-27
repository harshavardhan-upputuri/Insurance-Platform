import React from 'react'
import { assets, items } from '../Assets/assets'
import { FaRegBookmark } from "react-icons/fa6";
import { Navigate, useNavigate } from 'react-router-dom';
import { GoStarFill } from 'react-icons/go';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../Stores/Cart';

const ProductsDisplay = ({ product, id }) => {
    const carts = useSelector(store => store.cart.Items);
    const dispatch = useDispatch();
    const handleAddToCart = () => {
        dispatch(addToCart({
            productId: product.id,
            quantity: 1,
        }))
    }

    const navigate = useNavigate();
    // const product = items[0];
    return (
        <div className=' '>
           
            <div key={id} className="w-[290px] ml-2  md:ml-[40px]  md:w-[400px] md:h-[480px] bg-white rounded-xl border ">
                <div className=" gap-8">
                    <div>
                        {/* image + heading */}
                        <div className='flex gap-4 m-3'>
                            <img className='w-[70px] h-[70px] border rounded-full' src={product.image} alt="" />
                            <div className="flex flex-col gap-2">
                                <h2 className='font-bold text-[16px]'>{product.name} <br /> {product.head}</h2>
                                <p className='hidden md:block text-[12px]'>{product.sub_name}</p>
                                <p className='hidden md:block bg-pink-400 items-center w-[75px]  text-[10px] rounded-xl px-4 py-1'>{product.type}</p>
                            </div>
                            <div className='ml-[40px] -mt-[50px] flex items-center cursor-pointer ' onClick={() => handleAddToCart()}>
                                <FaRegBookmark />
                            </div>

                        </div>
                    </div>

                    <div className='m-4 flex items-center justify-between'>
                        {/* Rating */}
                        <div className='ml-[15px]  flex items-center text-nowrap '>
                                <span>Rating :</span>
                                <div className='md:ml-4 flex gap-2'>
                                    {Array.from({ length: product.rating }).map((_, i) => (
                                        <GoStarFill key={i} color='gold' />
                                    ))}
                                </div>
                            </div>
                        <div className="flex ml-4 md:ml-2 gap-2 flex-col justify-center">
                            <div className=''>
                                <h2>Premium</h2>
                                <p className='font-bold'>{product.premium}*</p>
                            </div>
                            <div className=''>
                                <h2>Coverage</h2>
                                <p className='font-bold text-nowrap'><span>{product.coverage}</span></p>
                            </div>
                            
                        </div>

                    </div>
                </div>
                <hr className='mx-4  text-gray-300' />
                <div className='flex flex-col gap-4 m-4'>
                    <p className='flex items-center'><span className='bg-blue-500 block  mr-2 w-2 h-0.5'></span>{product.desc.desc1}</p>
                    <p className='flex items-center'><span className='bg-blue-500 block  mr-2 w-2 h-0.5'></span>{product.desc.desc2}</p>
                    <p className='hidden md:flex items-center'><span className='bg-blue-500 block  mr-2 w-2 h-0.5'></span>{product.desc.desc3}</p>

                </div>
                <div className="flex   ">


                    <button className='m-4 md:w-[180px] relative overflow-hidden text-white font-medium rounded-full px-3 py-1  md:px-6 md:py-2 md:text-[20px] bg-orange-400 transition-all duration-300 ease-in-out
                     hover:text-orange-400 before:absolute before:inset-0 before:bg-white before:rounded-full before:scale-x-0 
                     before:origin-left before:transition-transform before:duration-300 hover:before:scale-x-100' onClick={() => navigate(`/singleproduct/${id}`)}>
                        <span className="relative z-10">Know more</span>
                    </button>

                    <button onClick={() => navigate(`/application/${product.id}`)} className='m-4 md:w-[180px] relative overflow-hidden text-white font-medium rounded-full  px-3 py-1  md:px-6 md:py-2 md:text-[20px] bg-orange-400 transition-all duration-300 ease-in-out
                        hover:text-orange-400 before:absolute before:inset-0 before:bg-white before:rounded-full before:scale-x-0
                        before:origin-left before:transition-transform before:duration-300 hover:before:scale-x-100 '>
                        <span className="relative z-10">Get Quote</span>
                    </button>


                </div>
            </div>

        </div>
    )
}

export default ProductsDisplay
