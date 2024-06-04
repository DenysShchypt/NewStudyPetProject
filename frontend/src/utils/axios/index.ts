import axios from 'axios';

export const instance = axios.create({
  baseURL: 'http://localhost:4000',
  timeout: 1000,
  headers: { 'X-Custom-Header': 'foobar' },
});
export const instanceAssets = axios.create({
  baseURL: 'https://data-api.cryptocompare.com',
  timeout: 5000,
  headers: {
    authorization:
      'c486f48338229247d2c810410a4021ed92f17525f0d01ebc450f04230160f7be',
    Accept: 'application/json',
  },
});
export const instanceHistory = axios.create({
  baseURL: 'https://min-api.cryptocompare.com',
  timeout: 5000,
  headers: {
    authorization:
      'c486f48338229247d2c810410a4021ed92f17525f0d01ebc450f04230160f7be',
    Accept: 'application/json',
  },
});
