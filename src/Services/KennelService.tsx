import axios from "axios";
import { Kennel } from "@/Models/Kennel";
import { handleError } from "@/Helpers/ErrorHandler";

const api = "https://pethealthcaresystem.azurewebsites.net/api/Kennel";

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
