import React from 'react';
import { useSelector } from 'react-redux';
import { IoClose } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import ItemCart from '../Components/ItemCart';
import Stepper from '../Components/Stepper';
const Cart = () => {
    const carts = useSelector(store => store.cart.Items);
    const navigate = useNavigate();
    return (
        <div className='bg-gradient-to-r from-blue-100 to-green-100 min-h-[550px] h-full pb-2'>
            <div className='   flex flex-col gap-10 items-center justify-between]'>
                
                <Stepper id={1}/>
            </div>
            <div className="flex justify-between items-center mx-4">
                <h2 className='p-5 text-2xl'>Policies</h2>
                <button onClick={() => navigate("/")} className='cursor-pointer w-[30px] h-[30px] m-4 mr-10 rounded-2xl bg-red-500 text-white  flex items-center justify-center'><IoClose size={30} /></button>
            </div>
            <div className="md:flex md:justify-between md:flex-wrap md:mx-[100px] "  >
                {carts.map((item, key) => (
                    <ItemCart key={key} data={item} />

                ))}
            </div>

        </div>
    )
}

export default Cart
