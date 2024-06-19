import { handleError } from "@/Helpers/ErrorHandler";
import axiosInstance from "@/Helpers/axiosInstance";
import { UserGet, UserInfo } from "@/Models/User";
import axios from "axios";

const api = "https://pethealthcaresystem.azurewebsites.net/api/admin/";

export const customerGetAPI = async (role: string) => {
  try {
    const data = await axiosInstance.get<UserGet[]>(api + `users/role/${role}`);
    return data;
  } catch (error) {
    handleError(error);
  }
};
const api1 = "https://pethealthcaresystem.azurewebsites.net/api/Account/me";
export const getUserProfile = async () => {
  try {
    const data = await axiosInstance.get<UserInfo>(api1);

    return data;
  } catch (error) {
    handleError(error);
  }
};

export const userGetAllAPI = async () => {
  try {
    const data = await axiosInstance.get<UserInfo[]>(api);
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const userAddAPI = async (
  role: string,
  address: string,
  country: string,
  email: string,
  rating: number,
  yearsOfExperience: number,
  firstName: string,
  lastName: string,
  phoneNumber: string,
  gender: boolean,
  userName: string,
  password: string,
  isActive: boolean
) => {
  try {
    const data = await axiosInstance.post(api, {
      role: role,
      address: address,
      country: country,
      email: email,
      rating: rating,
      yearsOfExperience: yearsOfExperience,
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      gender: gender,
      userName: userName,
      password: password,
      isActive: isActive,
    });
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const userUpdateAPI = async (
  userId: string,
  address: string,
  country: string,
  email: string,
  firstName: string,
  lastName: string,
  phoneNumber: string,
  gender: boolean,
  userName: string,
  isActive: boolean
) => {
  try {
    const data = await axiosInstance.put(api + `update-profile/${userId}`, {
      address: address,
      country: country,
      email: email,
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
    const data = await axiosInstance.delete(api + `${userId}`);
    return data;
  } catch (error) {
    handleError(error);
  }
};
