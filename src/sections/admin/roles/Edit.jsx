import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getRoleById, updateRole } from '../../../services/rolesService';
import Swal from 'sweetalert2';


export const Edit = () => {
     const { id } = useParams();
     const { t } = useTranslation();
     const [role, setRole] = useState(null);
     const {
          register,
          handleSubmit,
          formState: { errors },
          reset,
     } = useForm();
     const navigate = useNavigate();

     useEffect(() => {
          const fetchRole = async () => {
               try {
                    const fetchedRole = await getRoleById(id);
                    setRole(fetchedRole);
                    reset(fetchedRole);
               } catch (error) {
                    toast.error(t('Failed!'));
               }
          };
          fetchRole();
     }, [id, reset, t]);

     const onSubmit = async (data) => {
          try {
               const roleData = {
                    name: data.name,
                    description: data.description,
               };

               await updateRole(id, roleData);
               Swal.fire({
                    icon: 'success',
                    text: t('Update successfully!'),
                    position: 'top-right',
                    toast: true,
                    timer: 2000,
                    showConfirmButton: false,
               });
               reset();
               setTimeout(() => {
                    navigate('/taskmaneger/roles');
               }, 1000);
          } catch (error) {
               console.error('Failed:', error);
               Swal.fire({
                    icon: 'error',
                    title: t('Update Failed!'),
                    text: error.message || t('Something went wrong'),
               });
          }
     };


     if (!role)
          return (
               <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                    <div className="spinner-border" role="status">
                         <span className="visually-hidden">{t('Loading...')}</span>
                    </div>
               </div>
          );

     return (
          <div className="card my-4">
               <div className="card-header d-flex justify-content-between align-items-center">
                    <h3 className="fw-bold py-3 mb-4 highlighted-text">
                         <span className="marquee">{t('Update Roles')}</span>
                    </h3>
               </div>
               <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                         <div className="mb-3">
                              <label htmlFor="name" className="form-label">
                                   {t('Role Name')}
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
                                   {...register('description', { required: t('Description cannot be empty!') })}
                              />
                              {errors.description && <div className="invalid-feedback">{errors.description.message}</div>}
                         </div>

                         <button type="submit" className="btn btn-success">
                              <i className="bi bi-check-circle me-2"></i> {t('Confirm')}
                         </button>
                    </form>
               </div>
               <ToastContainer position="top-right" autoClose={1000} />
          </div>
     );
};
