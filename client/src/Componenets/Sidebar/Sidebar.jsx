import React, { useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { TiShoppingCart } from "react-icons/ti";
import { BsPersonLinesFill } from "react-icons/bs";
import { RiShoppingBag3Line } from "react-icons/ri";

import { Container, Users } from "lucide-react";
// import { Links } from "../../data/Links";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setButtonFalse, setButtonTrue } from "../../Action/SidebarReducer";
const Sidebar = () => {
  const sidebarMenu = useSelector(state => state.sidebarReducer.sidebarAction);
  const dispatch = useDispatch();


  const Links = [
    {
        title: 'Dashboard',
        links:[ {
            name: "ecommerce",
            icon: <RiShoppingBag3Line size={22}/>
        }]
    },
    {
        title: 'Pages',
        links: [
            {
                name: "products",
                icon: <Container size={22}/>,
            },
            {
                name: "orders",
                icon: <TiShoppingCart size={22}/>,
            },

            {
                name: "customers",
                icon: <BsPersonLinesFill size={22}/>
            },
        ]
    },

]
  const handleClick = () => {
    // Dispatching appropriate action based on current button state
    if (sidebarMenu) {
      dispatch(setButtonFalse());
    } else {
      dispatch(setButtonTrue());
    }
  };

  const activeLink =
    "flex items-center capitalize gap-5 pl-4 py-3 rounded-lg text-white bg-main-blue text-md m-2";
  const normalLink =
    "flex items-center capitalize gap-5 pl-4 py-3 rounded-lg text-md text-gray-700 hover:text-black hover:bg-light-gray m-2";
  return (
    <div className="ml-3 md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10 h-screen">
      {sidebarMenu && (
        <>
          <div className="flex justify-between items-center text-2xl font-bold p-3 ">
            <span>Dashboard</span>
            <button type="button" onClick={handleClick} className="text-xl  max-md:block hidden">
              <AiOutlineCloseCircle size={25} />
            </button>
          </div>
          <div className="mt-10">
            {Links.map((item) => (
              <div key={item.title}>
                <p className="text-gray-400 m-3 mt-4 uppercase">{item.title}</p>
                <p>
                  {item.links.map((links) => (
                    <div>
                      <NavLink
                        className={({ isActive }) =>
                          isActive ? activeLink : normalLink
                        }
                        to={`/${links.name}`}
                        key={`/${links.name}`}
                      >
                        {links.icon}
                        {links.name}
                      </NavLink>
                    </div>
                  ))}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
