// services/roleService.js

import { axiosi } from '../config/axios';

const apiEndpoint = '/api/roles';

export const getAllRoles = async () => {
     try {
          const response = await axiosi.get(apiEndpoint);
          return response.data;
     } catch (error) {
          console.error('Error fetching all roles:', error);
          throw error.response ? error.response.data : new Error('Network error');
     }
};

export const getRoleById = async (id) => {
     try {
          const response = await axiosi.get(`${apiEndpoint}/${id}`);
          return response.data;
     } catch (error) {
          console.error(`Error fetching role with ID ${id}:`, error);
          throw error.response ? error.response.data : new Error('Network error');
     }
};

export const createRole = async (roleData) => {
     try {
          const response = await axiosi.post(apiEndpoint, roleData);
          return response.data;
     } catch (error) {
          console.error('Error creating role:', error);
          throw error.response ? error.response.data : new Error('Network error');
     }
};

export const updateRole = async (id, roleData) => {
     try {
          const response = await axiosi.put(`${apiEndpoint}/${id}`, roleData);
          return response.data;
     } catch (error) {
          console.error(`Error updating role with ID ${id}:`, error);
          throw error.response ? error.response.data : new Error('Network error');
     }
};

export const deleteRole = async (id) => {
     try {
          const response = await axiosi.delete(`${apiEndpoint}/${id}`);
          return response.data;
     } catch (error) {
          console.error(`Error deleting role with ID ${id}:`, error);
          throw error.response ? error.response.data : new Error('Network error');
     }
};

export const deletePermissionFromRole = async (roleId, permissionId) => {
     try {
          const response = await axiosi.delete(`${apiEndpoint}/${roleId}/permissions`, {
               data: { permissions: [permissionId] }, 
          });
          return response.data;
     } catch (error) {
          console.error(`Error deleting permission from role with ID ${roleId}:`, error);
          throw error.response ? error.response.data : new Error('Network error');
     }
};


export default {
     getAllRoles,
     getRoleById,
     createRole,
     updateRole,
     deleteRole,
     deletePermissionFromRole, // Thêm phương thức mới vào export mặc định
};
