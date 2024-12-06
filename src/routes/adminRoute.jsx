import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

// Admin Components
import Dashboard from '../pages/admin/Dashboard';
import Login from '../components/admin/Login';
import Register from '../components/admin/Register';
import AdminLayout from '../layouts/Adminlayout';
import UpdateProfile from '../components/admin/Update_profile';
import ResetPassword from '../components/admin/ResetPassword';
import OtpReset from '../components/admin/otp';
import NewPasswordPage from '../components/admin/NewPasswordPage';
import ConfirmEmail from '../components/admin/ConfirmEmail';
import VerifyEmaill from '../components/admin/VerifyEmail';

// Admin Users
import ViewUser from '../pages/admin/Users/List';
import AddUsers from '../pages/admin/Users/Add';
import EditUsers from '../pages/admin/Users/Edit';
import RecentlyDeletedUsers from '../sections/admin/users/RecentlyDeletedUsers';

// Admin Roles
import ViewRoles from '../pages/admin/Roles/List';
import AddRoles from '../pages/admin/Roles/Add';
import EditRoles from '../pages/admin/Roles/Edit';



// Admin Drag & Drop Board
import ViewBoard from '../pages/admin/Board/Board';
import ViewBoardList from '../pages/admin/Board_list/List';

// Admin Projects
import ViewProjects from '../pages/admin/Projects/List';
import AddProjects from '../pages/admin/Projects/Add';
import EditProjects from '../pages/admin/Projects/Edit';
import RecentlyDeletedProjects from '../sections/admin/projects/RecentlyDeletedProjects';

// Admin Tasks
import ViewTasks from '../pages/admin/Tasks/List';
import AddTasks from '../pages/admin/Tasks/Add';
import EditTasks from '../pages/admin/Tasks/Edit';
import RecentlyDeletedTasks from '../sections/admin/tasks/RecentlyDeletedTasks';

// Admin Assignments
import ViewAssignments from '../pages/admin/Assignments/List';
import AddAssignments from '../pages/admin/Assignments/Add';
import EditAssignments from '../pages/admin/Assignments/Edit';
import RecentlyDeletedAssignment from '../sections/admin/assignments/RecentlyDeletedAssignment';
// Recently Deleted
import ViewRecentlyDeleted from '../pages/admin/Recentlydelete/List';

// Admin Departments
import ViewDepartments from '../pages/admin/Departments/List';
import AddDepartments from '../pages/admin/Departments/Add';
import EditDepartments from '../pages/admin/Departments/Edit';
import RecentlyDeletedDepartments from '../sections/admin/departments/RecentlyDeletedDepartment';
import ConfirmDepartment from '../sections/admin/departments/ConfirmDepartment';
// Admin Worktime
import ViewWorktime from '../pages/admin/Worktime/List';
import AddWorktime from '../pages/admin/Worktime/Add';
import RecentlyDeleteWorkTime from '../sections/admin/worktime/RecentlyDeleteWorkTime'

// Admin Permissions
import ViewPer from '../pages/admin/Permission/List';
import TrashPer from '../sections/admin/permissions/RecentlyDeletePermissions'

export const AdminRoutes = () => (
     <Routes>
          {/* Public Routes */}
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route path="otp" element={<OtpReset />} />
          <Route path="/new-password" element={<NewPasswordPage />} />
          <Route path="/confirm-email" element={<ConfirmEmail />} />
          <Route path="/verify-email/:userId/:hash" element={<VerifyEmaill />} />


          {/* Dashboard */}
          <Route path="/" element={<PrivateRoute><AdminLayout><Dashboard /></AdminLayout></PrivateRoute>} />

          {/* Profile */}
          <Route path="update_profile" element={<PrivateRoute><UpdateProfile /></PrivateRoute>} />

          {/* User Management */}
          <Route path="users" element={<PrivateRoute><AdminLayout><ViewUser /></AdminLayout></PrivateRoute>} />
          <Route path="users/add" element={<PrivateRoute><AdminLayout><AddUsers /></AdminLayout></PrivateRoute>} />
          <Route path="users/edit/:id" element={<PrivateRoute><AdminLayout><EditUsers /></AdminLayout></PrivateRoute>} />
          <Route path="users/trashed" element={<PrivateRoute><AdminLayout><RecentlyDeletedUsers /></AdminLayout></PrivateRoute>} />

          {/* Role Management */}
          <Route path="roles" element={<PrivateRoute><AdminLayout><ViewRoles /></AdminLayout></PrivateRoute>} />
          <Route path="roles/add" element={<PrivateRoute><AdminLayout><AddRoles /></AdminLayout></PrivateRoute>} />
          <Route path="roles/edit/:id" element={<PrivateRoute><AdminLayout><EditRoles /></AdminLayout></PrivateRoute>} />

          {/* Task Management */}
          <Route path="tasks" element={<PrivateRoute><AdminLayout><ViewTasks /></AdminLayout></PrivateRoute>} />
          <Route path="tasks/add" element={<PrivateRoute><AdminLayout><AddTasks /></AdminLayout></PrivateRoute>} />
          <Route path="tasks/edit/:id" element={<PrivateRoute><AdminLayout><EditTasks /></AdminLayout></PrivateRoute>} />
          <Route path="tasks/trashed" element={<PrivateRoute><AdminLayout><RecentlyDeletedTasks /></AdminLayout></PrivateRoute>} />

          {/* Project Management */}
          <Route path="projects" element={<PrivateRoute><AdminLayout><ViewProjects /></AdminLayout></PrivateRoute>} />
          <Route path="projects/add" element={<PrivateRoute><AdminLayout><AddProjects /></AdminLayout></PrivateRoute>} />
          <Route path="projects/edit/:id" element={<PrivateRoute><AdminLayout><EditProjects /></AdminLayout></PrivateRoute>} />
          <Route path="/projects/trashed" element={<PrivateRoute><AdminLayout><RecentlyDeletedProjects /></AdminLayout></PrivateRoute>} />

          {/* Recently Deleted */}
          <Route path="recentlydelete" element={<PrivateRoute><AdminLayout><ViewRecentlyDeleted /></AdminLayout></PrivateRoute>} />

          {/* Drag & Drop Board */}
          <Route path="board" element={<PrivateRoute><AdminLayout><ViewBoard /></AdminLayout></PrivateRoute>} />
          <Route path="board_list" element={<PrivateRoute><AdminLayout><ViewBoardList /></AdminLayout></PrivateRoute>} />

          {/* Assignment Management */}
          <Route path="assignments" element={<PrivateRoute><AdminLayout><ViewAssignments /></AdminLayout></PrivateRoute>} />
          <Route path="assignments/add" element={<PrivateRoute><AdminLayout><AddAssignments /></AdminLayout></PrivateRoute>} />
          <Route path="assignments/edit/:id" element={<PrivateRoute><AdminLayout><EditAssignments /></AdminLayout></PrivateRoute>} />
          <Route path="/assignments/trashed" element={<PrivateRoute><AdminLayout><RecentlyDeletedAssignment /></AdminLayout></PrivateRoute>} />
          
          {/* Department Management */}
          <Route path="departments" element={<PrivateRoute><AdminLayout><ViewDepartments /></AdminLayout></PrivateRoute>} />
          <Route path="departments/add" element={<PrivateRoute><AdminLayout><AddDepartments /></AdminLayout></PrivateRoute>} />
          <Route path="departments/edit/:id" element={<PrivateRoute><AdminLayout><EditDepartments /></AdminLayout></PrivateRoute>} />
          <Route path="/departments/trashed" element={<PrivateRoute><AdminLayout><RecentlyDeletedDepartments /></AdminLayout></PrivateRoute>} />
          <Route path="/departments/confirm/:departmentId/:token" element={<PrivateRoute><AdminLayout><ConfirmDepartment  /></AdminLayout></PrivateRoute>} />

          {/* Worktime Management */}
          <Route path="worktimes" element={<PrivateRoute><AdminLayout><ViewWorktime /></AdminLayout></PrivateRoute>} />
          <Route path="worktimes/add" element={<PrivateRoute><AdminLayout><AddWorktime /></AdminLayout></PrivateRoute>} />
          <Route path="worktimes/trashed" element={<PrivateRoute><AdminLayout><RecentlyDeleteWorkTime /></AdminLayout></PrivateRoute>} />

          {/* Permission Management */}
          {/* <Route path="permissions" element={<PrivateRoute><AdminLayout><ViewPer /></AdminLayout></PrivateRoute>} />
          <Route path="permissions/trash" element={<PrivateRoute><AdminLayout><TrashPer /></AdminLayout></PrivateRoute>} /> */}
     </Routes>
);
