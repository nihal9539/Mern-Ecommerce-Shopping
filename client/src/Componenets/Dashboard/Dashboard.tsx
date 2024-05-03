import React, { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";

const Dashboard = () => {
  const [activeMenu, setActiveMenu] = useState<boolean>(true);
  return (
    <div>
      <div>
        {activeMenu ? (
          <div className="w-72 fixed bg-white shadow-xl">
            <Sidebar />
          </div>
        ) : (
          <div className='"w-0'>
            <Sidebar />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
