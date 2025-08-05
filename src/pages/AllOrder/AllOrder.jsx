import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Loader from '../../component/ProductCard/Loader';
 
export default function AllOrder() {
    const [orders, setOrders] = useState(null)


    async function getAllOrders(){
        const userId = localStorage.getItem('userId')
        try{
    let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`)

    setOrders(data)
    console.log(data);
    
        }catch(err){
            console.log(err);   
        }
    }
    useEffect( ()=>{
        getAllOrders()
     } ,[])


  return(
<>
<div className="container">

{ orders == null ? <Loader/> : 
 orders.map( (order)=> 
  <div key={order.id} className='border-2 border-gray-500/30 bg-mainLight p-10 my-10'>

 <div className='flex flex-col gap-5 md:flex-row justify-between'>

 <div>
     <h3 className='text-slate-200 py-1  px-2 rounded-md text-l bg-primary'>Order Id : #{order.id}</h3>
 </div>

 <div className='flex justify-center items-start'>
 <h2 className='text-slate-200 py-1  px-2 rounded-md text-l bg-primary text-center'>Total Price : {order.totalOrderPrice}</h2>
</div>

 <div className='flex justify-end flex-col items-center'>
 <button className='py-1 px-2 rounded-md bg-primary mx-4 text-slate-100'>
    {order.isDelivered ? 'DELIVERED' : 'NOT DELIVERED'}
 </button>
 <button className={`py-1 px-2 rounded-md text-slate-100 ${order.isPaid ? 'bg-primary' :' bg-red-500' }`}>
    {order.isPaid == false ? 'NOT PAID' : 'PAID' }
 </button>
 </div>
 
 </div>
 

 <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 my-4 gap-4'>
    {order.cartItems.map( (product)=> 
 <div key={product.product.id} className='border-2 border-gray-500/30 '>
 
 <img className='w-full' src={product.product.imageCover} alt="" />
 
 <div className=' space-y-3 p-4 bg-gray-400/30'>
     <div>
<h2 className='text-lg font-semibold line-clamp-1'>{product.product.title}</h2>
 <h3 className='font-semibold text-primary'>{product.product.category.name}</h3>
     </div>
 <div className='flex justify-between'>
 <h3 className=''>EGP : {product.price}</h3>
 <h3 className=''>count : {product.count}</h3>
 </div>
 
 </div>
 
 </div>
 
) }
 </div> 

 </div> 
  )}








</div>

</>
  ) 
}