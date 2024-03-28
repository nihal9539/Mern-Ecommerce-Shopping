import React from "react";
interface CardData {
  img: string;

}

const SmallCard = ({  img }: CardData) => {


  return (
    <div className="card max-sm:w-32 lg:w-48 bg-base-100  shadow-sm rounded-none">
      <figure className="w-full lg:h-64 max-sm:h-44 bg-white">
        <img className=" w-full  p-1 h-full" src={img} alt="Shoes" />
      </figure>
 
    </div>
  );
};

export default SmallCard;
