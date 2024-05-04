import React from "react";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const Layout = () => {
  return (
    
      <div>
        <Navbar bgWhite={false} />
        <Outlet />
      </div>
   
  );
};

export default Layout;
