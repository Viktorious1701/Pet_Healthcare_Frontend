import { handleError } from "@/Helpers/ErrorHandler";
import axiosInstance from "@/Helpers/axiosInstance";

const api = "https://pethealthcaresystem.azurewebsites.net/api/pet";

export const petsOfCustomerAPI = async (username: string) => {
  try {
    const data = await axiosInstance.get(api + `/user-pet/${username}`);
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const updatePetData = async (
  petId: number,
  petData: {
    name: string;
    species: string;
    breed: string;
    gender: boolean;
    imageFile: File | null;
  }
) => {
  try {
    const formData = new FormData();
    formData.append("name", petData.name);
    formData.append("species", petData.species);
    formData.append("breed", petData.breed);
    formData.append("gender", petData.gender.toString());

    if (petData.imageFile) {
      formData.append("imageFile", petData.imageFile);
    }

    const data = await axiosInstance.put(api + `/${petId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const getPetById = async (petId: string) => {
  try {
    const data = await axiosInstance.get(api + `/${petId}`);
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const AddAPetAPI = async ( PetInfo:{
  customerUsername: string;
  name: string;
  species: string;
  breed: string;
  gender: boolean;
  weight: number;
  imageURL: string;
  imageFile: File | null;
}) => {
  try {
    const formData = new FormData();
    formData.append("customerUsername", PetInfo.customerUsername);
    formData.append("name", PetInfo.name);
    formData.append("species", PetInfo.species);
    formData.append("breed", PetInfo.breed);
    formData.append("gender", PetInfo.gender.toString());
    formData.append("weight", PetInfo.weight.toString());
    formData.append("imageURL", PetInfo.imageURL);
    if (PetInfo.imageFile) {
      formData.append("imageFile", PetInfo.imageFile);
    }

    const data = await axiosInstance.post(api, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  } catch (error) {
      handleError(error)
  }
}
