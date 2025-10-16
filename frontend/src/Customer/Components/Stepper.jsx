import React, { useState } from 'react'
import { TiTick } from "react-icons/ti";


const Stepper = ({ id }) => {
    const steps = ["Cart", "Application form", "Approval", "Payment", "Policy Holder"];
    const [currentStep, setCurrentStep] = useState(id);

    return (
        <>
            <div className='flex justify-between m-4'>
                {steps?.map((step, i) => (

                    <div key={i} className={`relative flex       `}>
                        <div  className={`relative flex  flex-col  w-[50px] items-center justify-center mx-[-10px]  `}>
                            <div className={`w-10 h-10 flex items-center justify-center z-10 relative  rounded-full font-semibold text-white   ${i + 1 < id ? "bg-green-600" : ""} ${i+1 ===id ? "bg-sky-500" : ""} ${i+1 > id ? "bg-slate-500" : ""}`}>{(i + 1 < id) ? <TiTick size={24} /> : i + 1}</div>
                            <p className='text-gray-500 text-[9px] md:text-[16px] text-nowrap'>{step}</p>

                        </div>
                        <hr className={`${(i + 1 < 5) &&  'border-t border-black w-[30px] md:w-[120px] mt-[20px]' }` }/>

                    </div>
                ))}
            </div>
            {/* {
                !complete &&<button onClick={()=>{currentStep===steps.length? setComplete(true):  setCurrentStep((prev) => prev+1)}} className='bg-gray-800 hover:bg-gray-700 text-gray-100 font-medium px-7 py-1 '> {currentStep===steps.length ? 'Finish' : 'Next' } </button>

            } */}
        </>
    )
}

export default Stepper