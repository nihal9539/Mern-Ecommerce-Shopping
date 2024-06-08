import { useState } from "react";
import { Stepper } from "@mantine/core";
import DeliveryAddress from "../../Componenets/DeliveryAddress/DeliveryAddress";
import "@mantine/core/styles.css";
import OrderSummery from "../../Componenets/OrderSummery/OrderSummery";
import PaymentSuccess from "../../Componenets/PaymentSuccess/PaymentSuccess";
import { useSelector } from "react-redux";
import Navbar from "../../Componenets/Navbar/Navbar";
import { Link } from "react-router-dom";
import checkout from "../../assets/checkout.svg"

const Checkout = () => {
  const [active, setActive] = useState(0);
  const nextStep = () =>
    setActive((current) => (current < 2 ? current + 1 : current));
  const { cartData } = useSelector((state) => state.cartReducer);

  if (cartData) {
    return(
      <>
       <Navbar bgWhite={true} />
        <div className="flex flex-col gap-5 justify-center items-center h-screen w-full">
          <h1 className="text-2xl font-semibold">
            <img width={200} src={checkout} alt="" />
            Your Cart is <span className="text-red-600">Empty!</span>
          </h1>
          <Link to={'/'} className=' bg-black text-white p-3 px-5 rounded-lg border duration-300 hover:shadow-boxShadow1 border-black'>Back to Home</Link>
             
        </div>
      </>
    )
  }



  return (
    <>
      <div className="p-10 h-screen overflow-hidden">
        <div className="">
          {" "}
          <Stepper
            className=" p-10"
            active={active}
            onStepClick={setActive}
            allowNextStepsSelect={false}
          >
            <Stepper.Step label="Delivery" description="Address">
              <DeliveryAddress
                nextStep={nextStep}
               
              />
            </Stepper.Step>
            <Stepper.Step label="Order" description="Summery">
              <OrderSummery
                nextStep={nextStep}
                
              />
            </Stepper.Step>
            <Stepper.Step label="Payment" description=" ">
              <PaymentSuccess/>
            </Stepper.Step>
            
          </Stepper>
        </div>
      </div>
    </>
  );
};

export default Checkout;
