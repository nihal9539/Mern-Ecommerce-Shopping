import React, { useEffect, useState } from "react";
import { styled, alpha, Box } from "@mui/system";
import { Slider as BaseSlider, sliderClasses } from "@mui/base/Slider";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
const ProductsAccordian = () => {
  const [value, setValue] = useState([400, 1400]);
  const [renderPage, setRenderPage] = useState(false); // State to control rendering

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  console.log(renderPage);

  useEffect(() => {
    setRenderPage(true); // Update state to render the page
  }, []);
  const Slider = styled(BaseSlider)(
    ({ theme }) => `
      color: ${theme.palette.mode === "light" ? blue[500] : blue[400]};
      height: 6px;
      width: 100%;
      padding: 16px 0;
      display: inline-flex;
      align-items: center;
      position: relative;
      cursor: pointer;
      touch-action: none;
      -webkit-tap-highlight-color: transparent;
    
      &.${sliderClasses.disabled} {
        pointer-events: none;
        cursor: default;
        color: ${theme.palette.mode === "light" ? grey[300] : grey[600]};
        opacity: 0.4;
      }
    
      & .${sliderClasses.rail} {
        display: block;
        position: absolute;
        width: 100%;
        height: 4px;
        border-radius: 6px;
        background-color: currentColor;
        opacity: 0.3;
      }
    
      & .${sliderClasses.track} {
        display: block;
        position: absolute;
        height: 4px;
        border-radius: 6px;
        background-color: currentColor;
      }
    
      & .${sliderClasses.thumb} {
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        margin-left: -6px;
        width: 20px;
        height: 20px;
        box-sizing: border-box;
        border-radius: 50%;
        outline: 0;
        background-color: ${
          theme.palette.mode === "light" ? blue[500] : blue[400]
        };
        transition-property: box-shadow, transform;
        transition-timing-function: ease;
        transition-duration: 120ms;
        transform-origin: center;
    
        &:hover {
          box-shadow: 0 0 0 6px ${alpha(
            theme.palette.mode === "light" ? blue[200] : blue[300],
            0.3
          )};
        }
    
        &.${sliderClasses.focusVisible} {
          box-shadow: 0 0 0 8px ${alpha(
            theme.palette.mode === "light" ? blue[200] : blue[400],
            0.5
          )};
          outline: none;
        }
    
        &.${sliderClasses.active} {
          box-shadow: 0 0 0 8px ${alpha(
            theme.palette.mode === "light" ? blue[200] : blue[400],
            0.5
          )};
          outline: none;
          transform: scale(1.2);
        }
      }
    
      & .${sliderClasses.mark} {
        position: absolute;
        width: 10px;
        height: 10px;
        border-radius: 99%;
        background-color: ${
          theme.palette.mode === "light" ? blue[200] : blue[900]
        };
        top: 44%;
        transform: translateX(-50%);
      }
    
      & .${sliderClasses.markActive} {
        background-color: ${
          theme.palette.mode === "light" ? blue[500] : blue[400]
        };
      }
    `
  );

  const blue = {
    100: "#DAECFF",
    200: "#99CCF3",
    400: "#3399FF",
    300: "#66B2FF",
    500: "#007FFF",
    600: "#0072E5",
    700: "#0059B3",
    900: "#003A75",
  };

  const grey = {
    50: "#F3F6F9",
    100: "#E5EAF2",
    200: "#DAE2ED",
    300: "#C7D0DD",
    400: "#B0B8C4",
    500: "#9DA8B7",
    600: "#6B7A90",
    700: "#434D5B",
    800: "#303740",
    900: "#1C2025",
  };
  

  const [checkboxState, setCheckboxState] = useState({
    male: false,
    female: false,
  });

  const handleCheckboxChange = (checkboxNumber) => {
    setCheckboxState((prevState) => ({
      ...prevState,
      [checkboxNumber]: !prevState[checkboxNumber],
    }));
  };

  const Gender = (
    <div>
      <div className="">
        <label className="space-x-1 my-1 container flex items-center">
          <input
            type="checkbox"
            checked={checkboxState.male}
            onChange={() => handleCheckboxChange("male")}
            size={30}
            width={30}
            name="male"
            id=""
          />

          <span className="checkmark font-semibold">Male</span>
        </label>
      </div>
      <div>
        <label className="space-x-1 container flex items-center ">
          <input
            type="checkbox"
            checked={checkboxState.female}
            onChange={() => handleCheckboxChange("female")}
            size={30}
            width={30}
            name="women"
            id=""
          />

          <span className="checkmark font-semibold">Women</span>
        </label>
      </div>
    </div>
  );
  const PriceRange = (
    <Box>
      <Slider
        onChange={handleChange}
        value={value}
        getAriaLabel={() => "Price range"}
        min={200}
        max={10000}
      />
      <div className="flex justify-between">
        <label htmlFor="">Min:{value[0]}</label>
        <label htmlFor="">Max:{value[1]}</label>
      </div>
    </Box>
  );
  const AcoordianData= [
    {
      component: Gender,
      heading: "Gender",
    },
    {
      component: PriceRange,
      heading: "Price Range",
    },
  ];
  return (
    <div>
      <Accordion
        className="bg-transparent"
        allowMultipleExpanded={true}
        preExpanded={[0]}
      >
        {AcoordianData.map((data, index) => (
          <AccordionItem key={index}>
            <AccordionItemHeading>
              <AccordionItemButton
                style={{ padding: "12px", backgroundColor: "transparent" }}
              >
                {data.heading}
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>{data.component}</AccordionItemPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default ProductsAccordian;
