import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let authContext =createContext(null)


export default function AuthContextProvider({children}) {

    async function vrifyToken (){
        try{
       
        let {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/auth/verifyToken' , {
           headers : {
             token : localStorage.getItem('token')
           }
         })
        localStorage.setItem('userId' , data.decoded.id)
         
       }catch (err) {
       console.log(err);
       // toast.error(err.response.data.message)
        setToken(null)
        localStorage.removeItem('token')
       }}
       useEffect( ()=>{
         vrifyToken()
       },[] )

    let [token , setToken] =useState(localStorage.getItem('token'))

  return (
 <authContext.Provider value={{token , setToken  , vrifyToken}}>
    {children}
 </authContext.Provider>
  )
}
