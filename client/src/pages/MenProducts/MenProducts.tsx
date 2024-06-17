import React, { useEffect, useState } from "react";
("react-accessible-accordion");
import "react-accessible-accordion/dist/fancy-example.css";
import Card from "../../Componenets/Card/Card";
import Navbar from "../../Componenets/Navbar/Navbar";
import ProductsAccordian from "../../Componenets/ProductsAccordian/ProductsAccordian";
import { useDispatch, useSelector } from "react-redux";
import { LuTally4 } from "react-icons/lu";
import { Search, SearchIcon } from "lucide-react";
import { getAllProduct } from "../../Action/ProductAction";
import Accordion from "../../Componenets/Acoordion/Accordion";
import { resetFilter } from "../../Action/FilterAction";

const MenProducts = () => {
  const { products } = useSelector((state) => state?.productReducer);
  const genderFilter = useSelector((state) => state?.filterReducer?.gender);
  const { maxPrice, minPrice } = useSelector((state) => state?.filterReducer);
  console.log(minPrice, maxPrice);

  const [filter, setFilter] = useState("");
  const handleChange = (event) => {
    setFilter(event.target.value);
  };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProduct());
  }, []);

  useEffect(() => {
    // Reset gender filter on page load
    dispatch(resetFilter());
  }, [dispatch]);

  return (
    <div>
      <Navbar bgWhite={true} />
      <div className="p-12 pt-32  flex flex-row">
        <div className="w-[20%] h-[60vh]  p-1">
          <h1 className="text-2xl p-4 tracking-wider font-bold">FILTERS</h1>
          <hr className="w-full h-1 my-2 bg-red-700" />
          <ProductsAccordian />
        </div>
        <div className="w-full">
          <div className=" flex justify-between items-center p-2 px-10 ">
            <LuTally4 />
            <div className="  flex items-center gap-2 p-2 w-80  border-2 hover:border-black/80 bg-gray-200  hover:bg-white rounded-3xl">
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

          <div className="w-full gap-4 grid lg:grid-cols-4 sm:grid-cols-2 p-2 place-items-center">
            {products
              .filter(
                (item) =>
                  item.productname
                    .toLowerCase()
                    .includes(filter.toLowerCase()) &&
                  (genderFilter?.length === 0 ||
                    genderFilter?.includes(item.gender)) &&
                  (minPrice?.length === 0 || item.price >= minPrice[0]) &&
                  (maxPrice?.length === 0 || item.price <= maxPrice[0])
              )
              .map((data, index) => (
                <>
                  <Card key={index} data={data} />
                </>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenProducts;
