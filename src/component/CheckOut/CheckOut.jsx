import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import * as Yup from 'yup' 
import { cartContext } from '../Context/CartContext'
import { useNavigate } from 'react-router-dom'

export default function CheckOut({totalPrice}) {
    const {cart , getLoggUserCart} = useContext(cartContext)
    const [pay , setPay] = useState('cash')
  const navigate =  useNavigate()
    const regPhone = /^01[0125][0-9]{8}$/

    let validationSchema = Yup.object({
        details: Yup.string().required('must by required'),
        phone: Yup.string().required('must by required').matches(regPhone , 'must by egyption phone number'),
        city: Yup.string().required('must by required').min(2 , 'at lest 2 chars'),
      })
     
      let Formik = useFormik({
        initialValues : {
        details:"",
        phone:"",
        city:"",
        },
        onSubmit : (x)=>{
            if(pay == 'cash'){
                  payCash(x)
            }else{
              payOnline(x)
            }
            
            validationSchema
        } ,
    
      })



      async function payOnline(values){
        try{

let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cart.cartId}?url=http://localhost:5173`,
    {
        shippingAddress:values ,
    },
    {
        headers :{
            token : localStorage.getItem('token')
        }
    }
);
console.log(data);

if(data.status == "success"){
    window.location.href = data.session.url
}
        }catch(err){
            console.log(err);
            
        }
      }




      async function payCash(values){
        try{

let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders//${cart.cartId}`,
    {
        shippingAddress:values ,
    },
    {
        headers :{
            token : localStorage.getItem('token')
        }
    }
);
console.log(data);

if(data.status == "success"){
    navigate('/allorders')
    getLoggUserCart()
}
        }catch(err){
            console.log(err);
            
        }
      }



  return (
    <div>
        
        <>
      <div className="container  max-w-[535px] mt-12">
        <span className="block mt-12 mx-auto w-[200px] rounded-full h-[2px] bg-primary"></span>
        <h2 className="text-center my-2 font-bold text-lg Outfit">Check Out</h2>
        <span className="block  mx-auto w-[200px] rounded-full h-[2px] bg-primary"></span>

        <form
        onSubmit={Formik.handleSubmit}
          id="checkOut"
          className="w-full p-8 border border-gray-300 rounded-lg duration-700 target:border-darkPrimary   flex flex-col gap-6 mt-12"
        >
          <h3 className="font-bold text-lg -ml-2">Cart totals</h3>

          <div className="flex  gap-4 items-center">
            <span className="font-bold">Total :</span>
            <span className="text-primary font-semibold">
              EG : {totalPrice} 
            </span>
          </div>



          <div>
            <input
              className="p-2 w-full rounded-xl border-1 border-primary focus:border-darkPrimary focus:border-2"
              autoComplete="off"
              type="text"
              placeholder="Enter Your City Name"
              name="city"
              value={Formik.values.city}
              onChange={Formik.handleChange}
              onBlur={Formik.handleBlur} />
          </div>
        {Formik.errors.city && Formik.touched.city && <p className="text-red-600 font-bold text-sm -my-3 ">
        {Formik.errors.city}
        </p>}


          <div>
            <input
              className="p-2 w-full rounded-xl border-1 border-primary focus:border-darkPrimary focus:border-2"
              autoComplete="off"
              type="tel"
              placeholder="Enter Your Phone"
              name="phone"
              value={Formik.values.phone}
              onChange={Formik.handleChange}
              onBlur={Formik.handleBlur}/>
          </div>
          {Formik.errors.phone && Formik.touched.phone &&<p className="text-red-600 font-bold text-sm -my-3 ">
            {Formik.errors.phone}
          </p>}


          <div>
            <textarea
              className="p-2 w-full rounded-xl border-1 border-primary focus:border-darkPrimary focus:border-2"
              placeholder="Details"
              name="details"
              value={Formik.values.details}
              onChange={Formik.handleChange}
              onBlur={Formik.handleBlur}/>
          </div>
          {Formik.errors.details && Formik.touched.details &&<p className="text-red-600 font-bold text-sm -my-3 ">
            {Formik.errors.details}
          </p>}






          <div className=" flex max-md:flex-col  gap-4 justify-between items-center">
            <button
              type="submit"
              onClick={ ()=>{
                setPay('cash')
              } }
              className="btn cursor-pointer bg-primary hover:bg-darkPrimary text-white w-full flex py-2 text-nowrap items-center justify-center gap-2" >

              <span> Cash Order</span>
            </button>






            <button
              type="submit"
              onClick={ ()=>{
                setPay('online')
              } }
              className="btn cursor-pointer flex py-2 text-nowrap items-center justify-center gap-2 hover:text-white hover:bg-darkPrimary bg-white text-darkPrimary w-full"
            >

              <span>Online Order</span>
            </button>
          </div>
        </form>
      </div>
    </>


    </div>
  )
}
