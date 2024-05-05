import React from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import DashboardNavbar from "../DashboardNavbar/DashboardNavbar";
// import { Sidebar } from "lucide-react";
import Sidebar from "../Sidebar/Sidebar";

const DashboardLayout = () => {
  const sidebarMenu = useSelector(
    (state) => state.sidebarReducer.sidebarAction
  );

  return (
    <div className="flex flex-row ">
      <div className="  bg-red-100">
        {sidebarMenu ? (
          <div className="w-72 sidebar relative max-md:fixed bg-white shadow-sm">
            <Sidebar />
          </div>
        ) : (
          <div className="w-0">
            <Sidebar />
          </div>
        )}
      </div>
        <div className="flex flex-col h-screen overflow-auto w-full bg-main-bg">
          <DashboardNavbar />
          <div className="p-10 max-sm:px-2  pt-24">
          <Outlet />
          </div>
        </div>
    </div>
  );
};

export default DashboardLayout;
