import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

// Admin Components
import Dashboard from '../pages/admin/Dashboard';
import Login from '../components/admin/Login';
import Register from '../components/admin/Register';
import AdminLayout from '../layouts/Adminlayout';
import UpdateProfile from '../components/admin/Update_profile';

// Admin Users
import ViewUser from '../pages/admin/Users/List';
import AddUsers from '../pages/admin/Users/Add';
import EditUsers from '../pages/admin/Users/Edit';

// Admin Roles
import ViewRoles from '../pages/admin/Roles/List';
import AddRoles from '../pages/admin/Roles/Add';
import EditRoles from '../pages/admin/Roles/Edit';

// Admin Activity Log
import ViewActivityLog from '../pages/admin/Activity_log/List';

// Admin Drag & Drop Board
import ViewBoard from '../pages/admin/Board/Board';
import ViewBoardList from '../pages/admin/Board_list/List';

// Admin Projects
import ViewProjects from '../pages/admin/Projects/List';
import AddProjects from '../pages/admin/Projects/Add';
import EditProjects from '../pages/admin/Projects/Edit';

// Admin Tasks
import ViewTasks from '../pages/admin/Tasks/List';
import AddTasks from '../pages/admin/Tasks/Add';
import EditTasks from '../pages/admin/Tasks/Edit';

// Admin Assignments
import ViewAssignments from '../pages/admin/Assignments/List';
import AddAssignments from '../pages/admin/Assignments/Add';
import EditAssignments from '../pages/admin/Assignments/Edit';

// Recently Deleted
import ViewRecentlyDeleted from '../pages/admin/Recentlydelete/List';

// Admin Departments
import ViewDepartments from '../pages/admin/Departments/List';
import AddDepartments from '../pages/admin/Departments/Add';
import EditDepartments from '../pages/admin/Departments/Edit';

// Admin Worktime
import ViewWorktime from '../pages/admin/Worktime/List';
import AddWorktime from '../pages/admin/Worktime/Add';
export const AdminRoutes = () => (
     <Routes>
          {/* Public route */}
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />

          {/* Protected Routes */}
          <Route
               path="/"
               element={
                    <PrivateRoute>
                         <AdminLayout>
                              <Dashboard />
                         </AdminLayout>
                    </PrivateRoute>
               }
          />

          {/* Profile */}
          <Route
               path="update_profile"
               element={
                    <PrivateRoute>
                         <UpdateProfile />
                    </PrivateRoute>
               }
          />

          {/* Users */}
          <Route
               path="users"
               element={
                    <PrivateRoute>
                         <AdminLayout>
                              <ViewUser />
                         </AdminLayout>
                    </PrivateRoute>
               }
          />
          <Route
               path="users/add"
               element={
                    <PrivateRoute>
                         <AdminLayout>
                              <AddUsers />
                         </AdminLayout>
                    </PrivateRoute>
               }
          />
          <Route
               path="users/edit/:id"
               element={
                    <PrivateRoute>
                         <AdminLayout>
                              <EditUsers />
                         </AdminLayout>
                    </PrivateRoute>
               }
          />

          {/* Roles */}
          <Route
               path="roles"
               element={
                    <PrivateRoute>
                         <AdminLayout>
                              <ViewRoles />
                         </AdminLayout>
                    </PrivateRoute>
               }
          />
          <Route
               path="roles/add"
               element={
                    <PrivateRoute>
                         <AdminLayout>
                              <AddRoles />
                         </AdminLayout>
                    </PrivateRoute>
               }
          />
          <Route
               path="roles/edit/:id"
               element={
                    <PrivateRoute>
                         <AdminLayout>
                              <EditRoles />
                         </AdminLayout>
                    </PrivateRoute>
               }
          />

          {/* Tasks */}
          <Route
               path="tasks"
               element={
                    <PrivateRoute>
                         <AdminLayout>
                              <ViewTasks />
                         </AdminLayout>
                    </PrivateRoute>
               }
          />
          <Route
               path="tasks/add"
               element={
                    <PrivateRoute>
                         <AdminLayout>
                              <AddTasks />
                         </AdminLayout>
                    </PrivateRoute>
               }
          />
          <Route
               path="tasks/edit/:id"
               element={
                    <PrivateRoute>
                         <AdminLayout>
                              <EditTasks />
                         </AdminLayout>
                    </PrivateRoute>
               }
          />

          {/* Projects */}
          <Route
               path="projects"
               element={
                    <PrivateRoute>
                         <AdminLayout>
                              <ViewProjects />
                         </AdminLayout>
                    </PrivateRoute>
               }
          />
          <Route
               path="projects/add"
               element={
                    <PrivateRoute>
                         <AdminLayout>
                              <AddProjects />
                         </AdminLayout>
                    </PrivateRoute>
               }
          />
          <Route
               path="projects/edit/:id"
               element={
                    <PrivateRoute>
                         <AdminLayout>
                              <EditProjects />
                         </AdminLayout>
                    </PrivateRoute>
               }
          />

          {/* Recently Deleted */}
          <Route
               path="recentlydelete"
               element={
                    <PrivateRoute>
                         <AdminLayout>
                              <ViewRecentlyDeleted />
                         </AdminLayout>
                    </PrivateRoute>
               }
          />

          {/* Activity Log */}
          <Route
               path="log"
               element={
                    <PrivateRoute>
                         <AdminLayout>
                              <ViewActivityLog />
                         </AdminLayout>
                    </PrivateRoute>
               }
          />

          {/* Drag & Drop Board */}
          <Route
               path="board"
               element={
                    <PrivateRoute>
                         <AdminLayout>
                              <ViewBoard />
                         </AdminLayout>
                    </PrivateRoute>
               }
          />
          <Route
               path="board_list"
               element={
                    <PrivateRoute>
                         <AdminLayout>
                              <ViewBoardList />
                         </AdminLayout>
                    </PrivateRoute>
               }
          />

          {/* Assignments */}
          <Route
               path="/assignments"
               element={
                    <PrivateRoute>
                         <AdminLayout>
                              <ViewAssignments />
                         </AdminLayout>
                    </PrivateRoute>
               }
          />
          <Route
               path="assignments/edit/:id"
               element={
                    <PrivateRoute>
                         <AdminLayout>
                              <EditAssignments />
                         </AdminLayout>
                    </PrivateRoute>
               }
          />
          <Route
               path="assignments/add"
               element={
                    <PrivateRoute>
                         <AdminLayout>
                              <AddAssignments />
                         </AdminLayout>
                    </PrivateRoute>
               }
          />

          {/* Departments */}
          <Route
               path="departments"
               element={
                    <PrivateRoute>
                         <AdminLayout>
                              <ViewDepartments />
                         </AdminLayout>
                    </PrivateRoute>
               }
          />
          <Route
               path="departments/add"
               element={
                    <PrivateRoute>
                         <AdminLayout>
                              <AddDepartments />
                         </AdminLayout>
                    </PrivateRoute>
               }
          />
          <Route
               path="departments/edit/:id"
               element={
                    <PrivateRoute>
                         <AdminLayout>
                              <EditDepartments />
                         </AdminLayout>
                    </PrivateRoute>
               }
          />
          {/* Worktime */}
          <Route
               path="worktimes"
               element={
                    <PrivateRoute>
                         <AdminLayout>
                             <ViewWorktime/>
                         </AdminLayout>
                    </PrivateRoute>
               }
          />
            <Route
               path="worktimes/add"
               element={
                    <PrivateRoute>
                         <AdminLayout>
                            <AddWorktime/>
                         </AdminLayout>
                    </PrivateRoute>
               }
          />
     </Routes>
);
