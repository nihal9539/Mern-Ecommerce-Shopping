import React, { useState } from "react";
import HeaderTwo from "../../Componenets/HeaderTwo/HeaderTwo";
import img3 from "../../assets/image/img-9.jpg";
import { IoMdAdd } from "react-icons/io";
import { RiSubtractFill } from "react-icons/ri";
import { RiDeleteBin6Line } from "react-icons/ri";

const Cart = () => {
  const [quantity, setQuantity] = useState<number>(0);

  return (
    <div>
      <HeaderTwo />
      <div className="p-12 pt-32 grid grid-cols-6 w-full gap-2  ">
        <div className="col-span-4 space-y-1">
          <div className=" border rounded-md p-4 flex flex-row items-center justify-between  gap-4">
            <div className=" flex gap-4">
              <img
                src={"./images/man-2.jpg"}
                className="w-28 h-32 rounded-md"
                alt=""
              />
              <div className="flex  items-center justify-between gap-56">
                <div className="flex gap-4 j flex-col">
                  <h1 className="text-xl font-bold">Man shirt</h1>
                  <span className="text-gray-700">Size : M</span>
                </div>
                <div className="flex ">
                  <div
                    className="border p-1 flex justify-center items-center rounded-l-md w-10 text-3xl  "
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <IoMdAdd />
                  </div>
                  <div className="border p-1 flex justify-center items-center  w-10 text-xl ">
                    {quantity}
                  </div>
                  <div
                    className="border p-1 flex justify-center items-center rounded-r-md w-10 text-3xl  "
                    onClick={() => setQuantity(quantity - 1)}
                  >
                    <RiSubtractFill />
                  </div>
                </div>
              </div>
            </div>

            <div className="origin-right">
              <div>Rs: 500</div>
              <div>
                <RiDeleteBin6Line size={30} fill="red" />
              </div>
            </div>
          </div>
          <div className=" border rounded-md p-4 flex flex-row items-center justify-between  gap-4">
            <div className=" flex gap-4">
              <img
                src={"./images/man-2.jpg"}
                className="w-28 h-32 rounded-md"
                alt=""
              />
              <div className="flex  items-center justify-between gap-56">
                <div className="flex gap-4 j flex-col">
                  <h1 className="text-xl font-bold">Man shirt</h1>
                  <span className="text-gray-700">Size : M</span>
                </div>
                <div className="flex ">
                  <div
                    className="border p-1 flex justify-center items-center rounded-l-md w-10 text-3xl  "
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <IoMdAdd />
                  </div>
                  <div className="border p-1 flex justify-center items-center  w-10 text-xl ">
                    {quantity}
                  </div>
                  <div
                    className="border p-1 flex justify-center items-center rounded-r-md w-10 text-3xl  "
                    onClick={() => setQuantity(quantity - 1)}
                  >
                    <RiSubtractFill />
                  </div>
                </div>
              </div>
            </div>

            <div className="origin-right">
              <div>Rs: 500</div>
              <div>
                <RiDeleteBin6Line size={30} fill="red" />
              </div>
            </div>
          </div>
          <div className=" border rounded-md p-4 flex flex-row items-center justify-between  gap-4">
            <div className=" flex gap-4">
              <img
                src={"./images/man-2.jpg"}
                className="w-28 h-32 rounded-md"
                alt=""
              />
              <div className="flex  items-center justify-between gap-56">
                <div className="flex gap-4 j flex-col">
                  <h1 className="text-xl font-bold">Man shirt</h1>
                  <span className="text-gray-700">Size : M</span>
                </div>
                <div className="flex ">
                  <div
                    className="border p-1 flex justify-center items-center rounded-l-md w-10 text-3xl  "
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <IoMdAdd />
                  </div>
                  <div className="border p-1 flex justify-center items-center  w-10 text-xl ">
                    {quantity}
                  </div>
                  <div
                    className="border p-1 flex justify-center items-center rounded-r-md w-10 text-3xl  "
                    onClick={() => setQuantity(quantity - 1)}
                  >
                    <RiSubtractFill />
                  </div>
                </div>
              </div>
            </div>

            <div className="origin-right">
              <div>Rs: 500</div>
              <div>
                <RiDeleteBin6Line size={30} fill="red" />
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-2 bg-red-500">hi</div>
      </div>
    </div>
  );
};

export default Cart;
