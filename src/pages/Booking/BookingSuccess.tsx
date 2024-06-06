import { APPOINTMENT, HOME_PAGE } from '@/Route/router-const';
import { RootState } from '@/store';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

const BookingSuccess = () => {
  const navigate = useNavigate();
  const selector = useSelector((state:RootState) => state.formData.formData)
  console.log(selector);
  const {isSubmitted} = useSelector((state: RootState) => state.formData);
  if (!isSubmitted) {
    navigate(`/${APPOINTMENT}`); // Redirect to the booking page if the form is not submitted
  }


  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(`/${HOME_PAGE}`) // Replace '/' with the path to your homepage
    }, 3000); // Redirect to homepage after 5 seconds (adjust the time as needed)

    return () => clearTimeout(timer); // Clean up the timer on component unmount
  }, [navigate]);

  return (
    <div className="bg-custom-gray min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-md shadow-md p-8 max-w-md text-center">
        <h2 className="text-2xl font-bold mb-4 text-custom-darkBlue">Booking Successful!</h2>
        <p className="text-gray-600 mb-6">Thank you for your booking. You will be redirected to the homepage shortly.</p>
        <div className="flex justify-center">
          <div className="bg-custom-pink rounded-full h-8 w-8 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccess;