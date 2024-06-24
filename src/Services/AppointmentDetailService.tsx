import { handleError } from "@/Helpers/ErrorHandler";
import axiosInstance from "@/Helpers/axiosInstance";
import { AppointmentDetailGet } from "@/Models/AppointmentDetail";

const api = "https://pethealthcaresystem.azurewebsites.net/api/appointmentDetail";

export const appointmentDetailGetAPI = async () => {
    try {
        const data = axiosInstance.get<AppointmentDetailGet[]>(api);
        return data;   
    } catch (error) {
        handleError(error);
    }
}