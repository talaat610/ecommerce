import { useContext, useEffect, useState } from "react";
import { cartContext } from "../Context/CartContext";

export default function CartItem({item}) {
   
const {removeCartItem , updateCartItem , disablebtn} = useContext(cartContext)
const [count, setCount] = useState(item?.count);

useEffect( ()=>{
 if(count == item?.count){
  return
 }
 updateCartItem(count , item.product._id)
} ,[count])
  return (
    <>
<div className='my-10  '>

<div className='flex justify-between px-3 bg-gray-100 mb-5 rounded-md '>

<div className='p-5 flex  items-centeer  gap-5'>
  <div><img src={item?.product.imageCover} className='h-[200px] w-[200px] object-cover' alt="" /></div>
  <div><h2 className='font-semibold text-2xl line-clamp-1'>{item?.product.title}</h2><h5>{item?.product.category?.name}</h5></div>
</div>

<div className='p-2 flex justify-center items-center gap-2 '>
<button
  disabled={disablebtn}
  onClick={() => {
    const newCount = count - 1;
    setCount(newCount);
    updateCartItem(newCount, item.product._id);
  }}
  className="text-4xl bg-green-100 hover:bg-green-200 cursor-pointer px-1 rounded-md"> - </button>

<input onChange={ (e)=>{ setCount(e.target.value)} } type="number" value={count} min={1} 
 className="h-8 w-20 border text-center text-sm outline-none" />


<button disabled={disablebtn} onClick={() => {const newCount = count + 1; setCount(newCount);
    updateCartItem(newCount, item.product._id);
  }}
  className="text-4xl bg-green-100 hover:bg-green-200 cursor-pointer px-1 rounded-md"> + </button>




<p className='bg-primary rounded-md p-1 w-24'>EG : {item?.price * item?.count}</p>
</div>
  
<div className='pt-5 '>
<button onClick={ ()=>{removeCartItem(item.product._id)} } className="flex justify-center items-center hover:text-slate-200 bg-red-300 hover:bg-red-500  p-1 rounded-md">
<div>Delete </div>
 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
  className="size-8  ">
 <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
 </svg>
</button>
</div>


</div>
</div> 
    </>
  )
}
