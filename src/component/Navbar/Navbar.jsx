import { NavLink } from 'react-router-dom';
import cartLogo from '../../assets/images/favicon.png';
import { useContext, useState } from 'react';
import { authContext } from './../Context/authContext';
import { cartContext } from '../Context/CartContext';

export default function Navbar() {
  const { token, setToken } = useContext(authContext);
  const { cart } = useContext(cartContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  const baseLinkClass = 'text-xl pb-1.5 relative after:w-0 after:h-0.5 hover:after:w-full after:bg-primary after:absolute after:bottom-0 after:left-0 after:duration-500 cursor-pointer';

  return (
    <div className='bg-mainLight shadow-xl py-6 px-4'>
      <div className="container mx-auto flex justify-between items-center">
      
        <div className='flex items-center gap-2'>
          <img src={cartLogo} className='w-[60px]' alt="logo" />
          <h1 className='text-3xl font-bold'>FreshCart</h1>
        </div>

      
        <div className='lg:hidden cursor-pointer' onClick={() => setMenuOpen(!menuOpen)}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
          </svg>
        </div>

    
        <ul className='hidden lg:flex gap-x-6 items-center'>
          {token && <>
            <li><NavLink to="/" className={({ isActive }) => `${baseLinkClass} ${isActive ? 'text-primary font-bold' : ''}`}>Home</NavLink></li>
            <li><NavLink to="/Products" className={({ isActive }) => `${baseLinkClass} ${isActive ? 'text-primary font-bold' : ''}`}>Products</NavLink></li>
            <li><NavLink to="/Category" className={({ isActive }) => `${baseLinkClass} ${isActive ? 'text-primary font-bold' : ''}`}>Category</NavLink></li>
            <li><NavLink to="/Brands" className={({ isActive }) => `${baseLinkClass} ${isActive ? 'text-primary font-bold' : ''}`}>Brands</NavLink></li>
            <li><NavLink to="/allorders" className={({ isActive }) => `${baseLinkClass} ${isActive ? 'text-primary font-bold' : ''}`}>All Orders</NavLink></li>
            <li><NavLink to="/WishList" className={({ isActive }) => `${baseLinkClass} ${isActive ? 'text-primary font-bold' : ''}`}>WishList</NavLink></li>
          </>}

      
          {token &&
            <li className='relative'>
              <NavLink to="/Cart" className="text-2xl">
                🛒
                <span className='absolute -top-2 -right-3 bg-primary text-white text-xs rounded-full w-5 h-5 flex justify-center items-center'>
                  {cart?.numOfCartItems || 0}
                </span>
              </NavLink>
            </li>
          }

          {token
            ? (
              <li onClick={logout} className="cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                  strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-red-500">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 
                    0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 
                    21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 
                    0 3-3m0 0-3-3m3 3H9" />
                </svg>
              </li>
            )
            : (
              <>
                <li><NavLink to="/login" className={({ isActive }) => `${baseLinkClass} ${isActive ? 'text-primary font-bold' : ''}`}>Login</NavLink></li>
                <li><NavLink to="/register" className={({ isActive }) => `${baseLinkClass} ${isActive ? 'text-primary font-bold' : ''}`}>Register</NavLink></li>
              </>
            )}
        </ul>
      </div>

    
      {menuOpen && (
        <div className='lg:hidden mt-4 space-y-4'>
          {token && <>
            <NavLink to="/" onClick={() => setMenuOpen(false)} className="block text-lg">Home</NavLink>
            <NavLink to="/Products" onClick={() => setMenuOpen(false)} className="block text-lg">Products</NavLink>
            <NavLink to="/Category" onClick={() => setMenuOpen(false)} className="block text-lg">Category</NavLink>
            <NavLink to="/Brands" onClick={() => setMenuOpen(false)} className="block text-lg">Brands</NavLink>
            <NavLink to="/allorders" onClick={() => setMenuOpen(false)} className="block text-lg">All Orders</NavLink>
            <NavLink to="/WishList" onClick={() => setMenuOpen(false)} className="block text-lg">WishList</NavLink>
            <NavLink to="/Cart" onClick={() => setMenuOpen(false)} className="block text-lg">Cart ({cart?.numOfCartItems || 0})</NavLink>
            <div onClick={() => { logout(); setMenuOpen(false); }} className=" text-lg text-red-500 flex items-center gap-2 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 
                2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 
                0 7.5 21h6a2.25 2.25 0 0 0 
                2.25-2.25V15m3 0 3-3m0 
                0-3-3m3 3H9" />
              </svg>
              Logout
            </div>
          </>}
          {!token && <>
            <NavLink to="/login" onClick={() => setMenuOpen(false)} className="block text-lg">Login</NavLink>
            <NavLink to="/register" onClick={() => setMenuOpen(false)} className="block text-lg">Register</NavLink>
          </>}
        </div>
      )}
    </div>
  );
}
