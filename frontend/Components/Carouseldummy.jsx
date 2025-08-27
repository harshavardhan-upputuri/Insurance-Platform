import React, { useEffect, useState,useRef } from 'react'
import { assets, chooseus, featuresdata, GIP, home2box } from '../Assets/assets'

import './CSS/Carousel.css'
const Carousel = () => {
    // Carousel 
        const [isDragging, setIsDragging] = useState(false);
        const [startX, setstartX] = useState(0);
        const [startScrollLeft, setstartScrollLeft] = useState(0);
        
        const carouselRef = useRef(null);
    
        const [cards, setCards] = useState(chooseus);
    
        useEffect(() => {
            const cardCount = Math.floor(carouselRef.current.offsetWidth / 300);
    
            const clonedStart = chooseus.slice(0,cardCount);
            const clonedEnd = chooseus.slice(-cardCount);
    
            setCards([...clonedEnd,...chooseus,...clonedStart]);
    
        },[chooseus])
    
    
        const dragStart = (e) => {
            setIsDragging(true);
            //Records the initial cursor and scroll position of the carousel
            setstartX(e.pageX);
            setstartScrollLeft(carouselRef.current.scrollLeft);
    
        };
    
        const dragging = (e) => {
            if (!isDragging) return;
            // updates the scroll position of the carousel based on the cursor movement
            carouselRef.current.scrollLeft= startScrollLeft - (e.pageX -startX);
        };
    
        const dragEnd = () => {
            setIsDragging(false);
        };
    
        const infiniteScroll  = () =>{
            // If the carousel is at the beginniing , scroll to the end
            if(carouselRef.current.scrollLeft === 0){
                 carouselRef.current.scrollLeft= carouselRef.current.scrollWidth - (2 * carouselRef.current.offsetWidth);
            }
            //if the carousel is at the end, scroll to the beginning 
            else if(carouselRef.current.scrollLeft === carouselRef.current.scrollWidth - carouselRef.current.offsetWidth){
                carouselRef.current.scrollLeft=   ( carouselRef.current.offsetWidth);
                
            }
        }

    return (
        <div className="body">
            <div className='wrapper'>
         

                <ul className={`carousel ${isDragging ? "dragging" : ""} scrollbar-hide`} ref={carouselRef} onMouseMove={dragging} onMouseDown={dragStart} onMouseUp={dragEnd} onMouseLeave={dragEnd} onScroll={infiniteScroll}>
                    {cards.map((d, id) => (
                        <li key={id} className='card  '>
                            <div className='img'>
                                <img src={d.image} alt="" className='rounded-2xl w-full h-full   object-cover transition-transform duration-300 ease-in-out hover:scale-110' draggable="false" />
                            </div>
                            <div className='flex flex-col    px-4 mt-[20px] '>
                                <p className='text- font-semibold  '>{d.head}</p>
                                <p className='text-[12px] '>{d.text}</p>
                            </div>
                        </li>
                    ))}

                </ul>
                

            </div>
        </div>
    )
}

export default Carousel


