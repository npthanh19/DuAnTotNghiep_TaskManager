import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
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

     const onSubmit = (data) => {
          toast.success(t('Thêm vai trò thành công!'));
          console.log(data);
          reset();
          setTimeout(() => {
               navigate('/taskmaneger/roles');
          }, 1000);
     };

     return (
          <div className="card my-4">
               <div className="card-header d-flex justify-content-between align-items-center">
                    <h3 className="fw-bold py-3 mb-4 highlighted-text">
                         <span className="marquee">{t('Add new role')}</span>
                    </h3>
               </div>
               <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                         <div className="mb-3">
                              <label htmlFor="roleName" className="form-label">
                                   {t('Name')}
                              </label>
                              <input
                                   type="text"
                                   id="roleName"
                                   className={`form-control ${errors.roleName ? 'is-invalid' : ''}`}
                                   {...register('roleName', { required: t('Tên vai trò không được để trống') })}
                              />
                              {errors.roleName && <div className="invalid-feedback">{errors.roleName.message}</div>}
                         </div>

                         <div className="mb-3">
                              <label htmlFor="roleDescription" className="form-label">
                                   {t('Description')}
                              </label>
                              <textarea
                                   id="roleDescription"
                                   className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                                   rows="5"
                                   {...register('description', { required: t('Mô tả không được để trống') })}></textarea>
                              {errors.description && <div className="invalid-feedback">{errors.description.message}</div>}
                         </div>

                         <button type="submit" className="btn btn-success">
                              <i className="bi bi-check-circle me-2"></i> {t('Add Role')}
                         </button>
                    </form>
               </div>
               <ToastContainer position="top-right" autoClose={2000} />
          </div>
     );
};
