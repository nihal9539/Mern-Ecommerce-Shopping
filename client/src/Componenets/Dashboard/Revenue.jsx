import { Pie } from "react-chartjs-2";
import "chart.js/auto";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { revenueByCategory } from "../../Action/DashboardAction";

const Revenue = () => {
  const dispatch = useDispatch();

  const { revenueCategory } = useSelector((state) => state.dashboardReducer);

  const [chartData, setChartData] = useState({});

  useEffect(()=>{
    dispatch(revenueByCategory());
  },[])

  useEffect(() => {
    // Extract labels and values from data
    const labels = revenueCategory?.map((item) => item.name);
    const values = revenueCategory?.map((item) => item.revenue);
    const colors = ["#6366F1", "#FBBF24", "#14B8A6", "#9CA3AF"];

    setChartData({
      labels,
      datasets: [
        {
          label: "Revenue",
          data: values,
          backgroundColor: colors,
        },
      ],
    });
  }, []);

  return (
    <div className="  h-[28rem] mb-36  ">
      <h1 className="font-bold p-5 text-2xl">
        Revenue Distribution by Category
      </h1>
      {chartData && chartData.datasets && <Pie data={chartData} />}
    </div>
  );
};

export default Revenue;
