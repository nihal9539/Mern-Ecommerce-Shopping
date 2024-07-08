import React, { useEffect, useState } from "react";
("react-accessible-accordion");
import "react-accessible-accordion/dist/fancy-example.css";
import Card from "../../Componenets/Card/Card";
import ProductsAccordian from "../../Componenets/ProductFilter/ProductFilter";
import { useDispatch, useSelector } from "react-redux";
import { Search, SearchIcon, X } from "lucide-react";
import { getAllProduct } from "../../Action/ProductAction";
import { resetFilter } from "../../Action/FilterAction";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import { useLocation } from "react-router-dom";

const MenProducts = () => {
  const { products } = useSelector((state) => state?.productReducer);
  const genderFilterData = useSelector((state) => state?.filterReducer?.gender);
  const { maxPrice, minPrice } = useSelector((state) => state?.filterReducer);  
  const [filter, setFilter] = useState("");
 
  const handleChange = (event) => {
    setFilter(event.target.value);
  };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProduct());
    
  }, []);
 
  

  const [isOpen, setOpen] = useState(false);

  return (
    <div>
      <div className="p-12 max-md:px-0 pt-32 relative  flex flex-row">
        <div className="w-[20%] h-[60vh] sticky top-20 max-md:hidden  p-1">
          <h1 className="text-2xl p-4 tracking-wider font-bold">FILTERS</h1>
          <hr className="w-full h-1 my-2 " />
          <ProductsAccordian />
        </div>
        <div className="w-full">
          <div className="flex flex-row items-center max-md:justify-between justify-end max-md:px-2">
            <div className="  p-2 px-1 ">
              <div className="  flex items-center gap-2 p-2 max-md:p-1.5 w-80 max-md:w-72  border-2 hover:border-black/80 bg-gray-200  hover:bg-white rounded-3xl">
                <form action="" className=" flex w-full p-1 gap-2">
                  <button type="submit">
                    {" "}
                    <SearchIcon size={20} className="text-gray-600" />
                  </button>
                  <input
                    type="text"
                    value={filter}
                    onChange={handleChange}
                    className="border-none bg-transparent  outline-none w-full "
                    placeholder="Search"
                  />
                </form>
              </div>
            </div>
            <HiOutlineAdjustmentsHorizontal
              size={30}
              strokeWidth={2}
              onClick={() => {
                setOpen(!isOpen);
              }}
              className="hidden max-md:block max-md:mr-2"
            />
          </div>

          <div className="w-full gap-4 grid xl:grid-cols-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 max-sm:grid-cols-2 p-2">
            {products
              .filter(
                (item) =>
                  item.productname
                    .toLowerCase()
                    .includes(filter.toLowerCase()) &&
                  (genderFilterData?.length === 0 ||
                    genderFilterData?.includes(item.gender)) &&
                  (minPrice?.length === 0 || item.price >= minPrice[0]) &&
                  (maxPrice?.length === 0 || item.price <= maxPrice[0])
              )
              .map((data, index) => (
                <Card homepageCard={false} key={index} data={data} />
              ))}
     
       
          </div>
          {/* Right side bar */}
          <div
            className={`${
              isOpen
                ? "inline-block right-0 duration-300 opacity-100"
                : "right-[-100%] duration-300  opacity-0"
            } border border-gray-300 duration-300 fixed rounded-md top-0  z-[99999] h-screen bg-black/20 w-full flex justify-end`}
          >
            <div className="bg-black/80  h-8 w-8 grid place-items-center">
              <X
                color="white"
                size={30}
                onClick={() => {
                  setOpen(!isOpen);
                }}
              />
            </div>
            <div className="w-3/4 pl-10 bg-white relative h-screen float-right right-0 p-5">
              <ProductsAccordian />
              <button
                onClick={() => {
                  setOpen(!isOpen);
                }}
                className="absolute bottom-0 right-0 w-full p-3 bg-black/90 text-white"
              >
                Show Results
              </button>
            </div>
          </div>
          {/* Right side bar */}
        </div>
      </div>
    </div>
  );
};

export default MenProducts;
