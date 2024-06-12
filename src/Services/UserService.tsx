import { handleError } from "@/Helpers/ErrorHandler";
import { UserGet, UserInfo } from "@/Models/User";
import axios from "axios";

const api = "https://pethealthcaresystem.azurewebsites.net/api/admin/";

export const customerGetAPI = async (role: string) => {
    try {
        const data = await axios.get<UserGet[]>(api + `users/role/${role}`);
        return data;
    } catch (error) {
        handleError(error);
    }
};
const api1 = "https://pethealthcaresystem.azurewebsites.net/api/Account/me";
export const getUserProfile = async () => {
    try {
        const data = await axios.get<UserInfo>(api1);
        
        return data;
    } catch (error) {
        handleError(error);
    }
}
