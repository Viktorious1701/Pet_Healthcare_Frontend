import { useState, useRef, useEffect } from 'react';
import Navbar from '@/components/navigation/Navbar';
import CalendarComponent from '@/components/calendar/CalendarComponent';
import { useDispatch } from 'react-redux';
import { setDateSlot } from "@/components/slices/dateSlice";
import { AppDispatch } from '@/store';
//import petcare from '@/assets/heroBanner.png';
import BookingForm from '@/components/appointment/BookingForm';
import Footer from '@/components/navigation/Footer';
import { ArrowRightFromLine } from 'lucide-react';
import { useNavigate } from 'react-router';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

interface TimeSlot {
  time: string;
  available: boolean;
}

const BookingPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [formVisible, setFormVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    }
    window.scrollTo(0, 0);
  }, [navigate]);
  // Sample data for time slots
  const timeSlots: TimeSlot[] = [
    { time: '09:00 AM', available: true },
    { time: '10:30 AM', available: false },
    { time: '12:00 PM', available: true },
    { time: '02:00 PM', available: true },
    { time: '04:30 PM', available: false },
  ];

  const handleBookingCancel = () => {
    setSelectedDate(null);
    setSelectedSlot(null);
    setFormVisible(false);
  };
  const handleDateChange = (value: Value) => {
    if (!Array.isArray(value)) {
      setSelectedDate(value);
      setSelectedSlot(null);
    }
  };

  const handleSlotClick = (slot: TimeSlot) => {
    setSelectedSlot(slot);
  };

  const handleBooking = () => {
    if (selectedSlot && selectedDate) {
      dispatch(setDateSlot({ date: selectedDate.toString(), slot: selectedSlot.time }));
      setFormVisible(true);
    }
  };

  useEffect(() => {
    if (formVisible && containerRef.current) {
      containerRef.current.scrollTo({ left: containerRef.current.clientWidth, behavior: 'smooth' });
    }
    // form visible if set to true and containerRef is not null will activate the scroll
  }, [formVisible]);

  const renderTimeSlots = () => {
    return timeSlots.map((slot, index) => (
      <div
        key={index}
        className={`p-2 rounded-md cursor-pointer ${slot.available ? 'bg-custom-pink hover:bg-custom-blue text-white' : 'bg-custom-gray text-white'
          }`}
        onClick={() => handleSlotClick(slot)}
      >
        {slot.time}
      </div>
    ));
  };

  const handleReset = () => {
    setSelectedDate(null);
    setSelectedSlot(null);
    setFormVisible(false);
  };

  return (
    <div className="bg-cover bg-center min-h-screen bg-custom-gray" >
      <Navbar />
      <div ref={containerRef} className="flex overflow-x-hidden w-full">
        <div className="w-full flex-shrink-0 flex justify-center">
          <div className="pt-20 mt-20 flex justify-center">
            <div className="bg-white rounded-md shadow-md p-6 mr-8">
              <CalendarComponent onDateChange={handleDateChange} />
            </div>
            <div className="bg-white rounded-md shadow-md p-6 max-w-md mx-auto">
              {selectedDate ? (
                <div className='p-6'>
                  {/* Add arrow button to hide slots and reset date */}
                  <div className="flex justify-between items-center gap-5 mb-4">
                    <h2 className="text-lg font-semibold">Available Time Slots</h2>
                    <ArrowRightFromLine className="h-6 w-6 text-gray-500 cursor-pointer transform hover:scale-110" onClick={handleReset} />
                  </div>
                  <div className="grid grid-cols-1 gap-2">{renderTimeSlots()}</div>
                  {selectedSlot && (
                    <button
                      className="bg-custom-darkBlue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                      onClick={handleBooking}
                    >
                      Confirm Booking
                    </button>
                  )}
                </div>
              ) : (
                <div className='p-10'>
                  <h2 className="text-lg font-semibold">Date Selection </h2>
                  <p className="mt-4">Please select a date to <br />view available time slots.</p>
                </div>
              )}
            </div>

          </div>
        </div>
        {formVisible && selectedDate && selectedSlot && (
          <div className="w-full flex-shrink-0 flex justify-center ">
            <div className="pt-20 mt-20 flex justify-center w-full">
              <BookingForm date={selectedDate} slot={selectedSlot.time} onCancel={handleBookingCancel} />
            </div>
          </div>
        )}
      </div>
      <br />
      br
      <Footer />
    </div>
  );
};

export default BookingPage;