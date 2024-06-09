import React from "react";
import { Link } from "react-router-dom";

const Order = () => {
  return (
    <div>
      <div
        className={`flex flex-col gap-5 justify-center items-center  h-[32rem]   w-full`}
      >
        <h1 className="text-lg text-center ">
          You haven't placed any orders yet. <br />
          We can't wait to have you as a customer.
        </h1>
        <h1 className=" text-lg font-semibold">Take a look at our products here</h1>
        <Link
          to={"/collection/all"}
          className="btn text-white hover:bg-black hover:scale-95 duration-500 bg-black"
        >
          View Products
        </Link>
      </div>
    </div>
  );
};

export default Order;
