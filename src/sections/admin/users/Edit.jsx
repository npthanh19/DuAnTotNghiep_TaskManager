import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Edit = () => {
     const { id } = useParams();
     const { t } = useTranslation();
     const [user, setUser] = useState(null);
     const {
          register,
          handleSubmit,
          formState: { errors },
          reset,
     } = useForm();
     const navigate = useNavigate();

     useEffect(() => {
          const fetchUser = async () => {
               const fetchedUser = {
                    id,
                    username: 'john_doe',
                    password: 'password123',
                    avatar: '/assets/admin/img/avatars/1.png',
                    email: 'john@example.com',
                    full_name: 'John Doe',
                    created_at: '2024-09-24T10:30:00',
                    updated_at: '2024-09-24T12:00:00',
                    role_id: 1,
                    department_id: 101,
               };
               setUser(fetchedUser);
               reset(fetchedUser);
          };
          fetchUser();
     }, [id, reset]);

     const onSubmit = (data) => {
          toast.success(t('Cập nhật thành công!'));
          setTimeout(() => {
               navigate('/taskmaneger/users');
          }, 1000);
     };

     if (!user) return <p>{t('Đang tải...')}</p>;

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
                              <label htmlFor="username" className="form-label">
                                   {t('Username')}
                              </label>
                              <input
                                   type="text"
                                   id="username"
                                   className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                                   {...register('username', { required: t('Tên đăng nhập không được để trống!') })}
                              />
                              {errors.username && <div className="invalid-feedback">{errors.username.message}</div>}
                         </div>

                         <div className="mb-3">
                              <label htmlFor="fullName" className="form-label">
                                   {t('Full Name')}
                              </label>
                              <input
                                   type="text"
                                   id="fullName"
                                   className={`form-control ${errors.full_name ? 'is-invalid' : ''}`}
                                   {...register('full_name', { required: t('Họ tên không được để trống!') })}
                              />
                              {errors.full_name && <div className="invalid-feedback">{errors.full_name.message}</div>}
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
                                   className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                   {...register('password', { required: t('Mật khẩu không được để trống!') })}
                              />
                              {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
                         </div>

                         <div className="mb-3">
                              <label htmlFor="avatar" className="form-label">
                                   {t('Avatar')}
                              </label>
                              <input
                                   type="file"
                                   id="avatar"
                                   className={`form-control ${errors.avatar ? 'is-invalid' : ''}`}
                                   {...register('avatar', { required: t('Hình đại diện không được để trống!') })}
                              />
                              {user.avatar && (
                                   <div className="mb-2">
                                        <img
                                             src={user.avatar}
                                             alt={t('Current Avatar')}
                                             style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                        />
                                   </div>
                              )}
                              {errors.avatar && <div className="invalid-feedback">{errors.avatar.message}</div>}
                         </div>

                         <div className="mb-3">
                              <label htmlFor="roleId" className="form-label">
                                   {t('Role')}
                              </label>
                              <select
                                   id="roleId"
                                   className={`form-select ${errors.role_id ? 'is-invalid' : ''}`}
                                   {...register('role_id', { required: t('Vai trò không được để trống!') })}>
                                   <option value="1">{t('Admin')}</option>
                                   <option value="2">{t('User')}</option>
                              </select>
                              {errors.role_id && <div className="invalid-feedback">{errors.role_id.message}</div>}
                         </div>

                         <div className="mb-3">
                              <label htmlFor="departmentId" className="form-label">
                                   {t('Department')}
                              </label>
                              <select
                                   id="departmentId"
                                   className={`form-select ${errors.department_id ? 'is-invalid' : ''}`}
                                   {...register('department_id', { required: t('Phòng ban không được để trống!') })}>
                                   <option value="101">{t('Sales')}</option>
                                   <option value="102">{t('Development')}</option>
                              </select>
                              {errors.department_id && <div className="invalid-feedback">{errors.department_id.message}</div>}
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
