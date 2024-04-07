import React, { useState } from "react";
import { products } from "../../assets/data";
import currencyFormatter from "currency-formatter";
import SizeContainer from "../../Componenets/SizeContainer/SizeContainer";
import { useParams } from "react-router-dom";
import { Heart } from "lucide-react";

const Product = () => {
  const {id} = useParams()
  // const [productData,setProductData] = useState ({})
  // const productData = products[0];
  const productData = products.filter(item => item.id == id);
  console.log(productData);
  


  const [selectedButton, setSelectedButton] = useState<string | null>(null);

  const selectButton = (buttonId: string) => {
    setSelectedButton((prevSelectedButton) =>
      prevSelectedButton === buttonId ? null : buttonId
    );
  };
  const [wishlist, setWishlist] = useState<boolean>();
  const handleClick = () => {
    setWishlist(!wishlist);
  };
 if (productData.length==0) {
  return(
    <div className=" h-screen flex justify-center items-center">
      Product Not Found
      
    </div>
  )
 }
  return (
    <div className="p-12 pt-28 max-lg:px-0   flex flex-row">
      <div className="w-full flex justify-center items-center flex-row max-lg:flex-col max-lg:gap-5">
        <div className="w-1/2 max-lg:w-full max-lg:px-4  flex justify-center items-center">
          <img
            src={productData[0].img}
            className="h-[550px] w-[450px] max-lg:h-[400px] max-lg:w-[350px]"
            alt="Loading.."
          />
        </div>
        <div className="w-1/2 max-lg:w-full max-lg:px-10 flex flex-col">
          <div className="">
            <h2 className="text-4xl font-medium mb-4">{productData[0].Title}</h2>
            <h2>
              Rs. {currencyFormatter.format(productData[0].Price, { code: "IND" })}
            </h2>
            <span>(incl. of all taxes)</span>
          </div>

          <div className=" my-8">
            <span className=" tracking-wider">SELECT A SIZE</span>
            <div className="flex flex-row gap-2 py-4">
              {productData[0].Size.map((size) => (
                <button
                  onClick={() => selectButton(size)}
                  // disabled={size == "S" }
                  className={`${
                    selectedButton === size
                      ? "bg-black text-white"
                      : "hover:bg-black hover:text-white"
                  }  disabled:text-gray-400 cursor-pointer disabled:border-gray-400 disabled:hover:bg-white p-2 border border-gray-500 rounded-md min-w-10 min-h-10 flex justify-center items-center`}
                >
                  <h1 className="">{size} </h1>
                </button>
              ))}
            </div>
          </div>
         
          <div className="my-7">
            <h1 className="font-semibold tracking-widest">PRODUCT DETAILS</h1>
            <p className="pr-12">
              Grey melange printed T-shirt with applique detail, has a round
              neck, long raglan sleeves with elbow patches, ribbed hem
            </p>
          </div>
          <div className="my-1">
            <h1 className="font-semibold tracking-widest">Size & Fit</h1>
            <p className="pr-12">
              The model (height 6' and shoulders 18") is wearing a size M{" "}
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <button
              className="border 
                           hover:scale-[.97]
                           max-lg:hover:scale-95

              duration-500 bg-black text-white border-black p-2.5 rounded-sm"
            >
              ADD TO CART
            </button>

            <button
              // style={{boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"}}
              // style={{boxShadow:" 0 6px 12px rgba(0, 0, 0, 0.15)"}}
              onClick={handleClick}
              className={`
              hover:scale-[.97]
              max-lg:hover:scale-95

              duration-500
              border ${
                wishlist ? "bg-black text-white" : "bg-white border-black"
              }  p-2.5 rounded-sm flex justify-center items-center gap-2`}
            >
              {" "}
              <Heart
                size={20}
                fill={`${wishlist ? "red" : "white"} `}
                color={`${wishlist ? "red" : "black"} `}
              />
              <span className="relative -top-0.5">WISHLIST</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
