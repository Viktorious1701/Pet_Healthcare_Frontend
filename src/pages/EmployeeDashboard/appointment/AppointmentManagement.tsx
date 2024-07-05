/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { Box, Grid } from "@mui/material";
import { AppointmentGet } from "@/Models/Appointment";
import AppointmentDataGrid from "./components/AppointmentDataGrid";
import { appointmentGetAPI, appointmentCheckInAPI } from "@/Services/AppointmentService";
import { toast } from "sonner";
import { cashoutAppointmentApi } from "@/Services/PaymentService";

const AppointmentManagement: React.FC = () => {
  const [appointments, setAppointments] = useState<AppointmentGet[]>([]);

  useEffect(() => {
    getAppointments();
  }, []);

  const getAppointments = async () => {
    try {
      const res = await appointmentGetAPI();
    
      if (res?.data) {
        setAppointments(res.data);
      }
    } catch (error: any) {
      console.error("API error:", error); // Debugging line
      toast.error("Failed to fetch appointments", error);
    }
  };

  const handleAppointmentDelete = (deletedAppointment: AppointmentGet) => {
    setAppointments(appointments.filter(a => a.appointmentId !== deletedAppointment.appointmentId));
  };

  const handleCashoutAppointment = async (appointmentId: number, customerId: string, amount: number) => {
    try {
      await cashoutAppointmentApi(customerId, appointmentId, amount);
      toast.success(`Appointment ${appointmentId} cashed out successfully`);
      getAppointments(); // Refresh appointments after cashout
    } catch (error: any) {
      toast.error("Failed to cashout appointment", error);
    }
  };

  const handleCheckInAppointment = async (appointmentId: number) => {
    try {
      await appointmentCheckInAPI(appointmentId);
      toast.success(`Appointment ${appointmentId} checked in successfully`);
      getAppointments(); // Refresh appointments after check-in
    } catch (error: any) {
      toast.error("Failed to check in appointment", error);
    }
  };

  return (
    <div className="m-10">
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {/* Header Section */}
          <Grid item xs={12}>
            {/* Add your header section here if needed */}
          </Grid>
          {/* Appointment Data Grid */}
          <Grid item xs={12}>
            
            <AppointmentDataGrid
              appointments={appointments}
              onAppointmentDelete={handleAppointmentDelete}
              onCashoutAppointment={handleCashoutAppointment}
              onCheckInAppointment={handleCheckInAppointment} // Pass the check-in handler
            />
            
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default AppointmentManagement;
