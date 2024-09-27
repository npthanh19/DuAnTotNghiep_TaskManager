import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Edit = () => {
     const { id } = useParams();
     const { t } = useTranslation();
     const [roles, setRoles] = useState(null);
     const {
          register,
          handleSubmit,
          formState: { errors },
          reset,
     } = useForm();
     const navigate = useNavigate();

     useEffect(() => {
          const fetchRoles = async () => {
               const fetchedRoles = {
                    id,
                    role_name: `Roles ${id}`,
                    description: `Description ${id}`,
               };
               setRoles(fetchedRoles);
               reset(fetchedRoles);
          };
          fetchRoles();
     }, [id, reset]);

     const onSubmit = (data) => {
          toast.success(t('Cập nhật thành công!'));
          setTimeout(() => {
               navigate('/taskmaneger/roles');
          }, 1000);
     };

     if (!roles) return <p>{t('Đang tải...')}</p>;

     return (
          <div className="card my-4">
               <div className="card-header d-flex justify-content-between align-items-center">
                    <h3 className="fw-bold py-3 mb-4 highlighted-text">
                         <span className="marquee">{t('Update Roles')}</span>
                    </h3>
               </div>
               <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                         <div className="mb-3">
                              <label htmlFor="roleName" className="form-label">
                                   {t('Name Roles')}
                              </label>
                              <input
                                   type="text"
                                   id="roleName"
                                   className={`form-control ${errors.role_name ? 'is-invalid' : ''}`}
                                   {...register('role_name', { required: t('Tên danh mục không được để trống!') })}
                              />
                              {errors.role_name && <div className="invalid-feedback">{errors.role_name.message}</div>}
                         </div>

                         <div className="mb-3">
                              <label htmlFor="roleDescription" className="form-label">
                                   {t('Description')}
                              </label>
                              <textarea
                                   id="roleDescription"
                                   className={`form-control ${errors.description ? 'is-invalid' : ''}`}
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
