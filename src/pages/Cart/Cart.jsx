import { useContext, useEffect } from 'react'
import { cartContext } from '../../component/Context/CartContext'
import CartItem from '../../component/CartItem/CartItem'
import CheckOut from '../../component/checkOut/checkOut';

export default function Cart() {

  const { cart, getLoggUserCart, clearCart } = useContext(cartContext);

  useEffect(() => {
    getLoggUserCart();
  }, []);

  return (
    <>
      <div className="container px-4 py-6 space-y-8">

      
        <div className="grid grid-cols-12 gap-6">

         
          <div className="col-span-12 xl:col-span-6 space-y-6">
            {cart?.data?.products.map((item) => (
              <CartItem key={item._id} item={item} />
            ))}
          </div>

         
          <div className="col-span-12 xl:col-span-6 bg-slate-100 rounded-lg p-5 my-10 space-y-5">
            <CheckOut totalPrice={cart?.data?.totalCartPrice} />

            <button className="bg-primary hover:bg-green-600 p-2 rounded-md text-white w-full">
              Check Out
            </button>
          </div>

        </div>

      
        <div className="w-full text-center">
          <button 
            onClick={clearCart}
            className="bg-red-500 hover:bg-red-700 px-8 py-2 text-white rounded-md"
          >
            Clear All Products
          </button>
        </div>

      </div>
    </>
  );
}
