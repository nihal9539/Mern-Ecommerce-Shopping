/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { RiSubtractFill } from "react-icons/ri";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { cartQuantityUpdate, removeFromCart } from "../../Action/CartAction";
import { Link } from "react-router-dom";

const CartItem = ({ data, order,updateTotalPrice }) => {
  const [quantity, setQuantity] = useState(data?.quantity ) ;
  const [imageSrc, setImageSrc] = useState(""); // State for the image source

  const userId = useSelector((state) => state.authReducer.authData.user._id);
  const dispatch = useDispatch();

  const handleRemoveFromCart = () => {
    dispatch(
      removeFromCart(userId, data?.productId, data?.size, data.quantity)
    );
    updateTotalPrice(data?.price * count);

  };
  const handleCount = (count) => {
    setQuantity(quantity + count);
    dispatch(cartQuantityUpdate(userId, data?.productId, data?.size, count));
    updateTotalPrice(data?.price * count);
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setImageSrc(data?.image); // Update the image source after 1 second
    }, 500);

    return () => clearTimeout(timer); // Cleanup the timer on unmount
  }, [data?.image]);

  
  return (
    <div className=" border border-gray-400 rounded-md p-2 flex flex-row items-center justify-between  gap-4">
      <div className=" flex items-center gap-4">
        <Link to={`/product/${data?.productId}`}>
          <img
            src={imageSrc}
            className="w-20 h-24 max-md:w-12 max-md:h-16 rounded-md"
            alt="Image"
          />
        </Link>
        <div className="flex  items-center justify-between max-lg:w-72 max-md:w-64 w-[30rem] ">
          <div className="flex gap-4 j flex-col min-w-40 w-56 max-w-72">
            <h1 className="text-xl max-lg:text-sm font-bold">
              {data?.productname}
              {order ? (
                <span className="font-medium">{" /" + data.size}</span>
              ) : (
                ""
              )}
            </h1>
            {order ? (
              <span>Quantity: {quantity}</span>
            ) : (
              <span className="text-gray-700">Size : {data.size}</span>
            )}
          </div>
          {order ? (
            ""
          ) : (
            <div className="flex ">
              <button
                disabled={quantity === 1}
                className="border p-1 flex justify-center items-center rounded-l-md w-10 max-lg:w-7 max-md:w-5 text-2xl  "
                onClick={() => handleCount(-1)}
              >
                <RiSubtractFill
                  className="max-lg:w-8 "
                  fill={`${quantity == 1 ? "gray" : "black"}`}
                />
              </button>
              <div className="border p-1 flex justify-center items-center  w-10 max-lg:w-7 max-md:w-5 text-xl max-lg:text-sm ">
                {quantity}
              </div>
              <button
                disabled={quantity === 20}
                className="border p-1 flex justify-center items-center rounded-r-md w-10 max-lg:w-7 max-md:w-5 text-2xl  "
                onClick={() => handleCount(1)}
              >
                <IoMdAdd fill={`${quantity == 20 ? "gray" : "black"}`} />
              </button>
            </div>
          )}

          <div></div>
        </div>
      </div>
      <div
        className={` flex gap-10 h-full  flex-col min-w-20 justify-center items-center`}
      >
        <div className="text-xl max-md:text-sm font-bold">
          ₹<span>{quantity * data?.price}</span>
        </div>
        {order ? (
          ""
        ) : (
          <div className="">
            <RiDeleteBin6Line
              size={20}
              fill="red"
              onClick={handleRemoveFromCart}
              className="cursor-pointer"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CartItem;
