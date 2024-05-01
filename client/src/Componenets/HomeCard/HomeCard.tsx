import { Heart } from "lucide-react";
import React, { useEffect, useState } from "react";
import gsap from "gsap";
import { Link } from "react-router-dom";
interface CardData {
  img: string;
  id:string|number
  Title: string;
  Price: number;
}

const HomeCard = ({id, Price, Title, img }: CardData) => {






  return (
    <Link to={`/product/${id}`} className="card max-sm:w-48 w-72 max-lg:w-56   shadow-sm rounded-none">
    
      <figure className="w-full max-sm:h-60 h-80">
        <img
          className=" w-full max-sm:p-0 rounded-md h-full"
          src={img}
          alt="Shoes"
        />
      </figure>
      <div className="card-body p-2 py-1.5 gap-1.5 max-sm:px-2  " >
        <span className="card-title justify-between">
          <span>{Title}</span>
          <span className="text-base">₹{Price}</span>
        </span>
        <span className="text-xs text-gray-600">Discover a wide range of legendary </span>
       

        <div className=""></div>
      </div>
    </Link>
  );
};

export default HomeCard;
