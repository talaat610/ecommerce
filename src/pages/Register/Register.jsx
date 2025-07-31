import React, {  } from 'react';
import { Formik, useFormik } from 'formik';
import axios from 'axios';
import * as Yup   from 'yup';
import { useNavigate } from 'react-router-dom';
export default function Register(){
  
  let Navigate = useNavigate()
const regPass = /^[A-Z][A-Za-z0-9]{5,}$/
const regPhone = /^01[0125][0-9]{8}$/

  let validationSchema = Yup.object({
    name: Yup.string().min(3 ,'the name must by at least 3 chars').max(20 ,'the name must by maxmum 20 chars').required(' name is required'),
    email:Yup.string().required('email is required').email('must by an email'),
    password:Yup.string().required('password is required').matches(regPass , 'must by start a capital letter and minmum 6 chracs or digit'),
    rePassword: Yup.string().required().oneOf([Yup.ref('password')] , 'rePassword is required'),
    phone: Yup.string().required('phone is required').matches(regPhone)
  })

  let formik = useFormik({
    initialValues : {
    name: "",
    email:"",
    password:"",
    rePassword:"",
    phone:""
    },
    onSubmit : sendDataToSignUp ,

    validationSchema
  })

 async function sendDataToSignUp(values){
 const options = {
  url:'https://ecommerce.routemisr.com/api/v1/auth/signup',
  method : 'post' ,
  data : values
} 
const {data} = await axios.request(options)
console.log(data);
Navigate('/Login')
 }
  return (
    <>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm  bg-gray-200 shadow-2xl max-w-lg mx-auto  rounded-xl my-14 flex justify-center px-6 py-12 ">
          <form onSubmit={formik.handleSubmit}  className="space-y-6 ">
          <p className='font-bold text-2xl flex justify-center'>Sign Up</p>

            {/* name */}
            <label htmlFor="name" className=' '>Name</label>
              <input type="text"
              name='name'
              value={formik.values.name}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
               className='w-full bg-white my-2 py-2 px-3 rounded-lg border-0 outline-0'/>
          {formik.errors.name && formik.touched.name &&<p className='bg-red-200 p-3 my-1 rounded-2xl'>
            {formik.errors.name}
          </p>}
          
           {/* email */}
            <label htmlFor="email" className=' '>email</label>
              <input type="email"
              name='email'
              value={formik.values.email}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
               className='w-full bg-white my-2 py-2 px-3 rounded-lg border-0 outline-0' />
           {formik.errors.email && formik.touched.email &&<p className='bg-red-200 p-3 my-1 rounded-2xl'>
            {formik.errors.email}
          </p>}


           {/* password */}
            <label htmlFor="password" className=' '>password</label>
              <input type='password'
              name='password'
              value={formik.values.password}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              className='w-full bg-white my-2 py-2 px-3 rounded-lg border-0 outline-0' />

           
            {formik.errors.password && formik.touched.password && <p className='bg-red-200 p-3 my-1 rounded-2xl'>
            {formik.errors.password}
          </p>}



            {/* rePassword */}
            <label htmlFor="rePassword" className=' '>rePassword</label>
              <input type="password"
              name='rePassword'
              value={formik.values.rePassword}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
               className='w-full bg-white my-2 py-2 px-3 rounded-lg border-0 outline-0' />
           {formik.errors.rePassword && formik.touched.rePassword &&<p className='bg-red-200 p-3 my-1 rounded-2xl'>
            {formik.errors.rePassword}
          </p>}


           {/* phone */}
            <label htmlFor="phone" className=' '>phone</label>
              <input type="tel"
              name='phone'
              value={formik.values.phone}
              onChange={formik.handleChange}
               className='w-full bg-white my-2 py-2 px-3 rounded-lg border-0 outline-0' />
               {formik.errors.phone && formik.touched.phone && <p className='bg-red-200 p-3 my-1 rounded-2xl'>
            {formik.errors.phone}
          </p>}



    <button type='submit' className='w-full bg-primary cursor-pointer hover:bg-darkPrimary hover:text-white rounded-lg py-2 mt-3'>Sign Up</button>

          </form>
        </div>
    </>
 )}

