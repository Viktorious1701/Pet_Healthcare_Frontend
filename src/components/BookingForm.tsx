import React, { useState, useEffect } from "react";
import { useForm, FieldErrors } from "react-hook-form";

import { useNavigate } from "react-router-dom";
import fetchDoctors from "./api";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";

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

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
    },
    mode: "onSubmit",
  });


  const { date, slot } = useSelector((state: RootState) => state.date);
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check if date and slot are in local storage
        const dateFromStorage = localStorage.getItem('date');
        const slotFromStorage = localStorage.getItem('slot');
  
        let dateObj = null;
        let slotValue = null;
  
        // Use date and slot from local storage if available
        if (dateFromStorage && slotFromStorage) {
          dateObj = new Date(dateFromStorage);
          slotValue = slotFromStorage;
        } else {
          // Otherwise, use date and slot from Redux store
          dateObj = date ? new Date(date) : null;
          slotValue = slot;
        }
  
        const doctors = await fetchDoctors(dateObj, slotValue);
        setDoctors(doctors);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };
    fetchData();
  }, [date, slot]);

  const onSubmit = (formData: FormValues) => {
    // Handle form submission logic here
    console.log("Form submitted:", formData);
    
    dispatch({
      type: "SET_FORM_DATA",
      payload: formData,
    })
    // Navigate to the next form or page
    navigate("/date");
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
