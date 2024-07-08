import { useState, useRef, useEffect } from 'react';
import CalendarComponent from '@/components/calendar/CalendarComponent';
import { useDispatch } from 'react-redux';
import { setUserBooking } from '@/components/slices/dateSlice';
import { AppDispatch } from '@/store';
import { SlotGet } from '@/Models/Slot';
import { slotGetAPI } from '@/Services/SlotService';
import { toast } from 'sonner';
import BookingForm from '@/components/appointment/BookingForm';
import { ArrowRightFromLine } from 'lucide-react';
import { useNavigate } from 'react-router';
import CustomerSelect from '@/components/appointment/CustomerSelect';
import { Button } from '@nextui-org/react';

import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const steps = [
  {
    label: 'Select a customer'
  },
  {
    label: 'Select date and slot'
  },
  {
    label: 'Select Pet, Service and Vet'
  }
];

const BookingPageEmployee = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [slots, setSlots] = useState<SlotGet[] | null>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<SlotGet | null>(null);
  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const dateRef = useRef<HTMLDivElement | null>(null);
  const bookRef = useRef<HTMLDivElement | null>(null);

  const [activeStep, setActiveStep] = useState<number>(0);

  const getSlots = async (date: string) => {
    await slotGetAPI(date)
      .then((res) => {
        if (res?.data) {
          setSlots(res?.data);
        }
      })
      .catch(() => {
        toast.warning('Could not get slot data');
      });
  };

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    }
    window.scrollTo(0, 0);
  }, [navigate]);

  const handleBookingCancel = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    setSelectedDate(null);
    setSelectedSlot(null);
    handleReset();
  };

  const handleDateChange = (value: Value) => {
    if (!Array.isArray(value)) {
      setSelectedDate(value);
      setSelectedSlot(null);
      getSlots(String(value?.toLocaleDateString().replace(/\//g, '-')));
    }
  };

  const handleSlotClick = (slot: SlotGet) => {
    if (slot.available) {
      setSelectedSlot(slot);
    }
  };

  const handleBooking = () => {
    if (selectedSlot && selectedDate && selectedCustomer) {
      dispatch(
        setUserBooking({
          date: selectedDate.toString(),
          slot: selectedSlot.slotId.toString(),
          user: selectedCustomer.toString()
        })
      );
      bookRef.current?.scrollIntoView({
        behavior: 'smooth'
      });
      handleNext();
    }
  };

  const handleCustomerSelect = (customer: string) => {
    dateRef.current?.scrollIntoView({
      behavior: 'smooth'
    });
    setSelectedCustomer(customer);
    handleNext();
  };

  const isSlotInThePast = (slot: SlotGet): boolean => {
    const [month, day, year] = String(selectedDate?.toLocaleDateString().replace(/\//g, '-')).split('-');
    const [hour, minute] = slot.startTime.split(':');
    const slotDateTime = new Date(Number(year), Number(month) - 1, Number(day), Number(hour), Number(minute));
    const now = new Date();

    if (!slot.available) {
      return true;
    }
    return slotDateTime < now;
  };

  const renderTimeSlots = () => {
    return slots?.map((slot, index) => {
      const isPast = isSlotInThePast(slot);
      slot.available = !isPast; // Update availability based on the current time
      return (
        <div
          key={index}
          className={`p-2 rounded-md cursor-pointer ${
            slot.available ? 'bg-custom-pink hover:bg-custom-blue text-white' : 'bg-custom-gray text-white'
          }`}
          onClick={() => handleSlotClick(slot)}
        >
          {slot.startTime}
        </div>
      );
    });
  };

  const handleReset = () => {
    setSelectedDate(null);
    setSelectedSlot(null);
    setActiveStep(0);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  return (
    <div className='w-full h-full overflow-y-hidden' ref={containerRef}>
      <div className='fixed bottom-0 left-0 right-0 bg-white shadow-lg py-4'>
        <Box sx={{ maxWidth: 400, mx: 'auto' }}>
          <Stepper activeStep={activeStep} orientation='horizontal'>
            {steps.map((step, index) => (
              <Step key={step.label}>
                <StepLabel optional={index === 2 ? <Typography variant='caption'>Last step</Typography> : null}>
                  {step.label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
      </div>

      <div className='pt-0 border-tran bg-blue'>
        <div className='w-full'>
          {/* First div */}
          <div className='w-full flex-shrink-0 flex justify-center h-screen'>
            <div className='pt-0 flex justify-center'>
              <CustomerSelect onSelectCustomer={handleCustomerSelect} />
            </div>
          </div>
          {/* Second div */}
          {selectedCustomer && (
            <div className='w-full flex-shrink-0 flex justify-center h-screen pt-20 my-20' ref={dateRef}>
              <div className='flex justify-center shadow-md'>
                <div className='bg-white rounded-md p-6 mr-8'>
                  <div className='flex justify-between items-center mb-4'>
                    <div>
                      <h2 className='text-lg font-semibold'>Customer: {selectedCustomer}</h2>
                    </div>
                    <Button
                      className={`text-white text-md bg-custom-darkBlue ${!selectedCustomer ? 'hidden' : ''}`}
                      onClick={handleBookingCancel}
                    >
                      Cancel
                    </Button>
                  </div>
                  <CalendarComponent onDateChange={handleDateChange} />
                </div>
                <div className='bg-white rounded-md shadow-md p-6 max-w-md mx-auto'>
                  {selectedDate ? (
                    <div className='p-6'>
                      <div className='flex justify-between items-center gap-5 mb-4'>
                        <h2 className='text-lg font-semibold'>Available Time Slots</h2>
                        <ArrowRightFromLine
                          className='h-6 w-6 text-gray-500 cursor-pointer transform hover:scale-110'
                          onClick={handleReset}
                        />
                      </div>
                      <div className='grid grid-cols-1 gap-2'>{renderTimeSlots()}</div>
                      {selectedSlot && (
                        <button
                          className='bg-custom-darkBlue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4'
                          onClick={handleBooking}
                        >
                          Confirm Booking
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className='p-10'>
                      <h2 className='text-lg font-semibold'>Date Selection </h2>
                      <p className='mt-4'>
                        Please select a date to <br />
                        view available time slots.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}{' '}
          {/* Third div */}
          <div ref={bookRef} className='w-full flex-shrink-0 flex justify-center h-screen'>
            {selectedDate && selectedSlot && (
              <div className='flex justify-center w-full'>
                <BookingForm
                  date={selectedDate}
                  slot={selectedSlot.slotId}
                  userName={String(selectedCustomer)}
                  onCancel={handleBookingCancel}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default BookingPageEmployee;
