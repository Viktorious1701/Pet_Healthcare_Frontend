import { handleError } from "@/Helpers/ErrorHandler";
import axiosInstance from "@/Helpers/axiosInstance";

const api = 'https://pethealthcaresystem.azurewebsites.net/api/vaccine';

export const vaccineGetAPI = async () => {
    try {
        const data = await axiosInstance.get(api);
        return data;
    } catch (error) {
        handleError(error);
    }
}