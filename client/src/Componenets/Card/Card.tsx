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

const Card = ({id, Price, Title, img }: CardData) => {


  function calculateDiscountedPrice(
    originalPrice: number,
    discountPercentage: number
  ): number {
    // Validate input
    if (
      typeof originalPrice !== "number" ||
      typeof discountPercentage !== "number"
    ) {
      throw new Error("Original price and discount percentage must be numbers");
    }

    if (
      originalPrice < 0 ||
      discountPercentage < 0 ||
      discountPercentage > 100
    ) {
      throw new Error(
        "Original price and discount percentage must be non-negative, and discount percentage must be less than or equal to 100"
      );
    }

    // Calculate discounted price
    const discountAmount: number = (originalPrice * discountPercentage) / 100;
    const discountedPrice: number = originalPrice - discountAmount;

    return discountedPrice;
  }

  const discountedPrice = calculateDiscountedPrice(Price, 10);

  function convertToBinary(num) {
    let roundedNum = Math.round(num); // Round to the nearest integer
    if (roundedNum > 0.5) {
      return roundedNum;
    } else {
      return roundedNum + 1; // Add 1 if the rounded number is less than or equal to 0.5
    }
  }
  let finalPrice = convertToBinary(discountedPrice);

  return (
    <Link to={`/product/${id}`} className="card max-sm:w-48 w-64 bg-base-100  shadow-md rounded-none">
    
      <figure className="w-full max-sm:h-60 h-80  bg-white">
        <img
          className=" w-full max-sm:p-0  p-1.5 h-full"
          src={img}
          alt="Shoes"
        />
      </figure>
      <div className="card-body p-2 px-5 max-sm:px-2  bg-white">
        <h2 className="card-title text-center max-sm:text-start max-sm:text-base">
          {Title}
        </h2>
        <p>Discover a wide range of legendary </p>
        <div className="space-x-3">
          {/* <span className="font-medium text-gray-500 text-lg max-sm:text-xl">₹{finalPrice}</span> */}
          <span className="font-medium text-gray-700 text-lg max-sm:text-xl">Rs. {Price}</span>
        </div>

        <div className=""></div>
      </div>
    </Link>
  );
};

export default Card;
