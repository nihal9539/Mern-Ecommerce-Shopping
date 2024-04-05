import React, { useState } from "react";
import { products } from "../../assets/data";
import currencyFormatter from "currency-formatter";
import SizeContainer from "../../Componenets/SizeContainer/SizeContainer";
import { useParams } from "react-router-dom";

const Product = () => {
  // const id = useParams()
  const id= "1"
  // const [productData,setProductData] = useState ({})
  const productData = products[0]

  //  products.map((data)=>{
  //   data.id == id ? setProductData()
  // })

  const data = products.find((item,index) => item.id === id)
  console.log(data);
  
  const [selectedButton, setSelectedButton] = useState<string | null>(null);

  const selectButton = (buttonId: string) => {
    setSelectedButton((prevSelectedButton) =>
      prevSelectedButton === buttonId ? null : buttonId
    );
  };

  return (
    <div className="p-12 pt-28  flex flex-row">
      <div className="w-full flex flex-row gap-0">
        <div className="w-1/2  flex justify-center items-center">
          <img
            src={productData.img}
            className="h-[550px] w-[450px]"
            alt="Loading.."
          />
        </div>
        <div className="w-1/2 flex flex-col">
          <div className="">
            <h2 className="text-4xl font-medium mb-4">{productData.Title}</h2>
            <h2>
              Rs. {currencyFormatter.format(productData.Price, { code: "IND" })}
            </h2>
            <span>(incl. of all taxes)</span>
          </div>

          <div className=" mt-5">
            <span className=" tracking-wider">SELECT A SIZE</span>
            <div className="flex flex-row gap-2 py-4">
              {productData.Size.map((size) => (
                <div
                  onClick={() => selectButton(size)}
                  className={`${
                    selectedButton === size
                      ? "bg-black text-white"
                      : "hover:bg-black hover:text-white"
                  }  cursor-pointer p-2 border rounded-md min-w-10 min-h-10 flex justify-center items-center`}
                >
                  <h1 className="">{size} </h1>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
