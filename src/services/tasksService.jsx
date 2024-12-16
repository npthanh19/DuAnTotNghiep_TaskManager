import { axiosi } from '../config/axios';
import { getAllWorktimes } from './worktimeService';
const taskApiEndpoint = '/api/tasks';
const projectApiEndpoint = '/api/projects';


export const getAllTasks = async () => {
     try {
          const response = await axiosi.get(taskApiEndpoint);
          return response.data;
     } catch (error) {
          console.error('Error fetching all tasks:', error);
          throw error.response ? error.response.data : new Error('Network error');
     }
};
export const updateTaskDescription = async (taskId, description) => {
     try {
         // Sửa dấu backtick ``
         const response = await axiosi.put(`${taskApiEndpoint}/${taskId}/description`, { description });
         return response.data;
     } catch (error) {
         console.error('Error updating task description:', error?.response?.data || error.message);
         throw error.response ? error.response.data : new Error('Network error');
     }
 };
 
// Lấy thông tin từ task ID
export const getTaskById = async (id) => {
     try {
          const response = await axiosi.get(`${taskApiEndpoint}/${id}`);
          return response.data;
     } catch (error) {
          console.error(`Error fetching task with ID ${id}:`, error);
          throw error.response ? error.response.data : new Error('Network error');
     }
};


export const getTaskDetails = async (taskId) => {
     try {
          const response = await axiosi.get(`${taskApiEndpoint}/${taskId}/details`);
          return response.data;
     } catch (error) {
          console.error(`Error fetching task details for ID ${taskId}:`, error);
          throw error.response ? error.response.data : new Error('Network error');
     }
};

//Thêm task mới
export const createTask = async (taskData) => {
     try {
          const response = await axiosi.post(taskApiEndpoint, taskData);
          return response.data;
     } catch (error) {
          console.error('Error creating task:', error);
          throw error.response ? error.response.data : new Error('Network error');
     }
};

// Cập nhật task
export const updateTask = async (id, taskData) => {
     try {
          const response = await axiosi.put(`${taskApiEndpoint}/${id}`, taskData);
          return response.data;
     } catch (error) {
          console.error(`Error updating task with ID ${id}:`, error);
          throw error.response ? error.response.data : new Error('Network error');
     }
};

//Xoá task
export const deleteTask = async (id) => {
     try {
          const response = await axiosi.delete(`${taskApiEndpoint}/${id}`);
          return response.data;
     } catch (error) {
          console.error(`Error deleting task with ID ${id}:`, error);
          throw error.response ? error.response.data : new Error('Network error');
     }
};


//Thêm users vào task
export const addUsersToTask = async (taskId, users) => {
     try {
          const response = await axiosi.post(`${taskApiEndpoint}/${taskId}/add-users`, { users });
          return response.data;
     } catch (error) {
          console.error(`Error adding users to task with ID ${taskId}:`, error);
          throw error.response ? error.response.data : new Error('Network error');
     }
};

// Lây phòng ban dựa trên projectId
export const getDepartmentsByProjectId = async (projectId) => {
     try {
          const response = await axiosi.get(`${projectApiEndpoint}/${projectId}/departments`);
          return response.data;
     } catch (error) {
          console.error(`Error fetching departments for project ID ${projectId}:`, error);
          throw error.response ? error.response.data : new Error('Network error');
     }
};
// Lấy các task chưa có WorkTime
export const getTaskWithoutWorktime = async () => {
     try {
          const response = await axiosi.get(`${taskApiEndpoint}/without-worktime`);
          return response.data;
     } catch (error) {
          console.error('Error fetching tasks without WorkTime:', error);
          throw error.response ? error.response.data : new Error('Network error');
     }
};
//viết thêm update worktime_id, đang bị lỗi kh cập nhật được vị trí của worktime_id
// Cập nhật vị trí của một task
export const updateLocationTask = async (taskId, locationData) => {
     try {
          const response = await axiosi.post(`${taskApiEndpoint}/${taskId}/update-location`, locationData);
          return response.data;
     } catch (error) {
          console.error(`Error updating location for task ID ${taskId}:`, error);
          throw error.response ? error.response.data : new Error('Network error');
     }
};

// Di chuyển các task sang WorkTime khác
export const moveTasksToAnotherWorktime = async (taskIds, newWorktimeId) => {
     try {
          const response = await axiosi.post(`${taskApiEndpoint}/move-to-worktime`, { taskIds, newWorktimeId });
          return response.data;
     } catch (error) {
          console.error('Error moving tasks to another WorkTime:', error);
          throw error.response ? error.response.data : new Error('Network error');
     }
};

//kh có workTimeId thì trả về
export const getTasksByWorktimeId = async (worktimeId) => {
     try {
          const response = await axiosi.get(`${taskApiEndpoint}/worktimes/${worktimeId}`);
          return response.data;
     } catch (error) {
          console.error(`Error fetching tasks for WorkTime ID ${worktimeId}:`, error);
          throw error.response ? error.response.data : new Error('Network error');
     }
};
// Cập nhật worktime_id cho một task
export const updateWorktimeTask = async (taskId, worktimeId) => {
     try {
          const response = await axiosi.put(`${taskApiEndpoint}/${taskId}/worktime`, {
               worktime_id: worktimeId, // Giá trị worktime_id (có thể null)
          });
          return response.data;
     } catch (error) {
          console.error(`Error updating WorkTime ID for task ID ${taskId}:`, error);
          throw error.response ? error.response.data : new Error('Network error');
     }
};

export const forceDeleteTask = async (id) => {
     try {
          const response = await axiosi.delete(`${taskApiEndpoint}/${id}/force`);
          return response.data;
     } catch (error) {
          console.error(`Error force deleting task with ID ${id}:`, error);
          throw error.response ? error.response.data : new Error('Network error');
     }
};

export const getTrashedTasks = async () => {
     try {
          const response = await axiosi.get('/api/trashed-tasks');
          return response.data;
     } catch (error) {
          console.error('Error fetching trashed tasks:', error);
          throw error.response ? error.response.data : new Error('Network error');
     }
};

export const restoreTask = async (id) => {
     try {
          const response = await axiosi.put(`${taskApiEndpoint}/${id}/restore`);
          return response.data;
     } catch (error) {
          console.error(`Error restoring task with ID ${id}:`, error);
          throw error.response ? error.response.data : new Error('Network error');
     }
};
// Cập nhật trạng thái task
export const updateTaskStatus = async (taskId, status) => {
     try {
          const response = await axiosi.put(`${taskApiEndpoint}/${taskId}/status`, { status });
          return response.data;
     } catch (error) {
          console.error(`Error updating status for task ID ${taskId}:`, error);
          throw error.response ? error.response.data : new Error('Network error');
     }
};

// services/tasksService.js
export const getProjectIdFromTask = async (taskId) => {
     try {
          const tasks = await getAllTasks(); // Lấy tất cả tasks
          const worktimes = await getAllWorktimes(); // Lấy tất cả worktimes
          const task = tasks.find((t) => t.id === taskId); // Tìm task theo id

          if (task?.worktime_id) {
               const worktime = worktimes.find((w) => w.id === task.worktime_id); // Tìm worktime
               return worktime?.project_id; // Trả về project_id
          }
          return null; // Task không liên kết worktime
     } catch (error) {
          console.error('Error getting project ID from task:', error);
          return null;
     }
};
// Cập nhật thời gian của một task
export const updateTaskTime = async (taskId, taskTime) => {
     try {
          const response = await axiosi.put(`${taskApiEndpoint}/${taskId}/tasktime`, {
               task_time: taskTime,
          });
          return response.data;
     } catch (error) {
          console.error(`Error updating task time for task ID ${taskId}:`, error);
          throw error.response ? error.response.data : new Error('Network error');
     }
};

export const getTasksByProject = async (projectId) => {
     try {
          const response = await axiosi.get(`${taskApiEndpoint}/by-project/${projectId}`);
          return response.data;
     } catch (error) {
          console.error('Error fetching tasks:', error);
          return [];
     }
};
export const getRunningTasks = async (id) => {
     try {
          const response = await axiosi.get(`/api/tasks/by-running/${id}`);
          return response.data;
     } catch (error) {
          console.error('Error fetching tasks from running worktimes:', error);
          throw error.response ? error.response.data : new Error('Network error');
     }
};

export default {
     getAllTasks,
     getTaskById,
     getTaskDetails,
     createTask,
     updateTask,
     deleteTask,
     addUsersToTask,
     getDepartmentsByProjectId,
     getTaskWithoutWorktime,
     updateLocationTask,
     moveTasksToAnotherWorktime,
     getTasksByWorktimeId,
     updateWorktimeTask,
     restoreTask,
     getRunningTasks,
};
