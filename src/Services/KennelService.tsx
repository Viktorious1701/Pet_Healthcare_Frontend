import axios from "axios";
import { Kennel, KennelPost } from "@/Models/Kennel";
import { handleError } from "@/Helpers/ErrorHandler";

const api = "https://pethealthcaresystem.azurewebsites.net/api/kennel";

export const getKennelById = async (kennelId: string) => {
  try {
    const response = await axios.get<Kennel>(`${api}/${kennelId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching kennel details:", error);
    throw error;
  }
};

export const kennelGetAPI = async () => {
  try {
    const data = await axios.get<Kennel[]>(api);
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
    const data = await axios.post<KennelPost>(api, {
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
    const data = await axios.put<KennelPost>(api + `/${kennelId}`, {
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
    const data = await axios.delete(api + `/${kennelId}`);
    return data;  
  } catch (error) {
    handleError(error);
  }
};