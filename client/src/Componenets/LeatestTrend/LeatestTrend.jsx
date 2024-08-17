import React from 'react'
import { Link } from 'react-router-dom'

const LeatestTrend = () => {
  return (
    <div className="w-full flex max-lg:flex-col justify-center max-lg:p-4 px-24 p-6    ">
        <div className="flex w-7/12 max-lg:w-full  h-[26rem] max-md:h-72 max-l  overflow-hidden gap-5">
          <img
            src={"./new-collection-1.jpeg"}
            className="w-1/2 h-full"
            alt=""
          />
          <img
            src={"./new-collection-2.jpeg"}
            className="w-1/2 h-full"
            alt=""
          />
        </div>
        <div className=" uppercase  w-5/12 max-lg:w-full pt-20 p-5 pl-8 text-6xl max-md:text-4xl  ">
          <span className="font-[100]">New</span>
          <p className=" font-[900]">COLLECTION</p>
          <p className="text-sm mt-5 ">
            Discover the latest trends in fashion with our new collection.
            
          </p>

          <Link to={'collection/all'}>
          <button className="button-51 mt-2" role="button">
            SHOP NOW
          </button>
          </Link>
        </div>
      </div>
  )
}

export default LeatestTrend
