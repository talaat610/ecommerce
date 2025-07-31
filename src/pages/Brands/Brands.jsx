import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import Loader from '../../component/ProductCard/Loader';


export default function brands (){

const {data ,isLoading, isError, error} = useQuery({
  queryKey:['hamada'],
  queryFn: ()=> axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
});
console.log(data);





if (isLoading) return <h2 className="text-center text-xl"><Loader/></h2>
if (isError) return <h2 className="text-center text-xl text-red-500">Error: {error.message}</h2>
  return (
    <>
     <div className="container">
     <h2 className='font-extrabold pb-5 my-5 text-center text-3xl'>Brands</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:grid-cols-4 mb-10">
            {data?.data.data.map( (prandItem)=> (
                <div className='hover:shadow-primary hover:shadow-md hover:duration-500 rounded-lg border border-slate-300 '>
              <div>
               <img src={prandItem.image} className='w-full' alt="" />
               <h3 className='text-2xl text-center py-3'>{prandItem.name}</h3>
              </div>
               </div>
            )  )}
    

      </div>
     </div>
    </>
  )
}
