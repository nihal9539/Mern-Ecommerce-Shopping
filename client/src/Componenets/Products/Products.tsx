import React, { useState } from "react";
import { Heart } from "lucide-react";
import Card from "../Card/Card";
import { products } from "../../assets/data";
import "./Product.css";
import { TfiLayoutColumn3Alt } from "react-icons/tfi";
import { TfiLayoutColumn4Alt, TfiLayoutColumn4 } from "react-icons/tfi";
import { FaGripLinesVertical } from "react-icons/fa";

import { FiAlignJustify } from "react-icons/fi";
import SmallCard from "../SmallCard/SmallCard";

const Products = () => {
  
  const [multicard, setMulticard] = useState<boolean>(false);
  return (
    <div className="lg:p-16 lg:px-16">
      <div className="  m-2 gap-2  flex justify-end [&>*]:border-2 [&>*]:p-0.5 [&>*]:border-black ">
        <FaGripLinesVertical
          onClick={() => setMulticard(false)}
          className={`${multicard ? "opacity-10" : ""}`}
          size={35}
        />
        <TfiLayoutColumn4Alt
          onClick={() => setMulticard(true)}
          className={`${multicard ? "" : "opacity-30"}`}
          size={35}
        />
      </div>

      <div className={` grid place-items-center ${multicard ? " lg:grid-cols-7 md:grid-cols-4 max-sm:grid-cols-3  " : "lg:grid-cols-5 md:grid-cols-3 max-sm:grid-cols-2"}  gap-y-7 gap-0 max-sm:gap-y-2  sm:grid-cols-2 md:grid-cols-2 `}>
  

        {multicard
          ? [...products]
              .sort(() => Math.random() - 0.5)
              .slice(0, 15)
              .map((data, index) => <SmallCard img={data.img} key={index} />)
          : [...products]
              .sort(() => Math.random() - 0.5)
              .slice(0, 15)
              .map((data, index) => (
                <Card
                  Price={data.Price}
                  img={data.img}
                  Title={data.Title}
                  key={index}
                />
              ))}
      </div>
    </div>
  );
};

export default Products;
