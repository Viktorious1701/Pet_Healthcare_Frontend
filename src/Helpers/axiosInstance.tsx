/* eslint-disable @typescript-eslint/no-explicit-any */
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

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const {
      config,
      response: { status }
    } = error;
    const originalRequest = config;

    if (status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise(function (resolve) {
          refreshSubscribers.push((token: string) => {
            originalRequest.headers['Authorization'] = 'Bearer ' + token;
            resolve(axios(originalRequest));
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const token = localStorage.getItem('token');
      const refreshToken = localStorage.getItem('refreshToken');

      if (token && refreshToken) {
        try {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const res: any = await refreshTokenAPI(token, refreshToken);
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('refreshToken', res.data.refreshToken);
          const userObj = {
            userName: res.data.userName,
            email: res.data.email,
            role: res.data.role
          };
          localStorage.setItem('user', JSON.stringify(userObj));
          axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.token;
          onRefreshed(res.data.token);
          isRefreshing = false;
          return axiosInstance(originalRequest);
        } catch (err) {
          handleError(err);
          isRefreshing = false;
          // toast.warning('Session expired, please log in again');
          toast('Session expired, please log in again', {
            type: 'warning'
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } as any);
          // Handle logout or redirect to login page
          window.history.pushState({}, 'LoginPage', '/login');
        }
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
