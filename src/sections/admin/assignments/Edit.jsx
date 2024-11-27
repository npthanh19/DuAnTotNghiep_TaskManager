import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { getAssignmentById, updateAssignment, getDepartmentsByTask, getUsersByDepartment } from '../../../services/assignmentService';
import { getAllTasks } from '../../../services/tasksService';

export const Edit = () => {
     const { id } = useParams();
     const { t } = useTranslation();
     const navigate = useNavigate();

     const [tasks, setTasks] = useState([]);
     const [departments, setDepartments] = useState([]);
     const [users, setUsers] = useState([]);

     const {
          register,
          handleSubmit,
          setValue,
          reset,
          watch,
          formState: { errors },
     } = useForm();
     const selectedTask = watch('taskId');
     const selectedDepartment = watch('departmentId');

     useEffect(() => {
          const initData = async () => {
               try {
                    const [assignment, tasks] = await Promise.all([getAssignmentById(id), getAllTasks()]);
                    setTasks(tasks);
                    reset({
                         taskId: assignment.task_id || '',
                         departmentId: assignment.department?.id || '',
                         userId: assignment.user?.id || '',
                         status: assignment.status || '1',
                         note: assignment.note || '',
                    });
                    if (assignment.task_id) {
                         const departments = await getDepartmentsByTask(assignment.task_id);
                         setDepartments(departments.departments || []);
                    }
                    if (assignment.department?.id) {
                         const users = await getUsersByDepartment(assignment.department.id);
                         setUsers(users.users || []);
                    }
               } catch (error) {
                    console.error('Failed to initialize data:', error);
               }
          };
          initData();
     }, [id, reset]);

     useEffect(() => {
          const fetchDepartments = async () => {
               if (selectedTask) {
                    const response = await getDepartmentsByTask(selectedTask);
                    setDepartments(response.departments || []);
                    setValue('departmentId', '');
                    setUsers([]);
               }
          };
          if (selectedTask) fetchDepartments();
     }, [selectedTask, setValue]);

     useEffect(() => {
          const fetchUsers = async () => {
               if (selectedDepartment) {
                    const response = await getUsersByDepartment(selectedDepartment);
                    setUsers(response.users || []);
                    setValue('userId', '');
               }
          };
          if (selectedDepartment) fetchUsers();
     }, [selectedDepartment, setValue]);

     const onSubmit = async (data) => {
          const assignmentData = {
               task_id: data.taskId,
               department_id: data.departmentId,
               user_ids: [data.userId],
               status: data.status,
               note: data.note,
          };

          try {
               await updateAssignment(id, assignmentData);
               Swal.fire({
                    icon: 'success',
                    text: t('Assignment updated successfully!'),
                    position: 'top-right',
                    toast: true,
                    timer: 2000,
                    showConfirmButton: false,
               }).then(() => navigate('/taskmaneger/assignments'));
          } catch (error) {
               Swal.fire({
                    icon: 'error',
                    text: t('Failed to update assignment.'),
                    position: 'top-right',
                    toast: true,
                    timer: 2000,
                    showConfirmButton: false,
               });
          }
     };

     return (
          <div className="card my-4">
               <div className="card-header d-flex justify-content-between align-items-center">
                    <h3 className="fw-bold py-3 mb-4 highlighted-text">
                         <span className="marquee">{t('Edit Assignment')}</span>
                    </h3>
               </div>
               <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                         {/* Task Selection */}
                         <div className="row mb-3">
                              <div className="col">
                                   <label className="form-label">{t('Tasks')}</label>
                                   <select
                                        {...register('taskId', { required: t('Task is required') })}
                                        className={`form-select form-select-sm ${errors.taskId ? 'is-invalid' : ''}`}>
                                        <option value="">{t('Select Task')}</option>
                                        {tasks.map((task) => (
                                             <option key={task.id} value={task.id}>
                                                  {task.task_name}
                                             </option>
                                        ))}
                                   </select>
                                   {errors.taskId && <div className="invalid-feedback">{errors.taskId.message}</div>}
                              </div>
                              {/* Department Selection */}
                              <div className="col">
                                   <label className="form-label">{t('Department')}</label>
                                   <select
                                        {...register('departmentId', { required: t('Department is required') })}
                                        className={`form-select form-select-sm ${errors.departmentId ? 'is-invalid' : ''}`}>
                                        <option value="">{t('Select Department')}</option>
                                        {departments.map((dept) => (
                                             <option key={dept.id} value={dept.id}>
                                                  {dept.department_name}
                                             </option>
                                        ))}
                                   </select>
                                   {errors.departmentId && <div className="invalid-feedback">{errors.departmentId.message}</div>}
                              </div>
                         </div>

                         {/* User Selection */}
                         <div className="row mb-3">
                              <div className="col">
                                   <label className="form-label">{t('User')}</label>
                                   <select
                                        {...register('userId', { required: t('User is required') })}
                                        className={`form-select form-select-sm ${errors.userId ? 'is-invalid' : ''}`}>
                                        <option value="">{t('Select User')}</option>
                                        {users.map((user) => (
                                             <option key={user.id} value={user.id}>
                                                  {user.fullname}
                                             </option>
                                        ))}
                                   </select>
                                   {errors.userId && <div className="invalid-feedback">{errors.userId.message}</div>}
                              </div>
                              {/* Status and Note */}
                              <div className="col">
                                   <label className="form-label">{t('Status')}</label>
                                   <select {...register('status')} className="form-select form-select-sm">
                                        <option value="1">{t('To Do')}</option>
                                        <option value="2">{t('In Progress')}</option>
                                        <option value="3">{t('Preview')}</option>
                                        <option value="4">{t('Done')}</option>
                                   </select>
                              </div>
                         </div>
                         <div className="col">
                              <label className="form-label">{t('Note')}</label>
                              <textarea {...register('note')} className="form-control" rows="3" />
                         </div>
                         <button type="submit" className="btn btn-success mt-3">
                              {t('Confirm')}
                         </button>
                    </form>
               </div>
          </div>
     );
};
