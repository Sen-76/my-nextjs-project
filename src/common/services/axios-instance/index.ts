import axios from 'axios';

const apiUrl = 'http://localhost:8081/api';
const instance = axios.create({
  timeout: 600000,
  baseURL: apiUrl,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
  //   cancelToken: source.token,
});

instance.interceptors.request.use(
  (config) => {
    // config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
