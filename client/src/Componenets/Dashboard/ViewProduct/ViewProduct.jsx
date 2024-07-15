import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductById } from "../../../Action/ProductAction";
import currencyFormatter from "currency-formatter";

const ViewProduct = () => {
  const { product } = useSelector((state) => state.productReducer);
  const { id } = useParams();
  const [imageId, setImageId] = useState(0);


  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductById(id));
  }, []);

  return (
    <div>
      <div className="w-full flex justify-center relative items-center flex-row max-lg:flex-col max-lg:gap-5">
        <div className="w-1/2 flex-col max-lg:w-full max-lg:px-4 relative top-0 left-0   flex justify-center  items-center ">
          <img
            src={product?.image[imageId]?.url}
            className="h-[420px] w-[380px] max-lg:h-[400px] max-lg:w-[350px] rounded-lg"
            alt="Loading.."
          />
          <div className="mt-5 flex gap-5 overflow-auto mx-10">
              {product?.image?.map((data, i) => (
                <img
                  className="w-20 h-20 rounded-md cursor-pointer"
                  key={i}
                  src={data.url}
                  alt=""
                  onMouseEnter={() => setImageId(i)}
                />
              ))}
            </div>
        </div>
        <div className="w-1/2 h-[80vh] max-lg:h-full overflow-scroll max-lg:w-full max-lg:px-10 flex flex-col">
          <div className="">
            <h2 className="text-4xl font-medium mb-4 capitalize">{product.productname}</h2>
          </div>
          <div className="">
            <h2 className="text-4xl font-medium mb-4">{product.Title}</h2>
            <h2 className="font-semibold text-lg">
              Rs.{" "}
              {currencyFormatter.format(product.price, {
                code: "IND",
              })}
            </h2>
          </div>
          <div className="">
            <h2 className="text-xl font-medium my-2">
              Sub Title : <span className="font-normal">{product.subTitle}</span>
            </h2>
          </div>
          <div className=" ">
            <div className="flex flex-row  gap-5 items-center"></div>
          </div>
          <div className="my-2">
            {product.sizes.map((size) => (
              <div key={size.size} className="flex">
                <label className="font-semibold w-28 ">
                  {size.size} Quantity{" "}
                </label>
                <span>: {size.quantity == null ? 0: size.quantity}</span>
              </div>
            ))}
          </div>
          <div className="my-2">
            <label htmlFor="" className="font-semibold text-lg">
              Gender :
            </label>
            <span className="capitalize"> {product.gender}</span>
          </div>

          <div className="my-4">
            <h1 className="font-semibold tracking-widest">PRODUCT DETAILS :</h1>
            <p className="pr-12">{product?.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;
