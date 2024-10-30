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
                    toast.error(t('Failed'));
               }
          };

          fetchRoles();
     }, []);

     const onSubmit = async (data) => {
          const formData = new FormData();
          Object.keys(data).forEach((key) => {
               formData.append(key, data[key]);
          });

          if (data.avatar && data.avatar.length > 0) {
               formData.append('avatar', data.avatar[0]);
          }


          try {
               await createUser(formData);
               toast.success(t('Added successfully!'));
               reset();
               setImagePreview(null);
               setTimeout(() => {
                    navigate('/taskmaneger/users');
               }, 1000);
          } catch (error) {
               const errorData = error.response ? error.response.data : { message: 'Unknown error occurred' };
               toast.error(t('Failed to create user'));
          }
     };



     const handleImageChange = (e) => {
          const file = e.target.files[0];
          setImagePreview(file ? URL.createObjectURL(file) : null);
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
                              <label htmlFor="fullname" className="form-label">
                                   {t('Name')}
                              </label>
                              <input
                                   type="text"
                                   id="fullname"
                                   className={`form-control ${errors.fullname ? 'is-invalid' : ''}`}
                                   {...register('fullname', { required: t('Tên không được để trống') })}
                              />

                              {errors.fullname && <div className="invalid-feedback">{errors.fullname.message}</div>}
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

                         <div className="mb-3">
                              <label htmlFor="avatar" className="form-label">
                                   {t('Avatar')}
                              </label>
                              <input
                                   type="file"
                                   id="avatar"
                                   className="form-control"
                                   {...register('avatar')}
                                   onChange={handleImageChange}
                              />

                              {imagePreview && (
                                   <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="img-thumbnail mt-2"
                                        style={{ width: '100px', height: '100px' }}
                                   />
                              )}
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
