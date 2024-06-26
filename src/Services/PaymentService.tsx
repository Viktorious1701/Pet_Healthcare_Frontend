import { handleError } from "@/Helpers/ErrorHandler";
import axiosInstance from "@/Helpers/axiosInstance";

const api = "https://pethealthcaresystem.azurewebsites.net/api";
export const refundApi = (appointmentId: number) => {
  return axiosInstance.post(api + `/Payment/Refund`, {
    appointmentId: appointmentId,
  });
};

export const revenueGetAPI = async () => {
  try {
    const data = await axiosInstance.get(api + `/payment/revenue`);
    return data.data;
  } catch (error) {
    handleError(error);
  }
};
