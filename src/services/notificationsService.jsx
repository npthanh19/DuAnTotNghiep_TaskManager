import { axiosi } from '../config/axios';

const apiEndpoint = '/api/notifications';

// Lấy tất cả thông báo
export const getAllNotifications = async () => {
     try {
          const response = await axiosi.get(`${apiEndpoint}`);
          return response.data; // Trả về danh sách thông báo
     } catch (error) {
          console.error('Error fetching notifications:', error);
          throw error;
     }
};

// Lấy chi tiết thông báo theo ID
export const getNotificationById = async (id) => {
     try {
          const response = await axiosi.get(`${apiEndpoint}/${id}`);
          return response.data; // Trả về chi tiết thông báo
     } catch (error) {
          console.error(`Error fetching notification with ID ${id}:`, error);
          throw error;
     }
};

// Tạo thông báo mới
export const createNotification = async (data) => {
     try {
          const response = await axiosi.post(`${apiEndpoint}`, data);
          return response.data; // Trả về thông báo vừa tạo
     } catch (error) {
          console.error('Error creating notification:', error);
          throw error;
     }
};

// Đánh dấu thông báo là đã đọc
export const markNotificationAsRead = async (id) => {
     try {
          const response = await axiosi.put(`${apiEndpoint}/${id}/read`);
          return response.data; // Trả về thông báo đã được đánh dấu
     } catch (error) {
          console.error(`Error marking notification with ID ${id} as read:`, error);
          throw error;
     }
};

// Xóa thông báo (soft delete)
export const deleteNotification = async (id) => {
     try {
          const response = await axiosi.delete(`${apiEndpoint}/${id}`);
          return response.data; // Trả về thông báo đã xóa
     } catch (error) {
          console.error(`Error deleting notification with ID ${id}:`, error);
          throw error;
     }
};

// Xóa vĩnh viễn thông báo
export const forceDeleteNotification = async (id) => {
     try {
          const response = await axiosi.delete(`${apiEndpoint}/${id}/force`);
          return response.data; // Trả về trạng thái xóa vĩnh viễn
     } catch (error) {
          console.error(`Error force deleting notification with ID ${id}:`, error);
          throw error;
     }
};

// Lấy danh sách thông báo đã bị xóa (trash)
export const getTrashedNotifications = async () => {
     try {
          const response = await axiosi.get('/api/trashed-notifications');
          return response.data; // Trả về danh sách thông báo bị xóa
     } catch (error) {
          console.error('Error fetching trashed notifications:', error);
          throw error;
     }
};

// Khôi phục thông báo đã xóa
export const restoreNotification = async (id) => {
     try {
          const response = await axiosi.put(`${apiEndpoint}/${id}/restore`);
          return response.data; // Trả về thông báo đã được khôi phục
     } catch (error) {
          console.error(`Error restoring notification with ID ${id}:`, error);
          throw error;
     }
};
