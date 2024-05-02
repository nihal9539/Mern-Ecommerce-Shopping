import React, { useState } from "react";
import { Heart } from "lucide-react";
import Card from "../Card/Card";
import { products } from "../../assets/data";
import "./Product.css";
import { TfiLayoutColumn3Alt } from "react-icons/tfi";
import { TfiLayoutColumn4Alt, TfiLayoutColumn4 } from "react-icons/tfi";
import { FaGripLinesVertical } from "react-icons/fa";

import SmallCard from "../SmallCard/SmallCard";
import HomeCard from "../HomeCard/HomeCard";

const Products = () => {
  function calculateDiscountedPrice(
    originalPrice: number,
    discountPercentage: number
  ): number {
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
  // const [multicard, setMulticard] = useState<boolean>(false);
  return (
    <div className="lg:p-6 lg:px-20">
      <div className="flex justify-center p-4 text-xl  font-semibold tracking-wider">
        <span>FEATURED ITEMS</span>
      </div>

      <div
        className={` grid place-items-center pt-8
       
          gap-y-5   grid-cols-2 md:grid-cols-3 lg:grid-cols-4   `}
      >
        {
        [...products]
              .sort(() => Math.random() - 0.5)
              .slice(0, 8)
              .map((data, index) => (
                <HomeCard
                  id={data.id}
                  Price={data.Price}
                  img={data.img}
                  Title={data.Title}
                  key={index}
                />
              ))
              }
      </div>
    </div>
  );
};

export default Products;
