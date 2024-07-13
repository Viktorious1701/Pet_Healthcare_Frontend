import { handleError } from "@/Helpers/ErrorHandler";
import axiosInstance from "@/Helpers/axiosInstance";

const api = 'https://pethealthcaresystem.azurewebsites.net/api/record';

export const RecordPostAPI = async (petId: number, numOfVisits: number) => {
    try {
        const data = await axiosInstance.post(api, {petId, numOfVisits});
        return data;
    } catch (error) {
        handleError(error);
    }
};

export const RecordDeleteAPI = async (petId: number) => {
    try {
        const data = await axiosInstance.delete(api + `/${petId}`);
        return data;
    } catch (error) {
        handleError(error);
    }
}
