import axios from 'axios'
import { Swiper, SwiperSlide , } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import React, { useEffect, useState } from 'react'
import Loader from '../ProductCard/Loader';

export default function CategorySlider() {
  const [category , setCategory] = useState(null)

 async function getAllCategorySlider(){
   const options = {
   url:`https://ecommerce.routemisr.com/api/v1/categories`,
   method:'get',   
    }
   const {data} = await axios.request(options);
   setCategory(data.data)

   
}

useEffect( ()=>{getAllCategorySlider()} , [] )

  return (
    <>
{category ? <Swiper
  modules={[Autoplay]}
  slidesPerView={6}
  loop={true}
  autoplay={{
    delay: 0,
    disableOnInteraction: true 
  }}speed={10000}
>
    {category.map(  (category)=> <SwiperSlide key={category._id}>
        <img className='h-64 object-cover mx-3' src={category.image} alt="" />
        <h2 className='text-center'>{category.name}</h2>
    </SwiperSlide>)}
</Swiper>: <Loader/>}
    </>
  )
}
