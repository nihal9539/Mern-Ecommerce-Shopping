import React, { useEffect, useState } from "react";

import Accordion from "../Acoordion/Accordion";
import { useDispatch, useSelector } from "react-redux";
import {
  categoryFilterAction,
  genderFilter,
  getFilter,
  priceFilter,
} from "../../Action/FilterAction";
import { CategoryItems } from "../../assets/data";

const ProductFilter = () => {
  const dispatch = useDispatch();
  const genderState = useSelector((state) => state.filterReducer.gender);
  const [category, setCategory] = useState([]);
  const { maxPrice, minPrice, categoryFilter } = useSelector(
    (state) => state?.filterReducer
  );

  const [checkboxState, setCheckboxState] = useState({
    male: genderState.includes("male"),
    female: genderState.includes("female"),
  });
  const [selectedRanges, setSelectedRanges] = useState([]);

  const priceRanges = [
    { id: 1, min: 0, max: 999 },
    { id: 2, min: 1000, max: 2999 },
    { id: 3, min: 3000, max: 4999 },
  ];

  useEffect(() => {
    // Check the URL for a category filter
    const urlParams = new URLSearchParams(window.location.search);
    const gender = urlParams.get("gender");
    if (gender) {
      dispatch(genderFilter(gender));
      setCheckboxState((prevState) => ({
        ...prevState,
        [gender]: true,
      }));
    }
  }, [dispatch]);
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
  useEffect(() => {
    dispatch(getFilter())
    let initialSelectedRanges = [];
    priceRanges.forEach((range) => {
      if (
        minPrice.includes(range.min) &&
        maxPrice.includes(range.max)
      ) {
        initialSelectedRanges.push(range.id);
      }
    });
    setSelectedRanges(initialSelectedRanges);
    setCategory(categoryFilter);
  }, [categoryFilter]);

  const handleCheckboxChange = (checkboxNumber) => {
    dispatch(genderFilter(checkboxNumber));
    setCheckboxState((prevState) => ({
      ...prevState,
      [checkboxNumber]: !prevState[checkboxNumber],
    }));
  };


  const handleCategory = (item) => {
    dispatch(categoryFilterAction(item))
    setCategory((prevCategory) =>
      prevCategory.includes(item)
    ? prevCategory.filter((cat) => cat !== item)
    : [...prevCategory, item]
  );
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
  const categoryComponent = (
    <div>
      <div>
        {CategoryItems.map((item) => (
          <label key={item} className="container">
            {item}
            <input
              type="checkbox"
              checked={category?.includes(item) }
              onChange={() => handleCategory(item)}
            />
            <span className="checkmark"></span>
          </label>
        ))}
      </div>
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
    {
      component: categoryComponent,
      heading: "Category",
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

export default ProductFilter;
