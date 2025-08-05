import { cartContext } from "../../component/Context/CartContext";
import { wishlistContext } from "../../component/Context/WishListContex";
import React, { useContext } from 'react';

export default function WishlistPage() {
  const { wishlist , removeFromWishlist } = useContext(wishlistContext);
  const { addProductToCart } = useContext(cartContext);

  return (

    <>
      <div className="container bg-gray-100 px-10 py-10 m-20 mx-auto">
        <h2 className='text-4xl font-semibold pb-10'>My wish List</h2>

        {wishlist.length === 0 ? (<p className="text-xl text-center">No products in wishlist.</p>) : (
          wishlist.map((product) => (
            <div key={product.id} className='flex flex-col md:flex-row justify-between items-center mb-8  pb-4'>
              
              
              <div className='flex flex-col md:flex-row justify-center text-center mb-4 gap-5 items-center'>
                <img src={product.imageCover} alt={product.title} className="h-[300px] object-cover rounded" />
                <div className='space-y-3'>
                  <h2 className='text-2xl font-semibold'>{product.title.split(' ' , 2).join(' ')}</h2>
                  <h2 className='text-darkPrimary font-semibold'>EGP : {product.price}</h2>
                  <button className='bg-red-400 hover:bg-red-600 text-gray-200 py-1 px-4 rounded-md' onClick={()=>{ removeFromWishlist(product.id)} }>Remove</button>
                </div>
              </div>

              <div>
                <button
                onClick={ ()=>{addProductToCart(product._id)} } className='border border-primary rounded-md py-2 px-3 cursor-pointer text-xl hover:bg-primary hover:text-white transition'>
                  Add To Cart
                </button>
              </div>


            </div>
          ))
        )}
      </div>
    </>
  );
}
