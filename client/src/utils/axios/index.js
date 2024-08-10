import axios, { AxiosHeaders, } from 'axios';
let isRefreshing = false;
let refreshSubscribers = [];
export const instance = axios.create({
    baseURL: 'http://localhost:4000/api',
    timeout: 2000,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
});
export const instanceAuth = axios.create({
    baseURL: 'http://localhost:4000/api',
});
instanceAuth.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        if (!config.headers) {
            config.headers = new AxiosHeaders();
        }
        config.headers.set('Authorization', token);
    }
    return config;
}, (error) => Promise.reject(error));
instanceAuth.interceptors.response.use((response) => response, async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        if (!isRefreshing) {
            isRefreshing = true;
            try {
                const newAccessToken = await instance.get('/auth/refresh-tokens', {
                    withCredentials: true,
                });
                localStorage.setItem('token', newAccessToken.data.token.token);
                onRefreshed(newAccessToken.data.token.token);
            }
            catch (e) {
                refreshSubscribers = [];
                return Promise.reject(e);
            }
            finally {
                isRefreshing = false;
            }
        }
        return new Promise(resolve => {
            subscribeTokenRefresh((token) => {
                if (!originalRequest.headers) {
                    originalRequest.headers = new AxiosHeaders();
                }
                originalRequest.headers.set('Authorization', token);
                resolve(instanceAuth(originalRequest));
            });
        });
    }
    return Promise.reject(error);
});
function subscribeTokenRefresh(cb) {
    refreshSubscribers.push(cb);
}
function onRefreshed(token) {
    refreshSubscribers.map(cb => cb(token));
    refreshSubscribers = [];
}
export const instanceAssets = axios.create({
    baseURL: 'https://data-api.cryptocompare.com',
    timeout: 5000,
    headers: {
        authorization: 'c486f48338229247d2c810410a4021ed92f17525f0d01ebc450f04230160f7be',
        Accept: 'application/json',
    },
});
export const instanceHistory = axios.create({
    baseURL: 'https://min-api.cryptocompare.com',
    timeout: 5000,
    headers: {
        authorization: 'c486f48338229247d2c810410a4021ed92f17525f0d01ebc450f04230160f7be',
        Accept: 'application/json',
    },
});
