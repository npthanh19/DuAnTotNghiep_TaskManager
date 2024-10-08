import { axiosi } from '../config/axios';

const apiEndpoint = '/api/departments';

export const getAllDepartments = async () => {
     try {
          const response = await axiosi.get(apiEndpoint);
          return response.data;
     } catch (error) {
          console.error('Error fetching all departments:', error);
          throw error.response ? error.response.data : new Error('Network error');
     }
};

export const getDepartmentById = async (id) => {
     try {
          const response = await axiosi.get(`${apiEndpoint}/${id}`);
          return response.data;
     } catch (error) {
          console.error(`Error fetching department with ID ${id}:`, error);
          throw error.response ? error.response.data : new Error('Network error');
     }
};

export const createDepartment = async (departmentData) => {
     try {
          const response = await axiosi.post(apiEndpoint, departmentData);
          return response.data;
     } catch (error) {
          console.error('Error creating department:', error);
          throw error.response ? error.response.data : new Error('Network error');
     }
};

export const updateDepartment = async (id, departmentData) => {
     try {
          const response = await axiosi.put(`${apiEndpoint}/${id}`, departmentData);
          return response.data;
     } catch (error) {
          console.error(`Error updating department with ID ${id}:`, error);
          throw error.response ? error.response.data : new Error('Network error');
     }
};

export const deleteDepartment = async (id) => {
     try {
          const response = await axiosi.delete(`${apiEndpoint}/${id}`);
          return response.data;
     } catch (error) {
          console.error(`Error deleting department with ID ${id}:`, error);
          throw error.response ? error.response.data : new Error('Network error');
     }
};

export const addUserToDepartment = async (departmentId, userId) => {
     try {
          const response = await axiosi.post(`${apiEndpoint}/${departmentId}/add-user`, { user_id: userId });
          return response.data;
     } catch (error) {
          console.error(`Error adding user to department with ID ${departmentId}:`, error);
          throw error.response ? error.response.data : new Error('Network error');
     }
};

export const removeUserFromDepartment = async (departmentId, userId) => {
     try {
          const response = await axiosi.delete(`${apiEndpoint}/${departmentId}/remove-user/${userId}`);
          return response.data;
     } catch (error) {
          console.error(`Error removing user from department with ID ${departmentId}:`, error);
          throw error.response ? error.response.data : new Error('Network error');
     }
};

export default {
     getAllDepartments,
     getDepartmentById,
     createDepartment,
     updateDepartment,
     deleteDepartment,
     addUserToDepartment,
     removeUserFromDepartment,
};
