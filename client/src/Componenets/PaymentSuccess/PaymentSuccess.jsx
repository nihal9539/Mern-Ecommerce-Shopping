import { useEffect, useState } from "react";
import image from "../../assets/payment_success.svg";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserCart } from "../../Action/CartAction";

const PaymentSuccess = () => {
  const dispatch = useDispatch();
  const [click, setClick] = useState(false);
  const userId = useSelector(
    (state) => state?.authReducer?.authData?.user?._id
  );

  useEffect(() => {
    dispatch(getUserCart(userId));
    setClick(false);
  }, [click]);
  return (
    <div className="w-full flex justify-center flex-col items-center ">
      <img className="w-44 mt-28" src={image} alt="" />
      <h1 className="p-4 font-bold text-xl tracking-wide">
        Your Payment is Successfull
      </h1>

      <Link
        to={"/"}
        onClick={() => setClick(true)}
        className=" bg-black text-white p-3 px-5 rounded-lg border duration-300 hover:shadow-boxShadow1 border-black"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default PaymentSuccess;
