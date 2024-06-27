import { useEffect, useState } from "react";
import { IoAdd } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

import { NavLink } from "react-router-dom";
import {  getAllProduct } from "../../../Action/ProductAction";
import "@mantine/core/styles.layer.css";
import "mantine-datatable/styles.layer.css";
import DataTableComponenet from "../DataTable/DataTable";

const DashboardProduct = () => {
  const dispatch = useDispatch();
  let { products, loading } = useSelector((state) => state.productReducer);


console.log(products);
  useEffect(() => {
    dispatch(getAllProduct());
  }, []);


  if (loading) {
    <div className="flex justify-center items-center">
      <span>loading</span>
    </div>;
  }
  return (
    <>
      <div>
        <div>
          <h1 className="text-2xl font-bold">Products</h1>
        </div>
        <div className="flex flex-col">
          <div className="w-full ">
            <NavLink
              to={"add-product"}
              className="float-right flex items-center border-2 p-2 rounded-xl text-white bg-main-blue"
            >
              <IoAdd className="" size={30} />
              <span>New product</span>
            </NavLink>
          </div>
      

            <DataTableComponenet/>
        
        </div>
      </div>

    </>
  );
};

export default DashboardProduct;
