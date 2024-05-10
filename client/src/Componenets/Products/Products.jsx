import React, { useEffect, useState } from "react";
import { products } from "../../assets/data";
import Card from "../Card/Card";
import { useDispatch, useSelector } from "react-redux";
import { getAllProduct } from "../../Action/ProductAction";

const Products = () => {
  let { products, loading } = useSelector((state) => state.productReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProduct());
  }, []);

  return (
    <div className="lg:p-6 lg:px-20">
      <div className="flex justify-center p-4 text-xl  font-semibold tracking-wider">
        <span>FEATURED ITEMS</span>
      </div>

      <div
        className={` grid place-items-center pt-8
       
          gap-y-5   grid-cols-2 md:grid-cols-3 lg:grid-cols-4   `}
      >
        {products
          .sort(() => Math.random() - 0.5)
          .slice(0, 8)
          .map((data, index) => (
            <Card
              homepageCard={true}
              data={data}
              key={index}
            />
          ))}
      </div>
    </div>
  );
};

export default Products;
