import axios from "axios";
import { handleError } from "../Helpers/ErrorHandler";
import { UserProfileToken } from "../Models/User";

const api = "https://pethealthcaresystem.azurewebsites.net/api/";

export const loginAPI = async (username: string, password: string) => {
  try {
    const data = await axios.post<UserProfileToken>(api + "Account/login", {
      username: username,
      password: password,
    });
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const registerAPI = async (
  email: string,
  username: string,
  password: string
) => {
  try {
    const data = await axios.post<UserProfileToken>(api + "Account/register", {
      email: email,
      username: username,
      password: password,
    });
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const forgotPasswordAPI = async (email: string) => {
  try {
    const data = await axios.post(api + "Account/forgot-password", {
      email,
    });
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const resetPasswordAPI = async (
  token: string,
  email: string,
  password: string,
  confirmPassword: string
) => {
  try {
    const data = await axios.post(api + "Account/reset-password", {
      token: token,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    });
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const refreshTokenAPI = async (
  token: string,
  refreshToken: string
) => {
  try {
    const data = axios.post<UserProfileToken>(api + 'account/generate-new-jwt-token', {
      token: token,
      refreshToken: refreshToken
    });
    return data;
  } catch (error) {
    handleError(error);
  }
};
