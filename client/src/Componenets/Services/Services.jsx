import { Earth, Package } from "lucide-react";
import { TbAward } from "react-icons/tb";
import React from "react";

const Services = () => {
  const service = [
    {
      id: 1,
      icon: <Package size={40} />,
      title: "Convenience at Your Fingertips",
      description: "Shop Online Anytime. Anywhere with Ease",
    },
    {
      id: 3,
      icon: <Earth size={40} />,
      title: " Save Time And Money",
      description: "Avoid Crowds and Save on Exclusive Deals",
    },
    {
      id: 3,
      icon: <TbAward size={50} />,
      title: "Endless Selection",
      description: "Find the Product you Love from a Wild Range of Brands",
    },
  ];
  return (
    <div className=" p-10 px-16 w-full text-gray-800 flex-wrap max-lg:gap-10 flex justify-evenly items-center  bg-gray-400/20 my-5 mt-10">
      {service.map((item) => (
        <div key={item.id} className="flex items-start gap-5 w-[20rem]">
          {item.icon}
          <div>
            <h1 className="text-lg font-bold mb-5 tracking-tighter">
             {item.title}
            </h1>
            <span className="">{item.description}</span>
          </div>
        </div>
      ))}
      
    </div>
  );
};

export default Services;
