import { handleError } from '@/Helpers/ErrorHandler';
import axiosInstance from '@/Helpers/axiosInstance';
import { SlotGet } from '@/Models/Slot';

const api = 'https://pethealthcaresystem.azurewebsites.net/api/slot';

export const slotGetAPI = async (date: string) => {
  try {
    const data = await axiosInstance.get<SlotGet[]>(api + `/${date}`);
    return data;
  } catch (error) {
    handleError(error);
  }
};
