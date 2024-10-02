import { axiosi } from '../../config/axios';

export const fetchAllCategories = async () => {
     try {
          const res = await axiosi.get('/categories');
          return res.data;
     } catch (error) {
          throw error.response.data;
     }
};

export const addCategoryAsync = async (category) => {
     try {
          const res = await axiosi.post('/categories', category);
          return res.data;
     } catch (error) {
          throw error.response.data;
     }
};

export const updateCategoryAsync = async (id, category) => {
     try {
          const res = await axiosi.patch(`/categories/${id}`, category);
          return res.data;
     } catch (error) {
          throw error.response.data;
     }
};
