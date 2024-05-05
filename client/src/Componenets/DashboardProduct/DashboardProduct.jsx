import { IoAdd } from "react-icons/io5";

import { NavLink, Outlet } from "react-router-dom";

const DashboardProduct = () => {

  return (
    <>
      
      <div>
        <div>
          <h1 className="text-2xl font-bold">Products</h1>
        </div>
        <div className="flex flex-col">
          <div className="w-full ">
            <NavLink to={"add-product"}
              className="float-right flex items-center border-2 p-2 rounded-xl text-white bg-main-blue"
            >
              <IoAdd className="" size={30} />
              <span>New product</span>
            </NavLink>
          </div>
          <span></span>
        </div>
      </div>
      <Outlet/>
    </>
  );
};

export default DashboardProduct;
