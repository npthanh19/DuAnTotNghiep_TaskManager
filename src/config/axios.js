import axios from 'axios';

const axiosi = axios.create({
     baseURL: process.env.REACT_APP_BASE_URL,
});

axiosi.interceptors.request.use(
     (config) => {
          const token = localStorage.getItem('token');
          if (token) {
               config.headers.Authorization = `Bearer ${token}`;
          }
          return config;
     },
     (error) => {
          return Promise.reject(error);
     },
);

export { axiosi };
export const GOOGLE_CLIENT_ID = process.env.REACT_APP_GG__CLIENT_ID;
