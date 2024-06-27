import React, { useEffect, useState } from "react";
import Card from "../Card/Card";
import { useDispatch, useSelector } from "react-redux";
import { getAllProduct } from "../../Action/ProductAction";

const Products = () => {
  let { products, loading,error } = useSelector((state) => state.productReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProduct());
  }, []);

  if (loading) {
    <div>{error}{loading}</div>
  }
 console.log(products);
  return (
    <div className="lg:p-6 lg:px-20">
      <div className="flex justify-center p-4 text-xl  font-semibold tracking-wider">
        <span>FEATURED ITEMS</span>
      </div>
      {error}{loading}
      {/* lll */}
      <div
        className={` grid place-items-center pt-8 max-md:px-2 max-md:gap-2
       
          gap-y-5   grid-cols-2 md:grid-cols-3 lg:grid-cols-4   `}
      >
        {products
          ?.sort(() => Math.random() - 0.5)
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
