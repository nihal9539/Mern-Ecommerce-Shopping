import React from "react";
import { Link } from "react-router-dom";


const Card = ({data,homepageCard}) => {




  return (
    <Link to={`/product/${data?._id}`} className={`card max-md:w-auto  ${homepageCard ? "w-72 max-lg:w-56 r-card duration-300 group rounded-b-lg":" w-64 bg-base-300"}   shadow-sm rounded-none`}>
    
      <figure className="w-full max-sm:h-60 h-80">
        <img
          className={`${homepageCard && "group-hover:scale-125 group-hover:-rotate-3 duration-300"} w-full max-sm:p-0  rounded-md h-full`}
          src={data?.image?.url}
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
