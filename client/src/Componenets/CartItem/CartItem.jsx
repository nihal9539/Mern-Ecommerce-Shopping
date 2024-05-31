import React, { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { RiSubtractFill } from "react-icons/ri";
import { RiDeleteBin6Line } from "react-icons/ri";

const CartItem = ({data}) => {
  const [quantity, setQuantity] = useState(data.quantity);

  return (
    <div className=" border rounded-md p-4 flex flex-row items-start justify-between  gap-4">
      <div className=" flex gap-4">
        <img
          src={"./images/man-2.jpg"}
          className="w-28 h-32 rounded-md"
          alt=""
        />
        <div className="flex  items-center justify-between max-lg:w-72 w-[30rem] ">
          <div className="flex gap-4 j flex-col">
            <h1 className="text-xl font-bold">Man shirt</h1>
            <span className="text-gray-700">Size : {data.size}</span>
          </div>
          <div className="flex ">
            <button
              disabled={quantity === 1}
              className="border p-1 flex justify-center items-center rounded-l-md w-10 text-3xl  "
              onClick={() => setQuantity(quantity - 1)}
            >
              <RiSubtractFill fill={`${quantity == 1 ? "gray" : "black"}`} />
            </button>
            <div className="border p-1 flex justify-center items-center  w-10 text-xl ">
              {quantity}
            </div>
            <button
              disabled={quantity === 20}
              className="border p-1 flex justify-center items-center rounded-r-md w-10 text-3xl  "
              onClick={() => setQuantity(quantity + 1)}
            >
              <IoMdAdd fill={`${quantity == 20 ? "gray" : "black"}`}/>
            </button>
          </div>
        </div>
      </div>
      <div className=" flex gap-16 flex-col min-w-20   relative items-center">
        <div className="text-xl font-bold">
          ₹<span>{quantity * data.price}</span>
        </div>
        <div className="relative bottom-0">
          <RiDeleteBin6Line size={30} fill="red" className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
