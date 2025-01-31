import axios from 'axios';

const productionUrl = import.meta.env.VITE_TATAMI_BE;  // Now it will find the env variable

console.log('Backend URL:', productionUrl); // Add this to verify it's working

export const customFetch = axios.create({
  baseURL: productionUrl
});

console.log("customFetch >>> ", customFetch);
