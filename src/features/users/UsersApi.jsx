import { axiosi } from '../../config/axios';

// Lấy tất cả người dùng
export const fetchAllUsers = async () => {
     try {
          const res = await axiosi.get('/api/users');
          return res.data;
     } catch (error) {
          throw error.response?.data || error;
     }
};

// Thêm người dùng mới
export const addUserAsync = async (user) => {
     try {
          const res = await axiosi.post('/api/users', user);
          return res.data;
     } catch (error) {
          throw error.response?.data || error;
     }
};

// Cập nhật người dùng
export const updateUserAsync = async (id, user) => {
     try {
          const res = await axiosi.put(`/api/users/${id}`, user);
          return res.data;
     } catch (error) {
          throw error.response?.data || error;
     }
};

// Xóa người dùng
export const deleteUserAsync = async (id) => {
     try {
          const res = await axiosi.delete(`/api/users/${id}`);
          return res.data;
     } catch (error) {
          throw error.response?.data || error;
     }
};
