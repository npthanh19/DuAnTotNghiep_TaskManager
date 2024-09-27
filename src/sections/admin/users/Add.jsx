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
     const [imagePreview, setImagePreview] = useState(null);

     const onSubmit = (data) => {
          toast.success(t('Thêm mới thành công!'));
          console.log(data); // Logic for submitting data
          reset();
          setImagePreview(null);
          setTimeout(() => {
               navigate('/taskmaneger/users');
          }, 1000);
     };

     const handleImageChange = (event) => {
          const file = event.target.files[0];
          if (file) {
               const reader = new FileReader();
               reader.onloadend = () => {
                    setImagePreview(reader.result);
               };
               reader.readAsDataURL(file);
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
                              <label htmlFor="username" className="form-label">
                                   {t('Username')}
                              </label>
                              <input
                                   type="text"
                                   id="username"
                                   className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                                   {...register('username', { required: t('Tên người dùng không được để trống') })}
                              />
                              {errors.username && <div className="invalid-feedback">{errors.username.message}</div>}
                         </div>

                         <div className="mb-3">
                              <label htmlFor="avatar" className="form-label">
                                   {t('Avatar')}
                              </label>
                              <input
                                   type="file"
                                   id="avatar"
                                   className={`form-control ${errors.avatar ? 'is-invalid' : ''}`}
                                   {...register('avatar', { required: t('Hình ảnh không được để trống') })}
                                   onChange={handleImageChange} // Handle file change
                              />
                              {errors.avatar && <div className="invalid-feedback">{errors.avatar.message}</div>}
                              {imagePreview && (
                                   <img
                                        src={imagePreview}
                                        alt="Preview"
                                        style={{ width: '250px', height: 'auto', marginTop: '10px' }} // Preview style
                                   />
                              )}
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
                              <label htmlFor="fullName" className="form-label">
                                   {t('Full Name')}
                              </label>
                              <input
                                   type="text"
                                   id="fullName"
                                   className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
                                   {...register('fullName', { required: t('Tên đầy đủ không được để trống') })}
                              />
                              {errors.fullName && <div className="invalid-feedback">{errors.fullName.message}</div>}
                         </div>

                         <div className="mb-3">
                              <label htmlFor="roleId" className="form-label">
                                   {t('Role ID')}
                              </label>
                              <input
                                   type="number"
                                   id="roleId"
                                   className={`form-control ${errors.roleId ? 'is-invalid' : ''}`}
                                   {...register('roleId', { required: t('ID vai trò không được để trống') })}
                              />
                              {errors.roleId && <div className="invalid-feedback">{errors.roleId.message}</div>}
                         </div>

                         <div className="mb-3">
                              <label htmlFor="departmentId" className="form-label">
                                   {t('Department ID')}
                              </label>
                              <input
                                   type="number"
                                   id="departmentId"
                                   className={`form-control ${errors.departmentId ? 'is-invalid' : ''}`}
                                   {...register('departmentId', { required: t('ID phòng ban không được để trống') })}
                              />
                              {errors.departmentId && <div className="invalid-feedback">{errors.departmentId.message}</div>}
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
