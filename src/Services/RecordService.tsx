
import { handleError } from '@/Helpers/ErrorHandler';
import axiosInstance from '@/Helpers/axiosInstance';
const api = 'https://pethealthcaresystem.azurewebsites.net/api/Record';

export const deleteRecordByPetId = async (petId: number) => {
    try {
      const data = await axiosInstance.delete(api + `/${petId}`);
      return data;
    } catch (error) {
      handleError(error);
    }
  };