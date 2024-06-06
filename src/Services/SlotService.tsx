import { handleError } from "@/Helpers/ErrorHandler";
import { SlotGet } from "@/Models/Slot";
import axios from "axios";

const api = "https://pethealthcaresystem.azurewebsites.net/api/slot";

export const slotGetAPI = async (date: string) => {
    try {
        const data = await axios.get<SlotGet[]>(api + `/${date}`);
                
        return data;
    } catch (error) {
        handleError(error);
    }
};