import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { getAssignmentById, updateAssignment, getDepartmentsByTask, getUsersByDepartment } from '../../../services/assignmentService';
import { getAllTasks } from '../../../services/tasksService';
import { getAllProjects } from '../../../services/projectsService';

export const Edit = () => {
     const { id } = useParams();
     const { t } = useTranslation();
     const navigate = useNavigate();

     const [projects, setProjects] = useState([]);
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
                    const [assignment, projects, tasks] = await Promise.all([getAssignmentById(id), getAllProjects(), getAllTasks()]);
                    setProjects(projects);
                    setTasks(tasks);

                    reset({
                         projectId: assignment.project_id || '',
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
                    try {
                         const response = await getUsersByDepartment(selectedDepartment);
                         setUsers(response);
                         setValue('userId', '');
                    } catch (error) {
                         console.error('Failed to fetch users:', error);
                    }
               }
          };
          if (selectedDepartment) fetchUsers();
     }, [selectedDepartment, setValue]);

     const onSubmit = async (data) => {
          const assignmentData = {
               task_id: data.taskId,
               department_id: data.departmentId,
               user_ids: [data.userId],
               project_id: data.projectId,
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
                         {/* Project Selection */}
                         <div className="row mb-3">
                              <div className="col">
                                   <label className="form-label">{t('Project')}</label>
                                   <select
                                        {...register('projectId', { required: t('Project is required') })}
                                        className={`form-select form-select-sm ${errors.projectId ? 'is-invalid' : ''}`}>
                                        <option value="">{t('Select Project')}</option>
                                        {projects.map((project) => (
                                             <option key={project.id} value={project.id}>
                                                  {project.project_name}
                                             </option>
                                        ))}
                                   </select>
                                   {errors.projectId && <div className="invalid-feedback">{errors.projectId.message}</div>}
                              </div>
                         </div>

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
                                        {users && users.length > 0 ? (
                                             users
                                                  .filter((user) => user.confirmation_status === 'confirmed')
                                                  .map((user) => (
                                                       <option key={user.id} value={user.id}>
                                                            {user.fullname}
                                                       </option>
                                                  ))
                                        ) : (
                                             <option disabled>{t('No users found')}</option>
                                        )}
                                   </select>

                                   {errors.userId && <div className="invalid-feedback">{errors.userId.message}</div>}
                              </div>
                         </div>

                         {/* Status Selection */}
                         <div className="row mb-3">
                              <div className="col">
                                   <label className="form-label">{t('Status')}</label>
                                   <select
                                        {...register('status', { required: t('Status is required') })}
                                        className={`form-select form-select-sm ${errors.status ? 'is-invalid' : ''}`}>
                                        <option value="">{t('Select Status')}</option>
                                        <option value="1">{t('Pending')}</option>
                                        <option value="2">{t('In Progress')}</option>
                                        <option value="3">{t('Preview')}</option>
                                        <option value="4">{t('Done')}</option>
                                   </select>
                                   {errors.status && <div className="invalid-feedback">{errors.status.message}</div>}
                              </div>
                         </div>

                         {/* Note */}
                         <div className="row mb-3">
                              <div className="col">
                                   <label className="form-label">{t('Note')}</label>
                                   <textarea id="note" className="form-control" rows="4" {...register('note')} />
                              </div>
                         </div>

                         <button type="submit" className="btn btn-success">
                              <i className="bi bi-check-circle me-3"></i> {t('Confirm')}
                         </button>
                         <button type="button" className="btn btn-secondary ms-2" onClick={() => window.history.back()}>
                              <i className="bi bi-arrow-left me-2"></i> {t('Back')}
                         </button>
                    </form>
               </div>
          </div>
     );
};
