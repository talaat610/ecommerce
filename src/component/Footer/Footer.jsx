import React from 'react'
import amazonLogo  from '../../assets/images/amazon-pay.png'
import americaLogo from '../../assets/images/American-Express-Color.png'
import paybalLogo  from '../../assets/images/paypal.png'
import masterLogo  from '../../assets/images/mastercard.webp'
import appleLogo   from '../../assets/images/get-apple-store.png'
import google      from '../../assets/images/get-google-play.png'


export default function Footer() {
  return (
<footer className='bg-mainLight py-8'>
  <div className="container grid gap-6">

    <div>
      <h3 className='text-2xl'>Get the Fresh Cart App</h3>
      <p className='text-slate-400'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, ad!</p>
    </div>


    <div className='flex flex-col sm:flex-row items-stretch gap-3'>
      <input
        className='bg-white rounded-md grow py-2 px-3 outline-0'
        type="text"
        placeholder='Search...'
      />
      <button className='bg-primary text-white px-4 py-2 rounded-md cursor-pointer'>
        Share App Link
      </button>
    </div>

    <div className='flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6'>

 
      <div className='flex flex-wrap items-center gap-4'>
        <h3 className="whitespace-nowrap">Payment Partners</h3>
        <img src={amazonLogo} className='w-[70px]' alt="Amazon" />
        <img src={americaLogo} className='w-[70px]' alt="American Express" />
        <img src={paybalLogo} className='w-[70px]' alt="PayPal" />
        <img src={masterLogo} className='w-[70px]' alt="MasterCard" />
      </div>


      <div className='flex flex-wrap items-center gap-4'>
        <h3 className="whitespace-nowrap">Get Deliveries with FreshCart</h3>
        <img src={appleLogo} className='w-[70px]' alt="Apple Store" />
        <img src={google} className='w-[70px]' alt="Google Play" />
      </div>

    </div>
    
  </div>
</footer>

  )
}
