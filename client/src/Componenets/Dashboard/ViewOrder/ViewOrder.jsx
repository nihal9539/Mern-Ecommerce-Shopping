import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOderById } from "../../../Action/OrderAction";
import { useParams } from "react-router-dom";
import { Stepper } from "@mantine/core";
import { Container, Home, Truck, User2 } from "lucide-react";
import { FaShippingFast } from "react-icons/fa";
import { PiShoppingCartSimple } from "react-icons/pi";
import { DataTable } from "mantine-datatable";
import { format, getMonth } from "date-fns";

const ViewOrder = () => {
  const { orderById } = useSelector((state) => state.orderReducer);
  console.log(orderById.length);
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(getOderById(id));
  }, [id]);
  var totalAmount = 0;
  orderById?.orderItems?.map((data) => {
    totalAmount += data.price * data.quantity;
  });

  const [active, setActive] = useState();
  const statusIcons = {
    Pending: <Truck />,
    Processing: <Container />,
    Shipped: <PiShoppingCartSimple />,
    Delivered: <FaShippingFast />,
  };

  const statusSteps = ["Pending", "Processing", "Shipped", "Delivered"];
  useEffect(() => {
    if (orderById && orderById.orderStatus) {
      const currentStatusIndex = statusSteps.indexOf(orderById.orderStatus);
      setActive(currentStatusIndex + 1);
    }
  }, [orderById, id]);
  if (orderById.length == 0) {
    return <div>loading...</div>;
    
  }
  return (
    <div>
      <div></div>
      <h1 className="ml-2 font-semibold text-xl"># {orderById._id}</h1>
      <h1 className="ml-2 font-semibold text-sm text-gray-800 mt-2">
        Order Details / {orderById._id} -{" "}
        {format(new Date(orderById.createdAt), "MMM dd  yyyy")} at{" "}
        {format(new Date(orderById.createdAt), "hh:mm a")}{" "}
      </h1>
      <div className="p-2 pt-8 grid gap-8 grid-cols-6">
        <div className="p-4 col-span-4 row-span-3 max-md:col-span-6 bg-white shadow-md rounded-lg">
          <div className="mb-2 ">
            <h1 className="font-semibold text-lg"> Progress</h1>
            <p className="text-xs text-gray-700">Current order status</p>
          </div>
          <div className="mb-10 my-4">
            <Stepper
              className="px-10"
              styles={{
                stepBody: {
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                },
                stepLabel: { position: "absolute", bottom: -42, left: -62 }, // Adjust margin as needed
              }}
              active={active}
              onStepClick={setActive}
              allowNextStepsSelect={false}
            >
              {statusSteps.map((status, index) => (
                <Stepper.Step
                  key={index}
                  label={status}
                  icon={statusIcons[status]}
                />
              ))}
            </Stepper>
          </div>
        </div>
        <div className="p-6  overflow-auto row-span-4 relative col-span-2 max-md:col-span-6 bg-white shadow-md rounded-2xl">
          <div className="h-full">
            <div className="mb-5 ">
              <h1 className="font-semibold text-lg"> Customer</h1>
              <p className="text-xs text-gray-700">Information Detail</p>
            </div>
            <div>
              <div>
                <div className="flex items-end gap-1">
                  <User2 size={15} />
                  <span className="text-xs font-bold tracking-tight text-gray-700">
                    Genderal Information
                  </span>
                </div>
                <div className="ml-10">
                  <ul className="list-disc text-xs text-gray-700 mt-1">
                    <li>{orderById.userId.username}</li>
                    <li>{orderById.userId.email}</li>
                  </ul>
                </div>
              </div>
              <div className="mt-5">
                <div className="flex items-end gap-1">
                  <Home size={15} />
                  <span className="text-xs font-bold tracking-tight text-gray-700">
                    Shipping Address
                  </span>
                </div>
                <div className="ml-10">
                  <ul className="list-disc text-xs text-gray-700 mt-1">
                    <li>{orderById.shippingAddressId.address}</li>
                    <li>{orderById.shippingAddressId.pinCode}</li>
                    <li>{orderById.shippingAddressId.city}</li>
                    <li>{orderById.shippingAddressId.state}</li>
                    <li>{orderById.shippingAddressId.phone}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="p-4 col-span-4 overflow-auto row-span-3 max-md:col-span-6 bg-white shadow-md rounded-lg">
          <div className="mb-2 ">
            <h1 className="font-semibold text-lg"> Product</h1>
            <p className="text-xs text-gray-700">Your Shipment</p>
          </div>
          <div className="mb-10 my-4">
            <DataTable
              columns={[
                {
                  accessor: "id",
                  textAlign: "center",

                  render: (data) => (
                    <span className="text-gray-700">{data._id}</span>
                  ),
                },
                {
                  accessor: "Item",
                  textAlign: "center",
                  width: 200,
                  render: (data) => (
                    <div className="flex items-center gap-4 flex-row">
                      <img src={data.imagUrl} className="w-12 h-12" alt="" />
                      <div>
                        <h1>{data.productname}</h1>
                      </div>
                    </div>
                  ),
                },
                {
                  accessor: "size",
                  textAlign: "center",
                },
                {
                  accessor: "price",
                  textAlign: "center",

                  render: (data) => (
                    <span className="font-bold">₹{data.price}</span>
                  ),
                },
                {
                  accessor: "quantity",
                  textAlign: "center",
                  render: (data) => (
                    <span className="font-bold">x {data.quantity}</span>
                  ),
                },
                {
                  accessor: "Amount",
                  textAlign: "center",
                  render: (data) => (
                    <span className="font-bold">
                      ₹{data.price * data.quantity}
                    </span>
                  ),
                },
              ]}
              records={orderById.orderItems}
              totalRecords={orderById.orderItems.length}
            />
          </div>
          <div className="flex justify-between px-4 py-2 rounded bg-gray-100">
            <span className="font-bold">Total</span>
            <span className="font-bold">₹{totalAmount}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewOrder;
