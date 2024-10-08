import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getUserById, updateUser } from '../../../services/usersService';
import { getAllRoles } from '../../../services/rolesService';

export const Edit = () => {
     const { id } = useParams();
     const { t } = useTranslation();
     const [user, setUser] = useState(null);
     const [roles, setRoles] = useState([]);
     const {
          register,
          handleSubmit,
          formState: { errors },
          reset,
     } = useForm();
     const navigate = useNavigate();

     useEffect(() => {
          const fetchUser = async () => {
               try {
                    const fetchedUser = await getUserById(id);
                    setUser(fetchedUser);
                    reset(fetchedUser);
               } catch (error) {
                    toast.error(t('Failed to fetch user data'));
               }
          };
          fetchUser();
     }, [id, reset, t]);

     useEffect(() => {
          const fetchRoles = async () => {
               try {
                    const fetchedRoles = await getAllRoles();
                    setRoles(fetchedRoles);
               } catch (error) {
                    toast.error(t('Failed to fetch roles'));
               }
          };
          fetchRoles();
     }, [t]);

     const onSubmit = async (data) => {
          const updatedData = { ...data };
          delete updatedData.password;

          try {
               await updateUser(id, updatedData);
               toast.success(t('Cập nhật thành công!'));
               setTimeout(() => {
                    navigate('/taskmaneger/users');
               }, 1000);
          } catch (error) {
               toast.error(t('Cập nhật thất bại!'));
          }
     };

     if (!user)
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
                         <span className="marquee">{t('Update User')}</span>
                    </h3>
               </div>
               <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                         <div className="mb-3">
                              <label htmlFor="name" className="form-label">
                                   {t('name')}
                              </label>
                              <input
                                   type="text"
                                   id="name"
                                   className={`form-control form-control-sm ${errors.name ? 'is-invalid' : ''}`}
                                   {...register('name', { required: t('Tên đăng nhập không được để trống!') })}
                              />
                              {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
                         </div>

                         <div className="mb-3">
                              <label htmlFor="email" className="form-label">
                                   {t('Email')}
                              </label>
                              <input
                                   type="email"
                                   id="email"
                                   className={`form-control form-control-sm ${errors.email ? 'is-invalid' : ''}`}
                                   {...register('email', {
                                        required: t('Email không được để trống!'),
                                        pattern: {
                                             value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                             message: t('Email không hợp lệ'),
                                        },
                                   })}
                              />
                              {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                         </div>

                         <div className="mb-3">
                              <label htmlFor="password" className="form-label">
                                   {t('Password')}
                              </label>
                              <input
                                   type="password"
                                   id="password"
                                   className={`form-control form-control-sm ${errors.password ? 'is-invalid' : ''}`}
                                   {...register('password')}
                                   disabled
                              />
                         </div>

                         <div className="mb-3">
                              <label htmlFor="role" className="form-label">
                                   {t('Role')}
                              </label>
                              <select
                                   id="role"
                                   className={`form-select from-select-sm ${errors.role_id ? 'is-invalid' : ''}`}
                                   {...register('role_id', { required: t('Vai trò không được để trống!') })}>
                                   {roles.map((role) => (
                                        <option key={role.id} value={role.id}>
                                             {t(role.name)}
                                        </option>
                                   ))}
                              </select>
                              {errors.role_id && <div className="invalid-feedback">{errors.role_id.message}</div>}
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
