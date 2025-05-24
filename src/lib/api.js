// src/services/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'https://b9a6-1-20-150-145.ngrok-free.app', // ไม่ใส่ slash ท้าย
  headers: {
    'Content-Type': 'application/json',
  },
});

export default API;