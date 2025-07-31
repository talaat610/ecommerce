import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layuot                from './component/Layuot/Layuot'
import Home                  from './pages/Home/Home'
import Products              from './pages/Products/Products'
import Category              from './pages/Category/Category'
import Brands                from './pages/Brands/Brands'

import Register              from './pages/Register/Register';
import Login                 from './pages/Login/Login';
import AuthContextProvider   from './component/Context/authContext';
import LoginProtected        from './component/Context/LoginProtected';
import ProductsDetails       from './pages/ProductsDetails/ProductsDetails';
import CartContextProvider   from './component/Context/CartContext';
import Cart                  from './pages/Cart/Cart';
import AllOrder              from './pages/AllOrder/AllOrder';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools }from '@tanstack/react-query-devtools'
import WishList              from './pages/WishList/WishList'
import WishlistContextProvider from './component/Context/WishListContex'
import ForgotPassword          from './pages/ForgrtPassword/ForgrtPassword'
import ResetPassword           from './pages/ResetPassword/ResetPassword'
import VeriFayCode             from './pages/VeriFayCode/VeriFayCode'
import ProtectedRoute from './pages/protected/protectedRoute'



let routes = createBrowserRouter([
    {path : '/'                    , element : <Layuot/> , children:[
    {index :true                   , element : <ProtectedRoute> <Home/>            </ProtectedRoute>},
    {path : '/products'            , element : <ProtectedRoute> <Products/>        </ProtectedRoute>},
    {path : '/productsDetails/:id' , element : <ProtectedRoute> <ProductsDetails/> </ProtectedRoute>},
    {path : '/category'            , element : <ProtectedRoute> <Category/>        </ProtectedRoute>},
    {path : '/brands'              , element : <ProtectedRoute> <Brands/>          </ProtectedRoute>},
    {path : '/cart'                , element : <ProtectedRoute> <Cart/>            </ProtectedRoute>},
    {path : '/allorders'           , element : <ProtectedRoute> <AllOrder/>        </ProtectedRoute>},
    {path : '/wishlist'            , element : <ProtectedRoute> <WishList/>        </ProtectedRoute>},

    {path: '/login'               , element : <LoginProtected> <Login />            </LoginProtected>},
    {path: '/register'            , element : <LoginProtected> <Register/>          </LoginProtected>},
    {path: '/forgetpassword'      , element : <LoginProtected> <ForgotPassword/>    </LoginProtected>},
    {path: '/verifaycode'         , element : <LoginProtected> <VeriFayCode />      </LoginProtected>},
    {path: '/resetpassword'       , element : <LoginProtected> <ResetPassword/>     </LoginProtected>},
]}
])


let client = new QueryClient()
export default function App() {

  return (

        <WishlistContextProvider>
        <QueryClientProvider client={client}>
        <AuthContextProvider>
        <CartContextProvider>
        <RouterProvider router={routes} />
        </CartContextProvider>
        </AuthContextProvider>
        <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
        </WishlistContextProvider>
 
  )
}
