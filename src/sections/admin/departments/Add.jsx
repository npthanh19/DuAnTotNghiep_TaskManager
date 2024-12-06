import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { createDepartment, addUserToDepartment } from '../../../services/deparmentsService';

export const Add = () => {
     const { t } = useTranslation();
     const navigate = useNavigate();
     const {
          register,
          handleSubmit,
          formState: { errors },
          reset,
     } = useForm();
     const [showModal, setShowModal] = useState(false);
     const [departmentId, setDepartmentId] = useState(null);
     const [userIds, setUserId] = useState('');

     const onSubmit = async (departmentData) => {
          try {
               await createDepartment(departmentData);
               Swal.fire({
                    icon: 'success',
                    text: t('Added successfully!'),
                    position: 'top-right',
                    toast: true,
                    timer: 2000,
                    showConfirmButton: false,
               });
               setTimeout(() => {
                    navigate('/taskmaneger/departments');
               }, 1000);
          } catch (error) {
               Swal.fire({
                    icon: 'error',
                    title: t('Added Failed!'),
                    text: t('Something went wrong'),
               });
          }
     };

     const handleAddUser = async () => {
          try {
               if (!userIds) {
                    throw new Error(t('User ID is required'));
               }
               await addUserToDepartment(departmentId, [userIds]);
               Swal.fire({
                    icon: 'success',
                    text: t('Added successfully!'),
                    position: 'top-right',
                    toast: true,
                    timer: 2000,
                    showConfirmButton: false,
               });
               setShowModal(false);
               setUserId('');
          } catch (error) {
               Swal.fire({
                    icon: 'error',
                    title: t('Added Failed!'),
                    text: error.message || t('Something went wrong'),
               });
          }
     };

     return (
          <div className="card my-4">
               <div className="card-header d-flex justify-content-between align-items-center">
                    <h3 className="fw-bold py-3 mb-4 highlighted-text">
                         <span className="marquee">{t('Add new departments')}</span>
                    </h3>
               </div>
               <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                         <div className="mb-3">
                              <label htmlFor="department_name" className="form-label">
                                   {t('Name')}
                              </label>
                              <input
                                   type="text"
                                   id="departmentName"
                                   className={`form-control form-control-sm ${errors.department_name ? 'is-invalid' : ''}`}
                                   {...register('department_name', { required: t('Department name cannot be empty!') })}
                              />
                              {errors.department_name && <div className="invalid-feedback">{errors.department_name.message}</div>}
                         </div>

                         <div className="mb-3">
                              <label htmlFor="departmentDescription" className="form-label">
                                   {t('Description')}
                              </label>
                              <textarea
                                   id="departmentDescription"
                                   className={`form-control form-control-sm ${errors.description ? 'is-invalid' : ''}`}
                                   rows="5"
                                   {...register('description', { required: t('Description cannot be empty!') })}></textarea>
                              {errors.description && <div className="invalid-feedback">{errors.description.message}</div>}
                         </div>

                         <button type="submit" className="btn btn-success">
                              <i className="bi bi-check-circle me-3"></i> {t('Add')}
                         </button>
                         <button type="button" className="btn btn-secondary ms-2" onClick={() => window.history.back()}>
                              <i className="bi bi-arrow-left me-2"></i> {t('Back')}
                         </button>
                    </form>

                    {showModal && (
                         <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
                              <div className="modal-dialog">
                                   <div className="modal-content">
                                        <div className="modal-header">
                                             <h5 className="modal-title">{t('Add User to Department')}</h5>
                                             <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                                        </div>
                                        <div className="modal-body">
                                             <div className="mb-3">
                                                  <label htmlFor="userIds" className="form-label">
                                                       {t('User ID')}
                                                  </label>
                                                  <input
                                                       type="text"
                                                       id="userIds"
                                                       className="form-control"
                                                       value={userIds}
                                                       onChange={(e) => setUserId(e.target.value)}
                                                  />
                                             </div>
                                        </div>
                                        <div className="modal-footer">
                                             <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                                                  {t('Cancel')}
                                             </button>
                                             <button type="button" className="btn btn-primary" onClick={handleAddUser}>
                                                  {t('Add User')}
                                             </button>
                                        </div>
                                   </div>
                              </div>
                         </div>
                    )}
               </div>
          </div>
     );
};
