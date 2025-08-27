import React from 'react'
import { CiCirclePlus } from "react-icons/ci";
import { items } from '../../Assets/assets';
import { useNavigate } from 'react-router-dom';
import { IoIosRemoveCircleOutline } from "react-icons/io";

const AgentProduct = () => {
    const navigate = useNavigate();
    return (
        <div className='w-full h-full m-4'>
            <div className='flex items-center gap-4 md:ml-[100px] m-4 cursor-pointer' onClick={()=>navigate("/agent/addproducts")}>
                <CiCirclePlus size={50} />
                <h2 className='text-[20px]'>Want to add to new Product</h2>
            </div>

            <h2 className='text-[20px] md:ml-[100px] m-4'>List Of Products</h2>


            {items.map((item, id) => (
                <>
                    <div className=' bg-[#5ba9cb] md:flex md:justify-between rounded-t-xl items-center w-[330px] md:w-[1100px] md:mx-auto m-4 p-2'>
                        <div className='p-2 md:p-4 flex items-center gap-4 cursor-pointer' onClick={()=>navigate(`/singleproduct/${id}`)}>
                            <img className='w-[35px] h-[35px] md:w-[70px] md:h-[70px] border rounded-full' src={item.image} alt="" />
                            <p className='font-semibold md:font-bold text-[#fff] md:text-[20px]  text-[16px]'>{item.name} starting at Rs.{item.premium}*</p>
                        </div>
                        <div className='mt m-2 md:mr-4 flex items-center justify-between gap-4 cursor-pointer'>
                            <IoIosRemoveCircleOutline size={50}/>
                        </div>

                    </div>
                </>
            ))}

        </div>
    )
}

export default AgentProduct
