import axios from 'axios';
import { cookie } from '@/common/helpers/cookie/cookie';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const user: A = cookie.getCookie('userLogin') ?? '{}';
const token = JSON.parse(user)?.token ?? '';
const source = axios.CancelToken.source();
const instance = axios.create({
  timeout: 600000,
  baseURL: apiUrl,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
  cancelToken: source.token,
});

instance.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${token}`;
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
