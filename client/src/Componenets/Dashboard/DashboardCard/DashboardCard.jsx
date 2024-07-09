import React from "react";

const DashboardCard = ({ title, icon, value, percentage, color, bgColor }) => {
  const percentageClass =
    percentage === "N/A"
      ? "text-red-600"
      : percentage > 0
      ? "text-green-600"
      : "text-red-600";

  return (
    <article className="bg-white h-44 shadow-lg shadow-black/30 md:w-56 max-sm:w-36 p-4 pt-9 rounded-2xl">
      <button
        type="button"
        style={{ color: color, backgroundColor: bgColor }}
        className="text-2xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl"
      >
        {icon}
      </button>
      <p className="mt-3">
        <span className="text-lg font-semibold">{value}</span>
        <span className={`text-sm ${percentageClass}`}>
          {percentage !== null && (
            <span className={`text-sm ml-2 ${percentageClass}`}>
              {percentage === "N/A" ? (
                <span className="text-red-600">{percentage}</span>
              ) : (
                <span
                  className={`${percentage > 0 ? "text-green-600 " : "text-red-600"}`}
                >
                  {percentage > 0 ? `+${percentage?.toFixed(3)}%` : `${percentage?.toFixed(3)}%`}
                </span>
              )}
            </span>
          )}
        </span>
      </p>
      <p className="text-sm text-gray-400 mt-1">{title}</p>
    </article>
  );
};

export default DashboardCard;
