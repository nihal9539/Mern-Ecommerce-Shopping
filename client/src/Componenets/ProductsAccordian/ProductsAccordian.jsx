import React, { useEffect, useState } from "react";

import Accordion from "../Acoordion/Accordion";
import { useDispatch, useSelector } from "react-redux";
import { genderFilter, priceFilter } from "../../Action/FilterAction";

const ProductsAccordian = () => {
  const dispatch = useDispatch();
  const [checkboxState, setCheckboxState] = useState({
    male: false,
    female: false,
  });
  const [selectedRanges, setSelectedRanges] = useState([]);

  const priceRanges = [
    { id: 1, min: 0, max: 999 },
    { id: 2, min: 1000, max: 2999 },
    { id: 3, min: 3000, max: 4999 },
  ];

  const handlePriceChange = (id, min, max) => {
    setSelectedRanges((prevSelected) =>
      prevSelected?.includes(id)
        ? prevSelected.filter((rangeId) => rangeId !== id)
        : [...prevSelected, id]
    );
    const priceRange = {
      minPrice: min,
      maxPrice: max,
    };
    dispatch(priceFilter(priceRange));
  };
  // const handlePriceChange = (id) => {
  //   setSelectedRanges((prevSelected) =>
  //     prevSelected.includes(id)
  //       ? prevSelected.filter((rangeId) => rangeId !== id)
  //       : [...prevSelected, id]
  //   );
  // };
  const handleCheckboxChange = (checkboxNumber) => {
    dispatch(genderFilter(checkboxNumber));
    setCheckboxState((prevState) => ({
      ...prevState,
      [checkboxNumber]: !prevState[checkboxNumber],
    }));
  };

  const Gender = (
    <div>
      <div className="">
        <label className="container">
          Male
          <input
            type="checkbox"
            checked={checkboxState.male}
            onChange={() => handleCheckboxChange("male")}
          />
          <span className="checkmark"></span>
        </label>
      </div>
      <div>
        <label className="container">
          Female
          <input
            type="checkbox"
            checked={checkboxState.female}
            onChange={() => handleCheckboxChange("female")}
          />
          <span className="checkmark"></span>
        </label>
      </div>
    </div>
  );
  const PriceRange = (
    <div>
      {priceRanges.map((range) => (
        <label className="container" key={range.id}>
          {range.min} - {range.max}
          <input
            type="checkbox"
            checked={selectedRanges.includes(range.id)}
            onChange={() => handlePriceChange(range.id, range.min, range.max)}
          />
          <span className="checkmark"></span>
        </label>
      ))}
    </div>
  );
  const AcoordianData = [
    {
      component: Gender,
      heading: "Gender",
    },
    {
      component: PriceRange,
      heading: "Price Range (INR)",
    },
  ];
  return (
    <div>
      {AcoordianData.map((item) => (
        <Accordion componenet={item.component} title={item.heading} />
      ))}
    </div>
  );
};

export default ProductsAccordian;
