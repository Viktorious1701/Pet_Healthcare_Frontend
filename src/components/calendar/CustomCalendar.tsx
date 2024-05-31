import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CustomCalendar = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-custom-gray">
      <div className="bg-white rounded-md shadow-md p-6">
        <Calendar
          className="w-full p-2 border border-gray-300 rounded-md"
          navigationLabel={() => null} // Hide navigation buttons
          value={null} // No value to prevent highlighting the current date
          onClickDay={() => {}} // Prevent clicking on dates
          // Other props...
        />
      </div>
    </div>
  );
};

export default CustomCalendar;
