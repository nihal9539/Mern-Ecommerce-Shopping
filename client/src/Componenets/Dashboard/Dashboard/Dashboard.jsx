import React, { useEffect, useState } from "react";
import { BarChart, Cuboid, IndianRupee, Users } from "lucide-react";
import { BsBoxSeam } from "react-icons/bs";
import { useFetchUsers } from "../../../hooks/useFetchUsers";
import { useFetchOrders } from "../../../hooks/useFetchOrders";
import { useFetchRevenue } from "../../../hooks/useFetchRevenue";
import EarningsCard from "../EarningsCard/EarningsCard";
import DashboardCard from "../DashboardCard/DashboardCard";
import { useTotalProductCount } from "../../../hooks/useTotalProductCount";
import axios from "axios";
import { BarChart } from '@mantine/charts';
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
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/order/seven-day/order');
        const orders = response.data;
        console.log('====================================');
        console.log(response);
        console.log('====================================');

        // Get the last 7 days
        const days = Array(7).fill('').map((_, index) => {
          const date = new Date();
          date.setDate(date.getDate() - (6 - index)); // Ensures the days are ordered from 7 days ago to today
          return {
            day: date.toLocaleDateString('en-US', { weekday: 'long' }),
            date: date.toISOString().split('T')[0] // yyyy-mm-dd format
          };
        });

        // Prepare the order count for each day
        const ordersCount = days.map(day => {
          const order = orders.find(order => order._id === day.date);
          return {
            day: day.day,
            count: order ? order.count : 0
          };
        });

        setData(ordersCount);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrders();
  }, []);
  // http://localhost:5000/order/seven-day/order  
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
      <BarChart
      data={data}
      keys={['count']}
      indexBy="day"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      layout="vertical"
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Day',
        legendPosition: 'middle',
        legendOffset: 32
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Orders Count',
        legendPosition: 'middle',
        legendOffset: -40
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor="inherit"
      animate={true}
    />
    </main>
  );
};

export default Dashboard;
