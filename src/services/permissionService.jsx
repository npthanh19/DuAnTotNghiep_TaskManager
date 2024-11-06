// services/permissionService.js

import { axiosi } from '../config/axios';

const apiEndpoint = '/api/permissions';

export const getAllPermissions = async () => {
    try {
        const response = await axiosi.get(apiEndpoint);
        return response.data;
    } catch (error) {
        console.error('Error fetching all permissions:', error);
        throw error.response ? error.response.data : new Error('Network error');
    }
};

export const getPermissionById = async (id) => {
    try {
        const response = await axiosi.get(`${apiEndpoint}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching permission with ID ${id}:`, error);
        throw error.response ? error.response.data : new Error('Network error');
    }
};

export const createPermission = async (permissionData) => {
    try {
        const response = await axiosi.post(apiEndpoint, permissionData);
        return response.data;
    } catch (error) {
        console.error('Error creating permission:', error);
        throw error.response ? error.response.data : new Error('Network error');
    }
};

export const updatePermission = async (id, permissionData) => {
    try {
        const response = await axiosi.put(`${apiEndpoint}/${id}`, permissionData);
        return response.data;
    } catch (error) {
        console.error(`Error updating permission with ID ${id}:`, error);
        throw error.response ? error.response.data : new Error('Network error');
    }
};

export const deletePermission = async (id) => {
    try {
        const response = await axiosi.delete(`${apiEndpoint}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting permission with ID ${id}:`, error);
        throw error.response ? error.response.data : new Error('Network error');
    }
};

export const restorePermission = async (id) => {
    try {
        const response = await axiosi.post(`${apiEndpoint}/${id}/restore`);
        return response.data;
    } catch (error) {
        console.error(`Error restoring permission with ID ${id}:`, error);
        throw error.response ? error.response.data : new Error('Network error');
    }
};

export const forceDeletePermission = async (id) => {
    try {
        const response = await axiosi.delete(`${apiEndpoint}/${id}/force-delete`);
        return response.data;
    } catch (error) {
        console.error(`Error force deleting permission with ID ${id}:`, error);
        throw error.response ? error.response.data : new Error('Network error');
    }
};

export const getTrashedPermissions = async () => {
    try {
        const response = await axiosi.get(`${apiEndpoint}-trashed`);
        return response.data;
    } catch (error) {
        console.error('Error fetching trashed permissions:', error);
        throw error.response ? error.response.data : new Error('Network error');
    }
};

export default {
    getAllPermissions,
    getPermissionById,
    createPermission,
    updatePermission,
    deletePermission,
    restorePermission,
    forceDeletePermission,
    getTrashedPermissions,
};
