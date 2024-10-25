import { axiosi } from '../config/axios';

const apiEndpoint = '/api/files';

// Lấy danh sách file của một task cụ thể
export const getTaskFiles = async (taskId) => {
     try {
          const response = await axiosi.get(`${apiEndpoint}?task_id=${taskId}`);
          return response.data;
     } catch (error) {
          console.error(`Error fetching files for task ID ${taskId}:`, error);
          throw error.response ? error.response.data : new Error('Network error');
     }
};

// Upload file cho một task cụ thể
export const uploadFiles = async (taskId, fileData) => {
     const formData = new FormData();
     formData.append('file', fileData);

     try {
          const response = await axiosi.post(`/api/tasks/${taskId}/files`, formData, {
               headers: {
                    'Content-Type': 'multipart/form-data',
               },
          });
          return response.data;
     } catch (error) {
          console.error(`Error uploading file for task ID ${taskId}:`, error);
          throw error.response ? error.response.data : new Error('Network error');
     }
};

// Tải xuống file
export const downloadFile = async (fileId) => {
     try {
          const response = await axiosi.get(`/api/files/${fileId}/download`, {
               responseType: 'blob', // Để xử lý file nhị phân
          });
          return response.data;
     } catch (error) {
          console.error(`Error downloading file with ID ${fileId}:`, error);
          throw error.response ? error.response.data : new Error('Network error');
     }
};

// Lấy danh sách tất cả file
export const getAllFiles = async () => {
     try {
          const response = await axiosi.get(apiEndpoint);
          return response.data;
     } catch (error) {
          console.error('Error fetching all files:', error);
          throw error.response ? error.response.data : new Error('Network error');
     }
};

// Tạo file mới
export const createFile = async (fileData) => {
     const formData = new FormData();
     formData.append('file', fileData); // Giả sử fileData là một đối tượng File hoặc Blob

     try {
          const response = await axiosi.post(apiEndpoint, formData, {
               headers: {
                    'Content-Type': 'multipart/form-data',
               },
          });
          return response.data;
     } catch (error) {
          console.error('Error creating file:', error);
          throw error.response ? error.response.data : new Error('Network error');
     }
};

// Lấy thông tin của một file cụ thể
export const getFileById = async (id) => {
     try {
          const response = await axiosi.get(`${apiEndpoint}/${id}`);
          return response.data;
     } catch (error) {
          console.error(`Error fetching file with ID ${id}:`, error);
          throw error.response ? error.response.data : new Error('Network error');
     }
};

// Xóa file
export const deleteFile = async (id) => {    
     try {
          const response = await axiosi.delete(`${apiEndpoint}/${id}`);
          return response.data;
     } catch (error) {
          console.error(`Error deleting file with ID ${id}:`, error);
          throw error.response ? error.response.data : new Error('Network error');
     }
};

// Cập nhật file
export const updateFile = async (id, fileData) => {
     const formData = new FormData();
     formData.append('file', fileData); // Giả sử fileData là một đối tượng File hoặc Blob

     try {
          const response = await axiosi.put(`${apiEndpoint}/${id}`, formData, {
               headers: {
                    'Content-Type': 'multipart/form-data',
               },
          });
          return response.data;
     } catch (error) {
          console.error(`Error updating file with ID ${id}:`, error);
          throw error.response ? error.response.data : new Error('Network error');
     }
};

export default {
     getTaskFiles,
     uploadFiles,
     downloadFile,
     getAllFiles,
     createFile,
     getFileById,
     deleteFile,
     updateFile,
};
