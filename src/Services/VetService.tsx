import axiosInstance from '@/Helpers/axiosInstance';
import { handleError } from '@/Helpers/ErrorHandler';
const apiGetVet = 'https://pethealthcaresystem.azurewebsites.net/api';
export const appointmentGetVetUserNameAPI = async () => {
  try {
    const response = await axiosInstance.get(apiGetVet + `/Account/me`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
