import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { revenueByMonthAction } from "../Action/DashboardAction";

export const useFetchRevenue = () => {
  const dispatch = useDispatch();
  const { revenueByMonthData } = useSelector((state) => state.dashboardReducer);
  const [
    monthlyRevenuePercentageIncrease,
    setMonthlyRevenuePercentageIncrease,
  ] = useState(0);
  const [currentMonthRevenue, setCurrentMonthRevenue] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    dispatch(revenueByMonthAction());
  }, [dispatch]);

  useEffect(() => {
    if (revenueByMonthData.length > 1) {
      const lastMonthRevenue =
        revenueByMonthData[revenueByMonthData.length - 2].totalAmount;
      const currentMonthRevenue =
        revenueByMonthData[revenueByMonthData.length - 1].totalAmount;
      const increase =
        ((currentMonthRevenue - lastMonthRevenue) / lastMonthRevenue) * 100;
      setMonthlyRevenuePercentageIncrease(increase);
      setCurrentMonthRevenue(currentMonthRevenue);
    } else if (revenueByMonthData.length === 1) {
      setMonthlyRevenuePercentageIncrease("N/A");
      setCurrentMonthRevenue(revenueByMonthData[0].totalAmount);
    }

    const revenue = revenueByMonthData.reduce(
      (acc, item) => acc + item.totalAmount,
      0
    );
    setTotalRevenue(revenue);
  }, [revenueByMonthData]);


  return {
    monthlyRevenuePercentageIncrease,
    currentMonthRevenue,
    totalRevenue,
  };
};
