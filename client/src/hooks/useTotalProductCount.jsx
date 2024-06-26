import { useEffect} from "react";
import { getTotalProductCount } from "../Action/DashboardAction";
import { useDispatch, useSelector } from "react-redux";
// import { monthlyUser } from "../api/DashboardRequest";

export const useTotalProductCount = () => {
  const { totalProductCount } = useSelector((state) => state.dashboardReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotalProductCount());
  }, []);

  return { productPercentageNull: null, totalProductCount };
};
