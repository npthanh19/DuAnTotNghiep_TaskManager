import { axiosi } from '../config/axios';

const taskApiEndpoint = '/api/tasks';

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

export default {
     getAllTasks,
     getTaskById,
     createTask,
     updateTask,
     deleteTask,
     addUsersToTask,
};
