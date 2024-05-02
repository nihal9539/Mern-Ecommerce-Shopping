import React, { useState } from "react";
import HeaderTwo from "../../Componenets/HeaderTwo/HeaderTwo";
import CartItem from "../../Componenets/CartItem/CartItem";


const Cart = () => {

  return (
    <div>
      <HeaderTwo />
      <div className="p-12 pb-5 pt-32 grid grid-cols-6 w-full gap-2  ">
        <div className="col-span-4 space-y-1 overflow-scroll max-h-[34rem]">
          <CartItem/>
          <CartItem/>
          <CartItem/>
          <CartItem/>
          <CartItem/>
        </div>
        <div className="col-span-2  max-h-96">

        </div>
      </div>
    </div>
  );
};

export default Cart;
