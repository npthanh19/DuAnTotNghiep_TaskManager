import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createProject } from '../../../services/projectsService';
import { getAllUsers } from '../../../services/usersService';
import { getAllDepartments } from '../../../services/deparmentsService';
import Swal from 'sweetalert2';

export const Add = () => {
     const { t } = useTranslation();
     const navigate = useNavigate();
     const {
          register,
          handleSubmit,
          formState: { errors },
          reset,
          getValues,
     } = useForm();
     const [users, setUsers] = useState([]);
     const [departments, setDepartments] = useState([]);

     useEffect(() => {
          const fetchUsers = async () => {
               try {
                    const userData = await getAllUsers();
                    setUsers(userData);
               } catch (error) {
                    console.error('Error fetching users:', error);
                    Swal.fire({
                         icon: 'error',
                         title: t('Failed to load users'),
                         text: t('Something went wrong'),
                    });
               }
          };

          const fetchDepartments = async () => {
               try {
                    const departmentData = await getAllDepartments();
                    setDepartments(departmentData);
               } catch (error) {
                    console.error('Error fetching departments:', error);
                    Swal.fire({
                         icon: 'error',
                         title: t('Failed to load departments'),
                         text: t('Something went wrong'),
                    });
               }
          };

          fetchUsers();
          fetchDepartments();
     }, []);

     const onSubmit = async (data) => {
          const mappedData = {
               project_name: data.projectName,
               description: data.description,
               start_date: data.startDate,
               end_date: data.endDate,
               status: getStatusValue(data.status),
               user_id: data.projectManager,
          };

          try {
               await createProject(mappedData);
               Swal.fire({
                    icon: 'success',
                    text: t('Project added successfully!'),
                    position: 'top-right',
                    toast: true,
                    timer: 2000,
                    showConfirmButton: false,
               });
               setTimeout(() => {
                    navigate('/taskmaneger/projects');
               }, 1000);
          } catch (error) {
               console.error('Error adding project or department:', error.response?.data || error);
               Swal.fire({
                    icon: 'error',
                    title: t('Error adding project or department! Please try again.'),
                    text: t('Something went wrong'),
               });
          }
     };

     const getStatusValue = (status) => {
          switch (status) {
               case 'To Do':
                    return 1;
               case 'In Progress':
                    return 2;
               case 'Preview':
                    return 3;
               case 'Done':
                    return 4;
               default:
                    return null;
          }
     };

     return (
          <div className="card my-4">
               <div className="card-header d-flex justify-content-between align-items-center">
                    <h3 className="fw-bold py-3 mb-4 highlighted-text">
                         <span className="marquee">{t('Add new project')}</span>
                    </h3>
               </div>
               <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                         <div className="mb-3">
                              <label htmlFor="projectName" className="form-label">
                                   {t('Project Name')}
                              </label>
                              <input
                                   type="text"
                                   id="projectName"
                                   className={`form-control form-control-sm ${errors.projectName ? 'is-invalid' : ''}`}
                                   {...register('projectName', { required: t('Project name is required') })}
                              />
                              {errors.projectName && <div className="invalid-feedback">{errors.projectName.message}</div>}
                         </div>

                         <div className="mb-3">
                              <label htmlFor="description" className="form-label">
                                   {t('Description')}
                              </label>
                              <textarea
                                   id="description"
                                   className={`form-control form-control-sm ${errors.description ? 'is-invalid' : ''}`}
                                   {...register('description', { required: t('Description cannot be empty!') })}
                              />
                              {errors.description && <div className="invalid-feedback">{errors.description.message}</div>}
                         </div>
                         <div className="mb-3">
                              <label htmlFor="status" className="form-label">
                                   {t('Status')}
                              </label>
                              <select
                                   id="status"
                                   className={`form-select form-select-sm ${errors.status ? 'is-invalid' : ''}`}
                                   {...register('status', { required: t('Status is required!') })}>
                                   <option value="">{t('Select Status')}</option>
                                   <option value="To Do">{t('Not yet implemented')}</option>
                                   <option value="In Progress">{t('Ongoing')}</option>
                                   <option value="Preview">{t('Complete')}</option>
                                   <option value="Done">{t('Destroy')}</option>
                              </select>
                              {errors.status && <div className="invalid-feedback">{errors.status.message}</div>}
                         </div>

                         {/* Date Inputs in Horizontal Alignment */}
                         <div className="row mb-3">
                              <div className="col">
                                   <label htmlFor="startDate" className="form-label">
                                        {t('Start Date')}
                                   </label>
                                   <input
                                        type="date"
                                        id="startDate"
                                        className={`form-control form-control-sm ${errors.startDate ? 'is-invalid' : ''}`}
                                        {...register('startDate', {
                                             required: t('Start date is required!'),
                                        })}
                                   />
                                   {errors.startDate && <div className="invalid-feedback">{errors.startDate.message}</div>}
                              </div>

                              <div className="col">
                                   <label htmlFor="endDate" className="form-label">
                                        {t('End Date')}
                                   </label>
                                   <input
                                        type="date"
                                        id="endDate"
                                        className={`form-control form-control-sm ${errors.endDate ? 'is-invalid' : ''}`}
                                        {...register('endDate', {
                                             required: t('End date is required!'),
                                             validate: (value) => {
                                                  const startDate = new Date(getValues('startDate'));
                                                  const endDate = new Date(value);
                                                  if (endDate < startDate) {
                                                       return t('End date cannot be earlier than start date');
                                                  }
                                                  return true;
                                             },
                                        })}
                                   />
                                   {errors.endDate && <div className="invalid-feedback">{errors.endDate.message}</div>}
                              </div>
                         </div>
                         {/* 
                         <div className="row mb-3">
                              <div className="col">
                                   <label htmlFor="projectManager" className="form-label">
                                        {t('Project Manager')}
                                   </label>
                                   <select
                                        id="projectManager"
                                        className={`form-select form-select-sm ${errors.projectManager ? 'is-invalid' : ''}`}
                                        {...register('projectManager', { required: t('Project Manager is required!') })}>
                                        <option value="">{t('Select Project Manager')}</option>
                                        {users.map((user) => (
                                             <option key={user.id} value={user.id}>
                                                  {user.fullname}
                                             </option>
                                        ))}
                                   </select>
                                   {errors.projectManager && <div className="invalid-feedback">{errors.projectManager.message}</div>}
                              </div>
                         </div> */}

                         <button type="submit" className="btn btn-success">
                              <i className="bi bi-check-circle me-2"></i> {t('Add')}
                         </button>
                         <button type="button" className="btn btn-secondary ms-2" onClick={() => window.history.back()}>
                              <i className="bi bi-arrow-left me-2"></i> {t('Back')}
                         </button>
                    </form>
               </div>
               <ToastContainer position="top-right" autoClose={2000} />
          </div>
     );
};
