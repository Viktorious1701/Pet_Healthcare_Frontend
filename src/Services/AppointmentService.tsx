import { handleError } from "@/Helpers/ErrorHandler";
import axiosInstance from "@/Helpers/axiosInstance";
import {
  AppointmentAvailableVets,
  AppointmentBook,
  AppointmentGet,
  AppointmentRating,
} from "@/Models/Appointment";


const api = "https://pethealthcaresystem.azurewebsites.net/api/appointment";

export const appointmentAvailableVetsAPI = async (
  date: string,
  slotId: number
) => {
  try {
    const data = await axiosInstance.get<AppointmentAvailableVets[]>(
      api + `/available-vets?date=${date}&slotId=${slotId}`
    );
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const appointmentCustomerAPI = async (username: string) => {
  try {
    const data = await axiosInstance.get<AppointmentGet[]>(
      api + `/customer/${username}`
    );
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const appointmentBookAPI = async (
  customerUserName: string,
  petId: number,
  vetUserName: string | null,
  slotId: number,
  serviceId: number,
  date: string
) => {
  try {
    const data = await axiosInstance.post<AppointmentBook>(api + "/book", {
      customerUserName: customerUserName,
      petId: petId,
      vetUserName: vetUserName,
      slotId: slotId,
      serviceId: serviceId,
      date: date,
    });
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const appointmentRateAPI = async (
  appointmentId: number,
  rating: number,
  comment: string
) => {
  try {
    const data = await axiosInstance.put<AppointmentRating>(
      api + `/rate/${appointmentId}`,
      {
        rating: rating,
        comment: comment,
      }
    );
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const appointmentCheckInAPI = async (appointmentId: number) => {
  try {
    const data = await axiosInstance.put(api + `/check-in/${appointmentId}`);
    return data;
  } catch (error) {
    handleError(error);
  }
};
