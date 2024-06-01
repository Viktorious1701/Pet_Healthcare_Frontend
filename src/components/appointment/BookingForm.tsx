import React, { useState, useEffect } from "react";
import { useForm, FieldErrors } from "react-hook-form";
import fetchDoctors from "./api";
import { useDispatch } from "react-redux";

interface FormValues {
  firstName: string;
  lastName: string;
  phone: string;
}

interface Doctor {
  id: number;
  name: string;
}

interface BookingFormProps {
  date: Date;
  slot: string;
  onCancel: () => void; // New prop for onCancel function
}

const BookingForm: React.FC<BookingFormProps> = ({ date, slot, onCancel }) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
    },
    mode: "onSubmit",
  });

  const [doctors, setDoctors] = useState<Doctor[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const doctors = await fetchDoctors(date, slot);
        setDoctors(doctors);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };
    fetchData();
  }, [date, slot]);

  const onSubmit = (formData: FormValues) => {
    console.log("Form submitted:", formData);
    dispatch({
      type: "SET_FORM_DATA",
      payload: formData,
    });
  };

  const onError = (errors: FieldErrors<FormValues>) => {
    console.log("Form errors: ", errors);
  };

  const validatePhone = (value: string) => {
    const phoneRegex = /^\d{9,15}$/;
    return (
      phoneRegex.test(value) || "Phone number must be between 9 and 15 digits"
    );
  };

  const handleCancel = () => {
    reset(); // Reset form fields
    onCancel(); // Call onCancel function passed from parent component
  };

  return (
    <div className="flex items-center justify-center h-full ">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center p-8 bg-white rounded-md shadow-md">
          <h1 className="text-2xl font-bold mb-6 text-custom-pink">
            Booking Details
          </h1>
          <form onSubmit={handleSubmit(onSubmit, onError)} className="w-full">
            <div className="flex flex-col mb-6">
              <div className="flex items-center mb-2">
                <label htmlFor="firstName" className="w-40 text-custom-blue">
                  First Name
                </label>
                <input
                  type="text"
                  className="flex-grow border border-gray-300 rounded p-3 focus:border-custom-blue"
                  {...register("firstName", {
                    required: "First name is required",
                  })}
                />
              </div>
              {errors.firstName && (
            // Added a fixed height to the error message container to prevent layout shifts
            <p className="text-red-500 ml-40 h-5">{errors.firstName?.message}</p>
          )}
            </div>
            <div className="flex flex-col mb-6">
              <div className="flex items-center mb-2">
                <label htmlFor="lastName" className="w-40 text-custom-blue">
                  Last Name
                </label>
                <input
                  type="text"
                  className="flex-grow border border-gray-300 rounded p-3 focus:border-custom-blue"
                  {...register("lastName", {
                    required: "Last name is required",
                  })}
                />
              </div>
              {errors.lastName && (
            // Added a fixed height to the error message container to prevent layout shifts
            <p className="text-red-500 ml-40 h-5">{errors.lastName?.message}</p>
          )}
            </div>
            <div className="flex flex-col mb-6">
              <div className="flex items-center mb-2">
                <label htmlFor="phone" className="w-40 text-custom-blue">
                  Phone
                </label>
                <input
                  type="text"
                  className="flex-grow border border-gray-300 rounded p-3 focus:border-custom-blue"
                  {...register("phone", {
                    required: "Phone is required",
                    validate: validatePhone,
                  })}
                />
              </div>
              {errors.phone && (
            // Added a fixed height to the error message container to prevent layout shifts
            <p className="text-red-500 ml-40 h-5">{errors.phone?.message}</p>
          )}
            </div>
            <div className="flex flex-col mb-6">
              <h2 className="text-lg font-bold text-custom-blue mb-3">
                Available Doctors
              </h2>
              {doctors.length > 0 ? (
                <ul className="list-disc list-inside bg-custom-pink rounded p-4">
                  {doctors.map((doctor) => (
                    <li
                      key={doctor.id}
                      className="text-white text-bold list-none"
                    >
                      {doctor.name}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-custom-blue">
                  No doctors available for this date and timeslot.
                </p>
              )}
            </div>
            <div className="flex justify-center gap-4">
              <button
                type="button"
                onClick={handleCancel}
                className="bg-custom-gray text-white px-6 py-3 rounded cursor-pointer hover:bg-custom-darkBlue"
              >
                Cancel
              </button>
              <input
                type="submit"
                value="Submit"
                className="bg-custom-pink text-white px-6 py-3 rounded cursor-pointer hover:bg-custom-darkBlue"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
