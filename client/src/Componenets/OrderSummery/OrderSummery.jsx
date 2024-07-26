/* eslint-disable react/prop-types */
import  { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../CartItem/CartItem";
import { ShoppingCart } from "lucide-react";
import currencyFormatter from "currency-formatter";
import axios from "axios";
import useToken from "../../hooks/useToken";
import { getUserCart } from "../../Action/CartAction";
import { orderRequest } from "../../api/PaymentRequest";

const OrderSummery = ({ nextStep }) => {
  const { headers } = useToken();

  const { cartData } = useSelector((state) => state.cartReducer);
  const addressId = useSelector(
    (state) => state.addressReducer.addressData._id
  );
  const userId = useSelector(
    (state) => state?.authReducer?.authData?.user?._id
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserCart(userId));
  }, []);


  const [amount, setAmount] = useState(0);

  useEffect(() => {
    let totalAmount = 0;
    cartData.forEach((item) => {
      totalAmount += item.quantity * item.price;
    });
    setAmount(totalAmount);
  }, [cartData]);


  const handlePayment = async () => {
    await orderRequest(amount).then((data)=>{
      handlePaymentVerify(data.data)
    }).catch((err)=>{
      toast.error(err)
    })

  };

  const handlePaymentVerify = async (data) => {
    const options = {
      key: "rzp_test_dnkn088g41YsW6",
      amount: data.amount,
      currency: data?.currency,
      name: "Nihal",
      description: "Test Mode",
      order_id: data?.id,
      handler: async (response) => {
        try {
          const verifyData = await axios.post(
            `http://localhost:5000/payment/verify`,
            {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              addressId: addressId,
              userId: userId,
              cartData,
            },
            { headers }
          );

          if (verifyData.data.message) {
            toast.success(verifyData.data.message);
            nextStep();
          }
        } catch (error) {
          toast.error(error.response.message);
        }
      },
      theme: {
        color: "#5f63b8",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

 

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
        <div className="max-md:block hidden font-semibold text-lg">
          {" "}
          To Pay :{" "}
          {currencyFormatter.format(amount, {
            code: "IND",
          })}
        </div>
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
