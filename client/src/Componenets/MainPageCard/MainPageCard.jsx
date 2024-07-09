import React from 'react'
import { Link } from 'react-router-dom'

const MainPageCard = ({data}) => {
  return (
    <Link to={`/product/${data?._id}`}  className='w-80  h-96 max-md:h-72 max-lg:w-72 max-md:w-52 rounded-3xl relative overflow-hidden '>
            <img className='w-full h-full img-mask  hover:scale-110 duration-300' src={data?.image[0]?.url} />
        <div className='absolute flex justify-between items-center bottom-0 w-full img-mask text-white pt-16 p-5'>
             <div className=''>
                <p className='capitalize'>{data?.productname}</p>
                <p className='font-semibold text-lg'>₹{data?.price}</p>
             </div>
             <div>
                <button className=' max-md:hidden block border-white border-2 text-sm tracking-tight p-2 px-3.5 rounded-3xl'>Details</button>
             </div>
        </div>
    </Link>
  )
}

export default MainPageCard
