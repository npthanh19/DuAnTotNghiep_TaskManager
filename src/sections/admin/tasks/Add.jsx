import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { createTask } from '../../../services/tasksService';
import { getAllProjects } from '../../../services/projectsService';
import { getDepartmentsByProjectId } from '../../../services/tasksService';
import Swal from 'sweetalert2';

export const Add = () => {
     const { t } = useTranslation();
     const navigate = useNavigate();
     const [projects, setProjects] = useState([]);
     const [departments, setDepartments] = useState([]);
     const {
          register,
          handleSubmit,
          formState: { errors },
          getValues,
          reset,
     } = useForm();

     useEffect(() => {
          const fetchProjects = async () => {
               try {
                    const projectData = await getAllProjects();
                    setProjects(projectData);
               } catch (error) {
                    Swal.fire({
                         icon: 'error',
                         title: t('Failed to load projects.'),
                         text: t('Something went wrong'),
                    });
               }
          };

          fetchProjects();
     }, []);

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
                    title: t('Failed to load departments.'),
                    text: t('Something went wrong'),
               });
          }
     };

     const onSubmit = async (data) => {
          try {
               const validStatuses = ['1', '2', '3', '4'];

               if (!validStatuses.includes(data.status)) {
                    throw new Error(t('The selected status is invalid.'));
               }

               const payload = {
                    task_name: data.task_name,
                    description: data.description,
                    task_time: data.task_time ? parseFloat(data.task_time) : null,
                    status: Number(data.status),
                    project_id: data.project_id,
                    department_id: data.department_id,
                    start_date: data.start_date,
                    end_date: data.end_date,
               };

               await createTask(payload);
               Swal.fire({
                    icon: 'success',
                    text: t('Added successfully!'),
                    position: 'top-right',
                    toast: true,
                    timer: 2000,
                    showConfirmButton: false,
               });
               setTimeout(() => {
                    navigate('/taskmaneger/tasks');
               }, 1000);
          } catch (error) {
               console.error('Error details:', error.response ? error.response.data : error);
               Swal.fire({
                    icon: 'error',
                    title: t('Added Failed!'),
                    text: t('Something went wrong'),
               });
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
                                        {...register('task_name', { required: t('Task name is required!') })}
                                   />
                                   {errors.task_name && <div className="invalid-feedback">{errors.task_name.message}</div>}
                              </div>

                              <div className="col">
                                   <label htmlFor="task_time" className="form-label">
                                        {t('Task Time')}
                                   </label>
                                   <input
                                        type="number"
                                        step="0.1"
                                        id="task_time"
                                        className="form-control form-control-sm"
                                        {...register('task_time')}
                                        placeholder={t('Enter task time in hours')}
                                        onKeyDown={(e) => {
                                             if (e.key === '-' || e.key === 'ArrowDown') {
                                                  e.preventDefault();
                                             }
                                        }}
                                   />
                              </div>

                              <div className="col">
                                   <label htmlFor="status" className="form-label">
                                        {t('Status')}
                                   </label>
                                   <select
                                        id="status"
                                        className={`form-select form-select-sm ${errors.status ? 'is-invalid' : ''}`}
                                        {...register('status', { required: t('Status is required!') })}>
                                        <option value="">{t('Select Status')}</option>
                                        <option value="1">{t('Pending')}</option>
                                        <option value="2">{t('In Progress')}</option>
                                        <option value="3">{t('Preview')}</option>
                                        <option value="4">{t('Done')}</option>
                                   </select>

                                   {errors.status && <div className="invalid-feedback">{errors.status.message}</div>}
                              </div>
                         </div>

                         {/* Select Project */}
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
                              <div className="mb-3">
                                   <label htmlFor="description" className="form-label">
                                        {t('Description')}
                                   </label>
                                   <textarea id="description" className={`form-control form-control-sm `} rows="3"></textarea>
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
                                        {Array.isArray(departments) &&
                                             departments.map((department) => (
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
                                   <label htmlFor="startDate" className="form-label">
                                        {t('Start Date')}
                                   </label>
                                   <input
                                        type="date"
                                        id="start_date"
                                        className={`form-control form-control-sm ${errors.start_date ? 'is-invalid' : ''}`}
                                        {...register('start_date', { required: t('Start date is required!') })}
                                   />
                                   {errors.startDate && <div className="invalid-feedback">{errors.startDate.message}</div>}
                              </div>

                              <div className="col">
                                   <label htmlFor="endDate" className="form-label">
                                        {t('End Date')}
                                   </label>
                                   <input
                                        type="date"
                                        id="end_date"
                                        className={`form-control form-control-sm ${errors.end_date ? 'is-invalid' : ''}`}
                                   />
                                   {errors.endDate && <div className="invalid-feedback">{errors.endDate.message}</div>}
                              </div>
                         </div>

                         <button type="submit" className="btn btn-success">
                              <i className="bi bi-check-circle me-2"></i> {t('Add')}
                         </button>
                         <button type="button" className="btn btn-secondary ms-2" onClick={() => window.history.back()}>
                              <i className="bi bi-arrow-left me-2"></i> {t('Back')}
                         </button>
                    </form>
               </div>
          </div>
     );
};
