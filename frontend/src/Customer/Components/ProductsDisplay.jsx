import React from 'react'
import { FaRegBookmark } from "react-icons/fa6"
import { GoStarFill } from 'react-icons/go'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addToCart } from '../../State/Cart'
import { addProductToWishlist } from '../../State/Customer/WishlistSlice'

const ProductsDisplay = ({ product, id }) => {
  const carts = useSelector((store) => store.cart.Items)
  const { wishlists, loading, error } = useSelector((store) => store.wishlist)

  const dispatch = useDispatch()

  const handleAddToCart = () => {
    dispatch(
      addProductToWishlist({
        productId: product.id,
        jwt: localStorage.getItem("jwt")
      })
    )
  }
  const navigate = useNavigate()

  // const handleAddToCart = () => {
  //   dispatch(
  //     addToCart({
  //       productId: product.id,
  //       quantity: 1,
  //     })
  //   )
  // }

  // Safely handle missing fields

  const averageRating =
    product.review && product.review.length > 0
      ? product.review.reduce((sum, r) => sum + (r.rating || 0), 0) /
      product.review.length
      : 0;

  const ratingStars = Math.floor(averageRating);

  const desc1 = product.desc1 || {}
  const desc2 = product.desc2 || {}
  const desc3 = product.desc3 || {}
  const type = product.type || ""
  const premium = product.premium || "N/A"
  const coverage = product.coverage || "N/A"
  const subName = product.subName || ""

  return (
    <div>
      <div
        key={id}
        className="w-[290px] ml-2 md:ml-[40px] md:w-[400px] md:h-[480px] bg-white rounded-xl border"
      >
        {/* Image + Heading */}
        <div className="gap-8">
          <div className="flex gap-4 m-3">
            <img
              className="w-[70px] h-[70px] border rounded-full"
              src={product.image}
              alt={product.name}
            />
            <div className="flex flex-col gap-2">
              <h2 className="font-bold text-[16px]">
                {product.name} <br /> {product.head || ""}
              </h2>
              {subName && <p className="hidden md:block text-[12px]">{subName}</p>}
              {type && (
                <p className="hidden md:block bg-pink-400 items-center w-[75px] text-[10px] rounded-xl px-4 py-1">
                  {type}
                </p>
              )}
            </div>

            <div
              className="ml-[40px] -mt-[50px] flex items-center cursor-pointer"
              onClick={handleAddToCart}
            >
              <FaRegBookmark />
            </div>
          </div>

          {/* Rating + Premium + Coverage */}
          <div className="m-4 flex items-center justify-between">
            <div className="ml-[15px] flex items-center text-nowrap">
              <span>Rating :</span>
              <div className="md:ml-4 flex gap-2 items-center">
                {Array.from({ length: ratingStars }).map((_, i) => (
                  <GoStarFill key={i} color="gold" />
                ))}
                <span className="ml-2 text-sm text-gray-600">
                  ({averageRating.toFixed(1)})
                </span>
              </div>
            </div>



            <div className="flex ml-4 md:ml-2 gap-2 flex-col justify-center">
              <div>
                <h2>Premium</h2>
                <p className="font-bold">{premium}*</p>
              </div>
              <div>
                <h2>Coverage</h2>
                <p className="font-bold text-nowrap">{coverage}</p>
              </div>
            </div>
          </div>
        </div>

        <hr className="mx-4 text-gray-300" />

        {/* Description */}
        <div className="flex flex-col gap-4 m-4">
          {desc1 && (
            <p className="flex items-center">
              <span className="bg-blue-500 block mr-2 w-2 h-0.5"></span>
              {desc1}
            </p>
          )}
          {desc2 && (
            <p className="flex items-center">
              <span className="bg-blue-500 block mr-2 w-2 h-0.5"></span>
              {desc2}
            </p>
          )}
          {desc3 && (
            <p className="hidden md:flex items-center">
              <span className="bg-blue-500 block mr-2 w-2 h-0.5"></span>
              {desc3}
            </p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex">
          <button
            className="m-4 md:w-[180px] relative overflow-hidden text-white font-medium rounded-full px-3 py-1 md:px-6 md:py-2 md:text-[20px] bg-orange-400 transition-all duration-300 ease-in-out
                     hover:text-orange-400 before:absolute before:inset-0 before:bg-white before:rounded-full before:scale-x-0 
                     before:origin-left before:transition-transform before:duration-300 hover:before:scale-x-100"
            onClick={() => navigate(`/singleproduct/${product.id}`)}
          >
            <span className="relative z-10">Know more</span>
          </button>

          <button
            onClick={() => navigate(`/application/${product.id}`)}
            className="m-4 md:w-[180px] relative overflow-hidden text-white font-medium rounded-full px-3 py-1 md:px-6 md:py-2 md:text-[20px] bg-orange-400 transition-all duration-300 ease-in-out
                        hover:text-orange-400 before:absolute before:inset-0 before:bg-white before:rounded-full before:scale-x-0
                        before:origin-left before:transition-transform before:duration-300 hover:before:scale-x-100"
          >
            <span className="relative z-10">Get Quote</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductsDisplay
