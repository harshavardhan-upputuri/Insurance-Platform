import React from 'react'
import FileUpload from '../../Components/FileUpload'

const AgentAddProducts = () => {
    return (
        <div className='m-4'>

            <div className="w-[300px] md:w-[800px]  h-full mx-auto  ">
                <h2 className='text-[20px] md:ml-[350px] md:m-8 m-4 ml-[50px]'>Add new  Product</h2>

                <form action="" className='flex flex-col gap-4 w-[600px] mx-auto'>
                    {/* ID */}
                    <div className="md:w-[600px] w-[280px] flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                        <label htmlFor="productid" className="md:w-[250px] text-nowrap block mb-2 text-sm font-medium text-gray-900 dark:text-white md:text-[22px]">Product Id:</label>
                        <input type="number" id="productid" className="bg-gray-50    text-gray-900 text-sm rounded-lg   block w-full p-2.5  border-1 " placeholder="32" required />
                    </div>
                    {/* Category */}
                    <div className="md:w-[600px] w-[280px] flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                        <label htmlFor="category" className="md:w-[250px] text-nowrap block mb-2 text-sm font-medium text-gray-900 dark:text-white md:text-[22px]">Type of Category:</label>
                        <input type="text" id="category" className="bg-gray-50    text-gray-900 text-sm rounded-lg   block w-full p-2.5  border-1 " placeholder="Bike / Car" required />
                    </div>

                    {/* Iamge */}
                    <div className="md:w-[600px] w-[280px] flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                        <label htmlFor="image" className="md:w-[250px] text-nowrap block mb-2 text-sm font-medium text-gray-900 dark:text-white md:text-[22px]">Upload Image:</label>
                        <FileUpload name={"product icon"} />
                    </div>

                    {/* Name*/}
                    <div className="md:w-[600px] w-[280px] flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                        <label htmlFor="name" className="md:w-[250px] text-nowrap block mb-2 text-sm font-medium text-gray-900 dark:text-white md:text-[22px]">Name of Product:</label>
                        <input type="text" id="name" className="bg-gray-50    text-gray-900 text-sm rounded-lg   block w-full p-2.5  border-1 " placeholder="HDFC Life Click 2 Protect" required />
                    </div>

                    {/* Plan Title or head*/}
                    <div className="md:w-[600px] w-[280px] flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                        <label htmlFor="head" className="md:w-[250px] text-nowrap text-sm font-medium text-gray-900 dark:text-white md:text-[18px]">Plan Title:</label>
                        <input type="text" id="head" placeholder="Term Life Plan" required
                            className="bg-gray-50 text-gray-900 text-sm rounded-lg w-full p-2.5 border border-gray-300" />
                    </div>

                    {/* Sub Name */}
                    <div className="md:w-[600px] w-[280px] flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                        <label htmlFor="sub_name" className="md:w-[250px] text-nowrap text-sm font-medium text-gray-900 dark:text-white md:text-[18px]">Company Name:</label>
                        <input type="text" id="sub_name" placeholder="HDFC Life Insurance" required
                            className="bg-gray-50 text-gray-900 text-sm rounded-lg w-full p-2.5 border border-gray-300" />
                    </div>

                    {/* Type */}
                    <div className="md:w-[600px] w-[280px] flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                        <label htmlFor="type" className="md:w-[250px] text-nowrap text-sm font-medium text-gray-900 dark:text-white md:text-[18px]">Policy Type:</label>
                        <input type="text" id="type" placeholder="Individual" required
                            className="bg-gray-50 text-gray-900 text-sm rounded-lg w-full p-2.5 border border-gray-300" />
                    </div>

                    {/* Premium */}
                    <div className="md:w-[600px] w-[280px] flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                        <label htmlFor="premium" className="md:w-[250px] text-nowrap text-sm font-medium text-gray-900 dark:text-white md:text-[18px]">Premium (₹):</label>
                        <input type="number" id="premium" placeholder="4500" required
                            className="bg-gray-50 text-gray-900 text-sm rounded-lg w-full p-2.5 border border-gray-300" />
                    </div>

                    {/* Coverage */}
                    <div className="md:w-[600px] w-[280px] flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                        <label htmlFor="coverage" className="md:w-[250px] text-nowrap text-sm font-medium text-gray-900 dark:text-white md:text-[18px]">Coverage:</label>
                        <input type="text" id="coverage" placeholder="₹ 1 Crore*" required
                            className="bg-gray-50 text-gray-900 text-sm rounded-lg w-full p-2.5 border border-gray-300" />
                    </div>

                    {/* Descriptions */}
                    <div className="md:w-[600px] w-[280px] flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-900 dark:text-white md:text-[18px]">Descriptions:</label>

                        <input type="text" id="desc1" placeholder="Offers life cover with critical illness rider." required
                            className="bg-gray-50 text-gray-900 text-sm rounded-lg w-full p-2.5 border border-gray-300" />

                        <input type="text" id="desc2" placeholder="Flexible payout options with lump sum" required
                            className="bg-gray-50 text-gray-900 text-sm rounded-lg w-full p-2.5 border border-gray-300" />

                        <input type="text" id="desc3" placeholder="Accidental death benefit for added protection." required
                            className="bg-gray-50 text-gray-900 text-sm rounded-lg w-full p-2.5 border border-gray-300" />
                    </div>

                    {/* Rating */}
                    <div className="md:w-[600px] w-[280px] flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                        <label htmlFor="rating" className="md:w-[250px] text-nowrap text-sm font-medium text-gray-900 dark:text-white md:text-[18px]">Rating:</label>
                        <input type="number" id="rating" placeholder="4" min="1" max="5" step="0.5" required
                            className="bg-gray-50 text-gray-900 text-sm rounded-lg w-full p-2.5 border border-gray-300" />
                    </div>
                    {/* Submit */}
                    <div className="md:w-[600px] w-[280px]   gap-2 ml-[100px] md:ml-[250px] m-4">
                         
                        <button type="submit" className="  bg-gradient-to-r    from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white rounded-2xl px-5 py-1 text-[20px]">Submit</button>
                    </div>

                </form>
            </div>

        </div>
    )
}

export default AgentAddProducts
