import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosi } from '../../config/axios';

const initialState = {
     users: [],
     status: 'idle',
     errors: null,
};

// Async Thunks
export const fetchAllUsersAsync = createAsyncThunk('users/fetchAllUsersAsync', async () => {
     const response = await axiosi.get('/users');
     return response.data;
});

export const addUserAsyncThunk = createAsyncThunk('users/addUserAsync', async (user) => {
     const response = await axiosi.post('/users', user);
     return response.data;
});

export const updateUserAsyncThunk = createAsyncThunk('users/updateUserAsync', async (user) => {
     const response = await axiosi.patch(`/users/${user._id}`, user); // Ensure this uses `_id` correctly
     return response.data;
});

export const deleteUserAsync = createAsyncThunk('users/deleteUserAsync', async (userId) => {
     await axiosi.delete(`/users/${userId}`);
     return userId; // Return the userId to filter from the state
});

// Users Slice
const usersSlice = createSlice({
     name: 'users', // Singular for clarity and consistency
     initialState,
     reducers: {},
     extraReducers: (builder) => {
          builder
               .addCase(fetchAllUsersAsync.pending, (state) => {
                    state.status = 'loading';
                    state.errors = null; // Reset errors on new fetch
               })
               .addCase(fetchAllUsersAsync.fulfilled, (state, action) => {
                    state.status = 'succeeded';
                    state.users = action.payload;
               })
               .addCase(fetchAllUsersAsync.rejected, (state, action) => {
                    state.status = 'failed';
                    state.errors = action.error.message;
               })
               .addCase(addUserAsyncThunk.pending, (state) => {
                    state.status = 'loading';
                    state.errors = null; // Reset errors on new action
               })
               .addCase(addUserAsyncThunk.fulfilled, (state, action) => {
                    state.status = 'succeeded';
                    state.users.push(action.payload);
               })
               .addCase(addUserAsyncThunk.rejected, (state, action) => {
                    state.status = 'failed';
                    state.errors = action.error.message;
               })
               .addCase(updateUserAsyncThunk.pending, (state) => {
                    state.status = 'loading';
                    state.errors = null; // Reset errors on new action
               })
               .addCase(updateUserAsyncThunk.fulfilled, (state, action) => {
                    state.status = 'succeeded';
                    const index = state.users.findIndex((user) => user._id === action.payload._id);
                    if (index !== -1) {
                         state.users[index] = action.payload;
                    }
               })
               .addCase(updateUserAsyncThunk.rejected, (state, action) => {
                    state.status = 'failed';
                    state.errors = action.error.message;
               })
               .addCase(deleteUserAsync.pending, (state) => {
                    state.status = 'loading';
                    state.errors = null; // Reset errors on new action
               })
               .addCase(deleteUserAsync.fulfilled, (state, action) => {
                    state.status = 'succeeded';
                    state.users = state.users.filter((user) => user._id !== action.payload); // Filter out the deleted user
               })
               .addCase(deleteUserAsync.rejected, (state, action) => {
                    state.status = 'failed';
                    state.errors = action.error.message;
               });
     },
});

// Selectors
export const selectUserStatus = (state) => state.UsersSlice.status;
export const selectUsers = (state) => state.UsersSlice.users || [];
export const selectUserErrors = (state) => state.UsersSlice.errors;

export default usersSlice.reducer;
