import axios from "axios";


const api = axios.create({
    baseURL: 'https://pethealthcaresystem.azurewebsites.net/api',
  });

export default api;