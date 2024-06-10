import React from "react";
import Navbar from "../../Componenets/Navbar/Navbar";
import { NavLink, Outlet } from "react-router-dom";
import {
  CircleUserRound,
  Heart,
  LogOut,
  ShoppingBag,
  UserRound,
} from "lucide-react";
import { BsCart } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Action/AuthAction";

const Account = () => {
  const { username } = useSelector(
    (state) => state?.authReducer?.authData?.user
  );

  const Links = [
    {
      title: "Profile",
      link: "profile",
      icon: <UserRound size={25} />,
    },
    {
      title: "wishlist",
      link: "wishlist",
      icon: <Heart size={25} />,
    },
    {
      title: "order",
      link: "order",
      icon: <ShoppingBag size={25} />,
    },
  ];
  
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  const activeLink =
    "flex items-center capitalize gap-5 pl-4 py-3 rounded-lg text-white bg-black/90 text-md m-2";
  const normalLink =
    "flex items-center capitalize gap-5 pl-4 py-3 rounded-lg text-md text-gray-700 hover:text-black hover:font-semibold hover:bg-light-gray m-2";
  return (
    <div >
      <Navbar bgWhite={true} />
      <div className="h-screen w-full  flex flex-row gap-5 p-28 pb-10 px-48 max-lg:px-16 max-md:px-2">

        <div className="w-80  h-96 rounded-2xl relative top-0    bg-white shadow-lg border-2 ">
          <div className=" h-20 rounded-xl w-full  shadow-lg justify-between items-center px-3.5 shadow-black/10  flex flex-row">
            <div>
              <CircleUserRound size={40} strokeWidth={1.5} />
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
                    {item?.title}
                  </NavLink>
                </div>
              </p>
            </div>
          ))}
          <button className="flex items-center capitalize gap-5 mt-4 pl-4 py-3 rounded-lg text-red-500 text-md m-2 ">
            <LogOut /> Log Out
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
