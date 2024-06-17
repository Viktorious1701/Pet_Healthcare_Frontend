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
};

export const userGetAllAPI = async () => {
  try {
    const data = await axios.get<UserInfo[]>(api);
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const userUpdateAPI = async (
  userId: string,
  address: string,
  country: string,
  // email: string,
  firstName: string,
  lastName: string,
  phoneNumber: string,
  gender: boolean,
  userName: string,
  isActive: boolean
) => {
  try {
    const data = await axios.put<UserInfo>(api + `update-profile/${userId}`, {
      address: address,
      country: country,
    //   email: email,
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      gender: gender,
      userName: userName,
      isActive: isActive,
    });
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const userDeleteAPI = async (userId: string) => {
  try {
    const data = await axios.delete(api + `${userId}`);
    return data;
  } catch (error) {
    handleError(error);
  }
};
export const userGetByIdAPI = async (userId: string) => {
  try {
    const data = await axios.get<UserInfo>(api + `${userId}`);
    return data.data;
  } catch (error) {
    handleError(error);
  }
}