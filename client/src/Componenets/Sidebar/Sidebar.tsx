import React, { useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { TiShoppingCart } from "react-icons/ti";
import { BsPersonLinesFill } from "react-icons/bs";
import { RiShoppingBag3Line } from "react-icons/ri";

import { Container, Users } from "lucide-react";
// import { Links } from "../../data/Links";
import { NavLink } from "react-router-dom";
const Sidebar = () => {
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
                name: "employees",
                icon: <Users size={22}/>
            },
            {
                name: "customers",
                icon: <BsPersonLinesFill size={22}/>
            },
        ]
    },

]
  const [activeMenu, setActiveMenu] = useState<boolean>(true);
  const activeLink =
    "flex items-center capitalize gap-5 pl-4 py-3 rounded-lg text-white bg-gray-500 text-md m-2";
  const normalLink =
    "flex items-center capitalize gap-5 pl-4 py-3 rounded-lg text-md text-gray-700 hover:text-black hover:bg-light-gray m-2";
  return (
    <div className="ml-3 md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10 h-screen">
      {activeMenu && (
        <>
          <div className="flex justify-between items-center text-2xl font-bold p-3 ">
            <span>Dashboard</span>
            <button type="button" onClick={() => {}} className="text-xl  ">
              <AiOutlineCloseCircle />
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
