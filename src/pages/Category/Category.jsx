import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import Loader from '../../component/ProductCard/Loader';

export default function Category() {

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['hambozo'],
    queryFn: () => axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
  });

  if (isLoading) return <h2 className="text-center text-xl"><Loader/></h2>
  if (isError) return <h2 className="text-center text-xl text-red-500">Error: {error.message}</h2>

  return (
    <div className="container py-8">
      <h2 className='font-extrabold pb-5 text-center text-3xl'>Categories</h2>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-10'>
        {
          data?.data.data.map((category) => (
            <div 
              key={category._id} 
              className="w-full bg-white p-4 mt-6 rounded-lg overflow-hidden text-center cursor-pointer hover:shadow-md hover:shadow-primary transition duration-500"
            >
              <img 
                className='w-full object-cover rounded-md' 
                src={category.image} 
                alt={category.name} 
              />
              <h3 className='mt-3 text-darkPrimary text-xl sm:text-2xl font-semibold'>
                {category.name}
              </h3>
            </div>
          ))
        }
      </div>
    </div>
  );
}
