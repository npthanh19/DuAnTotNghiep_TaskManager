import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import { createDepartment } from '../../../services/deparmentsService'; 
import 'react-toastify/dist/ReactToastify.css';

export const Add = () => {
     const { t } = useTranslation();
     const navigate = useNavigate();
     const {
          register,
          handleSubmit,
          formState: { errors },
          reset,
     } = useForm();

     const onSubmit = async (data) => {
          try {
               await createDepartment(data);
               toast.success(t('Thêm phòng ban thành công!'));
               reset();
               setTimeout(() => {
                    navigate('/taskmaneger/departments');
               }, 1000);
          } catch (error) {
               toast.error(t('Thêm phòng ban thất bại!'));
               console.error('Failed to add department:', error);
          }
     };

     return (
          <div className="card my-4">
               <div className="card-header d-flex justify-content-between align-items-center">
                    <h3 className="fw-bold py-3 mb-4 highlighted-text">
                         <span className="marquee">{t('Add new department')}</span>
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
                                   {...register('department_name', { required: t('Tên phòng ban không được để trống') })}
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
                                   rows="5"
                                   {...register('description', { required: t('Mô tả không được để trống') })}></textarea>
                              {errors.description && <div className="invalid-feedback">{errors.description.message}</div>}
                         </div>

                         <button type="submit" className="btn btn-success">
                              <i className="bi bi-check-circle me-2"></i> {t('Add Department')}
                         </button>
                    </form>
               </div>
               <ToastContainer position="top-right" autoClose={2000} />
          </div>
     );
};
