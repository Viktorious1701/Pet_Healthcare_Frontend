import { PetHealthTrack } from '@/Models/PetHealthTrack';
import axiosInstance from '@/Helpers/axiosInstance';
import { handleError } from '@/Helpers/ErrorHandler';

const apiBaseURL = 'https://pethealthcaresystem.azurewebsites.net/api/PetHealthTrack';

export const getPetHealthTrackByHospitalizationId = async (hospitalizationId: number) => {
  try {
    const response = await axiosInstance.get<PetHealthTrack[]>(apiBaseURL + `/hospitalization/${hospitalizationId}`);
    return response.data; // return actual data
  } catch (error) {
    handleError(error);
  }
};

export const postPetHealthTrack = async (petHealthTrack: PetHealthTrack) => {
  const { hospitalizationId, description, date, status } = petHealthTrack; // Destructure only the needed properties

  try {
    const payload = { hospitalizationId, description, date, status }; // Construct payload with only the properties the API accepts
    const response = await axiosInstance.post(apiBaseURL, payload);
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
    console.error('Error fetching pet health tracks:', error);
    throw error;
  }
};
