import { configureStore } from '@reduxjs/toolkit';
import CategoriesSlice from '../features/categories/CategoriesSlice';
import UsersSlice from '../features/users/UsersSlice';

export const store = configureStore({
     reducer: {
          CategoriesSlice,
          UsersSlice,
     },
});
