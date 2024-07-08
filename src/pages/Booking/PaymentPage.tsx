import React, { useState, useEffect } from 'react';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';
import BraintreeDropIn from '@/components/payment/BrainTreeDropIn';
import AppointmentInfoTable from './AppointmentInfoTable';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAppointmentByIdAPI } from '@/Services/AppointmentService';
import { AppointmentGet } from '@/Models/Appointment';

const PaymentPage: React.FC = () => {
  const location = useLocation();
  const { appointmentId, willPay } = location.state as { appointmentId: number; willPay: boolean };
  const navigate = useNavigate();
  const [appointmentDetails, setAppointmentDetails] = useState<AppointmentGet | null>(null);
  const [showPayment, setShowPayment] = useState(false);

  useEffect(() => {
    const fetchAppointmentDetails = async () => {
      if (appointmentId) {
        const response = await getAppointmentByIdAPI(appointmentId);
        if (response) {
          setAppointmentDetails(response.data);
        }
      }
    };
    fetchAppointmentDetails();
  }, [appointmentId]);

  const handlePaymentCompleted = () => {
    console.log('Payment completed!');
    navigate(`/`);
  };

  const handleConfirm = () => {
    if (willPay) {
      setShowPayment(true);
    } else {
      navigate('/');
    }
  };

  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-custom-gray'>
      <Navbar />
      <div className='bg-white rounded-md shadow-md p-8 max-w-md w-full text-center mt-20'>
        <h2 className='text-2xl font-bold mb-4 text-custom-darkBlue'>Appointment Details</h2>
        {appointmentDetails && (
          <AppointmentInfoTable
            customer={appointmentDetails.customer}
            pet={appointmentDetails.pet}
            date={appointmentDetails.date}
            service={appointmentDetails.service}
            vet={appointmentDetails.vet}
            totalCost={appointmentDetails.totalCost}
          />
        )}
        {!showPayment ? (
          <button
            onClick={handleConfirm}
            className="w-full bg-custom-pink text-white py-3 rounded-md font-semibold hover:bg-pink-600 transition-colors"
          >
            Confirm
          </button>
        ) : (
          <BraintreeDropIn appointmentId={appointmentId} show={true} onPaymentCompleted={handlePaymentCompleted} />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default PaymentPage;