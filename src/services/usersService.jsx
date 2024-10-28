import { axiosi } from '../config/axios';

const apiEndpoint = '/api/users';

export const getAllUsers = async () => {
     try {
          const response = await axiosi.get(apiEndpoint);
          return response.data;
     } catch (error) {
          console.error('Error fetching all users:', error);
          throw error.response ? error.response.data : new Error('Network error');
     }
};

export const getUserById = async (id) => {
     try {
          const response = await axiosi.get(`${apiEndpoint}/${id}`);
          return response.data;
     } catch (error) {
          console.error(`Error fetching user with ID ${id}:`, error);
          throw error.response ? error.response.data : new Error('Network error');
     }
};

export const createUser = async (userData) => {
     try {
          const response = await axiosi.post(apiEndpoint, userData);
          return response.data;
     } catch (error) {
          console.error('Error creating user:', error);
          throw error.response ? error.response.data : new Error('Network error');
     }
};

export const updateUser = async (id, userData) => {
     try {
          const response = await axiosi.put(`${apiEndpoint}/${id}`, userData);
          return response.data;
     } catch (error) {
          console.error(`Error updating user with ID ${id}:`, error);
          throw error.response ? error.response.data : new Error('Network error');
     }
};

export const deleteUser = async (id) => {
     try {
          const response = await axiosi.delete(`${apiEndpoint}/${id}`);
          return response.data;
     } catch (error) {
          console.error(`Error deleting user with ID ${id}:`, error);
          throw error.response ? error.response.data : new Error('Network error');
     }
};

// Thêm service xóa mềm người dùng
export const softDeleteUser = async (id) => {
     try {
          const response = await axiosi.delete(`${apiEndpoint}/${id}`);
          return response.data;
     } catch (error) {
          console.error(`Error soft deleting user with ID ${id}:`, error);
          throw error.response ? error.response.data : new Error('Network error');
     }
};

// Thêm service khôi phục người dùng
export const restoreUser = async (id) => {
     try {
          const response = await axiosi.patch(`${apiEndpoint}/${id}/restore`);
          return response.data;
     } catch (error) {
          console.error(`Error restoring user with ID ${id}:`, error);
          throw error.response ? error.response.data : new Error('Network error');
     }
};

export default {
     getAllUsers,
     getUserById,
     createUser,
     updateUser,
     deleteUser,
     softDeleteUser, 
     restoreUser,    
};
