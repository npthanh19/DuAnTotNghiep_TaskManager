import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getDepartmentById, updateDepartment } from '../../../services/deparmentsService';

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
                    console.error('Error fetching department:', error);
                    toast.error(t('Failed to fetch department data.'));
               }
          };
          fetchDepartment();
     }, [id, reset, t]);

     const onSubmit = async (data) => {
          try {
               await updateDepartment(id, data);
               toast.success(t('Cập nhật thành công!'));
               setTimeout(() => {
                    navigate('/taskmaneger/departments');
               }, 1000);
          } catch (error) {
               console.error('Failed to update department:', error);
               toast.error(t('Failed to update department: ') + (error.message || ''));
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
                                   {...register('department_name', { required: t('Tên phòng ban không được để trống!') })}
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
                                   {...register('description', { required: t('Mô tả không được để trống!') })}
                              />
                              {errors.description && <div className="invalid-feedback">{errors.description.message}</div>}
                         </div>
                         <button type="submit" className="btn btn-success">
                              <i className="bi bi-check-circle me-2"></i> {t('Cập nhật')}
                         </button>
                    </form>
               </div>
               <ToastContainer position="top-right" autoClose={2000} />
          </div>
     );
};
