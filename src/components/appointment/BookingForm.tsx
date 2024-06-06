import React, { useState, useEffect } from "react";
import { useForm, FieldErrors } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { setFormData } from "../slices/formSlice";
import { APPOINTMENT_SUCCESS } from "@/Route/router-const";
import { AppointmentAvailableVets, AppointmentGet } from "@/Models/Appointment";
import {
  appointmentAvailableVetsAPI,
  appointmentBookAPI,
  appointmentCustomerAPI,
} from "@/Services/AppointmentService";
import { toast } from "react-toastify";

import { serviceGetAPI } from "@/Services/ServiceService";
import { ServiceGet } from "@/Models/Service";
import BookingVet from "./BookingVet";
import BookingService from "./BookingService";
import BookingPet from "./BookingPets";
import { petsOfCustomerAPI } from "@/Services/PetService";
import { PetGet } from "@/Models/Pet";
import { useAuth } from "@/Context/useAuth";

interface FormValues {
  customerUserName: string;
  petId: number;
  vetUserName: string | null;
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

  const { user } = useAuth();

  const [vets, setVets] = useState<AppointmentAvailableVets[]>([]);
  const [services, setServices] = useState<ServiceGet[]>([]);
  const [pets, setPets] = useState<PetGet[]>([]);
  const [appointments, setAppointments] = useState<AppointmentGet[]>([]);

  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(
    null
  );
  const [selectedVetUserName, setSelectedVetUserName] = useState<string | null>(
    null
  );

  const { handleSubmit, reset, setValue } = useForm<FormValues>({
    defaultValues: {
      customerUserName: `${user?.userName}`,
      petId: 0,
      vetUserName: null,
      slotId: slot,
      serviceId: 0,
      date: String(date?.toLocaleDateString().replace(/\//g, "-")),
    },
    mode: "onSubmit",
  });

  const getCustomerAppointments = async () => {
    appointmentCustomerAPI(String(user?.userName))
    .then((res) => {
      if (res?.data) {
        setAppointments(res?.data);
      }
    })
    .catch(() => {
      toast.warning("Could not get user's appointments");
    })
  }

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
          if (res?.data === "User doesn't have any pets") {
            return;
          }
          setPets(res?.data);
        }
      })
      .catch(() => {
        toast.warning("Could not get customer's pets");
      });
  };

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

  const onSubmit = (formData: FormValues) => {
    if (formData.petId === 0 || formData.serviceId === 0) {  
      toast.warning("You must select all items");
      return;
    }
    if (appointments.some(
      appointment => appointment.status === "Boooked" || appointment.status === "Processing"
    )) {
      toast.warning("You have an unfinished appointment, cannot book now");
      return;
    }
    handleAppointment(formData);
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

  const handleSelectPet = (petId: string) => {
    setSelectedPetId(petId);
  };

  const handleSelectService = (serviceId: string) => {
    setSelectedServiceId(serviceId);
  };

  const handleSelectVet = (vetUserName: string) => {
    setSelectedVetUserName(vetUserName);
  };

  const handleAppointment = (e: FormValues) => {
    appointmentBookAPI(
      e.customerUserName,
      e.petId,
      e.vetUserName,
      e.slotId,
      e.serviceId,
      e.date
    )
      .then(() => {
      })
      .catch((e) => {
        toast.warning(e);
      });
  };

  useEffect(() => {
    setValue("petId", Number(selectedPetId));
    setValue("serviceId", Number(selectedServiceId));
    if (selectedVetUserName !== "Let us choose for you") {
      setValue("vetUserName", selectedVetUserName);
    }
  }, [selectedPetId, selectedServiceId]);

  useEffect(() => {
    getAvailableVets();
    getPets();
    getServices();
    getCustomerAppointments();
  }, [date, slot]);

  return (
    <div className="flex items-center justify-center h-full w-full">
      <div className="w-full max-w-screen-md">
        <div className="flex flex-col  justify-center items-center p-8 bg-white rounded-md shadow-md">
          <h1 className="text-2xl font-bold mb-6 text-custom-pink">
            Booking Details
          </h1>
          <form
            onSubmit={handleSubmit(onSubmit, onError)}
            className="w-full flex flex-col items-center"
          >
            <div className="flex flex-col mb-6 min-w-full items-center">
              <h2 className="text-lg font-bold text-custom-blue mb-3">
                Choose a pet to see the vet
              </h2>
              {pets.length > 0 ? (
                <BookingPet pets={pets} onSelectPet={handleSelectPet} />
              ) : (
                <p className="text-custom-blue">No available pets.</p>
              )}
            </div>
            <div className="flex flex-col mb-6 min-w-full items-center">
              <h2 className="text-lg font-bold text-custom-blue mb-3 ">
                Available Services
              </h2>
              {services.length > 0 ? (
                <BookingService
                  services={services}
                  onSelectService={handleSelectService}
                />
              ) : (
                <p className="text-custom-blue">No available services.</p>
              )}
            </div>
            <div className="flex flex-col mb-6 min-w-full items-center">
              <h2 className="text-lg font-bold text-custom-blue mb-3">
                Available Vets
              </h2>
              {vets.length > 0 ? (
                <BookingVet vets={vets} onSelectVet={handleSelectVet} />
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
