import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import { getTaskById, updateTask as updateTaskService } from '../../../services/tasksService';
import { getAllProjects } from '../../../services/projectsService';
import { getDepartmentsByProjectId } from '../../../services/tasksService';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';


export const Edit = () => {
     const { id } = useParams();
     const { t } = useTranslation();
     const [task, setTask] = useState(null);
     const [projects, setProjects] = useState([]);
     const [departments, setDepartments] = useState([]);
     const {
          register,
          handleSubmit,
          formState: { errors },
          setValue,
          reset,
     } = useForm();
     const navigate = useNavigate();

     useEffect(() => {
          const fetchData = async () => {
               try {
                    const [fetchedTask, fetchedProjects] = await Promise.all([getTaskById(id), getAllProjects()]);
                    setTask(fetchedTask);
                    setProjects(fetchedProjects);

                    const departmentData = await getDepartmentsByProjectId(fetchedTask.project_id);
                    setDepartments(departmentData.departments || []);

                    reset(fetchedTask);
               } catch (err) {
                    console.error('Failed to fetch data:', err);
                    Swal.fire({
                         icon: 'error',
                         text: t('Failed to fetch task, projects, or departments.'),
                         position: 'top-right',
                         toast: true,
                         timer: 3000,
                         showConfirmButton: false,
                    });
               }
          };
          fetchData();
     }, [id, reset, t]);

     const handleProjectChange = async (projectId) => {
          if (!projectId) {
               setDepartments([]);
               return;
          }
          try {
               const departmentData = await getDepartmentsByProjectId(projectId);
               setDepartments(departmentData.departments || []);
          } catch (error) {
               Swal.fire({
                    icon: 'error',
                    text: t('Failed to load departments.'),
                    position: 'top-right',   
                    toast: true,
                    timer: 3000,
                    showConfirmButton: false,
               });
          }
     };

     const onSubmit = async (data) => {
          try {
               await updateTaskService(id, data);
               Swal.fire({
                    icon: 'success',
                    text: t('Edit successfully!'),
                    position: 'top-right',
                    toast: true,
                    timer: 2000,
                    showConfirmButton: false,
               });
               reset();
               setTimeout(() => {
                    navigate('/taskmaneger/tasks');
               }, 1000);
          } catch (error) {
               console.error('Error updating task:', error);
               Swal.fire({
                    icon: 'error',
                    title: t('Edit Failed!'),
                    text: t('Something went wrong'),
               });
          }
     };

     if (!task)
          return (
               <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                    <div className="spinner-border" role="status">
                         <span className="visually-hidden">{t('Loading...')}</span>
                    </div>
               </div>
          );

     return (
          <div className="card my-4">
               <div className="card-header d-flex justify-content-between align-items-center">
                    <h3 className="fw-bold py-3 mb-4 highlighted-text">
                         <span className="marquee">{t('Update Task')}</span>
                    </h3>
               </div>
               <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                         <div className="row mb-3">
                              <div className="col">
                                   <label htmlFor="task_name" className="form-label">
                                        {t('Task Name')}
                                   </label>
                                   <input
                                        type="text"
                                        id="task_name"
                                        className={`form-control form-control-sm ${errors.task_name ? 'is-invalid' : ''}`}
                                        {...register('task_name', { required: t('Task name is required!') })}
                                   />
                                   {errors.task_name && <div className="invalid-feedback">{errors.task_name.message}</div>}
                              </div>
                              <div className="col">
                                   <label htmlFor="status" className="form-label">
                                        {t('Status')}
                                   </label>
                                   <select
                                        id="status"
                                        className={`form-select form-select-sm ${errors.status ? 'is-invalid' : ''}`}
                                        {...register('status', { required: t('Status is required!') })}>
                                        <option value="1">{t('To Do')}</option>
                                        <option value="2">{t('In Progress')}</option>
                                        <option value="3">{t('Preview')}</option>
                                        <option value="4">{t('Done')}</option>
                                   </select>
                                   {errors.status && <div className="invalid-feedback">{errors.status.message}</div>}
                              </div>
                         </div>
                         <div className="col">
                                   <label htmlFor="task_time" className="form-label">
                                        {t('Task Time')}
                                   </label>
                                   <input
                                        type="text"
                                        id="task_time"
                                        className={`form-control form-control-sm ${errors.task_time ? 'is-invalid' : ''}`}
                                        {...register('task_time')}
                                   />
                                   {errors.task_time && <div className="invalid-feedback">{errors.task_time.message}</div>}
                              </div>

                         <div className="mb-3">
                              <label htmlFor="description" className="form-label">
                                   {t('Description')}
                              </label>
                              <textarea
                                   id="description"
                                   className={`form-control form-control-sm ${errors.description ? 'is-invalid' : ''}`}
                                   {...register('description', { required: t('Description cannot be empty!') })}
                                   rows="3"></textarea>
                              {errors.description && <div className="invalid-feedback">{errors.description.message}</div>}
                         </div>

                         <div className="row mb-3">
                              <div className="col">
                                   <label htmlFor="project_id" className="form-label">
                                        {t('Projects')}
                                   </label>
                                   <select
                                        id="project_id"
                                        className={`form-select form-select-sm ${errors.project_id ? 'is-invalid' : ''}`}
                                        {...register('project_id', { required: t('Project is required!') })}
                                        onChange={(e) => handleProjectChange(e.target.value)}>
                                        <option value="">{t('Select Project')}</option>
                                        {projects.map((project) => (
                                             <option key={project.id} value={project.id}>
                                                  {project.project_name}
                                             </option>
                                        ))}
                                   </select>
                                   {errors.project_id && <div className="invalid-feedback">{errors.project_id.message}</div>}
                              </div>

                              <div className="col">
                                   <label htmlFor="department_id" className="form-label">
                                        {t('Departments')}
                                   </label>
                                   <select
                                        id="department_id"
                                        className={`form-select form-select-sm ${errors.department_id ? 'is-invalid' : ''}`}
                                        {...register('department_id', { required: t('Department is required') })}>
                                        <option value="">{t('Select Department')}</option>
                                        {departments.map((department) => (
                                             <option key={department.id} value={department.id}>
                                                  {department.department_name}
                                             </option>
                                        ))}
                                   </select>
                                   {errors.department_id && <div className="invalid-feedback">{errors.department_id.message}</div>}
                              </div>
                         </div>

                         <div className="row mb-3">
                              <div className="col">
                                   <label htmlFor="start_date" className="form-label">
                                        {t('Start Date')}
                                   </label>
                                   <input
                                        type="date"
                                        id="start_date"
                                        className={`form-control form-control-sm ${errors.start_date ? 'is-invalid' : ''}`}
                                        {...register('start_date', {
                                             required: t('Start date is required!'),
                                             validate: {
                                                  isToday: (value) => {
                                                       const today = new Date().toISOString().split('T')[0];
                                                       if (value !== today) {
                                                            return t('Start date must be today');
                                                       }
                                                       return true;
                                                  },
                                             },
                                        })}
                                   />
                                   {errors.start_date && <div className="invalid-feedback">{errors.start_date.message}</div>}
                              </div>

                              <div className="col">
                                   <label htmlFor="end_date" className="form-label">
                                        {t('End Date')}
                                   </label>
                                   <input
                                        type="date"
                                        id="end_date"
                                        className={`form-control form-control-sm ${errors.end_date ? 'is-invalid' : ''}`}
                                        {...register('end_date', {
                                             required: t('End date is required!'),
                                             validate: {
                                                  isAfterToday: (value) => {
                                                       const today = new Date().toISOString().split('T')[0];
                                                       if (value < today) {
                                                            return t('End date cannot be earlier than start date');
                                                       }
                                                       return true;
                                                  },
                                             },
                                        })}
                                   />
                                   {errors.end_date && <div className="invalid-feedback">{errors.end_date.message}</div>}
                              </div>
                         </div>

                         <button type="submit" className="btn btn-success">
                              <i className="bi bi-check-circle me-2"></i> {t('Update Task')}
                         </button>
                    </form>
               </div>
               <ToastContainer position="top-right" autoClose={2000} />
          </div>
     );
};
