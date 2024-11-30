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

export const updateUser = async (userId, data) => {
     try {
          const response = await axiosi.put(`${apiEndpoint}/${userId}`, data);
          return response.data;
     } catch (error) {
          throw error;
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

// Service xóa mềm người dùng
export const forceDelete = async (id) => {
     try {
          const response = await axiosi.delete(`${apiEndpoint}/${id}/force`);
          return response.data;
     } catch (error) {
          console.error(`Error soft deleting user with ID ${id}:`, error);
          throw error.response ? error.response.data : new Error('Network error');
     }
};

// Service khôi phục người dùng
export const restoreUser = async (id) => {
     try {
          const response = await axiosi.post(`${apiEndpoint}/${id}/restore`);
          return response.data;
     } catch (error) {
          console.error(`Error restoring user with ID ${id}:`, error);
          throw error.response ? error.response.data : new Error('Network error');
     }
};

// Service lấy danh sách người dùng đã xóa mềm
export const getTrashedUsers = async () => {
     try {
          const response = await axiosi.get('/api/users-trashed');
          return response.data;
     } catch (error) {
          console.error('Error fetching trashed users:', error);
          throw error.response ? error.response.data : new Error('Network error');
     }
};

// Service cập nhật avatar người dùng
export const updateAvatar = async (id, avatarData) => {
     try {
          const response = await axiosi.post(`${apiEndpoint}/${id}/update-avatar`, avatarData);
          return response.data;
     } catch (error) {
          console.error(`Error updating avatar for user with ID ${id}:`, error);
          throw error.response ? error.response.data : new Error('Network error');
     }
};

export const getAvatarUrl = (avatar) => {
     return avatar ? `${process.env.REACT_APP_BASE_URL}/avatar/${avatar}` : null;
};

export default {
     getAllUsers,
     getUserById,
     createUser,
     updateUser,
     deleteUser,
     forceDelete,
     restoreUser,
     getTrashedUsers,
     updateAvatar,
     getAvatarUrl,
};
