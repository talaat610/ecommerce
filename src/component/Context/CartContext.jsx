import React, { useEffect, useState, createContext } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';


export const cartContext = createContext(null);

export default function CartContextProvider({ children }) {
  const [cart, setCart] = useState(null);
  const [disablebtn, setDisablebtn] = useState(false);


  async function getLoggUserCart() {
    try {
      let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/cart', {
        headers: {
          token: localStorage.getItem('token'),
        },
      });
     
      setCart(data);
    } catch (err) {
      console.log(err);
    }
  }


  async function addProductToCart(productId) {
    try {
      let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/cart',{ productId },{
          headers: {
            token: localStorage.getItem('token'),
          },
        }
      );
      
     toast.success('تمت الاضافة يا دولى ✅')
      setCart(data);
    } catch (err) {
      console.log(err);
    }
  }






  

  async function removeCartItem(cartItemId) {
    try {
      let { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${cartItemId}`,{
          headers: {
            token: localStorage.getItem('token'),
          },
        }
      );
     
     toast.success('تمت الحذف ')
      setCart(data);
    } catch (err) {
      console.log(err);
    }
  }



  async function clearCart() {
    try {
      let { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,{
          headers: {
            token: localStorage.getItem('token'),
          },
        }
      );
      
     toast.success('على الابيض ')
      setCart(data);
    } catch (err) {
      console.log(err);
    }
  }




  async function updateCartItem( count , cartItemId) {
    setDisablebtn(true)
    try {
      let { data } = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${cartItemId}`,{
        count,
      },{
        headers: {
            token: localStorage.getItem('token'),
          },
        }
      );
     
     toast.success('تمت التحديث  ')
      setCart(data);
    } catch (err) {
      console.log(err);
    }finally{
      setDisablebtn(false)
    }
  }

  useEffect(() => {
    getLoggUserCart();
  }, []);

  return (
    <cartContext.Provider value={{ 
      cart,
     addProductToCart , getLoggUserCart , removeCartItem ,clearCart , updateCartItem , disablebtn }}>
      {children}
    </cartContext.Provider>
  );
}




