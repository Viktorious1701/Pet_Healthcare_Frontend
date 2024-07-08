import { handleError } from '@/Helpers/ErrorHandler';
import axiosInstance from '@/Helpers/axiosInstance';
import { AppointmentDetailGet } from '@/Models/AppointmentDetail';

const api = 'https://pethealthcaresystem.azurewebsites.net/api/appointmentDetail';

export const appointmentDetailGetAPI = async () => {
  try {
    const data = axiosInstance.get<AppointmentDetailGet[]>(api);
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const petAppointmentDetailGetAPI = async (petId: number) => {
  try {
    const data = axiosInstance.get<AppointmentDetailGet[]>(api + `/${petId}`);
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const idAppointmentDetailGetAPI = async (appointmentId: number) => {
  try {
    const response = await axiosInstance.get<AppointmentDetailGet[]>(api + `/id/${appointmentId}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
