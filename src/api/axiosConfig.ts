import axios from "axios";


const api = axios.create({
    baseURL: 'https://pethealthcaresystem.azurewebsites.net/api',
  });
// Add a request interceptor to include the token in every request
api.interceptors.request.use(
  (config) => {
    // Get the token from sessionStorage (or localStorage, depending on where you store it)
    const token = localStorage.getItem('token');
    
    if (token) {
      // If token is available, include it in the Authorization header
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default api;