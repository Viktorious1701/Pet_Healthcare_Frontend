import { PetHealthTrack } from "@/Models/PetHealthTrack";
import axiosInstance from "@/Helpers/axiosInstance";
import { handleError } from "@/Helpers/ErrorHandler";

const apiBaseURL = "https://pethealthcaresystem.azurewebsites.net/api/PetHealthTrack";

export const getPetHealthTrackByHospitalizationId = async (hospitalizationId: number) => {
  try {
    const response = await axiosInstance.get<PetHealthTrack[]>(
      apiBaseURL + `/hospitalization/${hospitalizationId}`
    );
    return response.data; // return actual data
  } catch (error) {
    handleError(error);
  }
};

export const getUserPetHealthTracks = async () => {
  try {
    const data = await axiosInstance.get<PetHealthTrack[]>(`${apiBaseURL}/user`);
    return data;
  } catch (error) {
    console.error("Error fetching pet health tracks:", error);
    throw error;
  }
};
