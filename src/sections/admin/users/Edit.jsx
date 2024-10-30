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
     const [imagePreview, setImagePreview] = useState(null);
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
                    if (fetchedUser.avatar) {
                         setImagePreview(`${process.env.REACT_APP_BASE_URL}/storage/${fetchedUser.avatar}`);
                    }
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
          const updatedData = new FormData();
          updatedData.append('fullname', data.fullname);
          updatedData.append('email', data.email);
          if (data.avatar && data.avatar.length > 0) {
               updatedData.append('avatar', data.avatar[0]);
          }
          updatedData.append('roleId', data.roleId);

          try {
               await updateUser(id, updatedData);
               toast.success(t('Updated successfully!'));
               setTimeout(() => {
                    navigate('/taskmaneger/users');
               }, 1000);
          } catch (error) {
               toast.error(t('Update failed!'));
          }
     };



     const handleImageChange = (e) => {
          const file = e.target.files[0];
          setImagePreview(file ? URL.createObjectURL(file) : null);
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
                              <label htmlFor="password" className="form-label">
                                   {t('Password')}
                              </label>
                              <input
                                   type="password"
                                   id="password"
                                   className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                   {...register('password')}
                              />
                              {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
                         </div>
                         <div className="mb-3">
                              <label htmlFor="roleId" className="form-label">
                                   {t('Role')}
                              </label>
                              <select
                                   id="roleId"
                                   className={`form-select ${errors.roleId ? 'is-invalid' : ''}`}
                                   {...register('roleId', { required: t('ID vai trò không được để trống') })}
                                   defaultValue={user.roleId}
                              >
                                   {roles.map((role) => (
                                        <option key={role.id} value={role.id}>
                                             {role.name}
                                        </option>
                                   ))}
                              </select>
                              {errors.roleId && <div className="invalid-feedback">{errors.roleId.message}</div>}
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
                              <i className="bi bi-check-circle me-2"></i> {t('Confirm')}
                         </button>
                    </form>
               </div>
               <ToastContainer position="top-right" autoClose={2000} />
          </div>
     );
};
