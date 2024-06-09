import { handleError } from "@/Helpers/ErrorHandler";
import axios from "axios";


const api = "https://pethealthcaresystem.azurewebsites.net/api";
export const HospitalizationListAPI = async () =>{
    try {
        const data = await axios.get(api + `/Hospitalization`);
    
        return data;    
    } catch (error) {
        handleError(error)
    }
}