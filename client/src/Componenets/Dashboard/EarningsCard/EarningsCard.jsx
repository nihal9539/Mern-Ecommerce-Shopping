import React from "react";
import { IndianRupee } from "lucide-react";

const EarningsCard = ({ totalRevenue }) => (
  <article className="bg-white shadow-lg shadow-black/30 h-44 rounded-xl w-full lg:w-80 p-8 pt-9 m-3 bg-hero-pattern bg-no-repeat bg-cover bg-center">
    <div className="flex justify-between items-center">
      <div>
        <h2 className="font-bold text-gray-400 mb-3">Earnings</h2>
        <p className="text-2xl">₹{totalRevenue}</p>
      </div>
      <button
        type="button"
        style={{ backgroundColor: "#1A97F5" }}
        className="text-2xl opacity-0.9 text-white hover:drop-shadow-xl rounded-full p-4"
      >
        <IndianRupee />
      </button>
    </div>
  </article>
);

export default EarningsCard;
