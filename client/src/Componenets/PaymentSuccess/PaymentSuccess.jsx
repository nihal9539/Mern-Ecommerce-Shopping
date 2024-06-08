import React from 'react'
import image from "../../assets/payment_success.svg"
import { Link } from 'react-router-dom'

const PaymentSuccess = () => {
  return (
    <div className='w-full flex justify-center flex-col items-center '>
        <img className='w-44 mt-28' src={image} alt="" />
        <h1 className='p-4 font-bold text-xl tracking-wide'>Your Payment is Successfull</h1>

        <Link to={'/'} className=' bg-black text-white p-3 px-5 rounded-lg border duration-300 hover:shadow-boxShadow1 border-black'>Back to Home</Link>
    </div>
  )
}

export default PaymentSuccess
