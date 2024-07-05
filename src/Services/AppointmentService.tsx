import { handleError } from "@/Helpers/ErrorHandler";
import axiosInstance from "@/Helpers/axiosInstance";
import {
  AppointmentAvailableVets,
  AppointmentBook,
  AppointmentGet,
  AppointmentRating,
} from "@/Models/Appointment";
import { AppointmentDetailGet } from "@/Models/AppointmentDetail";

const api = "https://pethealthcaresystem.azurewebsites.net/api/Appointment";
const apiGetVet = "https://pethealthcaresystem.azurewebsites.net/api";
const apiAppointmentDetails = "https://pethealthcaresystem.azurewebsites.net/api/AppointmentDetail";

export const appointmentGetAPI = async () => {
  try {
    const data = await axiosInstance.get<AppointmentGet[]>(api);
    return data;
  } catch (error) {
    handleError(error);
  }
}

export const deleteAppointmentByID = async (appointmentId: number) => {
  try {
    const data = await axiosInstance.delete(api + `/${appointmentId}`);
    console.log("delete by id ", data);
    return data;
  } catch (error) {
    handleError(error);
    throw error;  // Rethrow the error to be caught in the calling function
  }
}

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
export const getAppointmentByIdAPI = async (appointmentId: number) => {
  try {
    const data = await axiosInstance.get<AppointmentGet>(
      api + `/${appointmentId}`
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

export const appointmentVetAPI = async (vetId: string) => {
  try {
    const response = await axiosInstance.get<AppointmentGet[]>(
      api + `/vet/${vetId}`
    );
    return response.data; // return actual data
  } catch (error) {
    handleError(error);
  }
};

export const appointmentDetailsAPI = async (appointmentId: string) => {
  try {
    const response = await axiosInstance.get<AppointmentDetailGet>(
      apiAppointmentDetails + `/${appointmentId}`
    );
    return response.data;
  } catch (error) {
    handleError(error);
  }
}

export const appointmentGetVetIdAPI = async () => {
  try {
    const response = await axiosInstance.get<string>(
      apiGetVet + `/Account/me`
    );
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const appointmentCountAPI = async () => {
  try {
    // Assuming the endpoint to fetch all appointments is `/appointments`
    const response = await axiosInstance.get<AppointmentGet[]>(api + `/appointments`);
    // Count the appointments by checking the length of the array
    const count = response.data.length;
    return count;
  } catch (error) {
    handleError(error);
  }
};

export const appointmentPostAPI = async (appointmentDetails: { appointmentId: number; diagnosis: string; treatment: string; medication: string; }) => {
  try {
    const response = await axiosInstance.post<string>(apiAppointmentDetails, appointmentDetails);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};