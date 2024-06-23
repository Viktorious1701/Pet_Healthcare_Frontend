import { PetHealthTrack } from "@/Models/PetHealthTrack";
import axiosInstance from "@/Helpers/axiosInstance";

const apiBaseURL = "https://pethealthcaresystem.azurewebsites.net/api/PetHealthTrack";

export const getPetHealthTrackByHospitalizationId = async (hospitalizationId: string) => {
  try {
    const response = await axiosInstance.get<PetHealthTrack[]>(`${apiBaseURL}/hospitalization/${hospitalizationId}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching pet health track:", error);
    throw error;
  }
};
export const getAllPetHealthTracks = async () => {
  try {
    const data = await axiosInstance.get<PetHealthTrack[]>(`${apiBaseURL}`);
    return data;
  } catch (error) {
    console.error("Error fetching pet health tracks:", error);
    throw error;
  }
};
