import React from "react";
import { BarChart, Cuboid, IndianRupee, Users } from "lucide-react";
import { BsBoxSeam } from "react-icons/bs";
import { useFetchUsers } from "../../../hooks/useFetchUsers";
import { useFetchOrders } from "../../../hooks/useFetchOrders";
import { useFetchRevenue } from "../../../hooks/useFetchRevenue";
import EarningsCard from "../EarningsCard/EarningsCard";
import DashboardCard from "../DashboardCard/DashboardCard";
import { useTotalProductCount } from "../../../hooks/useTotalProductCount";
const Dashboard = () => {
  const { currentMonthUsers, percentageIncrease } = useFetchUsers();
  const { currentMonthOrder, monthlyOrderPercentageIncrease } =
    useFetchOrders();

  const {
    currentMonthRevenue,
    monthlyRevenuePercentageIncrease,
    totalRevenue,
  } = useFetchRevenue();
  const {productPercentageNull,totalProductCount} =  useTotalProductCount()
  const cardData = [
    {
      title: "Customers",
      icon: <Users />,
      value: currentMonthUsers,
      percentage: percentageIncrease,
      color: "#03C9D7",
      bgColor: "#E5FAFB",
    },
    {
      title: "Sales",
      icon: <BarChart />,
      value: currentMonthOrder,
      percentage: monthlyOrderPercentageIncrease,
      color: "rgb(228, 106, 118)",
      bgColor: "rgb(255, 244, 229)",
    },
    {
      title: "Revenue",
      icon: <IndianRupee />,
      value: `₹${currentMonthRevenue}`,
      percentage: monthlyRevenuePercentageIncrease,
      color: "white",
      bgColor: "#1A97F5",
    },
    {
      title: "Total Product",
      icon: <BsBoxSeam />,
      value: totalProductCount,
      percentage: productPercentageNull,
      color: "white",
      bgColor: "rgb(254, 201, 15)"
    }
  ];
  return (
    <main>
      <header>Dashboard</header>
      <section className="flex m-3 flex-wrap justify-start gap-14 max-lg:justify-center  items-center">
        <EarningsCard totalRevenue={totalRevenue} />
        {cardData.map((item) => (
          <DashboardCard
            key={item.title}
            title={item.title}
            icon={item.icon}
            value={item.value}
            percentage={item.percentage}
            color={item.color}
            bgColor={item.bgColor}
          />
        ))}
      </section>
    </main>
  );
};

export default Dashboard;
