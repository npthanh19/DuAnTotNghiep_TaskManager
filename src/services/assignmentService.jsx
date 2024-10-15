import { axiosi } from '../config/axios';

const apiEndpoint = '/api/assignments';
const userApiEndpoint = '/api/users';
const taskApiEndpoint = '/api/tasks';
const departmentApiEndpoint = '/api/departments';

export const getAllAssignments = async () => {
     try {
          const response = await axiosi.get(apiEndpoint);
          const assignments = response.data;

          const userIds = [...new Set(assignments.map((a) => a.user_id))];
          const taskIds = [...new Set(assignments.map((a) => a.task_id))];
          const departmentIds = [...new Set(assignments.map((a) => a.department_id))];

          const [usersResponse, tasksResponse, departmentsResponse] = await Promise.all([
               axiosi.get(userApiEndpoint, { params: { ids: userIds } }),
               axiosi.get(taskApiEndpoint, { params: { ids: taskIds } }),
               axiosi.get(departmentApiEndpoint, { params: { ids: departmentIds } }),
          ]);

          const users = usersResponse.data || [];
          const tasks = tasksResponse.data || [];
          const departments = departmentsResponse.data || [];

          const userMap = Object.fromEntries(users.map((user) => [user.id, user.name]));
          const taskMap = Object.fromEntries(tasks.map((task) => [task.id, task.task_name]));
          const departmentMap = Object.fromEntries(departments.map((department) => [department.id, department.department_name]));

          return assignments.map((assignment) => ({
               ...assignment,
               user_name: userMap[assignment.user_id] || 'Unknown User',
               task_name: taskMap[assignment.task_id] || 'Unknown Task',
               department_name: departmentMap[assignment.department_id] || 'Unknown Department',
          }));
     } catch (error) {
          console.error('Error fetching all assignments:', error);
          throw error.response ? error.response.data : new Error('Network error');
     }
};

export const getAssignmentById = async (id) => {
     try {
          const response = await axiosi.get(`${apiEndpoint}/${id}`);
          return response.data;
     } catch (error) {
          console.error(`Error fetching assignment with ID ${id}:`, error);
          throw error.response ? error.response.data : new Error('Network error');
     }
};

export const createAssignment = async (assignmentData) => {
     try {
          const response = await axiosi.post(apiEndpoint, assignmentData);
          return response.data;
     } catch (error) {
          console.error('Error creating assignment:', error);
          throw error.response ? error.response.data : new Error('Network error');
     }
};

export const updateAssignment = async (id, assignmentData) => {
     try {
          const response = await axiosi.put(`${apiEndpoint}/${id}`, assignmentData);
          return response.data;
     } catch (error) {
          console.error(`Error updating assignment with ID ${id}:`, error);
          throw error.response ? error.response.data : new Error('Network error');
     }
};

export const deleteAssignment = async (id) => {
     try {
          const response = await axiosi.delete(`${apiEndpoint}/${id}`);
          return response.data;
     } catch (error) {
          console.error(`Error deleting assignment with ID ${id}:`, error);
          throw error.response ? error.response.data : new Error('Network error');
     }
};

export default {
     getAllAssignments,
     getAssignmentById,
     createAssignment,
     updateAssignment,
     deleteAssignment,
};
