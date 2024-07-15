import React from "react";
import { Link } from "react-router-dom";

const OrderItems = ({ data }) => {
  var totalPrice = 0;
  data?.orderItems?.map((item) => {
    totalPrice = totalPrice + item.price * item.quantity;
  });

console.log(data);
  return (
    <div className=" border rounded-md shadow-xl px-2 bg-transparent ">
      <Link to={`${data?._id}`} className="p-2 ">
        {data?.orderItems.map((items, i) => (
          <div key={i} className="mb-2 flex border items-center rounded-lg">
            <img
              src={items?.imageUrl}
              className="rounded-l-md w-24 h-24 overflow-hidden border-r-2"
              alt=""
            />
            <div className="p-2 text-sm space-y-1 tracking-tighter font-bold">
              <h1 className="font-semibold capitalize">{items?.productname}</h1>
              <h1>
                MRP : {items?.price}{" "}
                <span className="text-gray-600 text-xs">
                  x{items?.quantity}
                </span>
              </h1>
              <h1>{items?.size}</h1>
            </div>
          </div>
        ))}
      </Link>
      <div className="border-t flex justify-between items-center px-5 h-12">
        <div className="font-semibold">
          Total: <span className=" font-bold">{totalPrice}</span>
        </div>
        {data?.isDelivered ? (
          <div className=" flex items-center text-green-500 bg-green-300/35 px-2 gap-2 border p-1.5 rounded-2xl">
            <div className="bg-green-500 w-2 h-2 rounded-full"></div>
            <span className="text-xs tracking-tighter">Delivered</span>
          </div>
        ) : (
          <div className={` ${data?.orderStatus == "Cancelled" ?"hidden":"block"} flex items-center text-orange-500 bg-orange-300/35 px-2 gap-2 border p-1.5 rounded-2xl`}>
            <div className="bg-orange-500 w-2 h-2 rounded-full"></div>
            <span className="text-xs tracking-tighter">On Deliver</span>
          </div>
        )}
        {data?.orderStatus == "Cancelled" && (
          <div className=" flex items-center text-orange-500 bg-orange-300/35 px-2 gap-2 border p-1.5 rounded-2xl">
            <div className="bg-orange-500 w-2 h-2 rounded-full"></div>
            <span className="text-xs tracking-tighter">Cancelled</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderItems;
