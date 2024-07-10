/* eslint-disable react-hooks/exhaustive-deps */
import { useAuth } from '@/Context/useAuth';
import { APPOINTMENT, EMPLOYEE_APPOINTMENT_BOOKING, EMPLOYEE_DASHBOARD, PAYMENT } from '@/Route/router-const';
import { RootState } from '@/store';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';

const BookingSuccess = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const location = useLocation();
  const appointmentId = location.state?.appointmentId;
  const { isSubmitted } = useSelector((state: RootState) => state.formData);
  const [showPrompt, setShowPrompt] = useState(false);

  if (!isSubmitted) {
    navigate(`/${APPOINTMENT}`);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPrompt(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleContinue = (willPay: boolean) => {
    if (user?.role === 'Customer' && appointmentId) {
      navigate(`/${PAYMENT}`, { state: { appointmentId, willPay } });
    }
  };

  const handleEmployeeRedirect = () => {
    if (user?.role === 'Employee') {
      navigate(`/${EMPLOYEE_DASHBOARD}/${EMPLOYEE_APPOINTMENT_BOOKING}`);
      navigate(`/${EMPLOYEE_DASHBOARD}/${EMPLOYEE_APPOINTMENT_BOOKING}`);
    }
  };

  useEffect(() => {
    if (user?.role === 'Employee') {
      handleEmployeeRedirect();
    }
  }, [navigate, user]);

  return (
    <div className='bg-custom-gray min-h-screen flex items-center justify-center'>
      <div className='bg-white rounded-md shadow-md p-8 max-w-md text-center'>
        <h2 className='text-2xl font-bold mb-4 text-custom-darkBlue'>Booking Successful!</h2>
        <p className='text-gray-600 mb-6'>Thank you for your booking.</p>
        <div className='flex justify-center'>
          {!showPrompt && <div className='bg-custom-pink rounded-full h-8 w-8 animate-pulse'></div>}
          {showPrompt && user?.role === 'Customer' && (
            <div>
              <p className='text-gray-600 mb-6'>Do you want to proceed to the payment?</p>
              <button
                onClick={() => handleContinue(true)}
                className='bg-custom-blue text-white py-2 px-4 rounded-md mr-2'
              >
                Yes
              </button>
              <button onClick={() => handleContinue(false)} className='bg-gray-300 text-gray-700 py-2 px-4 rounded-md'>
                No
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingSuccess;
