import React from 'react'
import notFound from "../../assets/404.svg"
const NoMatch = () => {
  return (
    <div className=' h-screen w-full flex flex-col justify-center gap-10 items-center'>
      <h1 className='text-5xl font-bold'>OOPS! <span className='ml-2'> PAGE NOT FOUND</span> </h1>
      <img src={notFound} alt="404 Not Found" className='w-96' />
      
    </div>
  )
}

export default NoMatch
