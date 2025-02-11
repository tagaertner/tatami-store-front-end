import axios from 'axios';

const productionUrl = import.meta.env.VITE_TATAMI_BE;

export const customFetch = axios.create({
  baseURL: productionUrl,
});

customFetch.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);