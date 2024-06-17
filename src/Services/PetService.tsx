import { handleError } from "@/Helpers/ErrorHandler";
import axiosInstance from "@/Helpers/axiosInstance";
import axios from "axios";

const api = "https://pethealthcaresystem.azurewebsites.net/api/pet";

export const petsOfCustomerAPI = async (
    username: string
) => {
    try {
        const data = await axiosInstance.get(api + `/user-pet/${username}`);
        return data;    
    } catch (error) {
        handleError(error)
    }
};

export const updatePetData = async (
    petId: number,
    petData: {
        name: string;
        species: string;
        breed: string;
        gender: boolean;
        imageUrl: string;
    }
) => {
    try {
        const data = await axiosInstance.put(api + `/${petId}`, petData);
        return data;
    } catch (error) {
        handleError(error)
    }
}

export const getPetById = async (petId: string) => {
    try {
      const data = await axiosInstance.get(api + `/${petId}`);
      return data;
    } catch (error) {
      handleError(error);
    }
  };
  