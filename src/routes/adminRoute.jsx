import React from 'react';
import { Route, Routes } from 'react-router-dom';

// Admin Components
import Dashboard from '../pages/admin/Dashboard';
import Login from '../components/admin/Login';
import AdminLayout from '../layouts/Adminlayout';
import Update_profile from '../components/admin/Update_profile';
// Admin Categories
import ViewCategories from '../pages/admin/Categories/List';
import AddCategory from '../pages/admin/Categories/Add';
import EditCategory from '../pages/admin/Categories/Edit';

// Admin DragDrop

// Admin Users
import ViewUser from '../pages/admin/Users/List';
import AddUsers from '../pages/admin/Users/Add';
import EditUsers from '../pages/admin/Users/Edit';
// Admin Roles
import ViewRoles from '../pages/admin/Roles/List';
import AddRoles from '../pages/admin/Roles/Add';
import EditRoles from '../pages/admin/Roles/Edit';
// admin activity_log
import ViewActivity_log from '../pages/admin/Activity_log/List'
// Admin Drag & Drop
import ViewBoard from '../pages/admin/Board/Board';
//Admin Projects
import ViewProjects from '../pages/admin/Projects/List';
import AddProjects from '../pages/admin/Projects/Add';
import EditProjects from '../pages/admin/Projects/Edit';
//Admin Tasks
import ViewTasks from '../pages/admin/Tasks/List';
import AddTasks from '../pages/admin/Tasks/Add';
import EditTasks from '../pages/admin/Tasks/Edit';
// Admin Assignments
import ViewAssignments from '../pages/admin/Assignments/List'; 
import EditAssignments from '../pages/admin/Assignments/Edit';
import AddAssignments from '../pages/admin/Assignments/Add';
// recentlydelete
import ViewRecentlydelete from '../pages/admin/Recentlydelete/List'
// Admin Routes
export const AdminRoutes = () => (
    <Routes>
        <Route path="/" element={<AdminLayout><Dashboard /></AdminLayout>} />
        <Route path="login" element={<Login />} />
        <Route path="update_profile" element={<Update_profile />} />
        
        {/* Categories */}
        <Route path="categories" element={<AdminLayout><ViewCategories /></AdminLayout>} />
        <Route path="categories/add" element={<AdminLayout><AddCategory /></AdminLayout>} />
        <Route path="categories/edit/:id" element={<AdminLayout><EditCategory /></AdminLayout>} />

        {/* Users */}
        <Route path="users" element={<AdminLayout><ViewUser /></AdminLayout>} />
        <Route path="users/add" element={<AdminLayout><AddUsers /></AdminLayout>} />
        <Route path="users/edit/:id" element={<AdminLayout><EditUsers /></AdminLayout>} />

        {/* Task */}
        <Route path="tasks" element={<AdminLayout><ViewTasks /></AdminLayout>} />
        <Route path="tasks/add" element={<AdminLayout><AddTasks /></AdminLayout>} />
        <Route path="tasks/edit/:id" element={<AdminLayout><EditTasks /></AdminLayout>} /> 

        {/* Projects */}
        <Route path="projects" element={<AdminLayout><ViewProjects /></AdminLayout>} />
        <Route path="projects/add" element={<AdminLayout><AddProjects /></AdminLayout>} />
        <Route path="projects/edit/:id" element={<AdminLayout><EditProjects /></AdminLayout>} /> 

        {/* Roles */}
        <Route path="roles" element={<AdminLayout><ViewRoles /></AdminLayout>} />
        <Route path="roles/add" element={<AdminLayout><AddRoles /></AdminLayout>} />
        <Route path="roles/edit/:id" element={<AdminLayout><EditRoles /></AdminLayout>} /> 

        {/* recentlydelete */}
        <Route path="recentlydelete" element={<AdminLayout><ViewRecentlydelete /></AdminLayout>} />
        
        {/* Activity_log */}
        <Route path="log" element={<AdminLayout><ViewActivity_log /></AdminLayout>} />

        {/* Board */}
        <Route path="board" element={<AdminLayout><ViewBoard /></AdminLayout>} />
        {/* Assignments Details */}
        <Route path="assignments/details/:id" element={<AdminLayout><ViewAssignments /></AdminLayout>} />
        <Route path="assignments/edit/:id" element={<AdminLayout><EditAssignments /></AdminLayout>} />
        <Route path="assignments/add" element={<AdminLayout><AddAssignments /></AdminLayout>} />
    </Routes>
);


