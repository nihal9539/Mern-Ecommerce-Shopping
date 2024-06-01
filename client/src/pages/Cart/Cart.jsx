import React, { useEffect, useState } from "react";
import Navbar from "../../Componenets/Navbar/Navbar";
import CartItem from "../../Componenets/CartItem/CartItem";
import { useDispatch, useSelector } from "react-redux";
import cartReducer from "../../reducer/CartReducer";
import { getUserCart } from "../../Action/CartReducer";
import { Link } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();

  const { cartData } = useSelector((state) => state.cartReducer);
  const user = useSelector((state) => state.authReducer?.authData?.user?._id);
  useEffect(() => {
    dispatch(getUserCart(user));
  }, []);

  var totalPrice = 0;

  cartData.map((item) => {
    console.log(item.price * item.quantity);
    totalPrice = totalPrice + item.price * item.quantity;
  });

  if (cartData.length <= 0) {
    return (
      <div>
        <Navbar bgWhite={true} />
        <div className="flex flex-col gap-5 justify-center items-center h-screen w-full">
          <h1 className="text-2xl font-semibold">
            <img width={200} src="/gif-1.gif" alt="" />
            Your Cart is <span className="text-red-600">Empty!</span>
          </h1>
          <Link
            to={"/collection/all"}
            className="btn text-white hover:bg-black hover:scale-95 duration-500 bg-black"
          >
            Return to Shop
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div>
      <Navbar bgWhite={true} />
      <div className="   grid relative grid-cols-7 w-full gap-2  ">
        <div className=" pt-24 p-8 col-span-5 max-md:col-span-6 space-y-1 overflow-scroll max-h-screen">
          <div className="p-8 text-2xl font-bold  flex justify-between  ">
            Shopping Cart
            <span>
              {cartData.length} <span className="text-xl">Items</span>
            </span>
          </div>
          {cartData.map((data, i) => (
            <CartItem key={i} data={data} />
          ))}
        </div>
        <div
          style={{ background: "#e9edd1" }}
          className="col-span-2 flex flex-col justify-between pt-28 p-10 text-black max-md:fixed    relative right-0 max-md:right-auto top-0 max-md:top-auto w-full h-screen  max-md:h-40 bottom-0  left-0"
        >
          <div>
            <h1 className="text-xl max-lg:text-base font-bold">Order Summery</h1>
            <hr className="my-4 border-black border" />
            <h1 className="text-lg max-lg:text-base flex justify-between">
              Cart Total : <span className="font-semibold">₹{totalPrice}</span>{" "}
            </h1>
            <h1 className="text-lg max-lg:text-base flex justify-between">
              Delivery Fee : <span className="font-semibold">Free</span>{" "}
            </h1>
            <hr className="my-2 border-black border" />
            <h1 className="text-lg max-lg:text-base flex justify-between">
              Order Total : <span className="font-semibold">₹{totalPrice}</span>{" "}
            </h1>
          </div>
          <div>
            <div className="my-4">
              <h1 className="text-lg max-lg:text-base font-bold">Return/Refund policy</h1>
              <p className="text-sm">
                In case of return, we ensure quick refunds. Full amount will be
                refunded excluding Convenience Fee
              </p>
            </div>
            <div className="mb-8">
              <h1 className="text-lg max-lg:text-base font-bold">Free Shipping</h1>
              <p className="text-sm">
                Great news! Enjoy shopping with us and get free delivery on
                every order. No extra charges, just pure savings!{" "}
              </p>
            </div>
            <div
              
              className=" bg-black hover:shadow-boxShadow1 duration-300 border-black border-2 cursor-pointer text-white p-3 text-center rounded-lg"
            >
              Check Out
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
