import axios from "axios";
import { Kennel } from "@/Models/Kennel";

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
