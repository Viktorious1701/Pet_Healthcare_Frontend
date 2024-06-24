import axiosInstance from "@/Helpers/axiosInstance";

const api = "https://pethealthcaresystem.azurewebsites.net/api";
export const refundApi = (appointmentId: number) => {
  return axiosInstance.post(api + `/Payment/Refund`, { appointmentId: appointmentId });
}