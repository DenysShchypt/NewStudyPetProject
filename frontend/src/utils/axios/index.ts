import axios from 'axios';

export const instance = axios.create({
  baseURL: 'http://localhost:4000',
  timeout: 1000,
  headers: { 'X-Custom-Header': 'foobar' },
});
export const getDataCoinMarket = axios.create({
  baseURL: 'https://rest.coinapi.io',
  timeout: 5000,
  headers: {
    'X-CoinAPI-Key': '904F960C-9C32-4B2E-B643-1F461BFDF54F',
    Accept: 'application/json',
  },
});
