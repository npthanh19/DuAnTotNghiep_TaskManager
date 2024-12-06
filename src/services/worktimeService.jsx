import { axiosi } from '../config/axios';

const apiEndpoint = '/api/worktimes';

//bắt đầu worktime
//kết thúc worktime -> kết thúc nếu còn task trong worktime thì cho phép dời sang wortime khác
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

export const updateWorktimeStatus = async (id, status) => {
     try {
          const response = await axiosi.put(`${apiEndpoint}/${id}/status`, { status });
          return response.data;
     } catch (error) {
          console.error(`Error updating status for worktime with ID ${id}:`, error);
          throw error.response ? error.response.data : new Error('Network error');
     }
};

// Lấy danh sách worktimes đã xóa (soft deleted)
export const getTrashedWorktimes = async () => {
     try {
          const response = await axiosi.get('/api/worktimes-trashed');
          return response.data;
     } catch (error) {
          console.error('Error fetching trashed worktimes:', error);
          throw error.response ? error.response.data : new Error('Network error');
     }
};

// Khôi phục worktime đã bị xóa
export const restoreWorktime = async (id) => {
     try {
          const response = await axiosi.put(`/api/worktimes/${id}/restore`);
          return response.data;
     } catch (error) {
          console.error(`Error restoring worktime with ID ${id}:`, error);
          throw error.response ? error.response.data : new Error('Network error');
     }
};

// Xóa vĩnh viễn worktime
export const forceDeleteWorktime = async (id) => {
     try {
          const response = await axiosi.delete(`/api/worktimes/${id}/force`);
          return response.data;
     } catch (error) {
          console.error(`Error force deleting worktime with ID ${id}:`, error);
          throw error.response ? error.response.data : new Error('Network error');
     }
};

//dời các task CHƯA HOÀN THÀNH sang wortime khác || unassign nếu worktime này bấm hoàn thành
