import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import CartItem from "../CartItem/CartItem";
import { ShoppingCart } from "lucide-react";
import currencyFormatter from "currency-formatter";

const OrderSummery = () => {
  const { cartData } = useSelector((state) => state.cartReducer);
  console.log(cartData);
  const addressId= useSelector((state) => state.addressReducer.addressData._id);
  const userId = useSelector((state) => state.authReducer.authData.user._id);

  const [amount, setAmount] = useState(0);

  useEffect(() => {
    let totalAmount = 0;
    cartData.forEach((item) => {
      totalAmount += item.quantity * item.price;
    });
    setAmount(totalAmount);
  }, [cartData]);

  const handlePayment = async () => {
    try {
        const res = await fetch(`http://localhost:5000/payment/order`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                amount
            })
        });

        const data = await res.json();
        handlePaymentVerify(data.data)
    } catch (error) {
        console.log(error);
    }
}
 
  const handlePaymentVerify = async (data) => {
    const options = {
        key: import.meta.env.RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        name: "Nihal",
        description: "Test Mode",
        order_id: data.id,
        handler: async (response) => {
            console.log("response", response)
            try {
                const res = await fetch(`http://localhost:5000/payment/verify`, {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature,
                        addressId:addressId,
                        userId:userId
                    })
                })

                const verifyData = await res.json();

                if (verifyData.message) {
                    toast.success(verifyData.message)
                }
            } catch (error) {
                console.log(error);
            }
        },
        theme: {
            color: "#5f63b8"
        }
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
}
  return (
    <div className="grid grid-cols-7  w-full">
      <div className="col-span-5  max-md:col-span-7 px-5">
        <div className=" overflow-scroll relative h-[35.15rem] flex gap-2 flex-col">
          {cartData.map((data, i) => (
            <CartItem key={i} order={true} data={data} />
          ))}
         
         
        </div>
      </div>
      <div
        className="col-span-2 relative shadow-md max-md:h-[25vh] h-96 items-center w-full max-md:flex-row  flex flex-col justify-between pt-10 max-md:pt-5 px-5 max-lg:px-6 text-black max-md:fixed   right-0 max-md:right-auto top-0 max-md:top-auto w-full   bottom-0  left-0"
        style={{ background: "#e9edd1" }}
      >
        <div className="max-md:block hidden font-semibold text-lg">  To Pay :{" "}{currencyFormatter.format(amount, {
                code: "IND",
              })}</div>
        <div className="max-md:hidden w-full">
          <h1 className="text-xl max-md:hidden  max-lg:text-base font-bold flex gap-2">
            <ShoppingCart /> PRICE DETAILS
          </h1>
          <hr className="my-4 max-md:hidden border-gray-500 border" />
          <h1 className="text-base max-lg:text-sm my-2 flex justify-between">
            Price ({cartData.length} items) :{" "}
            <span className="font-semibold">₹{amount}</span>{" "}
          </h1>
          <h1 className="text-base my-3 max-lg:text-sm flex justify-between">
            Delivery Fee : <span className="font-semibold">Free</span>{" "}
          </h1>
          <hr className="my-2 border-gray-500 border" />
          <h1 className="text-lg mt-3 max-lg:text-base font-semibold flex justify-between">
            To Pay :{" "}
            <span className="">
              ₹
              {currencyFormatter.format(amount, {
                code: "IND",
              })}
            </span>{" "}
          </h1>
        </div>
          <button
              className="p-2 float-end relative bottom-5 max-md:bottom-2  px-10 bg-black text-white rounded-md duration-300 hover:shadow-boxShadow1 border-black border"
              onClick={handlePayment}
            >
              Place Order
            </button>
      </div>
    </div>
  );
};

export default OrderSummery;
