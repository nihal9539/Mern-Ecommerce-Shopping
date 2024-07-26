import { LineChart } from "@mantine/charts";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { lastTwentyDaysOrder } from "../../Action/DashboardAction";

const LastTwentyDaysOrerSummeryChart = () => {

  const {lastOrder} = useSelector(
    (state) => state.dashboardReducer
  );
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(lastTwentyDaysOrder())
  },[])
  // const data = [
  //   {
  //     _id: "2024-07-11",
  //     totalOrders: 0,
  //   },
  //   {
  //     _id: "2024-07-12",
  //     totalOrders: 0,
  //   },
  //   {
  //     _id: "2024-07-13",
  //     totalOrders: 0,
  //   },
  //   {
  //     _id: "2024-07-14",
  //     totalOrders: 0,
  //   },
  //   {
  //     _id: "2024-07-15",
  //     totalOrders: 1,
  //   },
  //   {
  //     _id: "2024-07-16",
  //     totalOrders: 0,
  //   },
  //   {
  //     _id: "2024-07-17",
  //     totalOrders: 0,
  //   },
  //   {
  //     _id: "2024-07-18",
  //     totalOrders: 0,
  //   },
  //   {
  //     _id: "2024-07-19",
  //     totalOrders: 0,
  //   },
  //   {
  //     _id: "2024-07-20",
  //     totalOrders: 0,
  //   },
  //   {
  //     _id: "2024-07-21",
  //     totalOrders: 0,
  //   },
  //   {
  //     _id: "2024-07-22",
  //     totalOrders: 1,
  //   },
  //   {
  //     _id: "2024-07-23",
  //     totalOrders: 0,
  //   },
  //   {
  //     _id: "2024-07-24",
  //     totalOrders: 3,
  //   },
  //   {
  //     _id: "2024-07-25",
  //     totalOrders: 7,
  //   },
  // ];
  console.log(lastOrder);
  return (
    <div className=" w-full">
      <h1 className="font-bold p-5 text-2xl">
        Order Summary for the Last 15 Days
      </h1>
      <LineChart
        h={350}
        data={lastOrder}
        series={[{ name: "totalOrders", label: "Total Order", }]}
        dataKey="_id"
        type="gradient"
        strokeWidth={5}
        curveType="natural"
        className="stroke-gray-300"
        yAxisProps={{ domain: [0, 50] }}
        
        valueFormatter={(value) => `${value}`}
      />
    </div>
  );
};

export default LastTwentyDaysOrerSummeryChart;
