import axios, { AxiosInstance } from 'axios';

const API: AxiosInstance = axios.create({
  baseURL: 'https://b9a6-1-20-150-145.ngrok-free.app',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default API;
