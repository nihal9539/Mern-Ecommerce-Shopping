import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
// import Sidebar from "../Sidebar/Sidebar";

const DashboardLayout = () => {
  const [activeMenu, setActiveMenu] = useState<boolean>(true);
  return (
    <div className="flex ">
      <div>
        {activeMenu ? (
          <div className="w-72 relative bg-white shadow-xl">
            <Sidebar />
          </div>
        ) : (
          <div className='"w-0'>
            <Sidebar />
          </div>
        )}
      </div>
      <Outlet/>
    </div>
  );
};

export default DashboardLayout;
