import React from "react";

export interface ReportItem {
  category: string;
  time: string;
  note: string;
  amount: string;
}

interface ReportProps {
  day: string;
  data: ReportItem[];
}

const Report: React.FC<ReportProps> = ({ day, data }) => {
  return (
    <div className="mb-5">
      <h2 className="text-lg font-bold text-pink-600 mb-2">{day}</h2>
      <ul className="divide-y divide-gray-200">
        {data.map((item, index) => (
          <li key={index} className="flex items-center justify-between py-3">
            <span
              className={`category inline-flex items-center justify-center px-3 py-1 rounded-md text-white w-32 ${
                item.category.toLowerCase() === "hospitalization"
                  ? "bg-blue-500"
                  : item.category.toLowerCase() === "booking"
                  ? "bg-purple-500"
                  : "bg-orange-500"
              }`}
            >
              {item.category}
            </span>
            <span className="time text-gray-600">{item.time}</span>
            <span className="note text-gray-600 truncate">{item.note}</span>
            <span className="amount text-pink-600 font-bold">
              {item.amount}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Report;
