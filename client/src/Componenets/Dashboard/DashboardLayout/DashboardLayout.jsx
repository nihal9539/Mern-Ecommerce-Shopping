import React from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import DashboardNavbar from "../DashboardNavbar/DashboardNavbar";
import Sidebar from "../Sidebar/Sidebar";
import { Helmet } from "react-helmet";

const DashboardLayout = () => {
  const sidebarMenu = useSelector(
    (state) => state.sidebarReducer.sidebarAction
  );

  return (
    <div className="flex flex-row ">
      <Helmet>
        <title>Dashboard - Admin Panel</title>
        <meta
          name="description"
          content="Admin dashboard layout with navigation and sidebar."
        />
      </Helmet>
      <div className="">
        <aside
          className={`bg-white z-[9999] shadow-sm transition-width duration-300 ${
            sidebarMenu ? "w-72" : "w-0"
          } max-lg:fixed`}
        >
          <Sidebar />
        </aside>
      </div>
      <div className="flex flex-col h-screen overflow-auto w-full bg-main-bg">
        <header>
          <DashboardNavbar />
        </header>

        <main className="p-10 max-sm:px-2 pt-24">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
