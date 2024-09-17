import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Edit = () => {
     const { id } = useParams();
     const { t } = useTranslation();
     const [category, setCategory] = useState(null);
     const {
          register,
          handleSubmit,
          formState: { errors },
          reset,
     } = useForm();
     const navigate = useNavigate();

     useEffect(() => {
          const fetchCategory = async () => {
               const fetchedCategory = {
                    id,
                    name: `Category ${id}`,
                    description: `Description ${id}`,
                    status: 'Active',
                    image: 'https://via.placeholder.com/50',
                    email: 'example@example.com', // Sample email
                    password: 'password123', // Sample password
               };
               setCategory(fetchedCategory);
               reset(fetchedCategory);
          };
          fetchCategory();
     }, [id, reset]);

     const onSubmit = (data) => {
          toast.success(t('Cập nhật thành công!'));
          setTimeout(() => {
               navigate('/admin/categories');
          }, 1000);
     };

     if (!category) return <p>{t('Đang tải...')}</p>;

     return (
          <div className="card my-4">
               <div className="card-header d-flex justify-content-between align-items-center">
                    <h3 className="fw-bold py-3 mb-4 highlighted-text">
                         <span className="marquee">{t('Update Category')}</span>
                    </h3>
               </div>
               <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                         <div className="mb-3">
                              <label htmlFor="categoryName" className="form-label">
                                   {t('Name Category')}
                              </label>
                              <input
                                   type="text"
                                   id="categoryName"
                                   className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                   {...register('name', { required: t('Tên danh mục không được để trống!') })}
                              />
                              {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
                         </div>

                         <div className="mb-3">
                              <label htmlFor="categoryDescription" className="form-label">
                                   {t('Description')}
                              </label>
                              <textarea
                                   id="categoryDescription"
                                   className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                                   {...register('description', { required: t('Mô tả không được để trống!') })}
                              />
                              {errors.description && <div className="invalid-feedback">{errors.description.message}</div>}
                         </div>

                         <div className="mb-3">
                              <label htmlFor="categoryStatus" className="form-label">
                                   {t('Status')}
                              </label>
                              <select
                                   id="categoryStatus"
                                   className={`form-select ${errors.status ? 'is-invalid' : ''}`}
                                   {...register('status', { required: t('Trạng thái không được để trống!') })}>
                                   <option value="Active">{t('Hoạt động')}</option>
                                   <option value="Inactive">{t('Không hoạt động')}</option>
                              </select>
                              {errors.status && <div className="invalid-feedback">{errors.status.message}</div>}
                         </div>

                         <div className="mb-3">
                              <label htmlFor="categoryImage" className="form-label">
                                   {t('Image')}
                              </label>
                              <input
                                   type="text"
                                   id="categoryImage"
                                   className={`form-control ${errors.image ? 'is-invalid' : ''}`}
                                   {...register('image', { required: t('Hình ảnh không được để trống!') })}
                              />
                              {errors.image && <div className="invalid-feedback">{errors.image.message}</div>}
                         </div>

                         <div className="mb-3">
                              <label htmlFor="categoryEmail" className="form-label">
                                   {t('Email')}
                              </label>
                              <input
                                   type="email"
                                   id="categoryEmail"
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
                              <label htmlFor="categoryPassword" className="form-label">
                                   {t('Password')}
                              </label>
                              <input
                                   type="password"
                                   id="categoryPassword"
                                   className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                   {...register('password', { required: t('Mật khẩu không được để trống!') })}
                              />
                              {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
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
