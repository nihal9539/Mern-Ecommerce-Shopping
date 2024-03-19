import { Heart } from "lucide-react";
import React, { useEffect, useState } from "react";
import gsap from "gsap";
interface CardData  {
  img:string,
  Title:string,
  Price:number
}

const Card = ({Price,Title,img}:CardData) => {
  const [like, setLike] = useState<boolean>();
  const handleColor = () => {
    setLike(!like);
  };

  console.log(Price);
  
 
  return (
    <div className="card max-sm:w-44 w-64 bg-base-100  shadow-sm rounded-none">
      <div className="absolute top-4 right-4 border-0 bg-white shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] p-1.5  rounded-md">
          <Heart
            size={35}
            onClick={handleColor}
            fill={`${like ? "red" : "white"} `}
            color={`${like ? "red" : "grey"} `}
          />
        </div>
      <figure className="w-full h-80 p-2 bg-white">
        
        <img
          className=" w-full  p-1 h-full"
          src={img}
          alt="Shoes"
        />
      </figure>
      <div className="card-body p-2 px-5">
        <h2 className="card-title text-center">{Title}</h2>
        <p>Discover a wide range of legendary sneakers, timeless designs</p>
        <h3 className="font-bold text-2xl">₹{Price}</h3>

        <div className=""></div>
      </div>
    </div>
  );
};

export default Card;
