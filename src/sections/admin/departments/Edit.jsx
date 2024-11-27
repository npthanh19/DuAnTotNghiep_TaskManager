import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getDepartmentById, updateDepartment } from '../../../services/deparmentsService';
import Swal from 'sweetalert2';


export const Edit = () => {
     const { id } = useParams();
     const { t } = useTranslation();
     const [department, setDepartment] = useState(null);
     const {
          register,
          handleSubmit,
          formState: { errors },
          reset,
     } = useForm();
     const navigate = useNavigate();

     useEffect(() => {
          const fetchDepartment = async () => {
               try {
                    const fetchedDepartment = await getDepartmentById(id);
                    setDepartment(fetchedDepartment);
                    reset(fetchedDepartment);
               } catch (error) {
                    toast.error(t('Failed.'));
               }
          };
          fetchDepartment();
     }, [id, reset, t]);

     const onSubmit = async (data) => {
          try {
               await updateDepartment(id, data);
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
                    navigate('/taskmaneger/departments');
               }, 1000);
          } catch (error) {
               console.error('Failed:', error);
               Swal.fire({
                    icon: 'error',
                    title: t('Edit Failed!'),
                    text: error.message || t('Something went wrong'),
               });
          }
     };

     if (!department)
          return (
               <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                    <div className="spinner-border" role="status">
                         <span className="visually-hidden">Loading...</span>
                    </div>
               </div>
          );

     return (
          <div className="card my-4">
               <div className="card-header d-flex justify-content-between align-items-center">
                    <h3 className="fw-bold py-3 mb-4 highlighted-text">
                         <span className="marquee">{t('Update Department')}</span>
                    </h3>
               </div>
               <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                         <div className="mb-3">
                              <label htmlFor="department_name" className="form-label">
                                   {t('Name')}
                              </label>
                              <input
                                   type="text"
                                   id="departmentName"
                                   className={`form-control form-control-sm ${errors.department_name ? 'is-invalid' : ''}`}
                                   {...register('department_name', { required: t('Deparment name cannot be empty!') })}
                              />
                              {errors.department_name && <div className="invalid-feedback">{errors.department_name.message}</div>}
                         </div>

                         <div className="mb-3">
                              <label htmlFor="departmentDescription" className="form-label">
                                   {t('Description')}
                              </label>
                              <textarea
                                   id="departmentDescription"
                                   className={`form-control form-control-sm ${errors.description ? 'is-invalid' : ''}`}
                                   {...register('description', { required: t('Description cannot be empty!') })}
                              />
                              {errors.description && <div className="invalid-feedback">{errors.description.message}</div>}
                         </div>
                         <button type="submit" className="btn btn-success">
                              <i className="bi bi-check-circle me-2"></i> {t('Confirm')}
                         </button>
                    </form>
               </div>
               <ToastContainer position="top-right" autoClose={2000} />
          </div>
     );
};
