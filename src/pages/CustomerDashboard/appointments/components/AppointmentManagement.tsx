import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"; // Adjust the path based on your project structure
import { appointmentCustomerAPI } from "@/Services/AppointmentService";
import { AppointmentGet } from "@/Models/Appointment";
import { useAuth } from "@/Context/useAuth";
import { useNavigate } from "react-router-dom";
import { CUSTOMER_DASHBOARD, REFUND } from "@/Route/router-const";
import { useTheme } from '@/components/vet_components/theme-provider'; // Import the useTheme hook

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"; // Adjust the path based on your project structure

const AppointmentManagement: React.FC = () => {
  const [appointments, setAppointments] = useState<AppointmentGet[]>([]);
  const { user } = useAuth();
  const username = user?.userName;
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme(); // Use the useTheme hook to get the current theme

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const appointmentsPerPage = 5;

  useEffect(() => {
    setLoading(true);
    const fetchAppointments = async () => {
      try {
        const listAppointment = await appointmentCustomerAPI(username ?? "");
        setAppointments(listAppointment?.data || []);
        sessionStorage.setItem("appointments", JSON.stringify(listAppointment?.data || []));
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [username]);

  const navigate = useNavigate();

  const handleRating = (appointmentId: number) => {
    navigate(`/${CUSTOMER_DASHBOARD}/rate/${appointmentId}`);
  };

  // Pagination logic
  const indexOfLastAppointment = currentPage * appointmentsPerPage;
  const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
  const currentAppointments = appointments.slice(indexOfFirstAppointment, indexOfLastAppointment);
  const totalPages = Math.ceil(appointments.length / appointmentsPerPage);

  const handleCanceling = (appointmentId: string) => {
    navigate(`/${CUSTOMER_DASHBOARD}/${REFUND}/${appointmentId}`);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <div className="bg-custom-darkPink flex items-center justify-between rounded-md p-2">
        <h1 className="text-3xl font-bold text-white">
          Appointment History
        </h1>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableCaption>A list of your recent appointments.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Appointment ID</TableHead>
              <TableHead>Pet</TableHead>
              <TableHead>Vet</TableHead>
              <TableHead>Slot Time</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Cancel</TableHead>
              <TableHead>Payment Status</TableHead>
              <TableHead>Total Cost</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Rate</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentAppointments.map((appointment) => (
              <TableRow
                key={appointment.appointmentId}
                className={`${
                  theme === 'dark' ? 'even:bg-custom-darkPink odd:bg-custom-dark' : 'even:bg-pink-50 odd:bg-pink-100'
                }`}
              >
                <TableCell className="font-medium">{appointment.appointmentId}</TableCell>
                <TableCell className="font-medium">{appointment.pet}</TableCell>
                <TableCell>{appointment.vet}</TableCell>
                <TableCell>{`${appointment.slotStartTime} - ${appointment.slotEndTime}`}</TableCell>
                <TableCell>{appointment.service}</TableCell>
                <TableCell>{appointment.date}</TableCell>
                <TableCell>
                  <Button
                    className={`mx-1 ${theme === 'dark' ? 'bg-custom-gray' : 'bg-custom-darkPink'} hover:bg-custom-hover-darkPink active:bg-custom-active-darkPink transform transition-transform duration-300 hover:scale-125 active:scale-110`}
                    onClick={() => handleCanceling(String(appointment.appointmentId))}
                  >
                    Cancel
                  </Button>
                </TableCell>
                <TableCell>{appointment.paymentStatus || "Not settled"}</TableCell>
                <TableCell>{appointment.totalCost}</TableCell>
                <TableCell>{appointment.rating}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleRating(appointment.appointmentId)}
                    className="bg-custom-pink hover:bg-custom-darkPink active:bg-custom-lightPink"
                  >
                    Rate
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={10}>Total Appointments</TableCell>
              <TableCell className="text-right" colSpan={1}>{appointments.length}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={11} className="text-center">
                <div className="flex justify-between">
                  <Button onClick={handlePreviousPage} disabled={currentPage === 1} className="bg-custom-pink">
                    Previous
                  </Button>
                  <span>
                    Page {currentPage} of {totalPages}
                  </span>
                  <Button onClick={handleNextPage} disabled={currentPage === totalPages} className="bg-custom-pink">
                    Next
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
};

export default AppointmentManagement;
