import { axiosi } from '../config/axios';

export const login = async (email, password) => {
     try {
          const response = await axiosi.post('/api/login', { email, password });
          return response.data;
     } catch (error) {
          throw error.response ? error.response.data : new Error('Network error');
     }
};

export const register = async (userData) => {
     try {
          const response = await axiosi.post('/api/register', userData);
          return response.data;
     } catch (error) {
          console.error('Registration error:', error.response ? error.response.data : 'Network error');
          throw error.response ? error.response.data : new Error('Network error');
     }
};
