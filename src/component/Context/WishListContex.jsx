import { createContext, useState, useEffect } from "react";
import axios from "axios";
export const wishlistContext = createContext(null);

export default function WishlistContextProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);

  async function addToWishlist(productId) {
    try {
      const { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/wishlist',
        { productId },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      getWishlist(); // مهم جداً تحدث القائمة بعد الإضافة
    } catch (err) {
      console.log("wishlist error", err.response?.data || err.message);
    }
  }
  

  async function getWishlist() {
    try {
      let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/wishlist',
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      setWishlist(data?.data);
    } catch (err) {
      console.log("wishlist error", err);
    }
  }


async function removeFromWishlist(productId) {
  try {
    const { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
    // لازم تحدث البيانات بعد الحذف
    getWishlist();
    return data;
  } catch (error) {
    console.log("remove error", error);
  }
}

  
  


  useEffect(() => {
    getWishlist();
  }, []);

  return (
    <wishlistContext.Provider value={{ wishlist, addToWishlist , removeFromWishlist    }}>
      {children}
    </wishlistContext.Provider>
  );
}
