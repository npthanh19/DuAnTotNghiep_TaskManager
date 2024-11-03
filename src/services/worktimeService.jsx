import { axiosi } from '../config/axios';

const apiEndpoint = '/api/worktimes';

export const getAllWorktimes = async () => {
     try {
          const response = await axiosi.get(apiEndpoint);
          return response.data;
     } catch (error) {
          console.error('Error fetching all worktimes:', error);
          throw error.response ? error.response.data : new Error('Network error');
     }
};

export const getWorktimeById = async (id) => {
     try {
          const response = await axiosi.get(`${apiEndpoint}/${id}`);
          return response.data;
     } catch (error) {
          console.error(`Error fetching worktime with ID ${id}:`, error);
          throw error.response ? error.response.data : new Error('Network error');
     }
};

export const createWorktime = async (worktimeData) => {
     try {
          const response = await axiosi.post(apiEndpoint, worktimeData);
          return response.data;
     } catch (error) {
          console.error('Error creating worktime:', error);
          throw error.response ? error.response.data : new Error('Network error');
     }
};

export const updateWorktime = async (id, worktimeData) => {
     try {
          const response = await axiosi.put(`${apiEndpoint}/${id}`, worktimeData);
          return response.data;
     } catch (error) {
          console.error(`Error updating worktime with ID ${id}:`, error);
          throw error.response ? error.response.data : new Error('Network error');
     }
};

export const deleteWorktime = async (id) => {
     try {
          const response = await axiosi.delete(`${apiEndpoint}/${id}`);
          return response.data;
     } catch (error) {
          console.error(`Error deleting worktime with ID ${id}:`, error);
          throw error.response ? error.response.data : new Error('Network error');
     }
};
