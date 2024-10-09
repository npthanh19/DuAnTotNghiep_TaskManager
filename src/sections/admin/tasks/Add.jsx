import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createTask } from '../../../services/tasksService';
import { getAllProjects } from '../../../services/projectsService';
import { getAllDepartments } from '../../../services/deparmentsService';

export const Add = () => {
     const { t } = useTranslation();
     const navigate = useNavigate();
     const [projects, setProjects] = useState([]);
     const [departments, setDepartments] = useState([]);
     const {
          register,
          handleSubmit,
          formState: { errors },
          reset,
     } = useForm();

     useEffect(() => {
          const fetchProjects = async () => {
               try {
                    const projectData = await getAllProjects();
                    setProjects(projectData);
               } catch (error) {
                    toast.error(t('Failed to load projects.'));
               }
          };

          fetchProjects();
     }, []);

     useEffect(() => {
          const fetchDepartments = async () => {
               try {
                    const departmentData = await getAllDepartments();
                    setDepartments(departmentData);
               } catch (error) {
                    toast.error(t('Failed to load departments.'));
               }
          };

          fetchDepartments();
     }, []);

     const onSubmit = async (data) => {
          try {
               const validStatuses = ['0', '1', '2'];

               if (!validStatuses.includes(data.status)) {
                    throw new Error(t('The selected status is invalid.'));
               }

               const payload = {
                    task_name: data.task_name,
                    description: data.description,
                    status: Number(data.status),
                    project_id: data.project_id,
                    department_id: data.department_id,
                    start_date: data.start_date,
                    end_date: data.end_date,
               };

               console.log('Payload to be sent:', payload);
               await createTask(payload);
               toast.success(t('Task added successfully!'));
               reset();
               setTimeout(() => {
                    navigate('/taskmaneger/tasks');
               }, 1000);
          } catch (error) {
               toast.error(t('Failed to add task.'));
               console.error('Error details:', error.response ? error.response.data : error);
          }
     };

     return (
          <div className="card my-4">
               <div className="card-header d-flex justify-content-between align-items-center">
                    <h3 className="fw-bold py-3 mb-4 highlighted-text">
                         <span className="marquee">{t('Add new task')}</span>
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
                                        {...register('task_name', { required: t('Task name is required') })}
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
                                        {...register('status', { required: t('Status is required') })}>
                                        <option value="0">{t('Pending')}</option>
                                        <option value="1">{t('In Progress')}</option>
                                        <option value="2">{t('Completed')}</option>
                                   </select>

                                   {errors.status && <div className="invalid-feedback">{errors.status.message}</div>}
                              </div>
                         </div>

                         <div className="mb-3">
                              <label htmlFor="description" className="form-label">
                                   {t('Description')}
                              </label>
                              <textarea
                                   id="description"
                                   className={`form-control form-control-sm ${errors.description ? 'is-invalid' : ''}`}
                                   {...register('description', { required: t('Description is required') })}
                                   rows="3"></textarea>
                              {errors.description && <div className="invalid-feedback">{errors.description.message}</div>}
                         </div>
                         <div className="row mb-3">
                              <div className="col">
                                   <label htmlFor="project_id" className="form-label">
                                        {t('Project ID')}
                                   </label>
                                   <select
                                        id="project_id"
                                        className={`form-select form-select-sm ${errors.project_id ? 'is-invalid' : ''}`}
                                        {...register('project_id', { required: t('Project ID is required') })}>
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
                                        {t('Department ID')}
                                   </label>
                                   <select
                                        id="department_id"
                                        className={`form-select form-select-sm ${errors.department_id ? 'is-invalid' : ''}`}
                                        {...register('department_id', { required: t('Department ID is required') })}>
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
                                        {...register('start_date', { required: t('Start date is required') })}
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
                                        {...register('end_date', { required: t('End date is required') })}
                                   />
                                   {errors.end_date && <div className="invalid-feedback">{errors.end_date.message}</div>}
                              </div>
                         </div>

                         <button type="submit" className="btn btn-success">
                              <i className="bi bi-check-circle me-2"></i> {t('Add Task')}
                         </button>
                    </form>
               </div>
               <ToastContainer position="top-right" autoClose={2000} />
          </div>
     );
};
