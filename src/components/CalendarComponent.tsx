import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

interface TimeSlots {
  [key: string]: string[];
}

const timeSlots: TimeSlots = {
  '2024-05-19': ['10:00 AM', '11:00 AM', '01:00 PM', '02:00 PM'],
  '2024-05-20': ['09:00 AM', '10:30 AM', '12:00 PM', '03:00 PM'],
  // Add more dates and slots as needed
};

const CalendarComponent: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [slots, setSlots] = useState<string[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const navigate = useNavigate();
  const onChange = (value: Date | null) => {
    if (value) {
        setSelectedDate(value);
        const formattedDate = format(value, 'yyyy-MM-dd');
        setSlots(timeSlots[formattedDate] || []);
        setSelectedSlot(null); // Reset selected slot on date change
    } else {
        setSelectedDate(null);
        setSlots([]);
        setSelectedSlot(null);
    }
};

  const handleSlotClick = (slot: string) => {
    setSelectedSlot(slot);
  };

  const handleNextClick = () => {
    if (selectedSlot && selectedDate) {
      console.log(`Proceeding with date: ${format(selectedDate!, 'yyyy-MM-dd')} and slot: ${selectedSlot}`);
      // Add your next steps here, such as navigating to another page or showing a form
      navigate('/book', {
        state: {
          date: selectedDate,
          slot: selectedSlot,
        },
      });
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto' }}>
      <h2>Select a Date</h2>
      <Calendar onChange={(onChange)} value={selectedDate} />
      {selectedDate && (
        <div className='mt-2'>
          <h3>Available Time Slots for {format(selectedDate, 'MMMM dd, yyyy')}</h3>
          {slots.length > 0 ? (
            <ul>
              {slots.map((slot, index) => (
                <li key={index} onClick={() => handleSlotClick(slot)} className='mb-1 cursor-pointer'>
                  {slot}
                  {selectedSlot === slot && (
                    <button onClick={handleNextClick} className='ml-1'>
                      Next
                    </button>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p>No available time slots for this date.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CalendarComponent;
