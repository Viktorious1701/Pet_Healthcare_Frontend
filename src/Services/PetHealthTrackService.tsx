import axios from "axios";
import { PetHealthTrack } from "@/Models/PetHealthTrack";

const apiBaseURL = "https://pethealthcaresystem.azurewebsites.net/api/PetHealthTrack";

export const getPetHealthTrackByHospitalizationId = async (hospitalizationId: string) => {
  try {
    const response = await axios.get<PetHealthTrack[]>(`${apiBaseURL}/hospitalization/${hospitalizationId}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching pet health track:", error);
    throw error;
  }
};
export const getAllPetHealthTracks = async (): Promise<PetHealthTrack[]> => {
  try {
    const response = await axios.get<PetHealthTrack[]>(`${apiBaseURL}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching pet health tracks:", error);
    throw error;
  }
};
