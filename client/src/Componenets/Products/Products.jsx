import React, { useState } from "react";
import { products } from "../../assets/data";
import Card from "../Card/Card";

const Products = () => {

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
                <Card 
                homepageCard={true}
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
