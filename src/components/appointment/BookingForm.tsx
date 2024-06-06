import React, { useState, useEffect } from "react";
import { useForm, FieldErrors } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { setFormData } from "../slices/formSlice";
import { APPOINTMENT_SUCCESS } from "@/Route/router-const";
import { AppointmentAvailableVets } from "@/Models/Appointment";
import { appointmentAvailableVetsAPI } from "@/Services/AppointmentService";
import { toast } from "react-toastify";

import { serviceGetAPI } from "@/Services/ServiceService";
import { ServiceGet } from "@/Models/Service";
import BookingVet from "./BookingVet";
import BookingService from "./BookingService";
import { petsOfCustomerAPI } from "@/Services/PetService";
import { PetGet } from "@/Models/Pet";
import { useAuth } from "@/Context/useAuth";
import BookingPet from "./BookingPets";
        
interface FormValues {
  customerUserName: string;
  petId: number;
  vetUserName: string;
  slotId: number;
  serviceId: number;
  date: string;
}

interface BookingFormProps {
  date: Date;
  slot: number;
  onCancel: () => void; // New prop for onCancel function
}

const BookingForm: React.FC<BookingFormProps> = ({ date, slot, onCancel }) => {
  const dispatch = useDispatch();
  
  const navigate = useNavigate();
  const {user} = useAuth();
  const {
    handleSubmit,
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      // firstName: "",
      // lastName: "",
      // phone: "",
      customerUserName: `${user?.userName}`,
      date: String(date?.toLocaleDateString().replace(/\//g, "-")),
      slotId: slot,
      vetUserName: "",
      petId: 0,
      serviceId: 0
    },
    mode: "onSubmit",
  });

  const [vets, setVets] = useState<AppointmentAvailableVets[]>([]);
  const [services, setServices] = useState<ServiceGet[]>([]);
  const [pets, setPets] = useState<PetGet[]>([]);

  const getAvailableVets = async () => {
    appointmentAvailableVetsAPI(date.toLocaleDateString(), slot)
      .then((res) => {
        if (res?.data) {
          setVets(res?.data);
        }
      })
      .catch(() => {
        toast.warning("Could not get vets data");
      });
  };


  const getPets = async () => {
    petsOfCustomerAPI(String(user?.userName))
    .then((res) => {
      if (res?.data) {
        setPets(res?.data)
      }
    })
    .catch(() => {
      toast.warning("Could not get customer's pets")
    })
  }

  const getServices = async () => {
    serviceGetAPI()
      .then((res) => {
        if (res?.data) {
          setServices(res?.data);
        }
      })
      .catch(() => {
        toast.warning("Could not get services data");
      });
  };

  useEffect(() => {
    getAvailableVets();
    getPets();
    getServices();
  }, [date, slot]);

  const onSubmit = (formData: FormValues) => {
    console.log("Form submitted:", formData);
    dispatch(setFormData(formData));
    navigate(`/${APPOINTMENT_SUCCESS}`); // Redirect to homepage after form submission (adjust the path as needed
  };

  const onError = (errors: FieldErrors<FormValues>) => {
    console.log("Form errors: ", errors);
  };

  const handleCancel = () => {
    reset(); // Reset form fields
    onCancel(); // Call onCancel function passed from parent component
  };

  return (
    <div className="flex items-center justify-center h-full w-full">
      <div className="w-full max-w-screen-md">
        <div className="flex flex-col  justify-center items-center p-8 bg-white rounded-md shadow-md">
          <h1 className="text-2xl font-bold mb-6 text-custom-pink">
            Booking Details
          </h1>
          <form onSubmit={handleSubmit(onSubmit, onError)} className="w-full flex flex-col items-center">
            {/* <div className="flex flex-col mb-6">
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
                <p className="text-red-500 ml-40 h-5">
                  {errors.firstName?.message}
                </p>
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
                <p className="text-red-500 ml-40 h-5">
                  {errors.lastName?.message}
                </p>
              )}
            </div> */}
            <div className="flex flex-col mb-6 min-w-full items-center">
              <h2 className="text-lg font-bold text-custom-blue mb-3">
                Choose a pet to see the vet
              </h2>
              {pets.length > 0 ? (
                <BookingPet pets={pets} />
              ) : (
                <p className="text-custom-blue">
                  No available services.
                </p>
              )}
            </div>
            <div className="flex flex-col mb-6 min-w-full items-center">
              <h2 className="text-lg font-bold text-custom-blue mb-3 ">
                Available Services
              </h2>
              {services.length > 0 ? (
                <BookingService services={services} />
              ) : (
                <p className="text-custom-blue">
                  No available services.
                </p>
              )}
            </div>
            <div className="flex flex-col mb-6 min-w-full items-center">
              <h2 className="text-lg font-bold text-custom-blue mb-3">
                Available Vets
              </h2>
              {vets.length > 0 ? (
                <BookingVet vets={vets} />
              ) : (
                <p className="text-custom-blue">
                  No vets available for this date and timeslot.
                </p>
              )}
            </div>
            <div className="flex justify-center gap-4 min-w-full items-center">
              <button
                type="button"
                onClick={handleCancel}
                className="bg-custom-lightCrimson text-white px-6 py-3 rounded cursor-pointer hover: transform hover:scale-110"
              >
                Cancel
              </button>
              <input
                type="submit"
                value="Submit"
                className="bg-custom-pink text-white px-6 py-3 rounded cursor-pointer hover: transform hover:scale-110"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
