import { axiosi } from '../config/axios';

const taskApiEndpoint = '/api/tasks';
const projectApiEndpoint = '/api/projects';

//thêm 1 api lất task chưa có WorkTime
//thêm 1 api cập nhật task ( chỉ cập nhật vị tri )
//lấy task theo workTime id

//bắt đầu worktime
//kết thúc worktime -> kết thúc nếu còn task trong worktime thì cho phép dời sang wortime khác

export const getAllTasks = async () => {
     try {
          const response = await axiosi.get(taskApiEndpoint);
          return response.data;
     } catch (error) {
          console.error('Error fetching all tasks:', error);
          throw error.response ? error.response.data : new Error('Network error');
     }
};

export const getTaskById = async (id) => {
     try {
          const response = await axiosi.get(`${taskApiEndpoint}/${id}`);
          return response.data;
     } catch (error) {
          console.error(`Error fetching task with ID ${id}:`, error);
          throw error.response ? error.response.data : new Error('Network error');
     }
};

export const createTask = async (taskData) => {
     try {
          const response = await axiosi.post(taskApiEndpoint, taskData);
          return response.data;
     } catch (error) {
          console.error('Error creating task:', error);
          throw error.response ? error.response.data : new Error('Network error');
     }
};

export const updateTask = async (id, taskData) => {
     try {
          const response = await axiosi.put(`${taskApiEndpoint}/${id}`, taskData);
          return response.data;
     } catch (error) {
          console.error(`Error updating task with ID ${id}:`, error);
          throw error.response ? error.response.data : new Error('Network error');
     }
};

export const deleteTask = async (id) => {
     try {
          const response = await axiosi.delete(`${taskApiEndpoint}/${id}`);
          return response.data;
     } catch (error) {
          console.error(`Error deleting task with ID ${id}:`, error);
          throw error.response ? error.response.data : new Error('Network error');
     }
};

export const addUsersToTask = async (taskId, users) => {
     try {
          const response = await axiosi.post(`${taskApiEndpoint}/${taskId}/add-users`, { users });
          return response.data;
     } catch (error) {
          console.error(`Error adding users to task with ID ${taskId}:`, error);
          throw error.response ? error.response.data : new Error('Network error');
     }
};

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
 export default {
     getAllTasks,
     getTaskById,
     createTask,
     updateTask,
     deleteTask,
     addUsersToTask,
     getDepartmentsByProjectId,
     getTaskWithoutWorktime,
     updateLocationTask,
     moveTasksToAnotherWorktime,
     getTasksByWorktimeId,
 };