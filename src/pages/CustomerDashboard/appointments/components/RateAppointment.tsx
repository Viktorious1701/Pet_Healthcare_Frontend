import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAppointmentByIdAPI, appointmentRateAPI } from '@/Services/AppointmentService';
import { AppointmentGet } from '@/Models/Appointment';
import { Button } from '@/components/ui/button';
import { CUSTOMER_APPOINTMENTS, CUSTOMER_DASHBOARD } from '@/Route/router-const';
import { Star } from 'lucide-react';
import { toast } from 'sonner';

const RateAppointment: React.FC = () => {
  const { appointmentId } = useParams<{ appointmentId: string }>();
  const [appointment, setAppointment] = useState<AppointmentGet | null>(null);
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointment = async () => {
      setLoading(true);
      try {
        const response = await getAppointmentByIdAPI(Number(appointmentId!));
        setAppointment(response?.data || null);
      } catch (error) {
        toast.error('Error fetching appointment');
      } finally {
        setLoading(false);
      }
    };

    fetchAppointment();
  }, [appointmentId]);

  const handleRatingChange = (newRating: number) => setRating(newRating);
  const handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => setComment(event.target.value);

  const handleSubmit = async () => {
    try {
      await appointmentRateAPI(Number(appointmentId!), rating, comment);
      toast.success('Rating submitted successfully!');
      navigate(`/${CUSTOMER_DASHBOARD}/${CUSTOMER_APPOINTMENTS}`);
    } catch (error) {
      console.error('Error submitting rating:', error);
      toast.error('Error submitting rating');
    }
  };

  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#374151]'></div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-3xl mx-auto'>
        <div className='bg-white shadow-xl rounded-lg overflow-hidden'>
          <div className='bg-[#374151] px-6 py-4'>
            <h1 className='text-3xl font-bold text-white'>Rate Appointment</h1>
          </div>
          {appointment ? (
            <div className='p-6 space-y-6'>
              <div className='grid grid-cols-2 gap-4 text-sm'>
                <p>
                  <span className='font-semibold text-[#374151]'>Appointment ID:</span> {appointment.appointmentId}
                </p>
                <p>
                  <span className='font-semibold text-[#374151]'>Pet:</span> {appointment.pet}
                </p>
                <p>
                  <span className='font-semibold text-[#374151]'>Vet:</span> {appointment.vet}
                </p>
                <p>
                  <span className='font-semibold text-[#374151]'>Slot Time:</span> {appointment.slotStartTime} -{' '}
                  {appointment.slotEndTime}
                </p>
                <p>
                  <span className='font-semibold text-[#374151]'>Service:</span> {appointment.service}
                </p>
                <p>
                  <span className='font-semibold text-[#374151]'>Date:</span> {appointment.date}
                </p>
                <p>
                  <span className='font-semibold text-[#374151]'>Total Cost:</span> {appointment.totalCost}
                </p>
              </div>
              <div className='space-y-4'>
                <div>
                  <label htmlFor='rating' className='block text-sm font-medium text-[#374151] mb-1'>
                    Rating:
                  </label>
                  <div className='flex items-center'>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={32}
                        fill={star <= rating ? '#374151' : 'none'}
                        stroke={star <= rating ? '#374151' : '#CBD5E0'}
                        strokeWidth={1.5}
                        onClick={() => handleRatingChange(star)}
                        className='cursor-pointer transition-colors duration-200 hover:stroke-[#4B5563]'
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <label htmlFor='comment' className='block text-sm font-medium text-[#374151] mb-1'>
                    Feedback Comment:
                  </label>
                  <textarea
                    id='comment'
                    name='comment'
                    rows={4}
                    value={comment}
                    onChange={handleCommentChange}
                    className='w-full px-3 py-2 text-[#374151] border border-gray-300 rounded-lg focus:outline-none focus:border-[#374151] focus:ring-1 focus:ring-[#374151] resize-none'
                    placeholder='Please share your experience...'
                  />
                </div>
                <Button
                  onClick={handleSubmit}
                  className='w-full bg-[#374151] hover:bg-[#4B5563] text-white font-bold py-2 px-4 rounded-lg transition duration-200 ease-in-out transform hover:-translate-y-1 hover:shadow-lg'
                >
                  Submit Rating
                </Button>
              </div>
            </div>
          ) : (
            <div className='p-6 text-center text-[#374151]'>Appointment not found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RateAppointment;
