import React, { useEffect, useState } from "react";
import Navbar from "../../Componenets/Navbar/Navbar";
import CartItem from "../../Componenets/CartItem/CartItem";
import { useDispatch, useSelector } from "react-redux";
import cartReducer from "../../reducer/CartReducer";
import { getUserCart } from "../../Action/CartReducer";


const Cart = () => {
  const dispatch = useDispatch()

  const cartData = useSelector(state => state.cartReducer.cartData)
  const user = useSelector(state =>state.authReducer?.authData?.user?._id)
  console.log(cartData);

  useEffect(()=>{
    dispatch(getUserCart(user))
  },[])
  console.log(user);
  console.log(cartData);

  return (
    <div>
      <Navbar bgWhite={true}  />
      <div className="p-12 pb-5 pt-32 grid grid-cols-6 w-full gap-2  ">
        <div className="col-span-4 space-y-1 overflow-scroll max-h-[34rem]">
          {
            cartData.map((data,i)=>(

              <CartItem key={i} data={data}/>
            ))
          }
         
        </div>
        <div className="col-span-2  max-h-96">

        </div>
      </div>
    </div>
  );
};

export default Cart;
