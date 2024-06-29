/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { Box, Grid } from "@mui/material";
import { AppointmentGet } from "@/Models/Appointment";
import AppointmentDataGrid from "./components/AppointmentDataGrid";
import { appointmentGetAPI } from "@/Services/AppointmentService";
import { toast } from "sonner";
import { cashoutAppointmentApi } from "@/Services/PaymentService"

const AppointmentManagement = () => {
  const [appointments, setAppointments] = useState<AppointmentGet[]>([]);

  useEffect(() => {
    getAppointments();
  }, []);

  const getAppointments = async () => {
    try {
      const res = await appointmentGetAPI();
      console.log("API response:", res); // Debugging line
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
      // Cashout appointment
      await cashoutAppointmentApi(customerId, appointmentId, amount)
      toast.success(`Appointment ${appointmentId} cashed out successfully`);
      getAppointments(); // Refresh appointments after cashout
    } catch (error: any) {
      toast.error("Failed to cashout appointment", error);
    }
  };

  return (
    <div className="m-10">
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {/* Header Section */}
          <Grid item xs={12}>
            {/* <Card className="h-full w-full">
              <CardHeader
                title="Appointment Management"
                titleTypographyProps={{ variant: "h5", color: "primary" }}
                action={
                  <Button onClick={openModal} className="bg-custom-pink hover:bg-custom-darkPink">
                    Add Appointment
                  </Button>
                }
              />
            </Card> */}
          </Grid>
          {/* Appointment Data Grid */}
          <Grid item xs={12}>
            <AppointmentDataGrid
              appointments={appointments}
              onAppointmentDelete={handleAppointmentDelete}
              onCashoutAppointment={handleCashoutAppointment}
            />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default AppointmentManagement;
