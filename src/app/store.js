import { configureStore } from '@reduxjs/toolkit';
import CategoriesSlice from '../features/categories/CategoriesSlice';

export const store = configureStore({
     reducer: {
          CategoriesSlice,
     },
});
