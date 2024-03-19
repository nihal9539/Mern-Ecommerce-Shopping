import React from "react";
import { Heart } from "lucide-react";
import Card from "../Card/Card";
import { products } from "../../assets/data";
import "./Product.css";
const Products = () => {
  return (
    <>
      <div className=" lg:p-16 lg:px-16 grid   place-items-center lg:grid-cols-5 gap-y-7  sm:grid-cols-2 md:grid-cols-2 ">
        {[...products]
          .sort(() => Math.random() - 0.5)
          .slice(0, 5)
          .map((data, index) => (
            <Card
              Price={data.Price}
              img={data.img}
              Title={data.Title}
              key={index}
            />
          ))}

        {[...products]
          .sort(() => Math.random() - 1.5)
          .slice(0, 5)
          .map((data, index) => (
            <Card
              Price={data.Price}
              img={data.img}
              Title={data.Title}
              key={index}
            />
          ))}
      </div>
      
    </>
  );
};

export default Products;
