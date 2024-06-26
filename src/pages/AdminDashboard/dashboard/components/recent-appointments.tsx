import { AppointmentGet } from "@/Models/Appointment";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";

interface RecentAppointmentsProps {
  appointments: AppointmentGet[];
}
const now = new Date();
const RecentAppointments: React.FC<RecentAppointmentsProps> = ({
  appointments,
}) => {
  return (
    <div className="space-y-8">
      {appointments
        .filter(
          (appointment) =>
            new Date(appointment.date).getMonth() === now.getMonth()
        )
        .map((appointment) => (
          <div className="flex items-center">
            <Avatar className="h-9 w-9">
              <AvatarImage src="/avatars/01.png" alt="Avatar" />
              <AvatarFallback>{appointment.customer.slice(0,2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">{appointment.customer} with {appointment.pet}</p> 
              <p className="text-sm text-muted-foreground">
                examine by {appointment.vet} _ from {appointment.slotStartTime} to {appointment.slotEndTime}
              </p>
            </div>
            <div className="ml-auto font-medium">+${appointment.totalCost}</div>
          </div>
        ))}
    </div>
  );
};

export default RecentAppointments;
