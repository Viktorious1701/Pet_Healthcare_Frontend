/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { handleError } from '../Helpers/ErrorHandler';
import { UserProfileToken } from '../Models/User';
import axiosInstance from '@/Helpers/axiosInstance';

const api = 'https://pethealthcaresystem.azurewebsites.net/api/';

export const loginAPI = async (username: string, password: string) => {
  try {
    const data = await axios.post<UserProfileToken>(api + 'Account/login', {
      username: username,
      password: password
    });
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const registerAPI = async (email: string, username: string, password: string, confirmPassword: string) => {
  try {
    const response = await axios.post<UserProfileToken>(api + 'Account/register', {
      email,
      username,
      password,
      confirmPassword
    });
    console.log('Data for register', response);
    return response.data;
  } catch (error: any) {
    console.log("Error in register API", error);
    if (error.response && error.response.data) {
      // Server returned an error response
      throw new Error(error || 'Registration failed');
    } else {
      // Network error or other issues
      throw new Error('An unexpected error occurred');
    }
  }
};

export const forgotPasswordAPI = async (email: string) => {
  try {
    const data = await axiosInstance.post(api + 'Account/forgot-password', {
      email
    });
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const resetPasswordAPI = async (token: string, email: string, password: string, confirmPassword: string) => {
  try {
    const data = await axiosInstance.post(api + 'Account/reset-password', {
      token: token,
      email: email,
      password: password,
      confirmPassword: confirmPassword
    });
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const refreshTokenAPI = async (token: string, refreshToken: string) => {
  try {
    console.log("Endpoint url of refresh token");
    const data = await axiosInstance.post(api + 'account/generate-new-jwt-token', {
      token: token,
      refreshToken: refreshToken
    });
    return data?.data;
  } catch (error) {
    handleError(error);
  }
};
