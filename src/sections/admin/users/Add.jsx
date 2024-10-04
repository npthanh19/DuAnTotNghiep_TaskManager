import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAllRoles } from '../../../services/rolesService';
import { createUser } from '../../../services/usersService';

export const Add = () => {
     const { t } = useTranslation();
     const navigate = useNavigate();
     const {
          register,
          handleSubmit,
          formState: { errors },
          reset,
     } = useForm();
     const [imagePreview, setImagePreview] = useState(null);
     const [roles, setRoles] = useState([]);

     useEffect(() => {
          const fetchRoles = async () => {
               try {
                    const roleData = await getAllRoles();
                    setRoles(roleData);
               } catch (error) {
                    console.error('Error fetching roles:', error);
                    toast.error(t('Failed to load roles'));
               }
          };

          fetchRoles();
     }, []);

     const onSubmit = async (data) => {
          console.log('User data to be submitted:', data); // Log user data
          try {
               await createUser(data);
               toast.success(t('Thêm mới thành công!'));
               reset();
               setImagePreview(null);
               setTimeout(() => {
                    navigate('/taskmaneger/users');
               }, 1000);
          } catch (error) {
               toast.error(t('Failed to create user'));
               console.error('Error creating user:', error);
          }
     };

     return (
          <div className="card my-4">
               <div className="card-header d-flex justify-content-between align-items-center">
                    <h3 className="fw-bold py-3 mb-4 highlighted-text">
                         <span className="marquee">{t('Add new')}</span>
                    </h3>
               </div>
               <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                         <div className="mb-3">
                              <label htmlFor="name" className="form-label">
                                   {t('Name')}
                              </label>
                              <input
                                   type="text"
                                   id="name"
                                   className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                   {...register('name', { required: t('Tên không được để trống') })}
                              />
                              {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
                         </div>

                         <div className="mb-3">
                              <label htmlFor="password" className="form-label">
                                   {t('Password')}
                              </label>
                              <input
                                   type="password"
                                   id="password"
                                   className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                   {...register('password', { required: t('Mật khẩu không được để trống') })}
                              />
                              {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
                         </div>

                         <div className="mb-3">
                              <label htmlFor="email" className="form-label">
                                   {t('Email')}
                              </label>
                              <input
                                   type="email"
                                   id="email"
                                   className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                   {...register('email', {
                                        required: t('Email không được để trống'),
                                        pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: t('Email không hợp lệ') },
                                   })}
                              />
                              {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                         </div>

                         <div className="mb-3">
                              <label htmlFor="roles" className="form-label">
                                   {t('Role')}
                              </label>
                              <select
                                   id="roleId"
                                   className={`form-select ${errors.roleId ? 'is-invalid' : ''}`}
                                   {...register('roleId', { required: t('ID vai trò không được để trống') })}>
                                   <option value="">{t('Chọn vai trò')}</option>
                                   {roles.map((role) => (
                                        <option key={role.id} value={role.id}>
                                             {role.name}
                                        </option>
                                   ))}
                              </select>
                         </div>
                         <button type="submit" className="btn btn-success">
                              <i className="bi bi-check-circle me-2"></i> {t('Thêm')}
                         </button>
                    </form>
               </div>
               <ToastContainer position="top-right" autoClose={2000} />
          </div>
     );
};
