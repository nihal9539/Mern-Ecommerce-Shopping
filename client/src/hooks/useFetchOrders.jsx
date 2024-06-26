import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { orderByMonthAction } from "../Action/DashboardAction";

export const useFetchOrders = () => {
  const dispatch = useDispatch();
  const { orderByMonthData } = useSelector((state) => state.dashboardReducer);
  const [monthlyOrderPercentageIncrease, setMonthlyOrderPercentageIncrease] =
    useState(0);
  const [currentMonthOrder, setCurrentMonthOrder] = useState(0);

  useEffect(() => {
    dispatch(orderByMonthAction());
  }, [dispatch]);

  useEffect(() => {
    if (orderByMonthData.length > 1) {
      const lastMonthOrders =
        orderByMonthData[orderByMonthData.length - 2].totalOrders;
      const currentMonthOrders =
        orderByMonthData[orderByMonthData.length - 1].totalOrders;
      const increase =
        ((currentMonthOrders - lastMonthOrders) / lastMonthOrders) * 100;
      setMonthlyOrderPercentageIncrease(increase);
      setCurrentMonthOrder(currentMonthOrders);
    } else if (orderByMonthData.length === 1) {
      setMonthlyOrderPercentageIncrease("N/A");
      setCurrentMonthOrder(orderByMonthData[0].totalOrders);
    }
  }, [orderByMonthData]);


  return {
    monthlyOrderPercentageIncrease,
    currentMonthOrder,
  };
};
