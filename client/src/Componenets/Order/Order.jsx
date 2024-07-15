import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getOrder } from "../../Action/OrderAction";
import OrderItems from "../OrderItems/OrderItems";
import { Helmet } from "react-helmet";

const Order = () => {
  const user = useSelector((state) => state.authReducer?.authData?.user?._id);
  const { orders } = useSelector((state) => state.orderReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrder(user));
  }, []);
  const [selection, setSelection] = useState("all");
  const buttons = [
    { option: "all",  },
    { option: "onshipping", },
    { option: "arrived", },
    { option: "cancelled", },
  ];
  const isActive =
    "text-white bg-black/90  font-semibold  w-full flex justify-center  items-center rounded-lg h-full";
  const isNotActive =
    "bg-white text-gray-600 hover:text-black  font-semibold  w-full flex justify-center  items-center rounded-lg h-full";

  return (
    <div className="flex flex-col gap-4 pb-5">
      <Helmet>
        <title>Your Orders </title>
        <meta
          name="description"
          content="View your past orders, manage shipping statuses, and track deliveries."
        />
      </Helmet>
      <div className="h-14 border-2 p-2 shadow-lg shadow-black/10  flex gap-1 justify-between rounded-lg  items-center w-full bg-white">
        {buttons.map((item) => (
          <button
            disabled={selection == item.option}
            className={`${selection == item.option ? isActive : isNotActive} capitalize`}
            key={item.option}
            onClick={() => setSelection(item.option)}
            aria-label={`Filter orders by ${item.option}`}
          >
            {item.option}
          </button>
        ))}
      </div>

      <div className=" shadow-lg space-y-3 bg-transparent  w-full shadow-black/10 max-h-screen overflow-auto   rounded-lg">
        {selection == "all" &&
          orders.map((item, i) => <OrderItems data={item} key={i} />)}

        {selection == "onshipping" &&
          orders
            .filter((item) => item.isDelivered == false && item.orderStatus !== "Cancelled")
            .map((item, i) => <OrderItems data={item} key={i} />)}
        {selection == "arrived" &&
          orders
            .filter((item) => item.isDelivered == true && item.orderStatus !== "Cancelled")
            .map((item, i) => <OrderItems data={item} key={i} />)}
        {selection == "cancelled" &&
          orders
            .filter((item) => item.orderStatus == "Cancelled")
            .map((item, i) => <OrderItems data={item} key={i} />)}
      </div>

      {/* If order length is zero */}
      {orders.length === 0 && (
        <div className="flex flex-col gap-5 justify-center items-center h-[32rem] w-full">
          <h1 className="text-lg text-center">
            You haven't placed any orders yet. <br />
            We can't wait to have you as a customer.
          </h1>
          <h1 className="text-lg font-semibold">
            Take a look at our products here
          </h1>
          <Link
            to={"/collection/all"}
            className="btn text-white hover:bg-black hover:scale-95 duration-500 bg-black"
          >
            View Products
          </Link>
        </div>
      )}
    </div>
  );
};

export default Order;
