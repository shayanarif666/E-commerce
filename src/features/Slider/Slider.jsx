import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import "./slider.css"
import sliderImg1 from "../../assets/Slider images/Slider (1).jpg"
import sliderImg2 from "../../assets/Slider images/Slider (2).jpg"
import sliderImg3 from "../../assets/Slider images/Slider (3).jpg"
import sliderImg4 from "../../assets/Slider images/Slider (4).jpg"
import sliderImg5 from "../../assets/Slider images/Slider (5).jpg"

function Slider() {
    return (
        <div className="carousel-container">
            <Carousel style={{ borderRadius: "15px" }} autoPlay={true} interval={2000} infiniteLoop={true} showArrows={true} showThumbs={false} transitionTime={1000} >
                <div className='carousel-slider-img'>
                    <img src={sliderImg3} />
                </div>
                <div className='carousel-slider-img'>
                    <img src={sliderImg1} />
                </div>
                <div className='carousel-slider-img'>
                    <img src={sliderImg2} />
                </div>
                <div className='carousel-slider-img'>
                    <img src={sliderImg4} />
                </div>
                <div className='carousel-slider-img'>
                    <img src={sliderImg5} />
                </div>
            </Carousel>
        </div>
    )
}

export default Slider
