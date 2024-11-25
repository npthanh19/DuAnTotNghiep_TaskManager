import { axiosi } from '../config/axios';

const apiEndpoint = '/api/activity-logs';
// Lấy tất cả lịch sử hoạt động
export const getAllActivityLogs = async () => {
     try {
          const response = await axiosi.get(`${apiEndpoint}`);
          return response.data; // Trả về dữ liệu lịch sử hoạt động
     } catch (error) {
          console.error('Error fetching activity logs:', error);
          throw error;
     }
};

// Lấy lịch sử của một user cụ thể
export const getUserActivityLogs = async (userId) => {
     try {
          const response = await axiosi.get(`${apiEndpoint}/user/${userId}`);
          return response.data; // Trả về dữ liệu lịch sử của người dùng
     } catch (error) {
          console.error(`Error fetching activity logs for user ${userId}:`, error);
          throw error;
     }
};
