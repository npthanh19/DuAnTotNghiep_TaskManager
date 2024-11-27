import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import { createRole } from '../../../services/rolesService';
import { getAllPermissions } from '../../../services/permissionService';
import Select from 'react-select';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';


export const Add = () => {
     const { t } = useTranslation();
     const navigate = useNavigate();
     const {
          register,
          handleSubmit,
          formState: { errors },
          reset,
     } = useForm();
     const [permissions, setPermissions] = useState([]);
     const [selectedPermissions, setSelectedPermissions] = useState([]);

     useEffect(() => {
          const fetchPermissions = async () => {
               try {
                    const fetchedPermissions = await getAllPermissions();
                    const formattedPermissions = fetchedPermissions.map((permission) => ({
                         value: permission.id,
                         label: permission.name,
                    }));
                    setPermissions(formattedPermissions);
               } catch (error) {
                    Swal.fire({
                         icon: 'error',
                         title: t('Failed to fetch permissions!'),
                    });
               }
          };

          fetchPermissions();
     }, []);

     const onSubmit = async (data) => {
          try {
               const roleData = { ...data, permissions: selectedPermissions.map((perm) => perm.value) };
               await createRole(roleData);
               Swal.fire({
                    icon: 'success',
                    text: t('Added successfully!'),
                    position: 'top-right',
                    toast: true,
                    timer: 2000,
                    showConfirmButton: false,
               });
               reset();
               setSelectedPermissions([]);
               setTimeout(() => {
                    navigate('/taskmaneger/roles');
               }, 1000);
          } catch (error) {
               Swal.fire({
                    icon: 'error',
                    title: t('Added Failed!'),
                    text: t('Something went wrong'),
               });
               console.error('Failed to add role:', error);
          }
     };

     return (
          <div className="card my-4">
               <div className="card-header d-flex justify-content-between align-items-center">
                    <h3 className="fw-bold py-3 mb-4 highlighted-text">
                         <span className="marquee">{t('Add New Role')}</span>
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
                                   className={`form-control form-control-sm ${errors.name ? 'is-invalid' : ''}`}
                                   {...register('name', { required: t('Role name cannot be empty!') })}
                              />
                              {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
                         </div>

                         <div className="mb-3">
                              <label htmlFor="roleDescription" className="form-label">
                                   {t('Description')}
                              </label>
                              <textarea
                                   id="roleDescription"
                                   className={`form-control form-control-sm ${errors.description ? 'is-invalid' : ''}`}
                                   rows="5"
                                   {...register('description', { required: t('Description cannot be empty!') })}></textarea>
                              {errors.description && <div className="invalid-feedback">{errors.description.message}</div>}
                         </div>

                         <div className="mb-3">
                              <label htmlFor="permissions" className="form-label">
                                   {t('Permissions')}
                              </label>
                              <Select
                                   id="permissions"
                                   isMulti
                                   options={permissions}
                                   value={selectedPermissions}
                                   onChange={setSelectedPermissions}
                                   classNamePrefix="select"
                                   placeholder={t('Select permissions')}
                              />
                         </div>

                         <button type="submit" className="btn btn-success">
                              <i className="bi bi-check-circle me-3"></i> {t('Add')}
                         </button>
                    </form>
               </div>
               <ToastContainer position="top-right" autoClose={2000} />
          </div>
     );
};
