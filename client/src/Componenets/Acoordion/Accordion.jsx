import React, { useState } from "react";

const Accordion = ({ title, componenet }) => {
  const [accordionOpen, setAccordionOpen] = useState(true   );

  return (
    <div className="py-2">
      <button
        onClick={() => setAccordionOpen(!accordionOpen)}
        className="flex justify-start items-center gap-2 w-full"
      >
       
        <svg
          className="fill-black shrink-0 "
          width="12"
          height="12"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            y="5"
            width="12"
            height="2"
            rx="1"
            className={`transform origin-center transition duration-200 ease-out ${
              accordionOpen && "!rotate-180"
            }`}
          />
          <rect
            y="5"
            width="12"
            height="2"
            rx="1"
            className={`transform origin-center rotate-90 transition duration-200 ease-out ${
              accordionOpen && "!rotate-180"
            }`}
          />
        </svg>
         <span className="font-semibold text-sm">{title}</span>
      </button>
      <div
        className={`grid overflow-hidden transition-all duration-300 ease-in-out text-slate-600 text-sm ${
          accordionOpen
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className={`overflow-hidden ml-5  duration-500 ${accordionOpen && "py-4"} `}>{componenet}</div>
      </div>
      <hr className="mt-5"/>
    </div>
  );
};

export default Accordion;