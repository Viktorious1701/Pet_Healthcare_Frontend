import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { getAppointmentByIdAPI } from "@/Services/AppointmentService";
import { AppointmentGet } from "@/Models/Appointment";
import { differenceInDays, format } from 'date-fns';
import styled from 'styled-components';
import { refundApi } from "@/Services/PaymentService";
import { CUSTOMER_APPOINTMENTS, CUSTOMER_DASHBOARD } from "@/Route/router-const";
import { toast } from "sonner";

const Wrapper = styled.div`
  margin-bottom: 10px;
  padding: 10px;
  background-color: #f8f8f8;
  border-radius: 5px;
`;

const HighlightedText = styled.p`
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
`;

const CancelAppointment: React.FC = () => {
  const navigate = useNavigate();
  const { appointmentId } = useParams<{ appointmentId: string }>(); // Get appointmentId from URL params
  const [appointment, setAppointment] = useState<AppointmentGet | null>(null);
  const [refundPolicy, setRefundPolicy] = useState<string>("");

  useEffect(() => {
    const fetchAppointmentDetails = async () => {
     
      try {
        const res = await getAppointmentByIdAPI(Number(appointmentId));
        if (res?.data) {
            if(res.data.status === null || res.data.status !== "Boooked" )
            {
              toast.info("Appointment is in the booking process");
              navigate(`/${CUSTOMER_DASHBOARD}/${CUSTOMER_APPOINTMENTS}`);
            }
            else if(res.data.paymentStatus === null || res.data.paymentStatus !== 1)
            {
              toast.info("Appointment is not paid yet, Please Contact Us via phone to cancel the appointment.");
              navigate(`/${CUSTOMER_DASHBOARD}/${CUSTOMER_APPOINTMENTS}`);
            }
          setAppointment(res.data);
          calculateRefundPolicy(res.data);
          
        }
      } catch (error) {
        console.error("Error fetching appointment details: ", error);
        // Handle error fetching data
      }
    };

    fetchAppointmentDetails();
  }, [appointmentId]);

  const calculateRefundPolicy = (appointment: AppointmentGet) => {
    const currentDate = new Date();
    const appointmentDate = new Date(appointment.date);
    const daysDifference = differenceInDays(appointmentDate, currentDate);

    if (daysDifference > 7) {
      setRefundPolicy("You will receive a full refund.");
    } else if (daysDifference >= 3 && daysDifference <= 6) {
      setRefundPolicy("You will receive a 75% refund.");
    } else {
      setRefundPolicy("No refund will be issued.");
    }
  };

  const handleRefund = async () => {
    console.log(`Processing refund for appointment ID: ${appointment?.appointmentId}`);
    
    // Logic for processing the refund based on appointment details
    const refundId = appointment?.appointmentId || 0;
    try {
      const refund  = await refundApi(refundId);
      navigate("/customer");
      if(refund)
        toast("Refund processed successfully.");
      else
        toast("Error processing refund. Please try again later.");
    } catch (error) {
      toast("Error processing refund. Please try again later.");
      navigate(`/${CUSTOMER_DASHBOARD}/${CUSTOMER_APPOINTMENTS}`)
    }
  };

  if (!appointment) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md p-4 shadow-lg">
        <Card.Body>
          <Card.Title className="mb-4 text-center text-2xl font-bold text-custom-pink">
            Cancel Appointment
          </Card.Title>
          <Wrapper>
            <HighlightedText>Date: {format(new Date(appointment.date), 'MMMM dd, yyyy')}</HighlightedText>
            <HighlightedText>Time: {appointment.slotStartTime} - {appointment.slotEndTime}</HighlightedText>
            <HighlightedText>Vet: {appointment.vet}</HighlightedText>
            <HighlightedText>Pet: {appointment.pet}</HighlightedText>
            <HighlightedText>Customer: {appointment.customer}</HighlightedText>
          </Wrapper>
          <p className="text-center mb-4">
            If you cancel your appointment:
          </p>
          <ul className="text-left list-disc pl-5 mb-4 ">
            <li>{refundPolicy}</li>
          </ul>
          <div className="flex flex-col items-center">
            <Button
              variant="danger"
              className="bg-custom-pink text-white w-full"
              onClick={handleRefund}
            >
              Cancel Appointment
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CancelAppointment;
