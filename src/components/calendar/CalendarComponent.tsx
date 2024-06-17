// CalendarComponent.tsx
import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

interface CalendarComponentProps {
  onDateChange: (value: Value, event: React.MouseEvent<HTMLButtonElement>) => void;
}

const CalendarComponent: React.FC<CalendarComponentProps> = ({ onDateChange }) => {
  const handleDateChange = (value: Value, event: React.MouseEvent<HTMLButtonElement>) => {
    onDateChange(value, event);
  };

  return (
    <div>
      <h2>Select a Date</h2>

      <div className="flex justify-center items-center bg-custom-gray">
        <div className="bg-custom-lightGrey rounded-md shadow-md p-6">
          <Calendar
            className="w-full p-2 border border-gray-300 rounded-md bg-custom-lightGrey"
            onChange={handleDateChange}
          />
        </div>
      </div>
    </div>
  );
};

export default CalendarComponent;