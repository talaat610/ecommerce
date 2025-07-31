import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';

import image3 from '../../assets/images/slider-image-1.jpeg'
import image2 from '../../assets/images/slider-image-2.jpeg'
import image1 from '../../assets/images/slider-image-3.jpeg'
import image4 from '../../assets/images/4.jpg'


export default function HomeSlider() {
  return (
    <>
<div className="container">
    <div className="grid grid-cols-12 ">
        <div className='col-span-8 bg-amber-700 '>
        <Swiper modules={[Autoplay]} slidesPerView={1} loop={true} autoplay={{ delay: 2000, disableOnInteraction: false }} >
                <SwiperSlide>
                <img className='h-full object-cover' src={image1} alt="" />
                </SwiperSlide>
                <SwiperSlide>
                <img className='h-full object-cover w-fit' src={image2} alt="" />
                </SwiperSlide>
                <SwiperSlide>
                <img className='h-full object-cover' src={image3} alt="" />
                </SwiperSlide>
                <SwiperSlide>
                <img className='h-full object-cover' src={image4} alt="" />
                </SwiperSlide>
            </Swiper>
        </div>
        <div className='col-span-4'>
          <img src={image2} alt="" />
          <img src={image3} alt="" />
        </div>
    </div>
</div>
    </>
  )
}
