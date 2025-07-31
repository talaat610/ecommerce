import React, { useContext, useState } from 'react'
import { useFormik } from 'formik'
import axios from 'axios';
import * as Yup   from 'yup'
import { Link, useNavigate } from 'react-router-dom';
import { authContext } from '../../component/Context/authContext';


export default function Login(){
let Navigate = useNavigate()
let [showPass , setShowPass] = useState('password')
let { setToken , vrifyToken } = useContext(authContext)

const regPass = /^[A-Z][A-Za-z0-9]{5,}$/

function toggleShowPass (){
  setShowPass( showPass === 'password' ? 'text' : 'password' )
}

  let validationSchema = Yup.object({
    email:Yup.string().required('email is required').email('must by an email'),
    password:Yup.string().required('password is required').matches(regPass , 'must by start a capital letter and minmum 6 chracs or digit'),
  })


  let formik = useFormik({
    initialValues : {
    email:"",
    password:"",
    },
    onSubmit : sendDataToSignIn ,

    validationSchema
  })

 async function sendDataToSignIn(values){
 const options = {
  url:'https://ecommerce.routemisr.com/api/v1/auth/signin',
  method : 'post' ,
  data : values
} 
const {data} = await axios.request(options)
localStorage.setItem('token', data.token )
setToken(data.token)
vrifyToken()
console.log(data.token);
Navigate('/')
 }
  return (
    <>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm  bg-gray-200 shadow-2xl max-w-lg mx-auto  rounded-xl my-14 flex justify-center px-6 py-12 ">
          <form onSubmit={formik.handleSubmit}  className="space-y-6 ">
               
                      <p className='font-bold text-2xl flex justify-center'>Login</p>

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
        <div className='relative'>

              <input type={showPass}
              name='password'
              value={formik.values.password}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              className='w-full bg-white my-2 py-2 px-3 rounded-lg border-0 outline-0' />

            <div className='cursor-pointer' onClick={toggleShowPass}>

              {showPass === 'password' ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 absolute top-4 right-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>

                : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 absolute top-4 right-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg> }
            </div>
       </div>
            {formik.errors.password && formik.touched.password && <p className='bg-red-200 p-3 my-1 rounded-2xl'>
            {formik.errors.password}
          </p>}



    <button type='submit' className='w-full bg-primary cursor-pointer hover:bg-darkPrimary hover:text-white rounded-lg py-2 mt-3'>Login</button>
        <button className='text-blue-400 '><Link to={'/forgetpassword'}>Forget Password</Link> </button>
          </form>
        </div>
     
    </>
 )}



