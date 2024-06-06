import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CustomCalendar = () => {
  return (
    <div className="flex justify-center items-center bg-custom-gray">
      <div className="bg-[#F9FAFB] p-6">
        <Calendar
          className="w-full p-2 bg-[#F9FAFB] border border-gray-300" // Changed border color to darker variant
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
