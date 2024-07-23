/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { AppointmentGet } from '@/Models/Appointment';
import AppointmentDataGrid from './components/AppointmentDataGrid';
import { appointmentGetAPI, appointmentCheckInAPI, appointmentFinishAPI } from '@/Services/AppointmentService';
import { toast } from 'sonner';
import { cashoutAppointmentApi } from '@/Services/PaymentService';

const AppointmentManagement: React.FC = () => {
  const [appointments, setAppointments] = useState<AppointmentGet[]>([]);
  const [processingAppointments, setProcessingAppointments] = useState<AppointmentGet[]>([]);
  const [cashoutAppointments, setCashoutAppointments] = useState<AppointmentGet[]>([]);
  const [finishedAppointments, setFinishedAppointments] = useState<AppointmentGet[]>([]);

  useEffect(() => {
    getAppointments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getAppointments = async () => {
    try {
      const res = await appointmentGetAPI();
      console.log('res', res);
      if (res?.data) {
        const allAppointments = res.data;
        setAppointments(allAppointments.filter((a: AppointmentGet) => a.status === 'Booked'));
        //console.log('allAppointments', allAppointments);
        setProcessingAppointments(allAppointments.filter((a: AppointmentGet) => a.status === 'Processing'));
        //console.log('processingAppointments', processingAppointments);
        setFinishedAppointments(
          allAppointments.filter((a: AppointmentGet) => a.status === 'Done' && a.paymentStatus === 1)
        );
        //console.log('finishedAppointments', finishedAppointments);
        setCashoutAppointments(allAppointments.filter((a: AppointmentGet) => a.paymentStatus === 0 || a.paymentStatus === null));
      }
    } catch (error: any) {
      console.error('API error:', error); // Debugging line
      toast.error('Failed to fetch appointments', error);
    }
  };

  const handleAppointmentDelete = (deletedAppointment: AppointmentGet) => {
    setAppointments(appointments.filter((a) => a.appointmentId !== deletedAppointment.appointmentId));
    setProcessingAppointments(
      processingAppointments.filter((a) => a.appointmentId !== deletedAppointment.appointmentId)
    );
    setFinishedAppointments(finishedAppointments.filter((a) => a.appointmentId !== deletedAppointment.appointmentId));
    setCashoutAppointments(cashoutAppointments.filter((a) => a.appointmentId !== deletedAppointment.appointmentId));
  };

  const handleCashoutAppointment = async (appointmentId: number, customerId: string, amount: number) => {
    try {
      await cashoutAppointmentApi(customerId, appointmentId, amount);
      toast.success(`Appointment ${appointmentId} cashed out successfully`);
      getAppointments(); // Refresh appointments after cashout
    } catch (error: any) {
      toast.error('Failed to cashout appointment', error);
    }
  };

  const handleCheckInAppointment = async (appointmentId: number) => {
    try {
      await appointmentCheckInAPI(appointmentId);
      toast.success(`Appointment ${appointmentId} checked in successfully`);
      getAppointments(); // Refresh appointments after check-in
    } catch (error: any) {
      toast.error('Failed to check in appointment', error);
    }
  };

  const handleFinishAppointment = async (appointmentId: number) => {
    try {
      await appointmentFinishAPI(appointmentId);
      toast.success(`Appointment ${appointmentId} finished successfully`);
      getAppointments(); // Refresh appointments after finish
    } catch (error: any) {
      toast.error('Failed to finish appointment', error);
    }
  };
  console.log('appointments', appointments);
  return (
    <div className='m-10'>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant='h6'>Booked Appointments</Typography>
            <AppointmentDataGrid
              appointments={appointments}
              onAppointmentDelete={handleAppointmentDelete}
              onCashoutAppointment={handleCashoutAppointment}
              onCheckInAppointment={handleCheckInAppointment}
              onFinishAppointment={handleFinishAppointment}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant='h6'>Processing Appointments</Typography>
            <AppointmentDataGrid
              appointments={processingAppointments}
              onAppointmentDelete={handleAppointmentDelete}
              onCashoutAppointment={handleCashoutAppointment}
              onCheckInAppointment={handleCheckInAppointment}
              onFinishAppointment={handleFinishAppointment}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant='h6'>Unpaid Appointments</Typography>
            <AppointmentDataGrid
              appointments={cashoutAppointments}
              onAppointmentDelete={handleAppointmentDelete}
              onCashoutAppointment={handleCashoutAppointment}
              onCheckInAppointment={handleCheckInAppointment}
              onFinishAppointment={handleFinishAppointment}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant='h6'>Finished Appointments</Typography>
            <AppointmentDataGrid
              appointments={finishedAppointments}
              onAppointmentDelete={handleAppointmentDelete}
              onCashoutAppointment={handleCashoutAppointment}
              onCheckInAppointment={handleCheckInAppointment}
              onFinishAppointment={handleFinishAppointment}
            />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default AppointmentManagement;
