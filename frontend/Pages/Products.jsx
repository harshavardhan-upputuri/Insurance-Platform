import { div } from 'framer-motion/client';
import React, { useState } from 'react'
import ProductsDisplay from '../Components/ProductsDisplay';
import { assets, items } from '../Assets/assets';



const Products = () => {
  const [filter, setFilter] = useState(false);

  const [selected, setSelected] = useState(null);
  const [rangeValue, setRangeValue] = useState(0);
  const [sortby, setSortby] = useState("");
  const [selectedCategories, setSelectedCategories] = useState(items);
  const checkboxes = [
    { id: "selectall", name: "Select All" },
    { id: "termlife", name: "Term life" },
    { id: "health", name: "Health" },
    { id: "car", name: "Car" },
    { id: "bike", name: "Bike" },
    { id: "family", name: "Family" },
    { id: "travel", name: "Travel" },
    { id: "home", name: "Home" },
    { id: "Corp", name: "Corporate Insurance" },
  ];

  const handlefilter=()=>{
    setFilter((prev)=>(!prev));
  }

  const handleCategoryChange = (category) => {
    setSelected(category);
    if (category === "selectall") {
      setSelectedCategories(items);
    } else {
      const result = items.filter((currData) => currData.category === category);
      setSelectedCategories(result);
    }
  }

  // for price 
  const handleChange = (e) => {
    setSelected(null);
    setRangeValue(e.target.value)
  }
  const applyfilter = () => {
    if (rangeValue === '0') {
      setSelectedCategories(items);
    } else {
      const result = items.filter((currData) => parseInt(currData.premium, 10) < rangeValue);
      setSelectedCategories(result);
    }
  }
  // clear filter
  const clearfilter = () => {
    setSelected(null);
    setRangeValue(0);
    setSelectedCategories(items);
  }
  // for sorting
  const handleSelectChange = (e) => {
    const sort = e.target.value;
    setSortby(sort);
    let sortedData = [...selectedCategories];
    if (sort === "A-Z") {
      sortedData.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === "Z-A") {
      sortedData.sort((a, b) => b.name.localeCompare(a.name));
    }
    setSelectedCategories(sortedData);
  }
  return (
    <div className='bg-[#e1e9f9] md:w-[1300px] h-full p-4'>
      <div onClick={() => handlefilter()} className="mb-2 md:hidden flex gap-[20px] bg-white w-[150px] p-2 rounded-full items-center justify-center">
        <img className='w-[20px] h-[20px] ' src={assets.filtericon} alt="" />
        <p>Filters</p>
      </div>
      <div className=' flex md:justify-between '>


        {/* Side bar left side */}
        <div className={`${filter ? '' :'hidden'}  md:block w-[300px] h-full bg-white shadow-2xl rounded m-4 p-2`}>
          <div className="flex justify-between p-4">
            <h3 className='font-bold text-xl'>Filter</h3>
            <button className='font-semibold text-lg text-orange-300 cursor-pointer' onClick={() => { clearfilter() }}>Clear Filters</button>
          </div>
          <hr className='mx-4 my-2' />
          <div className="flex items-center  mx-4  gap-8 ">
            <p>Price</p>
            <input onChange={handleChange} value={rangeValue} name="range" id='price' placeholder='0' className='w-[80px] h-[35px] mt-2 rounded-md items-center px-2 border-2 border-[#c3cbdf]' />
            <button onClick={() => applyfilter()} className='mt-2 cursor-pointer bg-orange-400 py-1.5 text-[white] rounded-full w-[200px]'>apply</button>
          </div>
          <div className="m-4 ">
            <input type="range" min={0} max={100000} step={5000} onChange={handleChange} value={rangeValue} className='w-full h-2 bg-gray-200 rounded-lg cursor-pointer dark:bg-gray-700 appearance-none' />

          </div>
          <hr className='mx-4 my-2' />
          <div className='m-4'>
            <h3 className='font-bold text-xl mb-2'>Category</h3>

            {checkboxes.map((checkbox) => (
              <div key={checkbox.id} className='flex items-center gap-1 mb-4'>
                <input type="checkbox" id={checkbox.id} name={checkbox.name}
                  checked={selected == checkbox.id} onChange={() => handleCategoryChange(checkbox.id)}
                  className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded' />
                <label className='ms-2 text-sm font-medium cursor-pointer'>{checkbox.name}</label>
              </div>
            ))}

          </div>
          <hr className='mx-4 my-2' />

        </div>

        {/* Right side products */}
        <div className={`${!filter ? '' :'hidden'} md:w-[1000px] h-full bg-white shadow-2xl rounded   md:m-6 p-2`}>
          {/* right head */}
          <div className='flex justify-between m-4'>
            <p>Results</p>
            <form >
              <select name="sortby" id="sortby" onChange={handleSelectChange} value={sortby} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-1 pr-4  w-[200px]'>
                <option value="">Sort By</option>
                <option value="A-Z">Sort By A-Z</option>
                <option value="Z-A">Sort By Z-A</option>
              </select>
            </form>
          </div>

          <div className='grid  md:grid-cols-2 gap-4 mr-[20px]'>
            {selectedCategories.length > 0 ? selectedCategories.map((item, id) => (
              <ProductsDisplay key={item.id} product={item} id={item.id} />
            )) : <p>No products available</p>}
          </div>
          {/* <ProductsDisplay   /> */}

        </div>
      </div>
    </div>

  )
}

export default Products
