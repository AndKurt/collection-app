import axios, { AxiosRequestConfig } from 'axios';
import { BASE_URL } from '../constants';

const $api = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
});

$api.interceptors.request.use((config: AxiosRequestConfig) => {
  if (!config?.headers) {
    throw new Error("Expected 'config' and 'config.headers' not to be undefined");
  }
  config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
  return config;
});

$api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
      originalRequest._isRetry = true;
      try {
        const response = await axios.get(`${BASE_URL}/refresh`, {
          withCredentials: true,
        });
        localStorage.setItem('accessToken', response.data.accessToken);
        return $api.request(originalRequest);
      } catch (error) {
        console.log('User unauthorized');
      }
    }
    throw error;
  }
);

export default $api;
