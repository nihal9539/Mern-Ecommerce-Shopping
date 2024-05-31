import React, { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { RiSubtractFill } from "react-icons/ri";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../../Action/CartReducer";

const CartItem = ({ data }) => {
  const [quantity, setQuantity] = useState(data.quantity);
  const userid = useSelector((state) => state.authReducer.authData.user._id);
  const dispatch = useDispatch();

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(userid, data?.productId, data.size));
  };

  console.log(data);
  return (
    <div className=" border border-gray-400 rounded-md p-2 flex flex-row items-start justify-between  gap-4">
      <div className=" flex items-center gap-4">
        <img
          src={data?.imageUrl}
          className="w-20 h-24 rounded-md"
          alt="Image"
        />
        <div className="flex  items-center justify-between max-lg:w-72 max-md:w-64 w-[30rem] ">
          <div className="flex gap-4 j flex-col">
            <h1 className="text-xl max-md:text-base font-bold">{data.productName}</h1>
            <span className="text-gray-700">Size : {data.size}</span>
          </div>
          <div className="flex ">
            <button
              disabled={quantity === 1}
              className="border p-1 flex justify-center items-center rounded-l-md w-10 max-md:w-7 text-3xl  "
              onClick={() => setQuantity(quantity - 1)}
            >
              <RiSubtractFill fill={`${quantity == 1 ? "gray" : "black"}`} />
            </button>
            <div className="border p-1 flex justify-center items-center  w-10 max-md:w-7 text-xl ">
              {quantity}
            </div>
            <button
              disabled={quantity === 20}
              className="border p-1 flex justify-center items-center rounded-r-md w-10 max-md:w-7 text-3xl  "
              onClick={() => setQuantity(quantity + 1)}
            >
              <IoMdAdd fill={`${quantity == 20 ? "gray" : "black"}`} />
            </button>
          </div>
        </div>
      </div>
      <div className=" flex gap-10 h-full  flex-col min-w-20  items-center">
        <div className="text-xl max-md:text-base font-bold">
          ₹<span>{quantity * data.price}</span>
        </div>
        <div className="">
          <RiDeleteBin6Line size={30} fill="red" onClick={handleRemoveFromCart} className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
