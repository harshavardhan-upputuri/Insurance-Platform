import React, { useEffect, useRef, useState } from 'react'
import { assets, items, Heropart, benefits, notbenefits, chooseus } from '../../../Assets/assets'
import { IoCartOutline } from 'react-icons/io5';
import { useNavigate, useParams } from 'react-router-dom';
import { IoCloseCircleSharp } from "react-icons/io5";
import { ChooseUsCarousel } from '../Pages/Home';
import Marquee from 'react-fast-marquee';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../State/Cart';
import { fetchProductById } from '../../State/Customer/ProductSlice';
import { addProductToWishlist } from '../../State/Customer/WishlistSlice';
import AddReviewForm from './AddReviewForm';
import ReviewList from './ReviewList ';


const SingleProduct = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const handleAddToCart = (id) => {
    //     dispatch(addToCart({ productId: id }));
    // };

    const handleAddToCart = (id) => {
        dispatch(addProductToWishlist({
            productId: id,
            jwt: localStorage.getItem("jwt")
        }));
    };





    const { id } = useParams();

    const { product } = useSelector((state) => state.product)

    useEffect(() => {

        dispatch(fetchProductById(id))

    }, [dispatch, id])

    // useEffect(() => {
    //     console.log("Product fetched: ", product);
    // }, [product]);



    const category = product?.category?.name;
    const [covered, setCovered] = useState(true);
    const [showimg, setImg] = useState(true);
    const handlevideo = (cover) => {
        setImg(cover);
    }

    const handleClick = (cover) => {
        setCovered(cover);
    }
    const steps = [
        "Visit Bajaj Allianz website",
        "Enter personal details",
        "Compare health insurance plans",
        "Select suitable coverage",
        "Check discounts & offers",
        "Add optional benefits",
        "Proceed to secure payment",
        "Receive instant policy confirmation"
    ];

    if (!product) return <p className="text-center mt-10 text-lg">Loading product...</p>;


    return (
        <>
            <div className='flex flex-col gap-2 mt-4'>
                <div className=' flex flex-col rounded-xl  ml-2 md:m-2  shadow-lg'>
                    <div className=' bg-[#5ba9cb] md:flex md:justify-between rounded-t-xl items-center  '>
                        <div className='p-2 md:p-4 flex items-center gap-4'>
                            <img className='w-[70px] h-[70px] border rounded-full' src={product.image} alt="" />
                            <p className='font-semibold md:font-bold text-[#fff] md:text-[20px]  text-[16px]'>{product.name} starting at Rs.{product.premium}*</p>
                        </div>
                        <div className='mt m-2 md:mr-4 flex items-center justify-between gap-4'>
                            <button onClick={() => handleAddToCart(id)} className="bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-400  text-white rounded-2xl w-[170px]  px-5 py-1 flex items-center justify-center gap-2" draggable="false" >   <IoCartOutline size={30} /><span>Add to Cart</span> </button>

                            <button onClick={() => navigate(`/application/${id}`)} className='bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-400  text-white rounded-2xl w-[150px] px-5 py-1 text-[20px]'>Get Quote</button>
                        </div>

                    </div>
                    <Hero Heropart={Heropart[category]} />
                </div>

                <div className='md:flex md:justify-between p-5 '>
                    <h2 className='not-italic font-bold text-[24px] text-nowrap'>Explore all our benefits</h2>
                    <div className='mt-4 md:mt-0'>
                        <button onClick={() => handleClick(true)} className={`  ${covered ? "text-white bg-[#1e6089]" : "text-black bg-[#f0f9ff]"} cursor-pointer  font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center  mb-2 transition-all duration-1000 ease-in-out`} >What's covered</button>
                        <button onClick={() => handleClick(false)} className={`${!covered ? "text-white bg-[#1e6089]" : "text-black bg-[#f0f9ff]"} cursor-pointer  font-medium rounded-r-lg text-sm px-5 py-2.5 text-center inline-flex items-center transition-all duration-1000 ease-in-out`} >What's not covered</button>

                    </div>
                </div>
                <div className=" overflow-hidden scrollbar-hide">
                    {covered ?
                        <div className="overflow-x-auto md:overflow-visible flex  md:grid md:grid-cols-3 w-[350px]  gap-[50px]  md:w-[1200px] mx-[30px] md:mx-auto h-[500px]  ">
                            {benefits.map((item, index) => (
                                <div key={index} className="  group  md:h-[200px] h-[220px] w-[290px] md:w-96 [perspective:350px]  md:[perspective:1200px]">
                                    <div className="relative h-[220px] w-[290px]  md:h-full md:w-full rounded-xl shadow-xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                                        <div className="absolute inset-0 flex flex-col   bg-[#458ECE] text-white rounded-xl p-6  [backface-visibility:hidden]">
                                            <h3 className="text-lg font-bold">{item.title}</h3>
                                            <hr className='font-[20px] m-1' />
                                            <p className=" mt-2">{item.description}</p>
                                        </div>

                                        <div className="absolute inset-0 flex flex-col  bg-[#458ECE] text-white rounded-xl p-6 [transform:rotateY(180deg)] [backface-visibility:hidden]">
                                            <h3 className="text-lg font-bold">{item.title}</h3>
                                            <hr className='font-[20px] m-1' />
                                            <p className=" mt-2">{item.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        : (
                            <div className='overflow-x-auto md:overflow-visible flex  md:grid md:grid-cols-3 gap-[50px] md:w-[1200px] mx-4 md:mx-auto h-[500px]'>
                                {notbenefits.map((item, index) => (
                                    <div key={index} className='group md:h-[200px] h-[260px] w-[320px] md:w-96 [perspective:1200px]'>
                                        <div className="relative h-[260px] w-[320px]  md:h-full md:w-full  rounded-xl shadow-xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                                            <div className="absolute inset-0 flex flex-col   bg-[#458ECE] text-white rounded-xl p-6  [backface-visibility:hidden]">
                                                <h3 className="text-lg font-bold">{item.title}</h3>
                                                <hr className='font-[20px] m-1' />
                                                <p className=" mt-2">{item.description}</p>
                                            </div>

                                            <div className="absolute inset-0 flex flex-col  bg-[#458ECE] text-white rounded-xl p-6 [transform:rotateY(180deg)] [backface-visibility:hidden]">
                                                <h3 className="text-lg font-bold">{item.title}</h3>
                                                <hr className='font-[20px] m-1' />
                                                <p className=" mt-2">{item.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                            </div>

                        )
                    }
                </div>

                <p className='text-[24px] font-bold text-[#000] mt-[-200px] ml-[60px] md:m-[50px]'>Why Choose Us?</p>

                <ChooseUsCarousel temp={chooseus} />

                <div className='md:w-[1300px] md:h-[900px] bg-gradient-to-r from-green-200 to-blue-200' >
                    <Marquee gradient={false} speed={60} pauseOnHover={true} className="flex text-[#ffffff] text-[40px] md:text-[80px] font-bold"><p>Step by Step guide</p></Marquee>
                    <div className='md:w-[1200px] md:flex md:justify-between md:h-[500px] '>
                        <>
                            <img src={assets.step} alt="" className='md:w-[500px] md:h-[400px] md:mt-[150px]' />
                        </>
                        <div className='md:w-[600px] md:h-[750px] shadow-2xl bg-white rounded-2xl gap-2 m-2'>
                            <h2 className='font-semibold md:text-[24px] m-4 p-2 md:mx-[50px]'>To help you navigate your insurance journey</h2>
                            <div className="flex gap-2 m-4 md:mx-[50px]">
                                <button className='border-2  p-2 text-black font-bold cursor-pointer rounded-full'>How to Buy</button>
                                {/* <button className='bg-blue-500 p-2 text-white font-bold cursor-pointer rounded-full'>How to Renew</button>
                                <button className='bg-blue-500 p-2 text-white font-bold cursor-pointer rounded-full'>How to Claim</button>
                                <button className='bg-blue-500 p-2 text-white font-bold cursor-pointer rounded-full'>How to Port</button> */}
                            </div>
                            <div className='md:w-[450px] md:h-[200px] mx-[25px] md:mx-[50px] rounded'>
                                {showimg ?
                                    < img onClick={() => handlevideo(false)} src={assets.vid1} />
                                    :
                                    <div className='flex'>
                                        <iframe width="450" height="200" src="https://www.youtube.com/embed/hqxTwflAlkw?si=2ixwhptWxjb7gK2g" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen style={{ border: "none" }}></iframe>
                                        <div className='ml-[-40px]' onClick={() => handlevideo(true)}>
                                            <IoCloseCircleSharp size={40} color='red' />
                                        </div>

                                    </div>
                                }
                            </div>
                            <ul className="m-4   p-2 text-lg font-medium">
                                {steps.map((step, index) => (
                                    <>
                                        <li key={index} className='flex items-center mx-2'>
                                            <span className='bg-blue-200 text-center rounded-full w-[30px] h-[30px] flex items-center justify-center mx-4 border-2 font-light'>{index}</span>
                                            <span className='text-nowrap text-[14px]'>{step}</span>
                                        </li>
                                        {index !== 7 ?
                                            <div className="w-[2px] h-[25px]  border-l-2 border-dotted border-black ml-[37px] mt-[-10px] font-light" /> : null
                                        }

                                    </>
                                ))}
                            </ul>



                        </div>
                    </div>


                </div>



            </div>
            {/* ---------- Reviews Section ---------- */}
            <div className="md:w-[1200px] mx-auto mt-10 mb-20 p-6 bg-white rounded-2xl shadow-lg">
                <h2 className="text-[24px] font-bold text-[#1e6089] mb-4">Customer Reviews</h2>

                {/* Add Review Form */}
                <AddReviewForm productId={id} />

                {/* List Reviews */}
                <ReviewList productId={id} />
            </div>

        </>

    )
}

export default SingleProduct





const Hero = ({ Heropart }) => {
    const dispatch = useDispatch();
    const { id } = useParams();

    const { product } = useSelector((state) => state.product)

    useEffect(() => {

        dispatch(fetchProductById(id))

    }, [dispatch, id])





    const category = product?.category?.name;

    const [expand, setExpand] = useState([false, false, false, false, false]);

    const toggle = (index) => {
        setExpand((prev) =>
            prev.map((item, i) => (i === index ? !item : item)) // ✅ Toggles only clicked index
        );
    };

    const [curr, setCurr] = useState(3);
    const [cards, setCards] = useState([]);

    useEffect(() => {
        const cardsprev = Heropart.slice(0, 3);
        const next = Heropart.slice(-3);
        setCards([...next, ...Heropart, ...cardsprev]);
    }, [Heropart]);

    useEffect(() => {
        const slide = setInterval(() => {
            setCurr((prev) => prev + 1);
        }, 3000);

        return () => clearInterval(slide);
    }, []);

    useEffect(() => {

        if (curr === cards.length - 3) {
            setTimeout(() => {
                setCurr(3);
            }, 500);
        } else if (curr === 0) {
            setTimeout(() => {
                setCurr(cards.length - 6);
            }, 500);
        }
    }, [curr, cards]);

    return (
        <div className="bg-gradient-to-b from-blue-100 to-white p-5 md:flex ">
            <div className="overflow-hidden w-[300px] ml-[20px] mb-4 md:w-[600px] md:h-[400px] md:ml-[50px]   ">
                {/* <h2 className="  text-xl font-bold mb-2 mt-[10px]">Health Insurance</h2> */}
                <ul
                    className="flex transition-transform duration-500 ease-in-out mt-[20px]"
                    style={{
                        transform: `translateX(-${curr * 100}%)`,
                        transition: curr === 3 || curr === cards.length - 6 ? "none" : "transform 0.5s ease-in-out"
                    }}
                >
                    {cards.map((item, index) => (
                        <li key={index} className="w-[300px] md:w-[600px] flex-shrink-0">
                            <div>
                                <img src={item.image} alt="" className="w-[150px] h-[100px] md:w-[400px] md:h-[300px] mx-auto" />
                            </div>
                            <p className="text-center mt-2 text-sm md:text-normal">{item.p}</p>
                        </li>
                    ))}
                </ul>
            </div>

            <div className='w-[310px] md:ml-[150px] md:w-[400px] h-full shadow-2xl bg-white rounded-2xl p-2'>
                <p className='font-bold text-[18px] md:text-[22px] text-center mt-[10px]'>Product HighLights</p>
                <ul className="flex flex-col m-4 gap-[25px]">
                    {[
                        { title: "Comprehensive Coverage", text: `Medical expenses coverage up to ${product.coverage}` },
                        { title: "Enhanced Protection", text: product.desc1 },
                        { title: "Flexible Benefits", text: product.desc2 },
                        { title: "Extra Security", text: product.desc3 },
                        { title: "Exclusive Offer", text: "Exclusively for Bajaj Finance customers only" }
                    ].map((item, index) => (
                        <li key={index} className='flex flex-col w-[250px] md:w-[350px] mx-auto text-[16px] md:text-[20px] '>
                            <span className="font-semibold flex justify-between items-center cursor-pointer " onClick={() => toggle(index)}>
                                <span>{item.title}</span>
                                <span className="ml-2 text-blue-500">{expand[index] ? "˅" : "^"}</span>
                            </span>
                            {expand[index] && <span className='text-gray-600 mt-1'>{item.text}</span>}

                            <hr className='mt-2  border-b border-dotted border-gray-400' />
                        </li>


                    ))}
                </ul>
            </div>
        </div>
    );
};


