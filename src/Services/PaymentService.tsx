import { handleError } from '@/Helpers/ErrorHandler';
import axiosInstance from '@/Helpers/axiosInstance';

const api = 'https://pethealthcaresystem.azurewebsites.net/api';
export const refundApi = (appointmentId: number) => {
  return axiosInstance.post(api + `/Payment/Refund`, { appointmentId: appointmentId });
};
export const cashoutApi = (customerId: string, hospitalizationId: number) => {
  return axiosInstance.post(api + `/Payment/CashOut`, {
    customerId: customerId,
    hospitalizationId: hospitalizationId
  });
};
export const cashoutAppointmentApi = (customerId: string, appointmentId: number, amount: number) => {
  return axiosInstance.post(api + `/Payment/CashOutForAppointment`, {
    customerId: customerId,
    appointmentId: appointmentId,
    amount: amount
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
