import axiosInstance from "@/Helpers/axiosInstance";
import { HospitalizationPost } from "@/Models/Hospitalization";
import { toast } from "sonner";


const api = "https://pethealthcaresystem.azurewebsites.net/api";

export const hospitalizationListAPI = async () => {
  try {
    const data = await axiosInstance.get(api + `/hospitalization`);
    return data;
  } catch (error) {
    toast.error("Failed to fetch hospitalizations");
    throw error;
  }
};

export const hospitalizationUpdateAPI = async (
  hospitalizationId: number,
  dischargeDate: string
) => {
  try {
    const data = await axiosInstance.put(api + `/Hospitalization/${hospitalizationId}`, {
      dischargeDate,
    });
    return data;
  } catch (error) {
    toast.error("Failed to update hospitalization");
    throw error;
  }
};

export const hospitalizationDeleteAPI = async (hospitalizationId: number) => {
  try {
    const data = await axiosInstance.delete(api + `/Hospitalization/${hospitalizationId}`);
    return data;
  } catch (error) {
    toast.error("Failed to delete hospitalization");
    throw error;
  }
};
export const hospitalizationCreateAPI = async (newHospitalization: HospitalizationPost) => {
    try {
        const data = await axiosInstance.post(api + `/Hospitalization`, newHospitalization);
        return data;
    } catch (error) {
        toast.error("Failed to add hospitalization");
        throw error;
    }
}
