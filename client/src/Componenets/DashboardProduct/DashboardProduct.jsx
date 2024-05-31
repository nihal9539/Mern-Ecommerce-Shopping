import { useEffect } from "react";
import { IoAdd } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

import { NavLink, Outlet } from "react-router-dom";
import { getAllProduct } from "../../Action/ProductAction";

const DashboardProduct = () => {
  let { products, loading } = useSelector((state) => state.productReducer);
  const dispatch = useDispatch();

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
          <div className="flex flex-col gap-2">
            {loading
              ? "Fetching Product"
              : products.map((post, index) => (
                  <div key={index} className="flex">
                    <img src={post?.images?.url} className="h-20 w-20" alt="" />
                    <span>{post.productname}</span>
                  </div>
                ))}
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default DashboardProduct;
