import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { getUserById, updateUser, updateAvatar } from '../../services/usersService';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import '../../index.css';
import { Link } from 'react-router-dom';

export default function Update_profile() {
     const [isSidebarOpen, setIsSidebarOpen] = useState(true);
     const [user, setUser] = useState({});
     const { t } = useTranslation();
     const [avatar, setAvatar] = useState(null);
     const userInfo = JSON.parse(localStorage.getItem('user'));
     const userId = userInfo?.user_id;
     const token = localStorage.getItem('token');
     const [isSaving, setIsSaving] = useState(false);

     const toggleSidebar = () => {
          setIsSidebarOpen(!isSidebarOpen);
     };

     const {
          register,
          handleSubmit,
          setValue,
          formState: { errors },
     } = useForm();

     useEffect(() => {
          const fetchUserData = async () => {
               try {
                    const userData = await getUserById(userId, token);

                    if (userData) {
                         setUser(userData);
                         setAvatar(userData.avatar);
                         setValue('fullname', userData.fullname || '');
                         setValue('email', userData.email || '');
                         setValue('phoneNumber', userData.phone_number || '');
                         setValue('emailVerified_at', userData.email_verified_at || '');
                    }
               } catch (error) {
                    Swal.fire({
                         icon: 'error',
                         text: t('Failed to fetch user data.'),
                         position: 'top-right',
                         toast: true,
                         timer: 3000,
                         showConfirmButton: false,
                    });
               }
          };

          fetchUserData();
     }, [userId, token, setValue, t]);

     const handleAvatarChange = (event) => {
          const file = event.target.files[0];
          if (file) {
               const formData = new FormData();
               formData.append('avatar', file);

               updateAvatar(userId, formData, token)
                    .then((response) => {
                         if (response && response.data && response.data.avatar) {
                              const avatarUrl = `${process.env.REACT_APP_BASE_URL}/avatar/${response.data.avatar}`;

                              setAvatar(response.data.avatar);

                              const imgElement = document.getElementById('uploadedAvatar');
                              if (imgElement) {
                                   imgElement.src = avatarUrl;
                              }

                              Swal.fire({
                                   icon: 'success',
                                   text: t('Avatar updated successfully!'),
                                   position: 'top-right',
                                   toast: true,
                                   timer: 3000,
                                   showConfirmButton: false,
                              });
                         } else {
                              Swal.fire({
                                   icon: 'success',
                                   text: t('Avatar updated successfully!'),
                                   position: 'top-right',
                                   toast: true,
                                   timer: 3000,
                                   showConfirmButton: false,
                              });
                         }
                    })
                    .catch((error) => {
                         Swal.fire({
                              icon: 'error',
                              text: t('Failed to update avatar.'),
                              position: 'top-right',
                              toast: true,
                              timer: 3000,
                              showConfirmButton: false,
                         });
                    });
          }
     };

     const onSubmit = async (data) => {
          setIsSaving(true);
          try {
               const updatedData = {
                    fullname: data.fullname.trim(),
                    email: data.email.trim(),
                    phone_number: data.phoneNumber.trim(),
                    password: data.password ? data.password.trim() : undefined,
               };

               if (Object.keys(updatedData).length === 0) {
                    Swal.fire({
                         icon: 'info',
                         text: t('No changes detected.'),
                         position: 'top-right',
                         toast: true,
                         timer: 3000,
                         showConfirmButton: false,
                    });
                    setIsSaving(false);
                    return;
               }

               await updateUser(userId, updatedData, token);

               setUser((prevUser) => ({
                    ...prevUser,
                    ...updatedData,
               }));

               Swal.fire({
                    icon: 'success',
                    text: t('User updated successfully!'),
                    position: 'top-right',
                    toast: true,
                    timer: 3000,
                    showConfirmButton: false,
               });

               setValue('fullname', updatedData.fullname);
               setValue('email', updatedData.email);
               setValue('phoneNumber', updatedData.phone_number);
          } catch (error) {
               if (error.response && error.response.data.errors) {
                    const errors = error.response.data.errors;
                    Object.keys(errors).forEach((field) => {
                         Swal.fire({
                              icon: 'error',
                              text: t('Failed to update the user.'),
                              position: 'top-right',
                              toast: true,
                              timer: 3000,
                              showConfirmButton: false,
                         });
                    });
               } else {
                    Swal.fire({
                         icon: 'error',
                         text: t('Failed to update the user.'),
                         position: 'top-right',
                         toast: true,
                         timer: 3000,
                         showConfirmButton: false,
                    });
               }
          } finally {
               setIsSaving(false);
          }
     };

     const handlePhoneNumberChange = (event) => {
          let phoneNumber = event.target.value;

          if (phoneNumber.startsWith('0')) {
               phoneNumber = '84' + phoneNumber.slice(1);
          }

          setValue('phoneNumber', phoneNumber);
     };

     return (
          <div className="layout-wrapper layout-content-navbar">
               <div className="layout-container">
                    <Sidebar isOpen={isSidebarOpen} />
                    <div className={`layout-page ${isSidebarOpen ? 'sidebar-open' : ''}`}>
                         <Navbar onToggleSidebar={toggleSidebar} />
                         <div className="content-wrapper">
                              <div className="container-fluid flex-grow-1 container-p-y">
                                   <div className="row">
                                        <div className="col-md-12">
                                             <div className="nav-align-top">
                                                  <ul className="nav nav-pills flex-column flex-md-row mb-6 gap-2 gap-lg-0">
                                                       <li className="nav-item">
                                                            <Link to="/taskmaneger/update_profile" className="nav-link active">
                                                                 <i className="ri-group-line me-1_5" />
                                                                 {t('Account')}
                                                            </Link>
                                                            <Link to="/taskmaneger/notifications" className="nav-link active">
                                                                 <i className="ri-notification-2-line me-1_5" />
                                                                 {t('Notifications')}
                                                            </Link>
                                                       </li>
                                                  </ul>
                                             </div>
                                             <div className="card mb-6">
                                                  <div className="card-body">
                                                       <div className="d-flex align-items-start align-items-sm-center gap-6">
                                                            <img
                                                                 src={
                                                                      avatar
                                                                           ? `${process.env.REACT_APP_BASE_URL}/avatar/${avatar}`
                                                                           : '/default-avatar.png'
                                                                 }
                                                                 alt={user.fullname || 'User Avatar'}
                                                                 className="d-block w-px-200 h-px-200 rounded"
                                                                 id="uploadedAvatar"
                                                            />

                                                            <div className="button-wrapper">
                                                                 <label htmlFor="upload" className="btn btn-sm btn-primary me-3 mb-4" tabIndex={0}>
                                                                      <span className="d-none d-sm-block">{t('Upload new photo')}</span>
                                                                      <i className="ri-upload-2-line d-block d-sm-none" />
                                                                      <input
                                                                           type="file"
                                                                           id="upload"
                                                                           className="account-file-input"
                                                                           hidden
                                                                           accept="image/png, image/jpeg"
                                                                           onChange={handleAvatarChange}
                                                                      />
                                                                 </label>
                                                                 <div>{t('Allowed JPG, PNG. Max size of 800K')}</div>
                                                            </div>
                                                       </div>
                                                  </div>
                                                  <div className="card-body pt-0">
                                                       <form id="formAccountSettings" method="POST" onSubmit={handleSubmit(onSubmit)}>
                                                            <div className="row mt-4">
                                                                 <div className="col-md-6">
                                                                      <div className="mb-3">
                                                                           <label className="form-label form-label-sm">{t('Fullname')}</label>
                                                                           <input
                                                                                {...register('fullname', { required: t('Fullname is required') })}
                                                                                type="text"
                                                                                className="form-control form-control-sm"
                                                                                defaultValue={user.fullname}
                                                                           />
                                                                           {errors.fullname && (
                                                                                <div className="text-danger">{errors.fullname.message}</div>
                                                                           )}
                                                                      </div>
                                                                 </div>
                                                                 <div className="col-md-6">
                                                                      <div className="mb-3">
                                                                           <label className="form-label form-label-sm">{t('Email')}</label>
                                                                           <input
                                                                                {...register('email')}
                                                                                type="email"
                                                                                className="form-control form-control-sm"
                                                                                defaultValue={user.email}
                                                                           />
                                                                           {errors.email && <div className="text-danger">{errors.email.message}</div>}
                                                                      </div>
                                                                 </div>
                                                            </div>
                                                            <div className="row mt-4">
                                                                 <div className="col-md-6">
                                                                      <div className="mb-3">
                                                                           <label className="form-label form-label-sm">{t('Phone number')}</label>
                                                                           <input
                                                                                {...register('phoneNumber', {
                                                                                     required: t('Phone number is required'),
                                                                                     pattern: {
                                                                                          value: /^[0-9]{10,13}$/,
                                                                                          message: t('Phone number must be between 10 and 13 digits'),
                                                                                     },
                                                                                })}
                                                                                type="text"
                                                                                className="form-control form-control-sm"
                                                                                defaultValue={user.phone_number}
                                                                                onChange={handlePhoneNumberChange}
                                                                           />
                                                                           {errors.phoneNumber && (
                                                                                <div className="text-danger">{errors.phoneNumber.message}</div>
                                                                           )}
                                                                      </div>
                                                                 </div>
                                                                 <div className="col-md-6">
                                                                      <div className="mb-3">
                                                                           <label className="form-label form-label-sm">{t('Xác thực email')}</label>
                                                                           <input
                                                                                type="text"
                                                                                className="form-control form-control-sm"
                                                                                value={
                                                                                     user.email_verified_at
                                                                                          ? `${t('Verified')}: ${new Date(
                                                                                                 user.email_verified_at,
                                                                                            ).toLocaleString()}`
                                                                                          : t('Not verified')
                                                                                }
                                                                                readOnly
                                                                                disabled
                                                                           />
                                                                      </div>
                                                                 </div>
                                                            </div>
                                                            <button type="submit" className="btn btn-primary" disabled={isSaving}>
                                                                 {isSaving ? t('Saving...') : t('Save changes')}
                                                            </button>
                                                       </form>
                                                  </div>
                                             </div>
                                        </div>
                                   </div>
                              </div>
                         </div>
                         <Footer />
                    </div>
               </div>
          </div>
     );
}
