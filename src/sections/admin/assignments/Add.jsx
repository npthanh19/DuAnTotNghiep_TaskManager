import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createAssignment } from '../../../services/assignmentService';
import { getAllUsers } from '../../../services/usersService';
import { getAllTasks } from '../../../services/tasksService';
import { getAllDepartments } from '../../../services/deparmentsService';

export const Add = () => {
     const { t } = useTranslation();
     const navigate = useNavigate();
     const {
          register,
          handleSubmit,
          formState: { errors },
          reset,
     } = useForm();

     const [users, setUsers] = useState([]);
     const [tasks, setTasks] = useState([]);
     const [departments, setDepartments] = useState([]);
     const [selectedDepartmentId, setSelectedDepartmentId] = useState(null);
     const [status, setStatus] = useState(1);

     useEffect(() => {
          const fetchData = async () => {
               try {
                    const [tasksData, usersData, departmentsData] = await Promise.all([getAllTasks(), getAllUsers(), getAllDepartments()]);
                    setTasks(tasksData);
                    setUsers(usersData);
                    setDepartments(departmentsData);
               } catch (error) {
                    console.error('Failed to fetch data:', error);
               }
          };

          fetchData();
     }, []);

     const onSubmit = async (data) => {
          const assignmentData = {
               task_id: data.taskId,
               user_ids: [data.userId],
               department_id: selectedDepartmentId,
               status: status,
          };

          try {
               await createAssignment(assignmentData);
               toast.success(t('Assignment added successfully!'));
               reset();
               setTimeout(() => {
                    navigate('/taskmaneger/assignments');
               }, 1000);
          } catch (error) {
               toast.error(t('Failed to add assignment.'));
               console.error('Error adding assignment:', error);
          }
     };

     return (
          <div className="card my-4">
               <div className="card-header d-flex justify-content-between align-items-center">
                    <h3 className="fw-bold py-3 mb-4 highlighted-text">
                         <span className="marquee">{t('Add new assignment')}</span>
                    </h3>
               </div>
               <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                         <div className="row mb-3">
                              <div className="mb-3">
                                   <label htmlFor="taskId" className="form-label">
                                        {t('Task')}
                                   </label>
                                   <select
                                        id="taskId"
                                        className={`form-select form-select-sm ${errors.taskId ? 'is-invalid' : ''}`}
                                        {...register('taskId', { required: t('Task is required') })}>
                                        <option value="">{t('Select Task')}</option>
                                        {tasks.map((task) => (
                                             <option key={task.id} value={task.id}>
                                                  {task.task_name}
                                             </option>
                                        ))}
                                   </select>
                                   {errors.taskId && <div className="invalid-feedback">{errors.taskId.message}</div>}
                              </div>

                              <div className="mb-3">
                                   <label htmlFor="userId" className="form-label">
                                        {t('User')}
                                   </label>
                                   <select
                                        id="userId"
                                        className={`form-select form-select-sm ${errors.userId ? 'is-invalid' : ''}`}
                                        {...register('userId', { required: t('User is required') })}>
                                        <option value="">{t('Select User')}</option>
                                        {users.map((user) => (
                                             <option key={user.id} value={user.id}>
                                                  {user.name}
                                             </option>
                                        ))}
                                   </select>
                                   {errors.userId && <div className="invalid-feedback">{errors.userId.message}</div>}
                              </div>
                         </div>
                         <div className="row mb-3">
                              {/* Thêm chọn phòng ban */}
                              <div className="mb-3">
                                   <label htmlFor="departmentId" className="form-label">
                                        {t('Department')}
                                   </label>
                                   <select
                                        id="departmentId"
                                        className={`form-select form-select-sm ${errors.departmentId ? 'is-invalid' : ''}`}
                                        onChange={(e) => setSelectedDepartmentId(e.target.value)}>
                                        <option value="">{t('Select Department')}</option>
                                        {departments.map((department) => (
                                             <option key={department.id} value={department.id}>
                                                  {department.department_name}
                                             </option>
                                        ))}
                                   </select>
                                   {errors.departmentId && <div className="invalid-feedback">{errors.departmentId.message}</div>}
                              </div>

                              {/* Thêm chọn trạng thái */}
                              <div className="mb-3">
                                   <label htmlFor="status" className="form-label">
                                        {t('Status')}
                                   </label>
                                   <select
                                        id="status"
                                        className={`form-select form-select-sm ${errors.status ? 'is-invalid' : ''}`}
                                        {...register('status', { required: t('Status is required') })}
                                        onChange={(e) => setStatus(e.target.value)}>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                   </select>
                                   {errors.status && <div className="invalid-feedback">{errors.status.message}</div>}
                              </div>
                         </div>

                         <button type="submit" className="btn btn-success">
                              <i className="bi bi-check-circle me-2"></i> {t('Add Assignment')}
                         </button>
                    </form>
               </div>
               <ToastContainer position="top-right" autoClose={2000} />
          </div>
     );
};
