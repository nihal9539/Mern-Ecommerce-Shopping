import React, { useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import { Outlet ,useLocation} from "react-router-dom";
import Navbar from "../Navbar/Navbar";


const Layout = () => {
  const location = useLocation();
  const [bgWhite, setBgWhite] = useState(false);
  useEffect(() => {
    // Update bgWhite based on the current path
    if (location.pathname == '/') {
      setBgWhite(false);
    } else {
      setBgWhite(true);
    }
  }, [location]);
  
  // const isProductPage = location.pathname.includes('/product');
  return (
    
      <div>
        <Navbar bgWhite={bgWhite} />
        <Outlet />
      </div>
   
  );
};

export default Layout;
