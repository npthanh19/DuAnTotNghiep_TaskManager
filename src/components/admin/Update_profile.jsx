import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { getUserById, updateUser } from '../../services/usersService';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2'; // Import Swal
import { getAllRoles } from '../../services/rolesService';
import '../../index.css';

export default function Update_profile() {
     const [isSidebarOpen, setIsSidebarOpen] = useState(true);
     const [user, setUser] = useState({});
     const [roles, setRoles] = useState([]);
     const userId = 1;
     const { t } = useTranslation();

     const toggleSidebar = () => {
          setIsSidebarOpen(!isSidebarOpen);
     };

     const {
          register,
          handleSubmit,
          setValue,
          formState: { errors },
     } = useForm();

     const formatPhoneNumber = (phoneNumber) => {
          if (phoneNumber && phoneNumber.startsWith('0')) {
               return '84' + phoneNumber.slice(1);
          }
          return phoneNumber;
     };

     useEffect(() => {
          const fetchUserData = async () => {
               try {
                    const userData = await getUserById(userId);
                    if (userData) {
                         setUser(userData);

                         setValue('fullname', userData.fullname || '');
                         setValue('email', userData.email || '');
                         setValue('phoneNumber', formatPhoneNumber(userData.phone_number) || '');
                         setValue('role_id', userData.role_id || '');
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

          const fetchRoles = async () => {
               try {
                    const rolesData = await getAllRoles();
                    setRoles(rolesData);
               } catch (error) {
                    console.error('Error fetching roles:', error);
                    Swal.fire({
                         icon: 'error',
                         text: t('Failed to fetch roles.'),
                         position: 'top-right',
                         toast: true,
                         timer: 3000,
                         showConfirmButton: false,
                    });
               }
          };

          fetchUserData();
          fetchRoles();
     }, [userId, setValue, t]);

     const handleRoleChange = (selectedRoleId) => {
          setUser((prevUser) => ({
               ...prevUser,
               role_id: selectedRoleId,
          }));
     };

     const onSubmit = async (data) => {
          try {
               const updatedData = {
                    fullname: data.fullname,
                    email: data.email,
                    phone_number: data.phoneNumber,
                    role_id: user.role_id,
               };

               await updateUser(userId, updatedData);
               Swal.fire({
                    icon: 'success',
                    text: t('User updated successfully!'),
                    position: 'top-right',
                    toast: true,
                    timer: 3000,
                    showConfirmButton: false,
               });
          } catch (error) {
               if (error.response && error.response.data.errors) {
                    const errors = error.response.data.errors;
                    Object.keys(errors).forEach((field) => {
                         Swal.fire({
                              icon: 'error',
                              text: `${field}: ${errors[field].join(', ')}`,
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
          }
     };

     return (
          <div className="layout-wrapper layout-content-navbar">
               <div className="layout-container">
                    <Sidebar isOpen={isSidebarOpen} />
                    <div className={`layout-page ${isSidebarOpen ? 'sidebar-open' : ''}`}>
                         <Navbar onToggleSidebar={toggleSidebar} />
                         <div className="content-wrapper">
                              <div className="container-xxl flex-grow-1 container-p-y">
                                   <div className="row">
                                        <div className="col-md-12">
                                             <div className="nav-align-top">
                                                  <ul className="nav nav-pills flex-column flex-md-row mb-6 gap-2 gap-lg-0">
                                                       <li className="nav-item">
                                                            <button className="nav-link active" type="button">
                                                                 <i className="ri-group-line me-1_5" />
                                                                 Account
                                                            </button>
                                                       </li>
                                                  </ul>
                                             </div>
                                             <div className="card mb-6">
                                                  <div className="card-body">
                                                       <div className="d-flex align-items-start align-items-sm-center gap-6">
                                                            <img
                                                                 src={`${process.env.REACT_APP_BASE_URL}/avatar/${user.avatar}`}
                                                                 alt={user.fullname || 'User Avatar'}
                                                                 className="d-block w-px-100 h-px-100 rounded"
                                                                 id="uploadedAvatar"
                                                            />
                                                            <div className="button-wrapper">
                                                                 <label htmlFor="upload" className="btn btn-sm btn-primary me-3 mb-4" tabIndex={0}>
                                                                      <span className="d-none d-sm-block">Upload new photo</span>
                                                                      <i className="ri-upload-2-line d-block d-sm-none" />
                                                                      <input
                                                                           type="file"
                                                                           id="upload"
                                                                           className="account-file-input"
                                                                           hidden
                                                                           accept="image/png, image/jpeg"
                                                                      />
                                                                 </label>
                                                                 <button
                                                                      type="button"
                                                                      className="btn btn-sm btn-outline-danger account-image-reset mb-1">
                                                                      <i className="ri-refresh-line d-block d-sm-none" />
                                                                      <span className="d-none d-sm-block">Reset</span>
                                                                 </button>
                                                                 <div>Allowed JPG, GIF or PNG. Max size of 800K</div>
                                                            </div>
                                                       </div>
                                                  </div>
                                                  <div className="card-body pt-0">
                                                       <form id="formAccountSettings" method="POST" onSubmit={handleSubmit(onSubmit)}>
                                                            <div className="row mt-1 g-5">
                                                                 <div className="col-md-6">
                                                                      <div className="form-floating form-floating-outline">
                                                                           <input
                                                                                className="form-control"
                                                                                type="text"
                                                                                name="fullname"
                                                                                id="fullname"
                                                                                {...register('fullname')}
                                                                           />
                                                                           <label htmlFor="fullname">Full Name</label>
                                                                      </div>
                                                                 </div>
                                                                 <div className="col-md-6">
                                                                      <div className="form-floating form-floating-outline">
                                                                           <input
                                                                                className="form-control"
                                                                                type="text"
                                                                                id="email"
                                                                                name="email"
                                                                                {...register('email')}
                                                                           />
                                                                           <label htmlFor="email">E-mail</label>
                                                                      </div>
                                                                 </div>
                                                                 <div className="col-md-6">
                                                                      <div className="form-floating form-floating-outline">
                                                                           <input
                                                                                type="text"
                                                                                id="phoneNumber"
                                                                                name="phoneNumber"
                                                                                className="form-control"
                                                                                {...register('phoneNumber')}
                                                                           />
                                                                           <label htmlFor="phoneNumber">Phone Number</label>
                                                                      </div>
                                                                 </div>
                                                                 <div className="col-md-6">
                                                                      <div className="form-floating form-floating-outline">
                                                                           <select
                                                                                className="form-control"
                                                                                id="role_id"
                                                                                name="role_id"
                                                                                {...register('role_id', { required: true })}
                                                                                value={user.role_id || ''}>
                                                                                <option value="" disabled>
                                                                                     Select role
                                                                                </option>
                                                                                {roles.map((role) => (
                                                                                     <option key={role.id} value={role.id}>
                                                                                          {role.name}
                                                                                     </option>
                                                                                ))}
                                                                           </select>
                                                                           <label htmlFor="role_id">Role</label>
                                                                      </div>
                                                                 </div>
                                                            </div>
                                                            <button type="submit" className="btn btn-primary mt-4">
                                                                 Save Changes
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
