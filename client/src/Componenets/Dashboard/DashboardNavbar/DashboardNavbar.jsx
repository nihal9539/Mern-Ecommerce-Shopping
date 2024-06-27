import React from "react";
import { FiAlignJustify } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { AlignJustify } from "lucide-react";
import { setButtonFalse, setButtonTrue } from "../../../Action/SidebarReducer";
import { Helmet } from "react-helmet";

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
  return (
    <>
      <Helmet>
        <title>Dashboard - Navbar</title>
        <meta
          name="description"
          content="Dashboard navigation bar with sidebar toggle functionality."
        />
      </Helmet>
      <nav className="w-full  fixed z-50 bg-white items-center   p-3.5 px-10">
        <button
          aria-label="Toggle sidebar"
          onClick={handleClick}
          className="focus:outline-none"
        >
          <AlignJustify size={20} className="stroke-main-blue" />
        </button>
      </nav>
    </>
  );
};

export default DashboardNavbar;
