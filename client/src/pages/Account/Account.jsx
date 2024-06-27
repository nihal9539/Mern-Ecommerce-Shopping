import React, { useEffect } from "react";
import Navbar from "../../Componenets/Navbar/Navbar";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  Heart,
  LogOut,
  ShoppingBag,
  UserRound,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Action/AuthAction";
import avathar from "../../assets/avathar.webp"

const Account = () => {
  const navigate = useNavigate()

  useEffect(()=>{
    if (window.location.pathname == "/account") {
       navigate("profile")
    }
  },[])
  const username  = useSelector(
    (state) => state?.authReducer?.authData?.user?.username
  );

  const Links = [
    {
      title: "Profile",
      link: "profile",
      icon: <UserRound size={25} className="max-md:w-5" />,
    },
    {
      title: "wishlist",
      link: "wishlist",
      icon: <Heart size={25} className="max-md:w-5" />,
    },
    {
      title: "order",
      link: "order",
      icon: <ShoppingBag size={25} className="max-md:w-5" />,
    },
  ];
  
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  const activeLink =
    "flex items-center capitalize gap-5 max-md:gap-1  max-md:w-full   pl-4 py-3 rounded-lg text-white bg-black/90 text-md m-2 max-md:m-1";
  const normalLink =
    "flex items-center capitalize gap-5 max-md:gap-1  max-md:w-full  pl-4 py-3 rounded-lg text-md text-gray-700 hover:text-black hover:font-semibold hover:bg-light-gray m-2 max-md:m-1";
  return (
    <div >
      <div className="h-screen w-full  flex flex-row max-md:flex-col gap-5 p-28 pb-10 px-48 max-lg:px-16 max-md:px-2">

        <div className="w-80 max-md:w-full   h-96 max-md:h-16 rounded-2xl relative top-0 max-md:pr-5 flex flex-col max-md:flex-row max-md:justify-between max-md:items-center    bg-white shadow-lg border-2 ">
          <div className=" h-20 rounded-xl w-full max-md:hidden shadow-lg justify-between items-center px-3.5 shadow-black/10  flex flex-row">
            <div>
              {/* <CircleUserRound size={40} strokeWidth={1.5} /> */}
              <img src={avathar} className=" w-20 h-20" alt="" />
            </div>
            <div>{username}</div>
          </div>
          {Links.map((item) => (
            <div key={item?.title}>
              <p>
                <div key={item?.link}>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? activeLink : normalLink
                    }
                    to={`${item?.link}`}
                    key={`/${item?.link}`}
                  >
                    {item?.icon}
                    <div className="max-md:text-xs">{item?.title}</div>
                  </NavLink>
                </div>
              </p>
            </div>
          ))}
          <button onClick={handleLogout} className="flex items-center capitalize gap-5 max-md:gap-1 max-md:text-xs    mt-4 pl-4 py-3 rounded-lg text-red-500 text-md m-2 max-md:m-1 ">
            <LogOut size={25} className="max-md:w-5"/> Log Out
          </button>
        </div>
        <div className=" w-full  ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Account;
