import React from "react";
interface CardData {
  img: string;

}

const SmallCard = ({  img }: CardData) => {


  return (
    <div className="card max-sm:w-44 w-48 bg-base-100  shadow-sm rounded-none">
      <figure className="w-full h-64  bg-white">
        <img className=" w-full  p-1 h-full" src={img} alt="Shoes" />
      </figure>
 
    </div>
  );
};

export default SmallCard;
