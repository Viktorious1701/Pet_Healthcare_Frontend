import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { format } from 'date-fns';

import { useDispatch } from 'react-redux';
import { setDateSlot } from "@/components/slices/dateSlice";
import { AppDispatch } from '@/store';
import 'react-calendar/dist/Calendar.css';
import { useNavigate } from 'react-router';
type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

interface TimeSlots {
  [key: string]: string[];
}

const timeSlots: TimeSlots = {

  '2024-05-19': ['10:00', '11:00', '13:00', '14:00'],
  '2024-05-20': ['09:00', '10:30', '12:00', '15:00'],
  '2024-05-24': ['09:00', '10:00', '15:00', '16:00'],

  // Add more dates and slots as needed
};

const CalendarComponent: React.FC = () => {

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Value>(new Date());
  const [slots, setSlots] = useState<string[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
   const navigate = useNavigate();

  const onChange = (value: Value) => {
    if (Array.isArray(value)) {
      // Handle range selection
    } else {
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
    }
  };

  const handleSlotClick = (slot: string) => {
    setSelectedSlot(slot);
  };

  const handleNextClick = () => {
    if (selectedSlot && selectedDate) {
      console.log(`Proceeding with date: ${selectedDate}, slot: ${selectedSlot}`);
      // Add your next steps here, such as navigating to another page or showing a form
      dispatch(
        setDateSlot({
          date: selectedDate.toString(),
          slot: selectedSlot,
        })
      )
      navigate('/book');

    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto' }}>
      <h2>Select a Date</h2>

      <div className="flex justify-center items-center bg-custom-gray ">
        <div className="bg-white rounded-md shadow-md p-6">
          <Calendar
            className="w-full p-2 border border-gray-300 rounded-md "
            // Other props...
            onChange={onChange}
            value={selectedDate}
          />
        </div>
      </div>
      {selectedDate && (
        <div className="mt-2">
          <h3>Available Time Slots</h3>
          {slots.length > 0 ? (
            <ul>
              {slots.map((slot, index) => (
                <li key={index} onClick={() => handleSlotClick(slot)} className="mb-1 cursor-pointer">
                  {slot}
                  {selectedSlot === slot && <button onClick={handleNextClick} className="ml-1">Next</button>}
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