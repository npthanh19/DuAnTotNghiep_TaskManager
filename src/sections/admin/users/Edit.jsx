import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getUserById, updateUser, updateAvatar, getAvatarUrl } from '../../../services/usersService';
import { getAllRoles } from '../../../services/rolesService';

export const Edit = () => {
     const { id } = useParams();
     const { t } = useTranslation();
     const [user, setUser] = useState(null);
     const [imagePreview, setImagePreview] = useState(null);
     const [roles, setRoles] = useState([]);
     const [showModal, setShowModal] = useState(false);
     const [selectedImage, setSelectedImage] = useState(null);

     const {
          register,
          handleSubmit,
          formState: { errors },
          reset,
     } = useForm();
     const navigate = useNavigate();

     useEffect(() => {
          const fetchData = async () => {
               try {
                    const fetchedUser = await getUserById(id);
                    setUser(fetchedUser);

                    reset({
                         ...fetchedUser,
                         role_id: fetchedUser.role_id,
                    });
                    setImagePreview(getAvatarUrl(fetchedUser.avatar));

                    const fetchedRoles = await getAllRoles();
                    setRoles(fetchedRoles);
               } catch (error) {
                    toast.error(t('Failed to fetch user data'));
               }
          };
          fetchData();
     }, [id, reset, t]);

     const onSubmit = async (data) => {
          try {
               const updatedData = {
                    fullname: data.fullname,
                    email: data.email,
                    role_id: data.role_id,
                    phone_number: data.phone_number,
               };

               if (data.avatar && data.avatar.length > 0) {
                    const avatarData = new FormData();
                    avatarData.append('avatar', data.avatar[0]);

                    await updateAvatar(id, avatarData);
               } else if (user.avatar) {
                    updatedData.avatar = user.avatar;
               }

               await updateUser(id, updatedData);
               toast.success(t('Updated successfully!'));

               setTimeout(() => {
                    navigate('/taskmaneger/users');
               }, 1000);
          } catch (error) {
               toast.error(t('Update failed!') + (error.message || ''));
          }
     };

     const handleImageChange = (e) => {
          const file = e.target.files[0];
          setImagePreview(file ? URL.createObjectURL(file) : null);
     };

     const openModal = () => {
          setSelectedImage(imagePreview);
          setShowModal(true);
     };

     const closeModal = () => {
          setShowModal(false);
     };

     if (!user) {
          return (
               <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                    <div className="spinner-border" role="status">
                         <span className="visually-hidden">{t('Loading...')}</span>
                    </div>
               </div>
          );
     }

     return (
          <div className="card my-4">
               <div className="card-header d-flex justify-content-between align-items-center">
                    <h3 className="fw-bold py-3 mb-4 highlighted-text">
                         <span className="marquee">{t('Update User')}</span>
                    </h3>
               </div>
               <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                         {/* Full name */}
                         <div className="mb-3">
                              <label htmlFor="fullname" className="form-label">
                                   {t('Full Name')}
                              </label>
                              <input
                                   type="text"
                                   id="fullname"
                                   className={`form-control form-control-sm ${errors.fullname ? 'is-invalid' : ''}`}
                                   {...register('fullname', { required: t('Full name is required!') })}
                              />
                              {errors.fullname && <div className="invalid-feedback">{errors.fullname.message}</div>}
                         </div>

                         {/* Email */}
                         <div className="mb-3">
                              <label htmlFor="email" className="form-label">
                                   {t('Email')}
                              </label>
                              <input
                                   type="email"
                                   id="email"
                                   className={`form-control form-control-sm ${errors.email ? 'is-invalid' : ''}`}
                                   {...register('email', {
                                        required: t('Email is required!'),
                                        pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: t('Invalid email format') },
                                   })}
                              />
                              {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                         </div>

                         {/* Password */}
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
                              {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
                         </div>

                         {/* Phone Number */}
                         <div className="mb-3">
                              <label htmlFor="phone_number" className="form-label">
                                   {t('Phone Number')}
                              </label>
                              <input
                                   type="text"
                                   id="phone_number"
                                   className={`form-control form-control-sm ${errors.phone_number ? 'is-invalid' : ''}`}
                                   {...register('phone_number')}
                              />
                              {errors.phone_number && <div className="invalid-feedback">{errors.phone_number.message}</div>}
                         </div>

                         {/* Role */}
                         <div className="mb-3">
                              <label htmlFor="role_id" className="form-label">
                                   {t('Role')}
                              </label>
                              <select
                                   id="role_id"
                                   className={`form-control form-control-sm ${errors.role_id ? 'is-invalid' : ''}`}
                                   {...register('role_id', { required: t('Role is required!') })}>
                                   <option value="">{t('Select Role')}</option>
                                   {roles.map((role) => (
                                        <option key={role.id} value={role.id}>
                                             {role.name}
                                        </option>
                                   ))}
                              </select>
                              {errors.role_id && <div className="invalid-feedback">{errors.role_id.message}</div>}
                         </div>

                         {/* Avatar */}
                         <div className="mb-3">
                              <label htmlFor="avatar" className="form-label">
                                   {t('Avatar')}
                              </label>
                              <input
                                   type="file"
                                   id="avatar"
                                   className="form-control form-control-sm"
                                   {...register('avatar')}
                                   onChange={handleImageChange}
                              />
                              {imagePreview && (
                                   <div>
                                        <img
                                             src={imagePreview}
                                             alt="Preview"
                                             className="img-thumbnail mt-2"
                                             style={{ width: '100px', height: '100px', cursor: 'pointer' }}
                                             onClick={openModal}
                                        />
                                   </div>
                              )}
                         </div>

                         <button type="submit" className="btn btn-success">
                              <i className="bi bi-check-circle me-2"></i> {t('Confirm')}
                         </button>
                    </form>
               </div>

               {/* Modal for showing the enlarged image */}
               {showModal && (
                    <div className="modal show" style={{ display: 'block' }} tabIndex="-1" role="dialog">
                         <div className="modal-dialog modal-dialog-centered" role="document">
                              <div className="modal-content">
                                   <div className="modal-header">
                                        <h5 className="modal-title">{t('Avatar')}</h5>
                                        <button type="button" className="btn-close" onClick={closeModal} aria-label="Close"></button>
                                   </div>
                                   <div className="modal-body">
                                        <img
                                             src={selectedImage}
                                             alt="Enlarged Preview"
                                             className="img-fluid"
                                             style={{ maxHeight: '500px', width: 'auto' }}
                                        />
                                   </div>
                              </div>
                         </div>
                    </div>
               )}

               <ToastContainer position="top-right" autoClose={1000} />
          </div>
     );
};


