import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAllCategories, addCategoryAsync, updateCategoryAsync } from './CategoriesApi';
import { axiosi } from '../../config/axios';

const initialState = {
     status: 'idle',
     categories: [],
     errors: null,
};

export const fetchAllCategoriesAsync = createAsyncThunk('categories/fetchAllCategoriesAsync', async () => {
     const categories = await fetchAllCategories();
     return categories;
});

export const addCategoryAsyncThunk = createAsyncThunk('categories/addCategoryAsync', async (category) => {
     const response = await addCategoryAsync(category);
     return response;
});

export const updateCategoryAsyncThunk = createAsyncThunk('categories/updateCategoryAsync', async (category) => {
     const response = await updateCategoryAsync(category.id, category);
     return response;
});

export const deleteCategoryAsync = createAsyncThunk('categories/deleteCategoryAsync', async (categoryId) => {
     const response = await axiosi.delete(`/categories/${categoryId}`);
     return response.data;
});

const categorySlice = createSlice({
     name: 'categorySlice',
     initialState: initialState,
     reducers: {},
     extraReducers: (builder) => {
          builder
               .addCase(fetchAllCategoriesAsync.pending, (state) => {
                    state.status = 'idle';
               })
               .addCase(fetchAllCategoriesAsync.fulfilled, (state, action) => {
                    state.status = 'fulfilled';
                    state.categories = action.payload;
               })
               .addCase(fetchAllCategoriesAsync.rejected, (state, action) => {
                    state.status = 'rejected';
                    state.errors = action.error;
               })
               .addCase(addCategoryAsyncThunk.pending, (state) => {
                    state.status = 'loading';
               })
               .addCase(addCategoryAsyncThunk.fulfilled, (state, action) => {
                    state.status = 'succeeded';
                    state.categories.push(action.payload);
               })
               .addCase(addCategoryAsyncThunk.rejected, (state, action) => {
                    state.status = 'failed';
                    state.errors = action.error.message;
               })
               .addCase(updateCategoryAsyncThunk.pending, (state) => {
                    state.status = 'loading';
               })
               .addCase(updateCategoryAsyncThunk.fulfilled, (state, action) => {
                    state.status = 'succeeded';
                    const index = state.categories.findIndex((cat) => cat._id === action.payload._id);
                    state.categories[index] = action.payload;
               })
               .addCase(updateCategoryAsyncThunk.rejected, (state, action) => {
                    state.status = 'failed';
                    state.errors = action.error.message;
               })
               .addCase(deleteCategoryAsync.pending, (state) => {
                    state.status = 'loading';
               })
               .addCase(deleteCategoryAsync.fulfilled, (state, action) => {
                    state.status = 'succeeded';
                    state.categories = state.categories.filter((category) => category._id !== action.meta.arg);
               })
               .addCase(deleteCategoryAsync.rejected, (state, action) => {
                    state.status = 'failed';
                    state.errors = action.error.message;
               });
     },
});

export const selectCategoryStatus = (state) => state.CategoriesSlice.status;
export const selectCategories = (state) => state.CategoriesSlice.categories;
export const selectCategoryErrors = (state) => state.CategoriesSlice.errors;

export default categorySlice.reducer;
