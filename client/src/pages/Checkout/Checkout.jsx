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
    country: "",
    state: "",
    address: "",
    pincode: "",
    
  });

  return (
    <>
      <div className="grid grid-cols-7">
        <div className="col-span-5">
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
            <Stepper.Step label="Payment" description=" Option"></Stepper.Step>
            <Stepper.Step
              label="Final step"
              description="Basic Details"
            ></Stepper.Step>
            <Stepper.Completed>
              Completed, click back button to get to previous step
            </Stepper.Completed>
          </Stepper>
        </div>
        <div
          style={{ background: "#e9edd1" }}
          className="col-span-2 bg-red-300 h-screen"
        ></div>
      </div>
    </>
  );
};

export default Checkout;
