import React, { useState, useEffect } from "react";
import { useForm, FieldErrors } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import { format } from "date-fns";
interface FormValues {
  firstName: string;
  lastName: string;
  phone: string;
}

interface Doctor {
  id: number;
  name: string;
}

const BookingForm: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
    },
    mode: "onSubmit",
  });

  const { date, slot } = location.state as { date: Date; slot: string };
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch(`/api/doctors?date=${format(date, 'yyyy-MM-dd')}&slot=${slot}`);
        const data = await response.json();
        setDoctors(data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, [date, slot]);

  const onSubmit = (formData: FormValues) => {
    // Handle form submission logic here
    console.log("Form submitted:", formData);

    // Navigate to the next form or page
    navigate("/date", {
      state: {
        formData,
        date,
        slot,
      },
    });
  };

  const onError = (errors: FieldErrors<FormValues>) => {
    console.log("Form errors: ", errors);
  };

  const validatePhone = (value: string) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(value) || "Phone number must be 10 digits";
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Booking Details</h1>
      <form onSubmit={handleSubmit(onSubmit, onError)} className="">
        <div className="flex flex-col mb-4">
          <div className="flex items-center">
            <label htmlFor="firstName" className="w-32">First Name</label>
            <input
              type="text"
              className="flex-grow border border-gray-300 rounded p-2"
              {...register("firstName", {
                required: "First name is required"
              })}
            />
          </div>
          {errors.firstName && (
            <p className="text-red-500 mt-1 ml-36">{errors.firstName?.message}</p>
          )}
        </div>
        <div className="flex flex-col mb-4">
          <div className="flex items-center">
            <label htmlFor="lastName" className="w-32">Last Name</label>
            <input
              type="text"
              className="flex-grow border border-gray-300 rounded p-2"
              {...register("lastName", {
                required: "Last name is required"
              })}
            />
          </div>
          {errors.lastName && (
            <p className="text-red-500 mt-1 ml-36">{errors.lastName?.message}</p>
          )}
        </div>
        <div className="flex flex-col mb-4">
          <div className="flex items-center">
            <label htmlFor="phone" className="w-32">Phone</label>
            <input
              type="text"
              className="flex-grow border border-gray-300 rounded p-2"
              {...register("phone", {
                required: "Phone is required",
                validate: validatePhone
              })}
            />
          </div>
          {errors.phone && (
            <p className="text-red-500 mt-1 ml-36">{errors.phone?.message}</p>
          )}
        </div>
        <div className="flex flex-col mb-4">
          <h2 className="text-lg font-bold">Available Doctors</h2>
          {doctors.length > 0 ? (
            <ul>
              {doctors.map((doctor) => (
                <li key={doctor.id}>{doctor.name}</li>
              ))}
            </ul>
          ) : (
            <p>No doctors available for this date and timeslot.</p>
          )}
        </div>
        <div className="flex justify-center">
          <input
            type="submit"
            value="Submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          />
        </div>
      </form>
    </div>
  );
};

export default BookingForm;
