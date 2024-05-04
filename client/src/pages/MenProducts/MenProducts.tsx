import React from "react";
("react-accessible-accordion");
import "react-accessible-accordion/dist/fancy-example.css";
import Card from "../../Componenets/Card/Card";
import { products } from "../../assets/data";
import Navbar from "../../Componenets/Navbar/Navbar";
import ProductsAccordian from "../../Componenets/ProductsAccordian/ProductsAccordian";

const MenProducts = () => {
  return (
    <div>
      <Navbar bgWhite={true} />
      <div className="p-12 pt-32  flex flex-row">
        <div className="w-[25%] h-[60vh]  p-1">
          <h1 className="text-2xl p-4 tracking-wider font-bold">FILTERS</h1>
          <hr className="w-full h-1 my-2 bg-red-700" />

          <ProductsAccordian/>
        </div>
        <div className="w-[80%] gap-4 grid lg:grid-cols-4 sm:grid-cols-2 p-2 place-items-center">
          {[...products]
            .map((data, index) => (
              <Card
                id={data.id}
                Price={data.Price}
                img={data.img}
                Title={data.Title}
                key={index}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default MenProducts;
