import { useState } from "react";
import { Stepper, Button, Group } from "@mantine/core";
import DeliveryAddress from "../../Componenets/DeliveryAddress/DeliveryAddress";
import { Container } from "lucide-react";
import "@mantine/core/styles.css";
import OrderSummery from "../../Componenets/OrderSummery/OrderSummery";
import { State } from "country-state-city";

const Checkout = () => {
  const [active, setActive] = useState(0);
  const nextStep = () =>
    setActive((current) => (current < 2 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  const [orderDetails, setOrderDetails] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    state: "",
    city: "",
    address: "",
    pincode: "",
  });

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
                orderDetails={orderDetails}
                setOrderDetails={setOrderDetails}
              />
            </Stepper.Step>
            <Stepper.Step label="Order" description="Summery">
              <OrderSummery
                nextStep={nextStep}
                orderDetails={orderDetails}
                setOrderDetails={setOrderDetails}
              />
            </Stepper.Step>
            <Stepper.Step label="Payment" description=" "></Stepper.Step>
            
          </Stepper>
        </div>
      </div>
    </>
  );
};

export default Checkout;
