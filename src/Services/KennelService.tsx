import { Kennel, KennelPost } from "@/Models/Kennel";
import { handleError } from "@/Helpers/ErrorHandler";
import axiosInstance from "@/Helpers/axiosInstance";

const api = "https://pethealthcaresystem.azurewebsites.net/api/kennel";

export const getKennelById = async (kennelId: string) => {
  try {
    const response = await axiosInstance.get<Kennel>(`${api}/${kennelId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching kennel details:", error);
    throw error;
  }
};

export const kennelGetAPI = async () => {
  try {
    const data = await axiosInstance.get<Kennel[]>(api);
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const kennelPostAPI = async (
  description: string,
  dailyCost: number
) => {
  try {
    const data = await axiosInstance.post<KennelPost>(api, {
      description: description,
      capacity: 1,
      dailyCost: dailyCost,
    });
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const kennelUpdateAPI = async (
  kennelId: number,
  description: string,
  dailyCost: number
) => {
  try {
    const data = await axiosInstance.put<KennelPost>(api + `/${kennelId}`, {
      description: description,
      capacity: 1,
      dailyCost: dailyCost,
    });
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const kennelDeleteAPI = async (
  kennelId: number
) => {
  try {
    const data = await axiosInstance.delete(api + `/${kennelId}`);
    return data;  
  } catch (error) {
    handleError(error);
  }
};
