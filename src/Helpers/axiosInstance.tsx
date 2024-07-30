import axios from 'axios';
import { toast } from 'sonner';
import { handleError } from './ErrorHandler';
import { refreshTokenAPI } from '@/Services/AuthService';

const axiosInstance = axios.create({
  baseURL: 'https://pethealthcaresystem.azurewebsites.net/api'
});

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

const onRefreshed = (token: string) => {
  refreshSubscribers.map((callback) => callback(token));
  refreshSubscribers = [];
};

const addRefreshSubscriber = (callback: (token: string) => void) => {
  refreshSubscribers.push(callback);
};

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config, response } = error;
    const originalRequest = config;

    if (response && response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise(function (resolve) {
          addRefreshSubscriber((token: string) => {
            originalRequest.headers['Authorization'] = 'Bearer ' + token;
            resolve(axiosInstance(originalRequest));
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const token = localStorage.getItem('token');
      const refreshToken = localStorage.getItem('refreshToken');

      if (token && refreshToken) {
        try {
          const res = await refreshTokenAPI(token, refreshToken);
          console.log("New tokens received:", res);
          localStorage.setItem('token', res?.token);
          localStorage.setItem('refreshToken', res?.refreshToken);
          const userObj = {
            userName: res?.userName,
            email: res?.email,
            role: res?.role
          };
          localStorage.setItem('user', JSON.stringify(userObj));
          axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + res?.token;
          onRefreshed(res?.token);
          isRefreshing = false;
          return axiosInstance(originalRequest);
        } catch (err) {
          console.error("Error during token refresh:", err);
          handleError(err);
          isRefreshing = false;
          toast.warning('Session expired, please log in again');
          // Handle logout or redirect to login page
          window.history.pushState({}, 'LoginPage', '/login');
        }
      }
    }

    console.error("Error in request:", error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
