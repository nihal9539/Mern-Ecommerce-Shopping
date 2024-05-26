import React from "react";
import { Link } from "react-router-dom";


const Card = ({data,homepageCard}) => {




  return (
    <Link to={`/product/${data?._id}`} className={`card max-sm:w-48 ${homepageCard ? "w-72 max-lg:w-56":" w-64 bg-base-300"}   shadow-sm rounded-none`}>
    
      <figure className="w-full max-sm:h-60 h-80">
        <img
          className=" w-full max-sm:p-0  rounded-md h-full"
          src={data?.image}
          alt="Shoes"
        />
      </figure>
      <div className="card-body p-2 py-1.5 gap-1.5 max-sm:px-2  " >
        <span className="card-title  max-sm:text-start max-sm:text-base">
          {data?.Title}
        </span>
        <span className="text-xs text-gray-600">{data?.subTitle} </span>
        <div className="space-x-3">
          <span className="">Rs.{data?.price}</span>
        </div>

        <div className=""></div>
      </div>
    </Link>
  );
};

export default Card;
