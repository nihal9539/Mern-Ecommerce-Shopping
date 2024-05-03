import React, { useState } from "react";
import Sidebar from "../../Componenets/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
// import Sidebar from "../Sidebar/Sidebar";

const Dashboard = () => {
  const [activeMenu, setActiveMenu] = useState<boolean>(true);
  return (
    <div className="flex ">
      ecommerce
    </div>
  );
};

export default Dashboard;
