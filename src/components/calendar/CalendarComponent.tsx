// CalendarComponent.tsx
import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '@/../app/globals.css';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

interface CalendarComponentProps {
  onDateChange: (value: Value, event: React.MouseEvent<HTMLButtonElement>) => void;
}

const CalendarComponent: React.FC<CalendarComponentProps> = ({ onDateChange }) => {
  const handleDateChange = (value: Value, event: React.MouseEvent<HTMLButtonElement>) => {
    onDateChange(value, event);
  };

  // Get today's date and set the time to 00:00:00 to ensure the whole day is included
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div>
      <h2>Select a Date</h2>

      <div className="flex justify-center items-center bg-custom-gray">
        <div className="bg-[--background] shadow-md p-6">
          <Calendar
            className="w-full p-2 border border-gray-300 rounded-md bg-[--background]"
            onChange={handleDateChange}
            minDate={today} // Set the minimum date to today to disable past dates
          />
        </div>
      </div>
    </div>
  );
};

export default CalendarComponent;