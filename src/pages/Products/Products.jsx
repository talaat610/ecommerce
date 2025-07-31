import React, { useEffect, useState } from 'react'
import ProductCard from '../../component/ProductCard/ProductCard'
import axios from 'axios';
import Loader from '../../component/ProductCard/Loader';


export default function Product() {
let [product , setProduct] = useState([])
let [error , setError] = useState(false)
let [loading , setLoading] = useState(false)
let [pagenation , setPagenation] = useState(null)

// "metadata": {
//   "currentPage": 1,
//   "numberOfPages": 2,
//   "limit": 40,
//   "nextPage": 2
// },


function handlePageChange(x){
  getAllProduct(x)
}

  async function getAllProduct(page=1){
    setLoading(true)
    try{
    let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?page=${page}`)
    setProduct(data.data)
    setPagenation(data.metadata)
    }catch(err){
    console.log(err);
    setError(true)
    }finally{
      setLoading(false)
    }
    }
    
    useEffect( ()=>{
      getAllProduct()
    }, [] )

  return (
    <>
     <div className="container py-8">
      <h2 className='font-extrabold pb-5 text-center text-3xl'>products</h2>

        {loading ? <Loader /> : error ? <h3 className='text-5xl text-red-500 text-center bg-red-300 py-20 rounded-lg max-w-[350px]  mx-auto'>THERE ARE NO PRODUCTS</h3> :
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4 ">
            {product.map((item) => (
              <ProductCard item={item} />
            ))}
          </div>}


<div className='flex justify-center items-center gap-4 my-5'>
{[...Array(pagenation?.numberOfPages)].map( (item , index)=>(
     <button onClick={ ()=>{
      handlePageChange(index+1)
     } } className='bg-primary py-3 px-4 rounded-md cursor-pointer text-white'>
      
              {index+1}   
     </button>
      
))}
</div>


      </div> 
    </>
  )
}
