import React, { useState } from "react";
import { FiAlignJustify } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { AlignJustify, LogOut, User, UserCircle } from "lucide-react";
import { setButtonFalse, setButtonTrue } from "../../../Action/SidebarReducer";
import { Helmet } from "react-helmet";
import { adminLogout } from "../../../Action/AuthAction";

const DashboardNavbar = () => {
  const sidebarMenu = useSelector(
    (state) => state.sidebarReducer.sidebarAction
  );
  const dispatch = useDispatch();
  const handleClick = () => {
    if (sidebarMenu) {
      dispatch(setButtonFalse());
    } else {
      dispatch(setButtonTrue());
    }
  };
  const [isHovered, setIsHovered] = useState(false);
 const handleLogOut = ()=>{
  dispatch(adminLogout())
 }
  return (
    <>
      <Helmet>
        <title>Dashboard - Navbar</title>
        <meta
          name="description"
          content="Dashboard navigation bar with sidebar toggle functionality."
        />
      </Helmet>
      <nav
        className={` ${
          sidebarMenu ? "w-[80vw] max-lg:w-full" : "w-full pr-16"
        } flex justify-between fixed z-50 bg-white items-center   p-3.5 px-10`}
      >
        <button
          aria-label="Toggle sidebar"
          onClick={handleClick}
          className="focus:outline-none"
        >
          <AlignJustify size={20} className="stroke-main-blue" />
        </button>
        <div className="relative">
          <UserCircle
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="rounded-full cursor-pointer "
          />
          {isHovered && (
            <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}

              style={{ transform: "translate(-50%, 0)" }}
              className="rounded-md pl-2 flex items-center absolute left-[50%] top- border bg-white w-28 h-16"
            >
             <div onClick={handleLogOut} className="flex cursor-pointer gap-2 text-sm text-red-600">
             <LogOut/>
             Log Out
             </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default DashboardNavbar;
