import React, { useState } from 'react'
import SellerAccountForm from './SellerAccountForm';
import SellerLoginForm from './SellerLoginForm';

const BecomeSeller = () => {
  const [isLogin, setIsLogin] = useState(false);

  const handleIsShowPage = () => {
    setIsLogin(!isLogin);
  }
  return (
    <div className='grid grid-cols-3 min-h-screen md-gap-10'>
      <div className="lg:col-span-1 md:col-span-2 col-span-3 p-10 shadow-md ">
        {!isLogin ? <SellerAccountForm /> : <SellerLoginForm />}

        <div className="space-y-2 mt-10">
          <h1 className="text-center font-medium text-sm">have Account</h1>
          <button onClick={() => handleIsShowPage()} className="cursor-pointer text-xl text-center border-1 border-green-500 text-green-600 w-[100%] p-2">
            {isLogin ? "REGISTER" : "LOGIN"}
          </button>
        </div>
      </div>
      <div className="hidden md:col-span-1 lg:col-span-2 md:flex justify-center items-center">

        <div className="lg:w-[70%] px-5 space-y-10 ">
          <div className="space-y-2 font-bold text-center ">
            <p className="text-2xl">Join the marketPlace Revolution</p>
            <p className="text-lg text-green-300">Boost your sales today</p>
          </div>
          <img src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSnzt00klgwuGFTHDK3CX6sLjFTb-6zCo2_9gMU4OarrjYFUjzD" alt="" />

        </div>
      </div>
    </div>
  )
}

export default BecomeSeller
