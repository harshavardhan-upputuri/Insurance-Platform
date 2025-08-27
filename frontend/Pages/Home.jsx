import React, { useEffect, useState, useRef } from 'react'
import { assets, chooseus, featuresdata, GIP, home2box, motorhome } from '../Assets/assets'
import { features } from '../Assets/assets';
import './CSS/home.css';


const Home = () => {
    const [currentFeature, SetCurrentFeature] = useState(0);
    const [currentGID, setCurrentGID] = useState(0);

    const insurance = ["Health Insurance", "Motor Insurance", "Travel Insurance", "Home Insurance", "Corp Insurance"];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentGID((prev) => (prev + 1) % insurance.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [insurance.length]);


    const handleclickGID = (id) => {
        setCurrentGID(id);
    }

    const handlefeature = (id) => {
        if (id < 3) {
            SetCurrentFeature(id);
        }
    }
    const curr = featuresdata[currentFeature];
    return (
        <div className='overflow-x-auto no-scrollbar'>     
            <div className="hidden md:block  relative w-full h-[400px] mt-8 mx-auto" style={{ backgroundImage: `url(${curr.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className='mx-auto w-[50%] flex items-center gap-[20px]  '>
                    <img src={assets.guinness} alt="" className='mt-[20px]' />
                    <div className='mt-[20px] hidden md:block'>
                        <h3 className='text-[2rem] text-[#005596] font-semibold'>Care that Breaks Records!</h3>
                        <h3 className='text-[15px] font-semibold text-[#005596]'> INSURANCE COMPANY ACHIEVES A MILESTONE</h3>
                        <h3 className='text-[15px] font-semibold text-[#005596]'>For the Highest Customer Satisfaction in the Industry!</h3>
                    </div>
                </div>
                <h2 className='ml-[100px] mt-6 text-[18px]  m-10'>{curr.h3}</h2>
            </div>

            <div className="hidden md:flex  justify-between ">
                <div className='mx-[30px]    w-[65%] h-[280px] bg-white -mt-[170px] rounded-2xl shadow-xl '>
                    <section className='relative grid grid-cols-8 gap-1  '>

                        {features.map((item, id) => (
                            <div key={id} className='w-[90px] h-[100px] flex flex-col gap-1 items-center   m-6    rounded-md  cursor-pointer '>
                                <div key={id} className="absolute termlife  w-[80px] -mt-[40px] h-[80px] rounded-2xl   flex items-center justify-center shadow-xl  bg-white">
                                    <img className='  w-[80px] h-[60px]  rounded-2xl' onClick={() => handlefeature(id)} src={item.image} alt="" />
                                    <div className='mt-[150px]'>
                                        {currentFeature === id ? (
                                            <hr className="absolute  left-0 w-full border-t-2 border-[#000] mt-1" />
                                        ) : null}
                                    </div>
                                </div>
                                <div className='  w-[70px] mt-[50px]  h-6 '>
                                    {/* <p className={`${bgColors[id]} text-[#088178] text-[14px] font-bold  text-center rounded-lg`}>{item.name}</p> */}
                                    <p className='text-[14px] font-bold text-center'>{item.name}</p>

                                </div>
                            </div>
                        ))}
                    </section>
                    <div className="relative gap-4">
                        {featuresdata.map((item, id) => (
                            currentFeature === id ? (
                                <div key={id}>
                                    <div>{item.formfields}</div>
                                </div>
                            ) : null
                        ))}
                    </div>
                </div>

                {/* <div className='w-[100px] mx-auto '>
                    <h4 className='mt-2 text-[20px]'>Hii 👋</h4>
                    <img src={assets.chatbot} alt="" className='w-[100px] h-[100px]'/>
                </div> */}
            </div>
            {/* <div className="container">
                <p className="text">Insurance Policy.</p>
             
            </div> */}

            {/* <Marquee gradient={true} speed={40} pauseOnHover={true} className="flex"><p>{home2box.text}</p></Marquee> */}
            <div className="">
                <Home2boxCarousel temp={home2box} />
            </div>

            <p className="m-2 ml-[50px] md:w-[650px] mx-auto  text-sm font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-4xl"><span className="text-[#005596]">OUR GENERAL INSURANCE PLANS</span></p>

            <div className='w-[600px] mx-auto mt-[50px] mb-2'>
                <p className='md:text-[24px] font-bold text-[#005596] ml-[50px] md:ml-[100px]'>What would you like  us to insure? </p>


                <div className='flex gap-3 w-[300px] md:w-[800px] justify-between  px-4'>
                    <ul className="mt-[50px] w-[250px] md:w-[350px]  flex-nowrap pr-4 border-r-2 border-blue-400" >
                        {insurance.map((insur, index) => (
                            <li key={index} className={`  cursor-pointer float-left mt-[30px] md:mt-[40px] uppercase relative pb-[7px] border-b-2 
                                        border-[#cdcdcd] transform scale-100 origin-left transition-all duration-500 
                                        ${index === currentGID ? 'text-blue-600 font-bold border-blue-600 scale-105' : 'text-black'}`} onClick={() => handleclickGID(index)}>
                                <span className="text-[12px] md:text-[1.6rem] font-normal mb-0 pb-0 text-nowrap">{insur}</span>
                            </li>

                        ))}

                    </ul>

                    <div className="mx-auto md:w-[500px] flex flex-col items-center justify-center p-4   rounded-lg transition-all ">
                        {GIP.map((item, id) =>
                            id === currentGID ? (
                                <div key={id} className="flex flex-col items-center text-center animate-fadeIn">
                                    <img src={item.image} className="w-[400px] h-auto rounded-lg   transition-transform duration-500 hover:scale-105" alt="Insurance" />
                                    <div className="mt-4 md:text-lg md:font-semibold text-gray-800 px-4 text-left">{item.text}</div>
                                    <button className="mt-2 w-[150px] md:w-[200px] relative overflow-hidden text-white font-medium rounded-full px-6 py-2 text-[20px] bg-orange-400 transition-all duration-300 ease-in-out 
                                        before:content-[''] before:absolute before:left-0 before:top-0 before:h-full before:w-full before:bg-white 
                                        before:rounded-full before:scale-x-0 before:origin-left before:transition-transform before:duration-300 
                                        before:ease-[cubic-bezier(0.86,0,0.07,1)] hover:before:scale-x-100 hover:before:origin-left hover:text-orange-400"  >
                                        <span className="relative z-10">Explore</span>
                                    </button>

                                </div>
                            ) : null
                        )}
                    </div>


                </div>
            </div>
            <HomeFeatureBox img={assets.motormotor} type={motorhome} h1={"Motor Insurance"} h2={"Ensuring Miles of Smiles"} />

            <div className=' md:flex justify-between items-center md:p-[30px] m-[30px] bg-gradient-to-br from-green-300   to-blue-300 rounded-lg gap-4 p-4'>
                <div className="flex">
                    <img className="w-[30%] h-[30%]" src={assets.assistance} alt="" />
                    <div className='md:mt-[30px] md:ml-[70px]'>
                        <h2 className='text-black text-[22px] md:text-[48px] font-normal leading-[104%]  ml-[20px] mb-[15px] text-nowrap'>24/7 Assistance</h2>
                        <p className='hidden md:block ml-[20px]'>Get the assistance you need for all your insurance queries.<br /> We're here to help!</p>
                    </div>
                </div>
                <div>
                    <button className='rounded-[10px] bg-[#F58220] md:px-[30px] md:py-[15px] p-2  ml-[100px]  -mt-[70xp] text-white text-center text-[20px] font-bold leading-[100%] inline-block transition-all duration-300 ease-in'>connect now</button>
                </div>
            </div>

            <p className='text-[24px] font-bold text-[#000] m-[50px]'>Why Choose Us?</p>

            <ChooseUsCarousel temp={chooseus} />


        </div>
    )
}
//  overflow-x-auto snap-x snap-mandatory

export default Home

export const ChooseUsCarousel = ({ temp }) => {

    const [isDragging, setIsDragging] = useState(false);
    const [startX, setstartX] = useState(0);
    const [startScrollLeft, setstartScrollLeft] = useState(0);
    const carouselRef = useRef(null);
    const [cards, setCards] = useState(temp);


    useEffect(() => {
        if (!carouselRef.current) return;

        const cardCount = Math.floor(carouselRef.current.offsetWidth / 300);

        const cloneStart = temp.slice(0, cardCount);
        const cloneEnd = temp.slice(-cardCount);

        setCards([...cloneEnd, ...temp, ...cloneStart]);
    }, [temp]);


    const dragStart = (e) => {
        setIsDragging(true);
        //  Record the initial cursor (mouse) position on the X-axis when dragging starts
        setstartX(e.pageX);
        //Record the current scroll position of the carousel when dragging starts
        setstartScrollLeft(carouselRef.current.scrollLeft);
    }

    const dragging = (e) => {
        if (!isDragging) return;
        //updates the scroll position of the carousel based on the cursor movement
        carouselRef.current.scrollLeft = startScrollLeft - (e.pageX - startX);
    }

    const dragEnd = () => {
        setIsDragging(false);
    }

    const infiniteScroll = () => {
        //if the carousel is at the beginning scroll to the  end
        if (carouselRef.current.scrollLeft === 0) {
            carouselRef.current.scrollLeft = carouselRef.current.scrollWidth - (2 * carouselRef.current.offsetWidth);
        }
        // if the carousel is at the end, scroll to the beginning
        else if (carouselRef.current.scrollLeft === carouselRef.current.scrollWidth - carouselRef.current.offsetWidth) {
            console.log("Hiii")
            carouselRef.current.scrollLeft = (carouselRef.current.offsetWidth);

        }
    }

    return (
        <div ref={carouselRef} className={` ${isDragging ? "snap-none scroll-auto" : ""}  flex m-[30px] gap-6 overflow-auto scrollbar-hide bg-white cursor-pointer`} onMouseDown={dragStart} onMouseMove={dragging} onMouseUp={dragEnd} onMouseLeave={dragEnd} onScroll={infiniteScroll}>
            {cards.map((d, id) => (
                <div key={id} className={` ${isDragging ? " cursor-grab select-none" : ""} snap-start  scrollbar-hide bg-white flex flex-col   w-[450px] h-[400px]  mb-4    p-4    rounded-2xl shadow-2xl  `}>
                    <div className='w-[250px] h-[300px] rounded-2xl overflow-hidden ' style={{ backgroundColor: id === 5 ? "#F58220" : "" }}>
                        <img src={d.image} alt="" className='rounded-2xl w-full h-full   object-cover transition-transform duration-300 ease-in-out hover:scale-110' draggable="false" />
                    </div>
                    <div className='flex flex-col    px-4 mt-[20px] '>
                        <p className='text- font-semibold  '>{d.head}</p>
                        <p className='text-[12px] '>{d.text}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

const Home2boxCarousel = ({ temp }) => {


    const [firstVisibleIndex, setFirstVisibleIndex] = useState(0);


    const home2boximg = home2box[firstVisibleIndex % home2box.length];



    const [isDragging, setIsDragging] = useState(false);
    const [startX, setstartX] = useState(0);
    const [startScrollLeft, setstartScrollLeft] = useState(0);
    const carouselRef = useRef(null);
    const [cards, setCards] = useState(temp);


    useEffect(() => {
        const carousel = carouselRef.current;
        if (!carousel) return;

        const handleScroll = () => {
            getFirstVisibleIndex();
        };

        carousel.addEventListener("scroll", handleScroll);

        return () => {
            carousel.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => {
        if (!carouselRef.current) return;

        const cardCount = Math.floor(carouselRef.current.offsetWidth / 300);

        const cloneStart = temp.slice(0, cardCount);
        const cloneEnd = temp.slice(-cardCount);

        setCards([...temp, ...temp]);
    }, []);


    const dragStart = (e) => {
        setIsDragging(true);
        //  Record the initial cursor (mouse) position on the X-axis when dragging starts
        setstartX(e.pageX);
        //Record the current scroll position of the carousel when dragging starts
        setstartScrollLeft(carouselRef.current.scrollLeft);
    }

    const dragging = (e) => {
        if (!isDragging) return;
        //updates the scroll position of the carousel based on the cursor movement
        carouselRef.current.scrollLeft = startScrollLeft - (e.pageX - startX);
    }

    const dragEnd = () => {
        setIsDragging(false);
    }
    const getFirstVisibleIndex = () => {
        if (!carouselRef.current) return;
        const containerWidth = carouselRef.current.offsetWidth;
        const imageWidth = containerWidth / 3; // because w-1/3
        const scrollLeft = carouselRef.current.scrollLeft;
        const index = Math.floor(scrollLeft / imageWidth);
        setFirstVisibleIndex(index % home2box.length);
    };

    const infiniteScroll = () => {
        //if the carousel is at the beginning scroll to the  end
        if (carouselRef.current.scrollLeft === 0) {
            carouselRef.current.scrollLeft = carouselRef.current.scrollWidth - (2 * carouselRef.current.offsetWidth);
        }
        // if the carousel is at the end, scroll to the beginning
        else if (carouselRef.current.scrollLeft === carouselRef.current.scrollWidth - carouselRef.current.offsetWidth) {
            console.log("Hiii")
            carouselRef.current.scrollLeft = (carouselRef.current.offsetWidth);

        }
        // currenthome2 


    }
    const nextSlide = (id) => {
        if (!carouselRef.current) return;

        const containerWidth = carouselRef.current.offsetWidth;
        const imageWidth = containerWidth / 3; // w-1/3
        carouselRef.current.scrollTo({
            left: id * imageWidth,
            behavior: "smooth",
        });

        setFirstVisibleIndex(id % home2box.length);
    };

    return (
        <div className='mt-[50px]   relative    bg-gradient-to-br from-blue-000 to-blue-200 flex md:flex-row flex-col gap-2 items-center w-full' >
            <div style={{ backgroundImage: `url(${assets.circle})`, backgroundSize: 'cover', backgroundPosition: 'center' }} className="relative m-4 w-[90%] max-w-[550px] h-[90vw] max-h-[550px] flex justify-center items-center">
                <div  >
                    <img src={assets.home2entrep} alt="" className="absolute w-12 md:w-16 top-[8%] left-[10%]" />
                </div>
                <div>
                    <img src={assets.home2family} alt="" className="absolute w-12 md:w-16 top-[5%] left-[45%]" />
                </div>
                <div>
                    <img src={assets.home2farmer} alt="" className="absolute w-12 md:w-16 top-[60%] left-[0%]" />
                </div>
                <div>
                    <img src={assets.home2women} alt="" className="absolute w-12 md:w-16 top-[91%] left-[35%]" />
                </div>
                <div>
                    <img src={assets.home2senior} alt="" className="absolute w-12 md:w-16 top-[80%] left-[80%]" />
                </div>
                <div>
                    <img src={assets.home2youth} alt="" className="absolute w-12 md:w-16 top-[30%] left-[90%]" />
                </div>

                <div className="relative bg-white w-[40vw] max-w-[200px] h-[40vw] max-h-[200px] rounded-full flex items-center justify-center">
                    {/* Rotating Text */}
                    <div className="absolute animate-rotateText">
                        <svg viewBox="0 0 100 100" className="w-50 h-50" fill="black">
                            <path
                                id="circlePath"
                                d="M 10, 50 a 40,40 0 1,1 80,0 40,40 0 1,1 -80,0"
                                fill="transparent"
                            ></path>
                            <text className="text-[10px] md:text-xs font-bold">
                                <textPath href="#circlePath" startOffset="50%" textAnchor="middle">
                                    {home2boximg.text}
                                </textPath>
                            </text>
                        </svg>
                    </div>
                    {/* Center Image */}
                    <img
                        src={home2boximg.image}
                        alt=""
                        className="absolute w-[60%] max-w-[120px] h-[60%] max-h-[120px]"
                    />
                </div>


            </div>
            <div className=' m:ml-[100px]'>
                <div className='ml-[50px]'>
                    <p className="text-[22px] font-bold text-[#F58220] leading-[0.76]">#ForwardKaroCare</p>
                    <h2 className="font-normal text-[22px] text-[#454545]   my-[10px]">Insurance for All! </h2>
                    <p className=" font-normal text-[#454545] leading-[110%]">Your Peace of Mind, Our Priority</p>

                </div>
                <div className='w-[350px] md:w-[700px]  relative overflow-hidden'>
                    <div ref={carouselRef} className={` ${isDragging ? "snap-none scroll-auto" : ""}  flex m-[20px] md:m-[30px] gap-6 overflow-auto scrollbar-hide   cursor-pointer`} onMouseDown={dragStart} onMouseMove={dragging} onMouseUp={dragEnd} onMouseLeave={dragEnd} onScroll={infiniteScroll}>
                        {cards.map((d, id) => (
                            <div key={id} className={` ${isDragging ? "z-10 cursor-grab select-none" : ""} snap-start  scrollbar-hide   z-10 w-[150px] md:w-1/3 flex-shrink-0 bg-gradient-to-br from-blue-000 to-blue-100 h-[300px] text-black rounded-xl p-4 border-1 border-black ${firstVisibleIndex === id ? 'bg-gray-200' : 'bg-transparent'}  `}  >
                                <div className='  overflow-hidden rounded-t-xl  flex justify-center items-center'  >
                                    <img src={d.image} alt="" className='  w-32 h-32  object-cover transition-transform duration-300 ease-in-out hover:scale-110' draggable="false" />
                                </div>
                                <div className="flex flex-col justify-center items-center gap-4 p-4 mt-4">
                                    <p className="md:text-xl font-semibold">{d.text}</p>
                                    <p className="text-sm ">{d.p}</p>

                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="ml-[20px]">

                        <button className="w-[50px] h-[5px] rounded-l-xl bg-gray-300" onClick={() => nextSlide(0)} style={{ backgroundColor: (firstVisibleIndex % home2box.length) === 0 ? 'black' : '' }} ></button>
                        <button className="w-[50px] h-[5px] bg-gray-300" onClick={() => nextSlide(1)} style={{ backgroundColor: (firstVisibleIndex % home2box.length) === 1 ? 'black' : '' }}></button>
                        <button className="w-[50px] h-[5px] bg-gray-300" onClick={() => nextSlide(2)} style={{ backgroundColor: (firstVisibleIndex % home2box.length) === 2 ? 'black' : '' }}></button>
                        <button className="w-[50px] h-[5px] bg-gray-300" onClick={() => nextSlide(3)} style={{ backgroundColor: (firstVisibleIndex % home2box.length) === 3 ? 'black' : '' }}></button>
                        <button className="w-[50px] h-[5px] bg-gray-300" onClick={() => nextSlide(4)} style={{ backgroundColor: (firstVisibleIndex % home2box.length) === 4 ? 'black' : '' }}></button>
                        <button className="w-[50px] h-[5px] rounded-r-xl bg-gray-300" onClick={() => nextSlide(5)} style={{ backgroundColor: (firstVisibleIndex % home2box.length) === 5 ? 'black' : '' }}></button>
                    </div>


                </div>

            </div>
        </div>

    );
}

// this is for car and text moving
const HomeFeatureBox = ({ img, type, h1, h2 }) => {


    return (
        <div className='z-1 mx-auto md:mb-[100px] md:h-[800px] md:w-[1200px] bg-gradient-to-r from-blue-200 to-blue-300'>
            <h1 className='text-[35px] md:text-[80px] font-bold text-[#fff]  mt-[20px] animate-text'>{h1}</h1>

            <div className='md:w-[500px] md:h-[500px] md:-mt-[200px]'>
                <img className="w-[200px] h-[200px] md:w-full md:h-full   animate-motor" src={img} alt="" draggable="false" />
            </div>
            <h2 className='text-[20px] md:text-[42px] font-bold md:w-[500px] ml-[40px] md:mx-auto mb-[40px] '>{h2}</h2>
            <div className="w-full overflow-x-auto scrollbar-hide">
                <div className='flex gap-3 p-2 mx-4 mt-[36px]'>
                    {type.map((item, id) => (
                        <div key={id} className='p-2 w-[130px] h-[150px] md:w-[210px] md:h-[230px] -mt-[50px] bg-gradient-to-r from-white to-blue-100 rounded-3xl flex flex-col justify-between'>
                            <div>
                                <img className=" w-[50px] h-[50px]  m-4" src={item.image} alt="" draggable="false" />
                            </div>
                            <div className='flex flex-col    px-4 mb-4'>
                                <p className=' font-semibold mb-4 text-[#ff4800] '>{item.p1}</p>
                                <p className='hidden md:block md:text-[12px] '>{item.p2}</p>
                            </div>
                        </div>
                    ))}
                    <div className='w-[100px]  md:w-[210px] md:h-[230px] -mt-[50px] bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl flex flex-col justify-end p-4 mb-2 '>

                        <div className='flex flex-col text-[#fff] gap-2   px-4 mt-[20px] '>
                            <p className='md:text-[16px]  '>Explore</p>
                            <p className='text-[16px] md:text-[52px] font-bold'>More</p>
                            <p className='md:text-[16px]  '>Covers</p>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}
