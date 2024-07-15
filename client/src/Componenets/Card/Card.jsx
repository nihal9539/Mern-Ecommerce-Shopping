import React from "react";
import { Link } from "react-router-dom";


const Card = ({data}) => {




  return (
    <Link to={`/product/${data?._id}`} className={`card max-md:w-auto   w-72 bg-base-300  shadow-sm rounded-none`}>
    
      <figure className="w-full max-sm:h-56 h-72">
        <img
          className={`w-full max-sm:p-0   bg-gray-500/10 rounded-md h-full`}
          src={data?.image[0]?.url}
          alt="Image"
        />
      </figure>
      <div className="card-body p-2 py-1.5 gap-1.5 max-sm:px-2  " >
      <span className="card-title overflow-hidden whitespace-nowrap text-ellipsis max-sm:text-start max-sm:text-base">
      {data?.productname}
        </span>
        <span className="text-xs overflow-hidden whitespace-nowrap text-ellipsis  text-gray-600">{data?.subTitle} </span>
        <div className="space-x-3">
          <span className="">Rs.{data?.price}</span>
        </div>

        <div className=""></div>
      </div>
    </Link>
  );
};

export default Card;
