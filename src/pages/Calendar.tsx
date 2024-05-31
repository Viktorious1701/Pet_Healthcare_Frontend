import Navbar from '@/components/navigation/Navbar';
import CalendarComponent from '@/components/calendar/CalendarComponent';

const Calendar = () => {
  return (
    <div>
      <Navbar />
      <div className="pt-20 mt-20"> {/* Adjust the padding-top to match the Navbar height */}
        <CalendarComponent />
      </div>
    </div>
  );
};

export default Calendar;
