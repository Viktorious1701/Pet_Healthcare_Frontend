import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { appointmentCustomerAPI } from "@/Services/AppointmentService";
import { AppointmentGet } from "@/Models/Appointment";
import { useAuth } from "@/Context/useAuth";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useNavigate } from "react-router";
import { CUSTOMER_DASHBOARD, REFUND } from "@/Route/router-const";

const AppointmentManagement: React.FC = () => {
  const [appointments, setAppointments] = useState<AppointmentGet[]>([]);
  const { user } = useAuth();
  const username = user?.userName;
  const [loading, setLoading] = useState(true);
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const appointmentsPerPage = 5;

  useEffect(() => {
    setLoading(true);
    // const storedAppointments = sessionStorage.getItem("appointments");
    // if(storedAppointments){
    //   setAppointments(JSON.parse(storedAppointments));
    //   setLoading(false);
    //   return;
    // }
    const fetchAppointments = async () => {
      try {
        const listAppointment = await appointmentCustomerAPI(username ?? "");
        setAppointments(listAppointment?.data || []);
        sessionStorage.setItem("appointments", JSON.stringify(listAppointment?.data || []));
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }finally{
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [username]);

  const handleRating = (id: number, rating: number) => {
    const updatedAppointments = appointments.map((appointment) =>
      appointment.appointmentId === id ? { ...appointment, rating } : appointment
    );
    setAppointments(updatedAppointments);
  };

  // Pagination logic
  const indexOfLastAppointment = currentPage * appointmentsPerPage;
  const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
  const currentAppointments = appointments.slice(indexOfFirstAppointment, indexOfLastAppointment);
  const totalPages = Math.ceil(appointments.length / appointmentsPerPage);
  const navigate = useNavigate();
  const handleCanceling = (appointmentId: string) => {
    navigate(`/${CUSTOMER_DASHBOARD}/${REFUND}/${appointmentId}`);
  }
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
    <div className="p-6 ">
      <div className="bg-pink-600 flex items-center justify-between rounded-md p-2">
        <h1 className="text-3xl font-bold text-white">
          Appointment History
        </h1>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableCaption>A list of your recent appointments.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Pet</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Cancel</TableHead>
              <TableHead>Rate</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentAppointments.map((appointment) => (
              <TableRow key={appointment.appointmentId} className="even:bg-pink-50 odd:bg-pink-100">
                <TableCell className="font-medium">{appointment.pet}</TableCell>
                <TableCell>{appointment.date}</TableCell>
                <TableCell>{appointment.service}</TableCell>
                <TableCell>{appointment.status}</TableCell>
                <TableCell>{appointment.rating}</TableCell>
                <TableCell>
                <Button
              className="mx-1 bg-custom-darkPink hover:bg-custom-hover-darkPink active:bg-custom-active-darkPink transform transition-transform duration-300 hover:scale-125 active:scale-110"
              onClick={() => handleCanceling(String(appointment.appointmentId))}
            >
              Cancel
            </Button>
                </TableCell>
                <TableCell>
                  <select
                    title="Rate this appointment"
                    value={appointment.rating || ''}
                    onChange={(e) => handleRating(appointment.appointmentId, parseInt(e.target.value))}
                    className="bg-white border border-gray-300 rounded p-2"
                  >
                    <option value="" disabled>Select Rating</option>
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <option key={rating} value={rating}>
                        {rating} ⭐
                      </option>
                    ))}
                  </select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={5}>Total Appointments</TableCell>
              <TableCell className="text-right" colSpan={2}>{appointments.length}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={7} className="text-center">
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
