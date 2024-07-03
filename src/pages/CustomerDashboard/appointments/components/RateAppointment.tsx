import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAppointmentByIdAPI, appointmentRateAPI } from "@/Services/AppointmentService";
import { AppointmentGet } from "@/Models/Appointment";
import { Button } from "@/components/ui/button"; // Adjust the path based on your project structure
import { CUSTOMER_APPOINTMENTS, CUSTOMER_DASHBOARD } from "@/Route/router-const";
import { StarIcon } from "lucide-react";
import { toast } from "sonner";

const RateAppointment: React.FC = () => {
  const { appointmentId } = useParams<{ appointmentId: string }>();
  const [appointment, setAppointment] = useState<AppointmentGet | null>(null!);
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointment = async () => {
      setLoading(true);
      try {
        const response = await getAppointmentByIdAPI(Number(appointmentId!));
       
        const appointmentData = response?.data;
        setAppointment(appointmentData || {} as AppointmentGet);
      } catch (error) {
        toast.error("Error fetching appointment");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointment();
  }, [appointmentId]);

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };

  const handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await appointmentRateAPI(Number(appointmentId!), rating, comment);
      console.log("API Rate response:", response); // Debugging line
      toast.info("Rating submitted successfully!");
      navigate(`/${CUSTOMER_DASHBOARD}/${CUSTOMER_APPOINTMENTS}`);
    } catch (error) {
      console.error("Error submitting rating:", error);
      toast.error("Error submitting rating");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <div className="bg-gray-700 flex items-center justify-between rounded-md p-2">
        <h1 className="text-3xl font-bold text-white">Rate Appointment</h1>
      </div>
      {appointment ? (
        <div className="mt-4 bg-white shadow rounded-md p-4">
          <p><strong>Appointment ID:</strong> {appointment.appointmentId}</p>
          <p><strong>Pet:</strong> {appointment.pet}</p>
          <p><strong>Vet:</strong> {appointment.vet}</p>
          <p><strong>Slot Time:</strong> {appointment.slotStartTime} - {appointment.slotEndTime}</p>
          <p><strong>Service:</strong> {appointment.service}</p>
          <p><strong>Date:</strong> {appointment.date}</p>
          <p><strong>Total Cost:</strong> {appointment.totalCost}</p>
          <div className="mt-4">
            <label htmlFor="rating" className="block text-sm font-medium text-gray-700">Rating:</label>
            <div className="flex items-center mt-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <StarIcon
                  key={star}
                  size={24}
                  color={star <= rating ? "#ffc107" : "#e4e5e9"}
                  onClick={() => handleRatingChange(star)}
                  className="cursor-pointer"
                />
              ))}
            </div>
          </div>
          <div className="mt-4">
            <label htmlFor="comment" className="block text-sm font-medium text-gray-700">Feedback Comment:</label>
            <textarea
              id="comment"
              name="comment"
              rows={4}
              value={comment}
              onChange={handleCommentChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <Button
            onClick={handleSubmit}
            className="mt-4 bg-gray-700 hover:bg-gray-500 active:bg-gray-400"
          >
            Submit Rating
          </Button>
        </div>
      ) : (
        <div>Appointment not found.</div>
      )}
    </div>
  );
};

export default RateAppointment;
