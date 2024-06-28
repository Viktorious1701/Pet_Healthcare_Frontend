import { AppointmentGet } from "@/Models/Appointment";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Divider } from "@mui/material";
import React from "react";

interface RecentAppointmentsProps {
  appointments: AppointmentGet[];
}
const now = new Date();
const RecentAppointments: React.FC<RecentAppointmentsProps> = ({
  appointments,
}) => {
  appointments = appointments.filter(
    (appointment) => new Date(appointment.date).getDate() === now.getDate()
  );
  const getAppointmentImage = (status: string) => {
    switch (status) {
      case "Booked":
        return "bg-gray";
      case "Processing":
        return "bg-blue-400";
      case "Done":
        return "bg-success-500";
      case "Cancelled":
        return "bg-red-400";
    }
  };
  const getAppointmentPaymentImage = (status: number) => {
    switch (status) {
      case 0:
        return "bg-blue-400";
      case 1:
        return "bg-success-500";
      case 2:
        return "bg-yellow-400";
      case 3:
        return "bg-red-400";
    }
  };
  const getAppointmentPaymentStatus = (status: number) => {
    switch (status) {
      case 0:
        return "Pending";
      case 1:
        return "Paid";
      case 2:
        return "Refunded";
      case 3:
        return "Failed";
    }
  };
  return (
    <div className="space-y-8">
      {appointments.map((appointment) => (
        <div className="flex items-center" key={appointment.appointmentId}>
          <Avatar className="h-9 w-9">
            <AvatarImage src="/avatars/01.png" alt="Avatar" />
            <AvatarFallback className="font-bold text-xs">
              {appointment.vet.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1 w-[16vw]">
            <p className="text-sm font-medium leading-none flex justify-between">
              {appointment.customer} with {appointment.pet}
              <span>{appointment.date}</span>
            </p>
            <p className="text-sm text-muted-foreground">
              examine by {appointment.vet} _ from {appointment.slotStartTime} to{" "}
              {appointment.slotEndTime}
            </p>
          </div>
          <Divider orientation="vertical" />
          <Badge
            className={
              getAppointmentImage(appointment.status) +
              " text-white mx-2 p-2 w-[7vw]"
            }
            variant="secondary"
          >
            Status: {appointment.status}
          </Badge>
          <Badge
            className={
              getAppointmentPaymentImage(appointment.paymentStatus) +
              " text-white p-2 w-[7vw] mr-2"
            }
            variant="secondary"
          >
            Payment:{" "}
            {getAppointmentPaymentStatus(appointment.paymentStatus) ?? "Cash"}
          </Badge>
          <div className="ml-auto font-medium">+${appointment.totalCost}</div>
        </div>
      ))}
    </div>
  );
};

export default RecentAppointments;
