import React, { useState } from "react";
import { Button } from "@/components/ui/button";

// Define the Appointment interface
interface Appointment {
  id: number;
  petName: string;
  date: string;
  description: string;
  rating: number | null;
}

// Define some dummy appointments
const dummyAppointments: Appointment[] = [
  { id: 1, petName: "Bella", date: "2023-05-01", description: "Regular Checkup", rating: null },
  { id: 2, petName: "Max", date: "2023-06-15", description: "Vaccination", rating: null },
  { id: 3, petName: "Luna", date: "2023-07-20", description: "Dental Cleaning", rating: null },
];

const AppointmentManagement: React.FC = () => {
  // State to manage appointments
  const [appointments, setAppointments] = useState<Appointment[]>(dummyAppointments);

  // Function to handle rating
  const handleRating = (id: number, rating: number) => {
    const updatedAppointments = appointments.map(appointment =>
      appointment.id === id ? { ...appointment, rating } : appointment
    );
    setAppointments(updatedAppointments);
  };
  
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-pink-600 mb-4">Appointment History</h1>
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-pink-200">
          <tr>
            <th className="py-2 px-4 text-left">Pet Name</th>
            <th className="py-2 px-4 text-left">Date</th>
            <th className="py-2 px-4 text-left">Description</th>
            <th className="py-2 px-4 text-left">Rating</th>
            <th className="py-2 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.id} className="even:bg-pink-50 odd:bg-pink-100">
              <td className="py-2 px-4">{appointment.petName}</td>
              <td className="py-2 px-4">{appointment.date}</td>
              <td className="py-2 px-4">{appointment.description}</td>
              <td className="py-2 px-4">{appointment.rating ?? "Not Rated"}</td>
              <td className="py-2 px-4">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <Button
                    key={rating}
                    className={`mx-1 ${appointment.rating === rating ? "bg-custom-darkPink" : "bg-custom-lightGrey"}`}
                    onClick={() => handleRating(appointment.id, rating)}
                  >
                    {rating} ⭐
                  </Button>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentManagement;
