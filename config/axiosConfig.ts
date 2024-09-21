import axios, {InternalAxiosRequestConfig} from 'axios';

export const api = axios.create({
  baseURL: 'https://spring-boot-app-r0cf.onrender.com/api/v1/',
});

api.interceptors.request.use((config: InternalAxiosRequestConfig<any>) => {
  return config;
});

api.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    const {response} = error;
    // Alert.alert('AUTH RESPONSE DESDE EL CONFIG', JSON.stringify(error, null, 2));
    return response.data;
  },
);