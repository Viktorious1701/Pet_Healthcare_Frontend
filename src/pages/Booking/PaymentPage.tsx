import React from 'react';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';
import BraintreeDropIn from '@/components/payment/BrainTreeDropIn';
import { useLocation, useNavigate } from 'react-router-dom';

const PaymentPage: React.FC = () => {
  const location = useLocation();
  const appointmentId = location.state?.appointmentId;
  const navigate = useNavigate();
  const handlePaymentCompleted = () => {
    // Handle any post-payment actions, e.g., navigate to a success page
    // or perform additional logic after payment completion.
    console.log('Payment completed!');
    // Example: navigate to a home page
    navigate(`/`);
  };

  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-custom-gray'>
      <Navbar />
      <div className='bg-white rounded-md shadow-md p-8 max-w-md text-center pt-[10rem]'>
        <h2 className='text-2xl font-bold mb-4 text-custom-darkBlue'>Complete Your Payment</h2>
        <BraintreeDropIn appointmentId={appointmentId} show={true} onPaymentCompleted={handlePaymentCompleted} />
      </div>
      <Footer />
    </div>
  );
};

export default PaymentPage;
