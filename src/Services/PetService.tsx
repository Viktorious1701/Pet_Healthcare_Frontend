import { handleError } from "@/Helpers/ErrorHandler";
import axios from "axios";

const api = "https://pethealthcaresystem.azurewebsites.net/api/pet";

export const petsOfCustomerAPI = async (
    username: string
) => {
    try {
        const data = await axios.get(api + `/user-pet/${username}`);
        return data;    
    } catch (error) {
        handleError(error)
    }
};