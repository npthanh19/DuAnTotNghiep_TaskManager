import React from 'react';
import { Route, Routes } from 'react-router-dom';

// Admin Components
import Dashboard from '../pages/admin/Dashboard';
import Login from '../components/admin/Login';
import AdminLayout from '../layouts/Adminlayout';
import Update_profile from '../components/admin/Update_profile';
// Admnin categories
import ViewCategories from '../pages/admin/Categories/List';
import AddCategory from '../pages/admin/Categories/Add';
import EditCategory from '../pages/admin/Categories/Edit';

export const AdminRoutes = () => (
    <Routes>
        <Route path="/" element={<AdminLayout><Dashboard /></AdminLayout>} />
        <Route path="login" element={<Login />} />
        <Route path="update_profile" element={<Update_profile />} />
        {/* Categories */}
        <Route path="categories" element={<AdminLayout><ViewCategories /></AdminLayout>} />
        <Route path="categories/add" element={<AdminLayout><AddCategory /></AdminLayout>} />
        <Route path="categories/edit/:id" element={<AdminLayout><EditCategory /></AdminLayout>} />
    </Routes>
);
