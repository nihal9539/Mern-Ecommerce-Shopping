import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import { useSelector } from "react-redux";
import DashboardNavbar from "../DashboardNavbar/DashboardNavbar";
// import Sidebar from "../Sidebar/Sidebar";

const DashboardLayout = () => {
  const [activeMenu, setActiveMenu] = useState<boolean>(true);
  const sidebarMenu = useSelector(
    (state) => state.sidebarReducer.sidebarAction
  );
  console.log(sidebarMenu);

  return (
    <div className="flex flex-row ">
      <div className="  bg-red-100">
        {sidebarMenu ? (
          <div className="w-72 relative bg-white shadow-xl">
            <Sidebar />
          </div>
        ) : (
          <div className="w-0">
            <Sidebar />
          </div>
        )}
      </div>
        <div className="flex flex-col w-full">
          <DashboardNavbar />
          <Outlet />
        </div>
    </div>
  );
};

export default DashboardLayout;
