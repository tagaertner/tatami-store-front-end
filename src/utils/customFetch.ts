import axios from 'axios';

// const productionUrl = 'https://strapi-store-server.onrender.com/api';
// const productionUrl = import.meta.env.VITE_TATAMI_BE;
// console.log('productionUrl', productionUrl);

// export const customFetch = axios.create({
//   baseURL: productionUrl,
// });

const productionUrl = import.meta.env.VITE_TATAMI_BE || 'http://localhost:5000';  // Remove /api

export const customFetch = axios.create({
  baseURL: productionUrl,
});

// Add interceptor for debugging
customFetch.interceptors.request.use(request => {
  console.log('Starting Request:', request.url);
  return request;
});

