import axios from 'axios';

const productionUrl = import.meta.env.VITE_TATAMI_BE;

console.log('Backend URL:', productionUrl);

export const customFetch = axios.create({
  baseURL: productionUrl
});

console.log("customFetch >>> ", customFetch);
