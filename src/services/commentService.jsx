import { axiosi } from '../config/axios';

const apiEndpoint = '/api/comments';
const userApiEndpoint = '/api/users';
const taskApiEndpoint = '/api/tasks';

// Lấy tất cả bình luận
export const getAllComments = async () => {
    try {
      const response = await axiosi.get(apiEndpoint);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('An error occurred');
    }
  };
  
  // Lấy bình luận theo ID
  export const getCommentById = async (id) => {
    try {
      const response = await axiosi.get(`${apiEndpoint}/${id}`);
      return response.data;
    } catch (error) {
        console.error(`Error fetching comment with ID ${id}:`, error);
      throw error.response ? error.response.data : new Error('An error occurred');
    }
  };
  
  // Tạo bình luận mới
  export const createComment = async (commentData) => {
    try {
      const response = await axiosi.post(apiEndpoint, commentData);
      return response.data;
    } catch (error) {
        console.error('Error creating comment:', error);
      throw error.response ? error.response.data : new Error('An error occurred');
    }
  };
  
  // Cập nhật bình luận
  export const updateComment = async (id, commentData) => {
    try {
      const response = await axiosi.put(`${apiEndpoint}/${id}`, commentData);
      return response.data;
    } catch (error) {
        console.error(`Error updating comment with ID ${id}:`, error);
      throw error.response ? error.response.data : new Error('An error occurred');
    }
  };
  
  // Xóa bình luận
  export const deleteComment = async (id) => {
    try {
      const response = await axiosi.delete(`${apiEndpoint}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error updating comment with ID ${id}:`, error);
        throw error; // Bỏ lỗi để có thể xử lý ở nơi gọi
    }
};
  
  


  
// Lấy bình luận theo Task ID
export const getCommentsByTask = async (taskId) => {
    try {
        const response = await axiosi.get(`${taskApiEndpoint}/${taskId}/comments`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching comments for task ${taskId}:`, error.response.data); // Log chi tiết lỗi
        throw error.response ? error.response.data : new Error('An error occurred');
    }
};



  
  export default {
    getAllComments,
    getCommentById,
    createComment,
    updateComment,
    deleteComment,
    getCommentsByTask,
  };