// src/api/api.ts
import axios from 'axios';

const api = axios.create({
  // A porta 3000 é a do seu backend
  baseURL: 'http://localhost:3000/uni7',
});

export default api;