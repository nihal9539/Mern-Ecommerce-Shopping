import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { genderFilter } from "../../Action/FilterAction";

const ChooseCategory = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleWomen = () => {
    dispatch(genderFilter("female")); // Set the filter state
    navigate("/collection/all"); // Navigate to products page with gender query param
  };

  const handleMen = () => {
    dispatch(genderFilter("male")); // Set the filter state
    navigate(`/collection/all?${"gender=male"}`); // Navigate to products page with gender query param
  };
  return (
    <section className=" px-24  max-md:p-4">
      <div className="grid grid-cols-2 max-md:grid-cols-1  gap-1">
        <div className="relative">
          <div className="absolute bottom-10 right-10 text-white flex flex-col  items-start gap-2.5">
            <span className="text-3xl font-bold">WOMEN</span>
            <div
              onClick={handleWomen}
              aria-label="Shop Women's Collection"
              className=" btn text-white text-lg  rounded-none px-5 font-bold "
            >
              Shop Now
            </div>
          </div>
          <div className="ct-img bg-[url(/category/women.png)] h-96 w-full"></div>
        </div>
        <div className="relative">
          <div className="absolute bottom-10 left-10 text-white flex flex-col  items-start gap-2.5">
            <span className="text-3xl font-bold">MEN</span>
            <div
              onClick={handleMen}
              aria-label="Shop Men's Collection"
              className=" btn text-white text-lg rounded-none px-5 font-bold "
            >
              Shop Now
            </div>
          </div>
          <div className="ct-img bg-[url(/category/man.jpeg)] h-96 w-full"></div>
        </div>
      </div>
    </section>
  );
};

export default ChooseCategory;
