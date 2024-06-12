import { handleError } from "@/Helpers/ErrorHandler";
import { ServiceGet } from "@/Models/Service";
import axios from "axios";

const api = "https://pethealthcaresystem.azurewebsites.net/api/service";

export const serviceGetAPI = async () => {
    try {
        const data = await axios.get<ServiceGet[]>(api);
        return data;
    } catch (error) {
        handleError(error);
    }
}
export const serviceGetByIdAPI = async (id: number) => {
    try {
        const data = await axios.get<ServiceGet>(`${api}/${id}`);
        return data;
    } catch (error) {
        handleError(error);
    }
}