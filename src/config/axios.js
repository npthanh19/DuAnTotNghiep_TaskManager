import axios from 'axios';

const baseURL = process.env.REACT_APP_BASE_URL.replace(/['"]+/g, '');
export const axiosi = axios.create({
     withCredentials: true,
     baseURL: baseURL,
     headers: {
          'Content-Type': 'application/json',
     },
});
