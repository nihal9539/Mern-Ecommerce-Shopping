import { useEffect, useState } from "react";
import { getUsersByMonth } from "../Action/DashboardAction";
import { useDispatch, useSelector } from "react-redux";
// import { monthlyUser } from "../api/DashboardRequest";

export const useFetchUsers = () => {
  const { monthlyUserData } = useSelector((state) => state.dashboardReducer);
  const [percentageIncrease, setPercentageIncrease] = useState(0);
  const [currentMonthUsers, setCurrentMonthUsers] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsersByMonth());
  }, []);

  useEffect(() => {
    if (monthlyUserData.length > 1) {
      const currentMonth =
        monthlyUserData[monthlyUserData.length - 1].totalUsers;
      setCurrentMonthUsers(currentMonth);
      const lastMonth = monthlyUserData[monthlyUserData.length - 2].totalUsers;
      const increase = ((currentMonth - lastMonth) / lastMonth) * 100;
      setPercentageIncrease(increase);
    }
  });


  return { percentageIncrease, currentMonthUsers };
};
