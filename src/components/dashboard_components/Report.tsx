import React from 'react';

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
    <div>
      <h2>{day}</h2>
      <ul>
        {data.map((item, index) => (
          <li key={index}>
            <span className={`category ${item.category.toLowerCase()}`}>
              {item.category}
            </span>
            <span className="time">{item.time}</span>
            <span className="note">{item.note}</span>
            <span className="amount">{item.amount}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Report;