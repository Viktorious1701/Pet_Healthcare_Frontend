import { HospitalizationPost } from "@/Models/Hospitalization";
import axios from "axios";
import { toast } from "react-toastify";


const api = "https://pethealthcaresystem.azurewebsites.net/api";

export const hospitalizationListAPI = async () => {
  try {
    const data = await axios.get(api + `/Hospitalization`);
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
    const data = await axios.put(api + `/Hospitalization/${hospitalizationId}`, {
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
    const data = await axios.delete(api + `/Hospitalization/${hospitalizationId}`);
    return data;
  } catch (error) {
    toast.error("Failed to delete hospitalization");
    throw error;
  }
};
export const hospitalizationCreateAPI = async (newHospitalization: HospitalizationPost) => {
    try {
        const data = await axios.post(api + `/Hospitalization`, newHospitalization);
        return data;
    } catch (error) {
        toast.error("Failed to add hospitalization");
        throw error;
    }
}
