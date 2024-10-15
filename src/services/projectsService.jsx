import { axiosi } from '../config/axios';

const apiEndpoint = '/api/projects';

export const getAllProjects = async () => {
     try {
          const response = await axiosi.get(apiEndpoint);
          return response.data;
     } catch (error) {
          console.error('Error fetching all projects:', error);
          throw error.response ? error.response.data : new Error('Network error');
     }
};

export const getProjectById = async (id) => {
     try {
          const response = await axiosi.get(`${apiEndpoint}/${id}`);
          return response.data;
     } catch (error) {
          console.error(`Error fetching project with ID ${id}:`, error);
          throw error.response ? error.response.data : new Error('Network error');
     }
};

export const createProject = async (projectData) => {
     try {
          const response = await axiosi.post(apiEndpoint, projectData);
          return response.data;
     } catch (error) {
          console.error('Error creating project:', error);
          throw error.response ? error.response.data : new Error('Network error');
     }
};

export const updateProject = async (id, projectData) => {
     try {
          const response = await axiosi.put(`${apiEndpoint}/${id}`, projectData);
          return response.data;
     } catch (error) {
          console.error(`Error updating project with ID ${id}:`, error);
          throw error.response ? error.response.data : new Error('Network error');
     }
};

export const deleteProject = async (id) => {
     try {
          const response = await axiosi.delete(`${apiEndpoint}/${id}`);
          return response.data;
     } catch (error) {
          console.error(`Error deleting project with ID ${id}:`, error);
          throw error.response ? error.response.data : new Error('Network error');
     }
};

export const addTasksToProject = async (projectId, tasks) => {
     try {
          const response = await axiosi.post(`${apiEndpoint}/${projectId}/add-tasks`, tasks);
          return response.data;
     } catch (error) {
          console.error(`Error adding tasks to project with ID ${projectId}:`, error);
          throw error.response ? error.response.data : new Error('Network error');
     }
};

export const addDepartmentToProject = async (projectId, data) => {
     try {
          const response = await axiosi.post(`${apiEndpoint}/${projectId}/add-departments`, data);
          return response.data;
     } catch (error) {
          console.error(`Error adding departments to project with ID ${projectId}:`, error.response?.data || error.message);
          throw error.response ? error.response.data : new Error('Network error');
     }
};
export const removeDepartmentFromProject = async (projectId, data) => {
     const response = await axiosi.post(`${apiEndpoint}/${projectId}/remove-departments`, data);
     return response.data;
};

export default {
     getAllProjects,
     getProjectById,
     createProject,
     updateProject,
     deleteProject,
     addTasksToProject,
     removeDepartmentFromProject,
};
