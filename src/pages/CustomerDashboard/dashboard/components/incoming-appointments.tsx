import { AppointmentGet } from "@/Models/Appointment";
import { Badge } from "@/components/ui/badge";

interface IncomingAppointmentsProps {
  appointments: AppointmentGet[];
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case "Booked":
      return "";
    case "Processing":
      return "bg-blue";
    case "Done":
      return "bg-success";
    case "Cancelled":
      return "bg-danger";
  }
};

const IncomingAppointments: React.FC<IncomingAppointmentsProps> = ({
  appointments,
}) => {
  appointments = appointments.filter(
    (appointment) => new Date(appointment.date) >= new Date()
  );
  return (
    <div className="space-y-2">
      {appointments.map((appointment) => (
        <div key={appointment.appointmentId} className="flex items-center">
          <div className="dark:bg-gray-900 rounded-lg shadow-lg w-full">
            <div className="p-3">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50 flex justify-between">
                {appointment.service} for {appointment.pet}
                <span className="text-xl font-bold text-gray-900 dark:text-gray-50">
                  ${appointment.totalCost}
                </span>
              </h3>
              <div className="flex justify-between">
                <p className="text-gray-500 dark:text-gray-400">
                  {appointment.slotStartTime} - {appointment.slotEndTime}
                </p>
                <p className="text-gray-500 dark:text-gray-400">
                  {appointment.date}
                </p>
                <Badge
                  variant="default"
                  className={getStatusBadge(appointment.status)}
                >
                  {appointment.status}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default IncomingAppointments;
