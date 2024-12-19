import { axiosi } from '../config/axios';

const dashboardApiEndpoint = '/api/dashboard';

// Lấy tổng thời gian task
export const getTotalTaskTime = async () => {
     try {
          const response = await axiosi.get(`${dashboardApiEndpoint}/task-time`);
          return response.data;
     } catch (error) {
          console.error('Error fetching total task time:', error?.response?.data || error.message);
          throw error.response ? error.response.data : new Error('Network error');
     }
};

// Lấy thống kê số lượng task theo trạng thái
export const getTaskCountsByStatusGrouped = async () => {
     try {
          const response = await axiosi.get(`${dashboardApiEndpoint}/task-status`);
          return response.data;
     } catch (error) {
          console.error('Error fetching task counts by status:', error?.response?.data || error.message);
          throw error.response ? error.response.data : new Error('Network error');
     }
};

// Lấy thống kê thời gian task của từng user
export const getUserTaskStatistics = async () => {
     try {
          const response = await axiosi.get(`${dashboardApiEndpoint}/user-task-time`);
          return response.data;
     } catch (error) {
          console.error('Error fetching user task statistics:', error?.response?.data || error.message);
          throw error.response ? error.response.data : new Error('Network error');
     }
};

// Lấy worktime cùng với task liên quan
export const getWorktimeWithTasks = async () => {
     try {
          const response = await axiosi.get(`${dashboardApiEndpoint}/worktime-task`);
          return response.data;
     } catch (error) {
          console.error('Error fetching worktime with tasks:', error?.response?.data || error.message);
          throw error.response ? error.response.data : new Error('Network error');
     }
};

// Lấy danh sách phòng ban
export const getDepartments = async () => {
     try {
          const response = await axiosi.get(`${dashboardApiEndpoint}/get-departments`);
          return response.data;
     } catch (error) {
          throw error.response ? error.response.data : new Error('Network error');
     }
};

// Lấy danh sách dự án
export const getProjects = async () => {
     try {
          const response = await axiosi.get(`${dashboardApiEndpoint}/get-projects`);
          const { total_projects, projects } = response.data;
          return { total_projects: total_projects || 0, projects: projects || [] };
     } catch (error) {
          throw error.response ? error.response.data : new Error('Network error');
     }
};

// Lấy danh sách task được gán cho user
export const getUserAssignedTasks = async () => {
     try {
          const response = await axiosi.get(`${dashboardApiEndpoint}/get-tasks`);
          return response.data;
     } catch (error) {
          throw error.response ? error.response.data : new Error('Network error');
     }
};

// Lấy danh sách hoạt động của user
export const getUserActivities = async () => {
     try {
          const response = await axiosi.get(`${dashboardApiEndpoint}/get-activity`);

          if (response.data && response.data.logs) {
               return response.data;
          } else {
               throw new Error('Không có dữ liệu hoạt động');
          }
     } catch (error) {
          throw error.response ? error.response.data : new Error('Network error');
     }
};
