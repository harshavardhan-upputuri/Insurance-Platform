import React, { useEffect, useState } from 'react'
import { items } from '../Assets/assets';
import { IoClose } from "react-icons/io5";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { useDispatch } from 'react-redux';
import { deleteFromCart } from '../Stores/Cart';
import { useNavigate } from 'react-router-dom';

const ItemCart = (props) => {
    const { productId } = props.data;
    const [detail, setDetail] = useState();
    const dispatch = useDispatch();
    const navigate=useNavigate();
    useEffect(() => {
        const result = items.find((curr) => curr.id == productId);
        setDetail(result);
    }, [productId]);
    const deleteCart= ()=>{
        dispatch(deleteFromCart({
            productId:productId
        }))
    }
    if (!detail) return null;

    return (
        <div className='relative w-[320px] md:w-[450px] h-[220px] mx-4 my-4  rounded-2xl shadow-lg mt-4 bg-gradient-to-r from-blue-200 to-green-200'>
            <div className='md:flex  md:gap-4 m-3 '>
                <img onClick={()=>navigate(`/singleproduct/${productId}`)} className='cursor-pointer w-[40px] h-[40px] border rounded-full' src={detail.image} alt="" />
                <div className="flex flex-col gap-2 " >
                    <h2 className='font-bold md:text-[16px] m-2 md:m-0'>{detail.name} <br /> {detail.head}</h2>
                    <p className='hidden md:block text-[12px]'>{detail.sub_name}</p>
                    <p className='hidden md:block bg-pink-400 items-center w-[75px]  text-[10px] rounded-xl px-4 py-1'>{detail.type}</p>
                </div>
                <div className="absolute top-0 right-0 flex">
                    <button onClick={() => navigate(`/application/${productId}`)} className=' cursor-pointer md:w-[30px] md:h-[30px] m-4 md:mr-10 rounded-2xl  flex items-center justify-center'><FaArrowUpRightFromSquare size={30} /></button>

                    <button onClick={() => deleteCart()} className=' cursor-pointer md:w-[30px] md:h-[30px] m-4 md:mr-10 rounded-2xl bg-red-500 text-white  flex items-center justify-center'><IoClose size={30} /></button>

                </div>

            </div>
            <div className="flex  m-4   justify-between">
                <div className=''>
                    <h2>Premium</h2>
                    <p className='font-bold'>{detail.premium}*</p>
                </div>
                <div className=''>
                    <h2>Coverage</h2>
                    <p className='font-bold text-nowrap'><span>{detail.coverage}</span></p>
                </div>
                <div className=''>
                    <h2>Tenure</h2>
                    <p className='font-bold text-nowrap'><span>2 years</span></p>
                </div>
            </div>
        </div>
    )
}

export default ItemCart;